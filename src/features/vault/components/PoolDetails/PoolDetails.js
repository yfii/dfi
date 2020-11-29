import React, { useState } from 'react';
import AccordionDetails from '@material-ui/core/AccordionActions';
import FormControl from '@material-ui/core/FormControl';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import BigNumber from 'bignumber.js';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';

import CustomOutlinedInput from 'components/CustomOutlinedInput/CustomOutlinedInput';
import Button from 'components/CustomButtons/Button.js';
import CustomSlider from 'components/CustomSlider/CustomSlider';
import RefundButtons from './RefundButtons/RefundButtons';
import { useFetchWithdraw } from '../../redux/hooks';
import { useConnectWallet } from '../../../home/redux/hooks';
import { inputLimitPass, inputFinalVal } from 'features/helpers/utils';
import { byDecimals, calculateReallyNum, format } from 'features/helpers/bignumber';
import styles from './styles';
import DepositSection from './DepositSection/DepositSection';

const useStyles = makeStyles(styles);

const PoolDetails = ({ pool, balanceSingle, index, singleDepositedBalance }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { web3, address } = useConnectWallet();
  const { enqueueSnackbar } = useSnackbar();
  const { fetchWithdraw, fetchWithdrawPending } = useFetchWithdraw();
  const [withdrawAmount, setWithdrawAmount] = useState({});

  const handleWithdrawAmount = (total, sliderNum) => {
    setWithdrawAmount({
      [index]: sliderNum === 0 ? 0 : calculateReallyNum(total, sliderNum),
      [`slider-${index}`]: sliderNum === 0 ? 0 : sliderNum,
    });
  };

  const changeDetailInputValue = (type, total, tokenDecimals, event) => {
    let value = event.target.value;
    if (!inputLimitPass(value, tokenDecimals)) {
      return;
    }

    let sliderNum = 0;
    let inputVal = 0;
    if (value) {
      inputVal = Number(value.replace(',', ''));
      sliderNum = byDecimals(inputVal / total, 0).toFormat(2) * 100;
    }

    switch (type) {
      case 'withdrawAmount':
        setWithdrawAmount({
          [index]: inputFinalVal(value, total, tokenDecimals),
          [`slider-${index}`]: sliderNum,
        });
        break;
      default:
        break;
    }
  };

  const onWithdraw = (pool, index, isAll, singleDepositedBalance) => {
    if (isAll) {
      setWithdrawAmount({
        [index]: format(singleDepositedBalance),
        [`slider-${index}`]: 100,
      });
    }

    let amountValue = withdrawAmount[index]
      ? withdrawAmount[index].replace(',', '')
      : withdrawAmount[index];

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
    <AccordionDetails style={{ justifyContent: 'space-between' }}>
      <Grid container>
        <DepositSection index={index} pool={pool} balanceSingle={balanceSingle} />
        <Grid item xs={12} sm={6} className={classes.sliderDetailContainer}>
          <div className={classes.showDetailLeft}>
            Deposited:{' '}
            {format(singleDepositedBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)))}{' '}
            {pool.token}
          </div>
          <FormControl fullWidth variant="outlined">
            <CustomOutlinedInput
              value={withdrawAmount[index] !== undefined ? withdrawAmount[index] : '0'}
              onChange={e =>
                changeDetailInputValue(
                  'withdrawAmount',
                  format(
                    singleDepositedBalance.multipliedBy(new BigNumber(pool.pricePerFullShare))
                  ),
                  e
                )
              }
            />
          </FormControl>
          <CustomSlider
            aria-labelledby="continuous-slider"
            value={withdrawAmount['slider-' + index] ? withdrawAmount['slider-' + index] : 0}
            onChange={() =>
              handleWithdrawAmount(
                format(singleDepositedBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)))
              )
            }
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
      </Grid>
    </AccordionDetails>
  );
};

export default PoolDetails;
