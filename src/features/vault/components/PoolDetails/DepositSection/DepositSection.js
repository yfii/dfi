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
import CustomSlider from 'components/CustomSlider/CustomSlider';

import { useConnectWallet } from 'features/home/redux/hooks';
import {
  useFetchBalances,
  useFetchDeposit,
  useFetchApproval,
  useFetchZapEstimate,
} from 'features/vault/redux/hooks';
import { shouldHideFromHarvest } from 'features/helpers/utils';
import { byDecimals, convertAmountToRawNumber, convertAmountFromRawNumber } from 'features/helpers/bignumber';
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
  const { fetchZapEstimate, fetchZapEstimatePending } = useFetchZapEstimate();

  useEffect(() => {
      if (address && web3) {
        fetchBalances({ address, web3, tokens });
      }
  }, [address, web3, fetchBalances]);

  const tokenBalance = token => {
    return byDecimals(tokens[token.symbol]?.tokenBalance || 0, token.decimals);
  }

  const zap = getEligibleZap(pool);
  const eligibleTokens = [
    {
      name: pool.name,
      symbol: pool.token,
      address: pool.tokenAddress,
      decimals: pool.tokenDecimals,
      logoURI: pool.logo,
      allowance: pool.allowance,
    },
    ...(zap ? zap.tokens : [])
  ];

  const [depositSettings, setDepositSettings] = useState({
    tokenIndex: 0,
    isZap: false,
    token: eligibleTokens[0],
    amount: new BigNumber(0),
    slider: 0,
    input: "0.0",
  });

  useEffect(() => {
    if (fetchZapEstimatePending[index]) return;
    if (depositSettings.amount.isZero()) return;
    if (depositSettings.tokenIndex > 0) {
      fetchZapEstimate({
        web3,
        zapAddress: zap.zapAddress,
        vaultAddress: pool.earnContractAddress,
        tokenAddress: depositSettings.token.address,
        tokenAmount: convertAmountToRawNumber(depositSettings.amount, depositSettings.token.decimals),
        index,
      })
    }
  }, [web3, depositSettings, fetchZapEstimate, pool]);


  const handleTokenChange = event => {

    setDepositSettings({
      tokenIndex: event.target.value,
      isZap: (event.target.value > 0),
      token: eligibleTokens[event.target.value],
      amount: new BigNumber(0),
      slider: 0,
      input: "0.0",
    })
  }

  const handleSliderChange = (_, sliderNum) => {
    const total = tokenBalance(depositSettings.token);
    let amount = new BigNumber(0);
    if (sliderNum > 0 && sliderNum < 100){
      amount = total.times(sliderNum).div(100).decimalPlaces(8);
    }
    if (sliderNum == 100) {
      amount = total;
    }

    setDepositSettings(prevState => ({
      ...prevState,
      amount: amount,
      slider: sliderNum,
      input: amount.toFormat(),
    }));
  };

  const handleInputAmountChange = event => {
    const input = event.target.value.replace(/[,]+/, '').replace(/[^0-9\.]+/, '');
    let amount = new BigNumber(input);
    const total = tokenBalance(depositSettings.token);
    if (amount.isNaN()) amount = new BigNumber(0);

    amount = amount.decimalPlaces(depositSettings.token.decimals);
    if (amount.isGreaterThan(total)) amount = total;

    setDepositSettings(prevState => ({
      ...prevState,
      amount: amount,
      slider: total.isZero() ? 0 : amount.div(total).times(100).toFixed(0),
      input: amount.isEqualTo(input) ? input : amount.toFormat(),
    }));
  };

  const handleApproval = () => {
    if (pool.tokenAddress == depositSettings.token.address) { // Vault approval
      fetchApproval({
        address,
        web3,
        tokenAddress: pool.tokenAddress,
        contractAddress: pool.earnContractAddress,
        index,
      })
        .then(() => enqueueSnackbar(t('Vault-ApprovalSuccess'), { variant: 'success' }))
        .catch(error => enqueueSnackbar(t('Vault-ApprovalError', { error }), { variant: 'error' }));

    } else { // Zap approval
      alert('Not implemented')
    }
  };

  const handleDepositAll = () => {
    setDepositSettings(prevState => ({
      ...prevState,
      amount: tokenBalance(depositSettings.token),
      slider: 100,
      input: tokenBalance(depositSettings.token).toFormat(),
    }));
    depositAssets(true);
  }

  const handleDepositAmount = () => {
    depositAssets(false);
  }

  const depositAssets = (isAll) => {
    if (pool.depositsPaused) {
      console.error('Deposits paused!');
      return;
    }

    if (pool.tokenAddress == depositSettings.token.address) { // Vault deposit
      const depositArgs = {
        address,
        web3,
        isAll,
        amount: convertAmountToRawNumber(depositSettings.amount, depositSettings.token.decimals),
        contractAddress: pool.earnContractAddress,
        index,
      }
      if (pool.tokenAddress) {
        fetchDeposit(depositArgs)
          .then(() => enqueueSnackbar(t('Vault-DepositSuccess'), { variant: 'success' }))
          .catch(error => enqueueSnackbar(t('Vault-DepositError', { error }), { variant: 'error' }));
      } else {
        fetchDepositBnb(depositArgs)
          .then(() => enqueueSnackbar(t('Vault-DepositSuccess'), { variant: 'success' }))
          .catch(error => enqueueSnackbar(t('Vault-DepositError', { error }), { variant: 'error' }));
      }
    } else { // Zap deposit
      alert('Not implemented')
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
  const isNeedApproval = depositSettings.token.allowance == 0
    || depositSettings.amount.isGreaterThan(depositSettings.token.allowance);
  const swapTokenOut = depositSettings.isZap ?
    eligibleTokens.find(t => t.address.toLowerCase() == pool.zapEstimate?.swapTokenOut.toLowerCase()) : undefined;

  return (
    <Grid item xs={12} md={shouldHideFromHarvest(pool.id) ? 6 : 5} className={classes.sliderDetailContainer}>
      <div className={classes.showDetailLeft}>
        {t('Vault-Balance')}: {tokenBalance(depositSettings.token).precision(8).toString()} {depositSettings.token.name}
      </div>
      <FormControl fullWidth variant="outlined" className={classes.numericInput}>
        <CustomOutlinedInput
          value={depositSettings.input}
          onChange={handleInputAmountChange}
          endAdornment={
            <FormControl>
              <Select variant="outlined" value={depositSettings.tokenIndex} onChange={handleTokenChange}>
                {eligibleTokens.map((token, i) =>
                  <MenuItem key={i} value={i}>{token.symbol}</MenuItem>
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
        {depositSettings.isZap && !depositSettings.amount.isZero() && pool.zapEstimate ? (
          <div className={classes.zapNote}>
            <p>Depositing single token will:</p>
            <ol>
              <li>Swap ~{convertAmountFromRawNumber(pool.zapEstimate.swapAmountIn, depositSettings.token.decimals).precision(8).toString()} {depositSettings.token.symbol} for {convertAmountFromRawNumber(pool.zapEstimate.swapAmountOut, depositSettings.token.decimals).precision(8).toString()} {swapTokenOut.symbol} (&plusmn;1%)</li>
              <li>Add {pool.assets.join(' and ')} as liqudity to {pool.token} pool</li>
              <li>Deposit recieved {pool.token} on Beefy Vault</li>
              <li>Unused assets will be returned to your wallet</li>
            </ol>
          </div>
        ) : ''}
        {isNeedApproval ? (
          <div className={classes.showDetailButtonCon}>
            <Button
              className={`${classes.showDetailButton} ${classes.showDetailButtonContained}`}
              onClick={handleApproval}
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
                fetchDepositPending[index] ||
                depositSettings.amount.isZero() ||
                tokenBalance(depositSettings.token).isZero()
              }
              onClick={handleDepositAmount}
            >
              {t('Vault-DepositButton')}
            </Button>
            {Boolean(pool.tokenAddress) && (
              <Button
                className={`${classes.showDetailButton} ${classes.showDetailButtonContained}`}
                disabled={
                  pool.depositsPaused ||
                  fetchDepositPending[index] ||
                  tokenBalance(depositSettings.token).isZero()
                }
                onClick={handleDepositAll}
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
