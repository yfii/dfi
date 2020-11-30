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

const WithdrawSection = ({ pool, index, sharesBalance }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { web3, address } = useConnectWallet();
  const { enqueueSnackbar } = useSnackbar();
  const { fetchWithdraw, fetchWithdrawPending } = useFetchWithdraw();
  const [withdrawAmount, setWithdrawAmount] = useState({ amount: 0, slider: 0 });

  const onSliderChange = (_, sliderNum) => {
    const total = sharesBalance
      .multipliedBy(new BigNumber(pool.pricePerFullShare))
      .dividedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals))
      .toFormat(4);

    setWithdrawAmount({
      amount: sliderNum === 0 ? 0 : calculateReallyNum(total, sliderNum),
      slider: sliderNum,
    });
  };

  const onInputChange = event => {
    const value = event.target.value;
    const total = sharesBalance
      .multipliedBy(new BigNumber(pool.pricePerFullShare))
      .dividedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals))
      .toFormat(4);

    if (!inputLimitPass(value, pool.tokenDecimals)) {
      return;
    }

    let inputVal = 0;
    let sliderNum = 0;
    if (value) {
      inputVal = Number(value.replace(',', ''));
      sliderNum = byDecimals(inputVal / total, 0).toFormat(2) * 100;
    }

    setWithdrawAmount({
      amount: inputFinalVal(value, total, pool.tokenDecimals),
      slider: sliderNum,
    });
  };

  const onWithdraw = isAll => {
    if (isAll) {
      setWithdrawAmount({
        amount: sharesBalance.multipliedBy(pool.pricePerFullShare).dividedBy('1e18').toFormat(4),
        slider: 100,
      });
    }

    if (withdrawAmount.slider == 100) isAll = true;

    const amountValue = withdrawAmount.amount
      ? withdrawAmount.amount.replace(',', '')
      : withdrawAmount.amount;

    fetchWithdraw({
      address,
      web3,
      isAll,
      amount: new BigNumber(amountValue)
        .multipliedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals))
        .dividedBy(pool.pricePerFullShare)
        .toFixed(0),
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
        {byDecimals(
          sharesBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)),
          pool.tokenDecimals
        ).toFormat(4)}{' '}
        {pool.token}
      </div>
      <FormControl fullWidth variant="outlined">
        <CustomOutlinedInput value={withdrawAmount.amount} onChange={onInputChange} />
      </FormControl>
      <CustomSlider
        aria-labelledby="continuous-slider"
        value={withdrawAmount.slider}
        onChange={onSliderChange}
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
              onClick={() => onWithdraw(false)}
            >
              {fetchWithdrawPending[index]
                ? `${t('Vault-Withdrawing')}`
                : `${t('Vault-WithdrawButton')}`}
            </Button>
            <Button
              className={`${classes.showDetailButton} ${classes.showDetailButtonOutlined}`}
              type="button"
              color="primary"
              onClick={() => onWithdraw(true)}
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
