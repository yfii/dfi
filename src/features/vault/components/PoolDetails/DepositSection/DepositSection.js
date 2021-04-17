import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useSnackbar } from 'notistack';

import CustomOutlinedInput from 'components/CustomOutlinedInput/CustomOutlinedInput';
import { useFetchBalances, useFetchDeposit, useFetchApproval } from 'features/vault/redux/hooks';
import CustomSlider from 'components/CustomSlider/CustomSlider';
import { useConnectWallet } from 'features/home/redux/hooks';
import { shouldHideFromHarvest } from 'features/helpers/utils';
import { byDecimals, format } from 'features/helpers/bignumber';
import Button from 'components/CustomButtons/Button.js';
import styles from './styles';
import { getEligibleZap } from 'features/zap/zapUniswapV2';

const useStyles = makeStyles(styles);

const DepositSection = ({ pool, index, balanceSingle }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { web3, address } = useConnectWallet();
  const { enqueueSnackbar } = useSnackbar();
  const { fetchApproval, fetchApprovalPending } = useFetchApproval();
  const { fetchDeposit, fetchDepositBnb, fetchDepositPending } = useFetchDeposit();
  const { tokens, fetchBalances, fetchBalancesDone } = useFetchBalances();

  useEffect(() => {
      if (address && web3) {
        fetchBalances({ address, web3, tokens });
      }
  }, [address, web3, fetchBalances]);

  const tokenBalance = token => {
    return byDecimals(tokens[token.symbol].tokenBalance, token.decimals)
  }

  const zap = getEligibleZap(pool);
  const eligibleTokens = [
    {
      name: pool.name,
      symbol: pool.token,
      address: pool.tokenAddress,
      decimals: pool.tokenDecimals,
      logoURI: pool.logo,
    },
    ...(zap ? zap.tokens : [])
  ];

  const [depositSettings, setDepositSettings] = useState({
    tokenIndex: 0,
    token: eligibleTokens[0],
    amount: new BigNumber(0),
    slider: 0,
    input: "0.0",
  });

  const handleTokenChange = event => {
    setDepositSettings({
      tokenIndex: event.target.value,
      token: eligibleTokens[event.target.value],
      amount: new BigNumber(0),
      slider: 0,
      input: "0.0",
    })
  }

  const handleSliderChange = (_, sliderNum) => {
    const total = tokenBalance(depositSettings.token);
    const amount = sliderNum > 0 ? total.times(sliderNum).div(100).decimalPlaces(depositSettings.token.decimals) : new BigNumber(0);

    setDepositSettings({
      tokenIndex: depositSettings.tokenIndex,
      token: depositSettings.token,
      amount: amount,
      slider: sliderNum,
      input: amount.toString(),
    });
  };

  const handleInputAmountChange = event => {
    const input = event.target.value.replace(/[,]+/, '\.').replace(/[^0-9\.]+/, '');
    let amount = new BigNumber(input);
    const total = tokenBalance(depositSettings.token);
    if (amount.isNaN()) amount = new BigNumber(0);

    amount = amount.decimalPlaces(depositSettings.token.decimals);
    if (amount.isGreaterThan(total)) amount = total;

    setDepositSettings({
      tokenIndex: depositSettings.tokenIndex,
      token: depositSettings.token,
      amount: amount,
      slider: total.isZero() ? 0 : amount.div(total).times(100).toFixed(0),
      input: amount.isEqualTo(input) ? input : amount.toString(),
    });
  };

  const onApproval = () => {
    fetchApproval({
      address,
      web3,
      tokenAddress: pool.tokenAddress,
      contractAddress: pool.earnContractAddress,
      index,
    })
      .then(() => enqueueSnackbar(t('Vault-ApprovalSuccess'), { variant: 'success' }))
      .catch(error => enqueueSnackbar(t('Vault-ApprovalError', { error }), { variant: 'error' }));
  };

  const onDeposit = isAll => {
    if (pool.depositsPaused) {
      console.error('Deposits paused!');
      return;
    }

    if (isAll) {
      setDepositSettings({
        amount: format(balanceSingle),
        slider: 100,
      });
    }

    let amountValue = depositSettings.amount
      ? depositSettings.amount.replace(',', '')
      : depositSettings.amount;

    if (pool.tokenAddress) {
      fetchDeposit({
        address,
        web3,
        isAll,
        amount: new BigNumber(amountValue)
          .multipliedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals))
          .toString(10),
        contractAddress: pool.earnContractAddress,
        index,
      })
        .then(() => enqueueSnackbar(t('Vault-DepositSuccess'), { variant: 'success' }))
        .catch(error => enqueueSnackbar(t('Vault-DepositError', { error }), { variant: 'error' }));
    } else {
      fetchDepositBnb({
        address,
        web3,
        amount: new BigNumber(amountValue)
          .multipliedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals))
          .toString(10),
        contractAddress: pool.earnContractAddress,
        index,
      })
        .then(() => enqueueSnackbar(t('Vault-DepositSuccess'), { variant: 'success' }))
        .catch(error => enqueueSnackbar(t('Vault-DepositError', { error }), { variant: 'error' }));
    }
  };

  const getVaultState = (status, paused) => {
    let display = false
    let cont = null

    if(status === 'eol') {
      display = true;
      cont = <div className={classes.showDetailButtonCon}>
        <div className={classes.showRetiredMsg}>{t('Vault-DepositsRetiredMsg')}</div>
      </div>
    } else {
      if(paused) {
        display = true;
        cont = <div className={classes.showDetailButtonCon}>
          <div className={classes.showPausedMsg}>{t('Vault-DepositsPausedMsg')}</div>
        </div>
      }
    }

    return {display:display, content: cont}
  }

  const vaultState = getVaultState(pool.status, pool.depositsPaused);

  return (
    <Grid item xs={12} md={shouldHideFromHarvest(pool.id) ? 6 : 5} className={classes.sliderDetailContainer}>
      <div className={classes.showDetailLeft}>
        {t('Vault-Balance')}: {tokenBalance(depositSettings.token).toFormat(8)} {depositSettings.token.name}
      </div>
      <FormControl fullWidth variant="outlined" className={classes.numericInput}>
        <CustomOutlinedInput
          value={depositSettings.input}
          onChange={handleInputAmountChange}
          endAdornment={
            <FormControl>
              <Select variant="outlined" value={depositSettings.tokenIndex} onChange={handleTokenChange}>
                {eligibleTokens.map((token, index) =>
                  <MenuItem key={index} value={index}>{token.symbol}</MenuItem>
                )}
              </Select>
            </FormControl>
          }
        />
      </FormControl>
      <CustomSlider
        aria-labelledby="continuous-slider"
        value={depositSettings.slider}
        onChange={handleSliderChange}
      />
      {vaultState.display === true ? vaultState.content : (
      <div>
        {pool.allowance === 0 ? (
          <div className={classes.showDetailButtonCon}>
            <Button
              className={`${classes.showDetailButton} ${classes.showDetailButtonContained}`}
              onClick={onApproval}
              disabled={pool.depositsPaused || fetchApprovalPending[index]}
            >
              {fetchApprovalPending[index]
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
                !Boolean(depositSettings.amount) ||
                fetchDepositPending[index] ||
                depositSettings.amount.toNumber() > balanceSingle.toNumber()
              }
              onClick={() => onDeposit(false)}
            >
              {t('Vault-DepositButton')}
            </Button>
            {Boolean(pool.tokenAddress) && (
              <Button
                className={`${classes.showDetailButton} ${classes.showDetailButtonContained}`}
                disabled={
                  pool.depositsPaused ||
                  fetchDepositPending[index] ||
                  depositSettings.amount.toNumber() > balanceSingle.toNumber()
                }
                onClick={() => onDeposit(true)}
              >
                {t('Vault-DepositButtonAll')}
              </Button>
            )}
          </div>
        )}
      </div>
      )}
      {['Autofarm', 'Swamp'].includes(pool.platform) ? <h3 className={classes.subtitle}>{t('Vault-DepositFee')}</h3> : ''}
      <p className={classes.note}>{t('Vault-DepositTokensNote', { mooToken: pool.earnedToken, assetToken: pool.token })}</p>
    </Grid>
  );
};

export default DepositSection;
