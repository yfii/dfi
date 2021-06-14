import React, { useState, useEffect, useMemo } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import Grid from '@material-ui/core/Grid';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSnackbar } from 'notistack';
import CustomOutlinedInput from 'components/CustomOutlinedInput/CustomOutlinedInput';
import CustomSlider from 'components/CustomSlider/CustomSlider';

import { useConnectWallet } from 'features/home/redux/hooks';
import {
  useFetchBalances,
  useFetchDeposit,
  useFetchZapDeposit,
  useFetchApproval,
  useFetchZapEstimate,
} from 'features/vault/redux/hooks';
import { shouldHideFromHarvest } from 'features/helpers/utils';
import { convertAmountToRawNumber, convertAmountFromRawNumber } from 'features/helpers/bignumber';
import Button from 'components/CustomButtons/Button.js';
import styles from './styles';

const useStyles = makeStyles(styles);

const DepositSection = ({ pool }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { web3, address } = useConnectWallet();
  const { enqueueSnackbar } = useSnackbar();
  const { fetchApproval, fetchApprovalPending } = useFetchApproval();
  const { fetchDeposit, fetchDepositBnb, fetchDepositPending } = useFetchDeposit();
  const { fetchZapDeposit } = useFetchZapDeposit();
  const { tokens, tokenBalance, fetchBalances } = useFetchBalances();
  const { fetchZapDepositEstimate, fetchZapEstimatePending } = useFetchZapEstimate();

  const { zap, eligibleTokens } = useMemo(() => {
    const zap = pool.zap;
    return {
      zap,
      eligibleTokens: [
        {
          name: pool.name,
          symbol: pool.token,
          address: pool.tokenAddress,
          decimals: pool.tokenDecimals,
          logoURI: pool.logo,
        },
        ...(zap ? zap.tokens : []),
      ],
    };
  }, [pool.tokenAddress]);

  const [depositSettings, setDepositSettings] = useState({
    tokenIndex: 0,
    isZap: false,
    token: eligibleTokens[0],
    amount: new BigNumber(0),
    slider: 0,
    input: '0.0',
    vaultAddress: pool.earnContractAddress,
    depositAddress: pool.earnContractAddress,
    isNeedApproval: new BigNumber(
      tokens[eligibleTokens[0].symbol].allowance[pool.earnContractAddress]
    ).isZero(),
    slippageTolerance: 0.01,
    swapAmountOut: pool.zapEstimate?.swapAmountOut,
  });

  useDeepCompareEffect(() => {
    if (depositSettings.amount.isZero()) return;
    if (depositSettings.isZap) {
      fetchZapDepositEstimate({
        web3,
        zapAddress: zap.zapAddress,
        vaultAddress: pool.earnContractAddress,
        tokenAddress: depositSettings.token.address,
        tokenAmount: convertAmountToRawNumber(
          depositSettings.amount,
          depositSettings.token.decimals
        ),
      });
    }
  }, [depositSettings.amount, pool, new Date().getMinutes()]);

  useEffect(() => {
    const allowance = new BigNumber(
      tokens[depositSettings.token.symbol].allowance[depositSettings.depositAddress]
    );
    setDepositSettings(prevState => ({
      ...prevState,
      isNeedApproval: allowance.isZero() || prevState.amount.isGreaterThan(allowance),
    }));
  }, [tokens[depositSettings.token.symbol].allowance[depositSettings.depositAddress]]);

  useEffect(() => {
    if (address && web3 && zap) {
      const tokens = {};
      eligibleTokens.forEach(token => {
        tokens[token.symbol] = {
          tokenAddress: token.wrappedSymbol ? null : token.address,
          tokenBalance: 0,
          allowance: {
            [zap.zapAddress]: token.wrappedSymbol ? Infinity : 0,
          },
          decimals: token.decimals,
          ...tokens[token.symbol],
        };
      });
      fetchBalances({ address, web3, tokens });
    }
  }, [address, web3, fetchBalances]);

  const handleTokenChange = event => {
    const isZap = event.target.value > 0;
    const spender = isZap ? zap.zapAddress : pool.earnContractAddress;
    const token = eligibleTokens[event.target.value];
    const allowance = new BigNumber(tokens[token.symbol].allowance[spender]);

    setDepositSettings(prevState => ({
      ...prevState,
      tokenIndex: event.target.value,
      isZap: isZap,
      token: token,
      amount: new BigNumber(0),
      slider: 0,
      input: '0.0',
      depositAddress: spender,
      isNeedApproval: allowance.isZero(),
    }));
  };

  const handleSliderChange = (_, sliderInt) => {
    setDepositSettings(prevState => ({
      ...prevState,
      slider: sliderInt,
    }));
  };

  const handleSliderChangeCommitted = (_, sliderInt) => {
    const total = tokenBalance(depositSettings.token.symbol);
    let amount = new BigNumber(0);
    if (sliderInt > 0 && sliderInt < 100) {
      amount = total.times(sliderInt).div(100).decimalPlaces(8);
    }
    if (sliderInt == 100) {
      amount = total;
    }
    const allowance = new BigNumber(
      tokens[depositSettings.token.symbol].allowance[depositSettings.depositAddress]
    );

    setDepositSettings(prevState => ({
      ...prevState,
      amount: amount,
      slider: sliderInt,
      input: amount.toFormat(),
      isNeedApproval: allowance.isZero(),
    }));
  };

  const handleMax = _ => {
    handleSliderChangeCommitted(_, 100);
  };

  const handleInputAmountChange = event => {
    const input = event.target.value.replace(/[,]+/, '').replace(/[^0-9\.]+/, '');
    let amount = new BigNumber(input);
    const total = tokenBalance(depositSettings.token.symbol);
    if (amount.isNaN()) amount = new BigNumber(0);

    amount = amount.decimalPlaces(depositSettings.token.decimals);
    if (amount.isGreaterThan(total)) amount = total;

    const sliderInt = total.isZero() ? 0 : amount.times(100).dividedToIntegerBy(total).toNumber();
    const allowance = new BigNumber(
      tokens[depositSettings.token.symbol].allowance[depositSettings.depositAddress]
    );

    setDepositSettings(prevState => ({
      ...prevState,
      amount: amount,
      slider: sliderInt,
      input: amount.isEqualTo(input) ? input : amount.toFormat(),
      isNeedApproval: allowance.isZero(),
    }));
  };

  const handleApproval = () => {
    fetchApproval({
      address,
      web3,
      tokenAddress: depositSettings.token.address,
      contractAddress: depositSettings.depositAddress,
      tokenSymbol: depositSettings.token.symbol,
    })
      .then(() => enqueueSnackbar(t('Vault-ApprovalSuccess'), { variant: 'success' }))
      .catch(error => enqueueSnackbar(t('Vault-ApprovalError', { error }), { variant: 'error' }));
  };

  const handleDepositAll = () => {
    const newDepositSettings = {
      ...depositSettings,
      amount: tokenBalance(depositSettings.token.symbol),
      slider: 100,
      input: tokenBalance(depositSettings.token.symbol).toFormat(),
    };
    setDepositSettings(newDepositSettings);
    depositAssets({
      ...newDepositSettings,
      isAll: true,
    });
  };

  const handleDepositAmount = () => {
    depositAssets(depositSettings);
  };

  const depositAssets = deposit => {
    if (pool.depositsPaused) {
      console.error('Deposits paused!');
      return;
    }

    if (deposit.isZap) {
      // Zap deposit
      const swapAmountOut = pool.zapEstimate.swapAmountOut;
      const swapAmountOutMin = new BigNumber(
        swapAmountOut - swapAmountOut * deposit.slippageTolerance
      );
      const zapDepositArgs = {
        vaultAddress: deposit.vaultAddress,
        isETH: !!deposit.token.wrappedSymbol,
        tokenAddress: deposit.token.address,
        tokenAmount: convertAmountToRawNumber(deposit.amount, deposit.token.decimals),
        zapAddress: deposit.depositAddress,
        swapAmountOutMin: swapAmountOutMin.toFixed(0),
        address,
        web3,
      };
      fetchZapDeposit(zapDepositArgs)
        .then(() => {
          enqueueSnackbar(t('Vault-DepositSuccess'), { variant: 'success' });
          fetchBalances({ address, web3, tokens });
        })
        .catch(error => enqueueSnackbar(t('Vault-DepositError', { error }), { variant: 'error' }));
    } else {
      // Vault deposit
      const depositArgs = {
        address,
        web3,
        isAll: !!deposit.isAll,
        amount: convertAmountToRawNumber(deposit.amount, deposit.token.decimals),
        contractAddress: deposit.vaultAddress,
      };
      if (pool.tokenAddress) {
        fetchDeposit(depositArgs)
          .then(() => {
            enqueueSnackbar(t('Vault-DepositSuccess'), { variant: 'success' });
            fetchBalances({ address, web3, tokens });
          })
          .catch(error =>
            enqueueSnackbar(t('Vault-DepositError', { error }), { variant: 'error' })
          );
      } else {
        fetchDepositBnb(depositArgs)
          .then(() => {
            enqueueSnackbar(t('Vault-DepositSuccess'), { variant: 'success' });
            fetchBalances({ address, web3, tokens });
          })
          .catch(error =>
            enqueueSnackbar(t('Vault-DepositError', { error }), { variant: 'error' })
          );
      }
    }
  };

  const getVaultState = (status, paused) => {
    let display = false;
    let cont = null;

    if (status === 'eol') {
      display = true;
      cont = (
        <div className={classes.showDetailButtonCon}>
          <div className={classes.showRetiredMsg}>{t('Vault-DepositsRetiredMsg')}</div>
        </div>
      );
    } else {
      if (paused) {
        display = true;
        cont = (
          <div className={classes.showDetailButtonCon}>
            <div className={classes.showPausedMsg}>{t('Vault-DepositsPausedMsg')}</div>
          </div>
        );
      }
    }

    return { display: display, content: cont };
  };

  const vaultState = getVaultState(pool.status, pool.depositsPaused);
  const swapTokenOut = depositSettings.isZap
    ? eligibleTokens.find(
        t => t.address.toLowerCase() == pool.zapEstimate?.swapTokenOut?.toLowerCase()
      )
    : undefined;

  const vaultFee = t('Vault-DepositAndWithdrawFee', {
    depositFee: pool.depositFee,
    withdrawalFee: pool.withdrawalFee,
  });
  return (
    <Grid
      item
      xs={12}
      md={shouldHideFromHarvest(pool.id) ? 6 : 5}
      className={classes.sliderDetailContainer}
    >
      <div className={classes.showDetailLeft}>
        {t('Vault-Balance')}:{' '}
        <a onClick={handleMax} className={classes.balanceMax}>
          {tokenBalance(depositSettings.token.symbol)
            .decimalPlaces(8, BigNumber.ROUND_DOWN)
            .toFormat()}{' '}
          {depositSettings.token.symbol}
        </a>
      </div>
      <FormControl fullWidth variant="outlined" className={classes.numericInput}>
        <CustomOutlinedInput
          value={depositSettings.input}
          onChange={handleInputAmountChange}
          fullWidth
          endAdornment={
            pool.zap && (
              <FormControl className={classes.zapFormControl}>
                <Select
                  variant="standard"
                  className={classes.zapSelect}
                  value={depositSettings.tokenIndex}
                  onChange={handleTokenChange}
                >
                  {eligibleTokens.map((token, i) => (
                    <MenuItem key={i} value={i}>
                      {token.symbol}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )
          }
        />
      </FormControl>
      <CustomSlider
        aria-labelledby="continuous-slider"
        value={depositSettings.slider}
        onChange={handleSliderChange}
        onChangeCommitted={handleSliderChangeCommitted}
      />
      {vaultState.display === true ? (
        vaultState.content
      ) : (
        <div>
          {depositSettings.isNeedApproval ? (
            <div className={classes.showDetailButtonCon}>
              <Button
                className={`${classes.showDetailButton} ${classes.showDetailButtonContained}`}
                onClick={handleApproval}
                disabled={pool.depositsPaused || fetchApprovalPending[depositSettings.token.symbol]}
              >
                {fetchApprovalPending[depositSettings.token.symbol]
                  ? `${t('Vault-Approving')}`
                  : `${t('Vault-ApproveButton')}`}
              </Button>
            </div>
          ) : (
            <div className={classes.showDetailButtonCon}>
              <Button
                className={`${classes.showDetailButton} ${classes.showDetailButtonOutlined}`}
                color="primary"
                disabled={
                  pool.depositsPaused ||
                  fetchZapEstimatePending[pool.earnContractAddress] ||
                  fetchDepositPending[pool.earnContractAddress] ||
                  depositSettings.amount.isZero() ||
                  tokenBalance(depositSettings.token.symbol).isZero()
                }
                onClick={handleDepositAmount}
              >
                {t('Vault-DepositButton')}
              </Button>
              {Boolean(pool.tokenAddress) && Boolean(!depositSettings.isZap) && (
                <Button
                  className={`${classes.showDetailButton} ${classes.showDetailButtonContained}`}
                  disabled={
                    pool.depositsPaused ||
                    fetchDepositPending[pool.earnContractAddress] ||
                    tokenBalance(depositSettings.token.symbol).isZero()
                  }
                  onClick={handleDepositAll}
                >
                  {t('Vault-DepositButtonAll')}
                </Button>
              )}
            </div>
          )}
          {depositSettings.isZap && !depositSettings.amount.isZero() && pool.zapEstimate && (
            <div className={classes.zapNote}>
              <span>{t('Vault-DepositScenario')}&nbsp;</span>
              {fetchZapEstimatePending[pool.earnContractAddress] && <CircularProgress size={12} />}
              <ol>
                <li>
                  {t('Vault-DepositScenarioSwap', {
                    swapIn: `${convertAmountFromRawNumber(
                      pool.zapEstimate.swapAmountIn,
                      depositSettings.token.decimals
                    )
                      .decimalPlaces(8, BigNumber.ROUND_DOWN)
                      .toFormat()} ${depositSettings.token.symbol}`,
                    swapOut: `${convertAmountFromRawNumber(
                      pool.zapEstimate.swapAmountOut,
                      swapTokenOut.decimals
                    )
                      .decimalPlaces(8, BigNumber.ROUND_DOWN)
                      .toFormat()} ${swapTokenOut.symbol}`,
                    slippageTolerance: `1%`,
                  })}
                </li>
                <li>
                  {t('Vault-DepositScenarioAddLiquidity', {
                    tokenA: pool.assets[0],
                    tokenB: pool.assets[1],
                    poolToken: pool.token,
                  })}
                </li>
                <li>{t('Vault-DepositScenarioDepositToVault', { poolToken: pool.token })}</li>
                <li>
                  {t('Vault-DepositScenarioReturnDust', {
                    tokenA: pool.assets[0],
                    tokenB: pool.assets[1],
                  })}
                </li>
              </ol>
            </div>
          )}
        </div>
      )}

      {vaultFee ? <h3 className={classes.subtitle}>{vaultFee}</h3> : ''}
      <p className={classes.note}>
        {t('Vault-DepositTokensNote', { mooToken: pool.earnedToken, assetToken: pool.token })}
      </p>
    </Grid>
  );
};

export default DepositSection;
