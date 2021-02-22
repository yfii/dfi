import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { useSnackbar } from 'notistack';

import CustomOutlinedInput from 'components/CustomOutlinedInput/CustomOutlinedInput';
import { useFetchDeposit, useFetchApproval } from 'features/vault/redux/hooks';
import CustomSlider from 'components/CustomSlider/CustomSlider';
import { useConnectWallet } from 'features/home/redux/hooks';
import { inputLimitPass, inputFinalVal, shouldHideFromHarvest } from 'features/helpers/utils';
import { byDecimals, calculateReallyNum, format } from 'features/helpers/bignumber';
import Button from 'components/CustomButtons/Button.js';
import styles from './styles';

const useStyles = makeStyles(styles);

const DepositSection = ({ pool, index, balanceSingle }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { web3, address } = useConnectWallet();
  const { enqueueSnackbar } = useSnackbar();
  const { fetchApproval, fetchApprovalPending } = useFetchApproval();
  const { fetchDeposit, fetchDepositBnb, fetchDepositPending } = useFetchDeposit();
  const [depositBalance, setDepositBalance] = useState({
    amount: 0,
    slider: 0,
  });

  const handleDepositedBalance = (_, sliderNum) => {
    const total = balanceSingle.toNumber();

    setDepositBalance({
      amount: sliderNum === 0 ? 0 : calculateReallyNum(total, sliderNum),
      slider: sliderNum,
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
      setDepositBalance({
        amount: format(balanceSingle),
        slider: 100,
      });
    }

    let amountValue = depositBalance.amount
      ? depositBalance.amount.replace(',', '')
      : depositBalance.amount;

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

  const changeDetailInputValue = event => {
    let value = event.target.value;
    const total = balanceSingle.toNumber();

    if (!inputLimitPass(value, pool.tokenDecimals)) {
      return;
    }

    let sliderNum = 0;
    let inputVal = 0;
    if (value) {
      inputVal = Number(value.replace(',', ''));
      sliderNum = byDecimals(inputVal / total, 0).toFormat(2) * 100;
    }

    setDepositBalance({
      amount: inputFinalVal(value, total, pool.tokenDecimals),
      slider: sliderNum,
    });
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
        {t('Vault-Balance')}: {balanceSingle.toFormat(4)} {pool.token}
      </div>
      <FormControl fullWidth variant="outlined" className={classes.numericInput}>
        <CustomOutlinedInput value={depositBalance.amount} onChange={changeDetailInputValue} />
      </FormControl>
      <CustomSlider
        aria-labelledby="continuous-slider"
        value={depositBalance.slider}
        onChange={handleDepositedBalance}
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
                !Boolean(depositBalance.amount) ||
                fetchDepositPending[index] ||
                new BigNumber(depositBalance.amount).toNumber() > balanceSingle.toNumber()
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
                  new BigNumber(depositBalance.amount).toNumber() > balanceSingle.toNumber()
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
      {pool.platform === 'Autofarm' ? <h3 className={classes.subtitle}>{t('Vault-DepositFee')}</h3> : ''}
    </Grid>
  );
};

export default DepositSection;
