import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import BigNumber from 'bignumber.js';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import FormControl from '@material-ui/core/FormControl';

import Button from 'components/CustomButtons/Button.js';
import CustomOutlinedInput from 'components/CustomOutlinedInput/CustomOutlinedInput';
import CustomSlider from 'components/CustomSlider/CustomSlider';
import RefundButtons from '../RefundButtons/RefundButtons';
import { byDecimals, calculateReallyNum, format } from 'features/helpers/bignumber';
import { inputLimitPass, inputFinalVal } from 'features/helpers/utils';
import { useFetchWithdraw } from 'features/vault/redux/hooks';
import { useConnectWallet } from 'features/home/redux/hooks';
import styles from './styles';

const useStyles = makeStyles(styles);

const WithdrawSection = ({ pool, index, singleDepositedBalance }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { web3, address } = useConnectWallet();
  const { enqueueSnackbar } = useSnackbar();
  const { fetchWithdraw, fetchWithdrawPending } = useFetchWithdraw();
  const [withdrawAmount, setWithdrawAmount] = useState({});

  const handleWithdrawAmount = (_, sliderNum) => {
    const total = singleDepositedBalance.toNumber();

    setWithdrawAmount({
      amount: sliderNum === 0 ? 0 : calculateReallyNum(total, sliderNum),
      slider: sliderNum,
    });
  };

  const changeDetailInputValue = event => {
    let value = event.target.value;
    let total = singleDepositedBalance.toNumber();
    if (!inputLimitPass(value, pool.tokenDecimals)) {
      return;
    }

    let sliderNum = 0;
    let inputVal = 0;
    if (value) {
      inputVal = Number(value.replace(',', ''));
      sliderNum = byDecimals(inputVal / total, 0).toFormat(2) * 100;
    }

    setWithdrawAmount({
      amount: inputFinalVal(value, total, pool.tokenDecimals),
      slider: sliderNum,
    });
  };

  const onWithdraw = (pool, index, isAll, singleDepositedBalance) => {
    if (isAll) {
      setWithdrawAmount({
        value: format(singleDepositedBalance),
        slider: 100,
      });
    }

    const amountValue = withdrawAmount.amount
      ? withdrawAmount.amount.replace(',', '')
      : withdrawAmount.amount;

    fetchWithdraw({
      address,
      web3,
      isAll,
      amount: new BigNumber(amountValue)
        .multipliedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals))
        .toString(10),
      contractAddress: pool.earnContractAddress,
      index,
    })
      .then(() => enqueueSnackbar(`Withdraw success`, { variant: 'success' }))
      .catch(error => enqueueSnackbar(`Withdraw error: ${error}`, { variant: 'error' }));
  };

  return (
    <Grid item xs={12} sm={6} className={classes.sliderDetailContainer}>
      <div className={classes.showDetailLeft}>
        Deposited:{' '}
        {format(singleDepositedBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)))}{' '}
        {pool.token}
      </div>
      <FormControl fullWidth variant="outlined">
        <CustomOutlinedInput
          value={withdrawAmount.amount !== undefined ? withdrawAmount.amount : '0'}
          onChange={changeDetailInputValue}
        />
      </FormControl>
      <CustomSlider
        aria-labelledby="continuous-slider"
        value={withdrawAmount.slider ? withdrawAmount.slider : 0}
        onChange={handleWithdrawAmount}
      />
      <div className={classes.showDetailButtonCon}>
        {pool.status === 'refund' ? (
          <RefundButtons
            tokenAddress={pool.earnedTokenAddress}
            contractAddress={pool.refundContractAddress}
            index={index}
          />
        ) : (
          <>
            <Button
              className={`${classes.showDetailButton} ${classes.showDetailButtonOutlined}`}
              type="button"
              color="primary"
              onClick={onWithdraw.bind(this, pool, index, false, singleDepositedBalance)}
            >
              {fetchWithdrawPending[index]
                ? `${t('Vault-Withdrawing')}`
                : `${t('Vault-WithdrawButton')}`}
            </Button>
            <Button
              className={`${classes.showDetailButton} ${classes.showDetailButtonOutlined}`}
              type="button"
              color="primary"
              onClick={onWithdraw.bind(this, pool, index, true, singleDepositedBalance)}
            >
              {fetchWithdrawPending[index]
                ? `${t('Vault-Withdrawing')}`
                : `${t('Vault-WithdrawButtonAll')}`}
            </Button>
          </>
        )}
      </div>
    </Grid>
  );
};

export default WithdrawSection;
