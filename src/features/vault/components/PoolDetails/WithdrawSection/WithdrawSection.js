import React, { useState, useMemo, useEffect } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import Grid from '@material-ui/core/Grid';
import BigNumber from 'bignumber.js';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

import Button from 'components/CustomButtons/Button.js';
import CustomOutlinedInput from 'components/CustomOutlinedInput/CustomOutlinedInput';
import CustomSlider from 'components/CustomSlider/CustomSlider';
import RefundButtons from '../RefundButtons/RefundButtons';
import { byDecimals, convertAmountToRawNumber, convertAmountFromRawNumber } from 'features/helpers/bignumber';
import { inputLimitPass, inputFinalVal, shouldHideFromHarvest } from 'features/helpers/utils';
import { useFetchWithdraw, useFetchBalances, useFetchApproval, useFetchZapEstimate } from 'features/vault/redux/hooks';
import { useConnectWallet } from 'features/home/redux/hooks';
import { getNetworkCoin } from 'features/helpers/getNetworkData';
import styles from './styles';

const useStyles = makeStyles(styles);
const nativeCoin = getNetworkCoin();

const WithdrawSection = ({ pool, index, sharesBalance }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { web3, address } = useConnectWallet();
  const { enqueueSnackbar } = useSnackbar();
  const { fetchApproval, fetchApprovalPending } = useFetchApproval();
  const {
    fetchWithdraw,
    fetchWithdrawBnb,
    fetchZapWithdrawAndRemoveLiqudity,
    fetchWithdrawPending,
  } = useFetchWithdraw();
  const { fetchZapWithdrawEstimate, fetchZapEstimatePending } = useFetchZapEstimate();
  const { tokens, fetchBalances, fetchPairReverves } = useFetchBalances();

  const withdrawOutputs = useMemo(() => {
    const outputs = [
      {
        name: pool.name,
        symbol: pool.token,
        address: pool.tokenAddress,
        decimals: pool.tokenDecimals,
      },
    ]

    if (pool.zap) {
      const pairTokens = pool.zap.tokens.filter(t => t.symbol !== nativeCoin.wrappedSymbol);
      if (pairTokens.length) {
        outputs.push({
          symbol: pool.assets.join('+'),
        }, ...pairTokens)
      }
    }

    return outputs;

  }, [pool.tokenAddress])

  const [withdrawSettings, setWithdrawSettings] = useState({
    isZap: false,
    isSwap: false,
    swapInput: undefined,
    swapOutput: undefined,
    outputIndex: 0,
    amount: new BigNumber(0),
    slider: 0,
    input: "0.0",
    vaultAddress: pool.earnContractAddress,
    withdrawAddress: pool.earnContractAddress,
    isNeedApproval: false,
    slippageTolerance: 0.01,
    swapAmountOut: pool.zapWithdrawEstimate?.swapAmountOut,
  });

  useDeepCompareEffect(() => {
    if (fetchZapEstimatePending[pool.tokenAddress]) return;
    if (pool.zap) {
      fetchPairReverves({ web3, pairToken: tokens[pool.token] })
    }
  }, [pool, (new Date()).getMinutes()])

  useDeepCompareEffect(() => {
    if (fetchZapEstimatePending[pool.tokenAddress]) return;
    if (pool.zap) {
      fetchZapWithdrawEstimate({
        web3,
        vaultAddress: pool.earnContractAddress,
        routerAddress: pool.zap.ammRouter,
        swapInput: withdrawSettings.swapInput,
        swapOutput: withdrawSettings.swapOutput,
        pairToken: tokens[pool.token],
        pairTokenAmount: convertAmountToRawNumber(withdrawSettings.amount, tokens[pool.token].decimals),
      })
    }
  }, [tokens[pool.token].reserves, withdrawSettings.amount])

  const handleOutputChange = event => {
    const outputIndex = event.target.value;
    const isZap = (outputIndex > 0);
    const isSwap = (outputIndex > 1);
    const spender = isZap ? pool.zap.zapAddress : pool.earnContractAddress;
    const swapInput = isSwap ? withdrawOutputs[(outputIndex === 2 ? 3 : 2)] : undefined;
    const swapOutput = isSwap ? withdrawOutputs[outputIndex] : undefined;
    const allowance = new BigNumber(tokens[pool.earnedToken].allowance[spender]);

    setWithdrawSettings(prevState => ({
      ...prevState,
      outputIndex,
      isZap,
      isSwap,
      swapInput,
      swapOutput,
      withdrawAddress: spender,
      isNeedApproval: isZap && allowance.isZero(),
    }))
  }

  const handleSliderChange = (_, sliderInt) => {
    setWithdrawSettings(prevState => ({
      ...prevState,
      slider: sliderInt,
    }));
  };

  const handleSliderChangeCommitted = (_, sliderInt) => {
    const total = sharesBalance.multipliedBy(pool.pricePerFullShare).dividedBy('1e18');
    let amount = new BigNumber(0);
    if (sliderInt > 0 && sliderInt < 99) {
      amount = total.times(sliderInt).div(100);
    }
    if (sliderInt >= 99) {
      amount = total;
      sliderInt = 100;
    }
    amount = amount.decimalPlaces(8);

    setWithdrawSettings(prevState => ({
      ...prevState,
      amount: amount,
      slider: sliderInt,
      input: amount.toFormat(),
    }));
  };

  const handleInputAmountChange = event => {
    const input = event.target.value.replace(/[,]+/, '').replace(/[^0-9\.]+/, '');
    let amount = new BigNumber(input);

    const total = sharesBalance.multipliedBy(pool.pricePerFullShare).dividedBy('1e18');
    if (amount.isNaN()) amount = new BigNumber(0);

    if (amount.isGreaterThan(total)) amount = total;
    amount = amount.decimalPlaces(8);

    const sliderInt = total.isZero() ? 0 : amount.times(100).dividedToIntegerBy(total).toNumber();

    setWithdrawSettings(prevState => ({
      ...prevState,
      amount: amount,
      slider: sliderInt,
      input: amount.isEqualTo(input) ? input : amount.toFormat(),
    }));
  };

  useEffect(() => {
    const allowance = new BigNumber(tokens[pool.earnedToken].allowance[withdrawSettings.withdrawAddress]);
    setWithdrawSettings(prevState => ({
      ...prevState,
      isNeedApproval: prevState.isZap && allowance.isZero(),
    }));
  }, [tokens[pool.earnedToken].allowance[withdrawSettings.withdrawAddress]]);

  const handleApproval = () => {
    fetchApproval({
      address,
      web3,
      tokenAddress: pool.earnedTokenAddress,
      contractAddress: pool.zap.zapAddress,
      tokenSymbol: pool.earnedToken,
    })
      .then(() => enqueueSnackbar(t('Vault-ApprovalSuccess'), { variant: 'success' }))
      .catch(error => enqueueSnackbar(t('Vault-ApprovalError', { error }), { variant: 'error' }));
  };

  const onWithdraw = isAll => {
    let sharesAmount;
    const sharesDecimals = 18;

    if (withdrawSettings.slider >= 99) {
      isAll = true;
    }

    if (isAll) {
      sharesAmount = sharesBalance.dividedBy('1e18');
      const amount = sharesAmount.multipliedBy(pool.pricePerFullShare).decimalPlaces(8);
      setWithdrawSettings(prevState => ({
        ...prevState,
        amount: amount,
        input: amount.toFormat(),
        slider: 100,
      }));
    } else {
      sharesAmount = withdrawSettings.amount
        .dividedBy(pool.pricePerFullShare);
    }

    if (withdrawSettings.isZap) {
      if (withdrawSettings.isSwap) {
        return alert('not implemented');
      } else {
        const zapWithdrawArgs = {
          address,
          web3,
          vaultAddress: pool.earnContractAddress,
          amount: convertAmountToRawNumber(sharesAmount, sharesDecimals),
          zapAddress: pool.zap.zapAddress,
        }
        fetchZapWithdrawAndRemoveLiqudity(zapWithdrawArgs)
          .then(() => {
            enqueueSnackbar(t('Vault-WithdrawSuccess'), { variant: 'success' })
            fetchBalances({ address, web3, tokens });
          })
          .catch(error => enqueueSnackbar(t('Vault-WithdrawError', { error }), { variant: 'error' }));
      }
    } else {
      const vaultWithdrawArgs = {
        address,
        web3,
        isAll,
        amount: convertAmountToRawNumber(sharesAmount, sharesDecimals),
        contractAddress: pool.earnContractAddress,
        index,
      }
      if (pool.tokenAddress) {
        fetchWithdraw(vaultWithdrawArgs)
          .then(() => {
            enqueueSnackbar(t('Vault-WithdrawSuccess'), { variant: 'success' })
            fetchBalances({ address, web3, tokens });
          })
          .catch(error => enqueueSnackbar(t('Vault-WithdrawError', { error }), { variant: 'error' }));
      } else {
        fetchWithdrawBnb(vaultWithdrawArgs)
          .then(() => {
            enqueueSnackbar(t('Vault-WithdrawSuccess'), { variant: 'success' })
            fetchBalances({ address, web3, tokens });
          })
          .catch(error => enqueueSnackbar(t('Vault-WithdrawError', { error }), { variant: 'error' }));
      }
    }

  };

  return (
    <Grid item xs={12} md={shouldHideFromHarvest(pool.name) ? 6 : 5} className={classes.sliderDetailContainer}>
      <div className={classes.showDetailLeft}>
        {t('Vault-Deposited')}:{' '}
        {byDecimals(
          sharesBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)),
          pool.tokenDecimals
        ).toFormat(8)}{' '}
        {pool.token}
      </div>
      <FormControl fullWidth variant="outlined">
        <CustomOutlinedInput
          fullWidth
          value={withdrawSettings.input}
          onChange={handleInputAmountChange}
          endAdornment={pool.zap && (
            <FormControl className={classes.zapFormControl}>
              <Select variant="standard" className={classes.zapSelect} value={withdrawSettings.outputIndex} onChange={handleOutputChange}>
                {withdrawOutputs.map((output, i) =>
                  <MenuItem key={i} value={i}>{output.symbol}</MenuItem>
                )}
              </Select>
            </FormControl>
          )}
        />
      </FormControl>
      <CustomSlider
        aria-labelledby="continuous-slider"
        value={withdrawSettings.slider}
        onChange={handleSliderChange}
        onChangeCommitted={handleSliderChangeCommitted}
      />
      <div className={classes.showDetailButtonCon}>
        {pool.status === 'refund' ? (
          <RefundButtons
            tokenAddress={pool.earnedTokenAddress}
            refundAddress={pool.refundContractAddress}
            index={index}
          />
        ) : (
          <div>
            {withdrawSettings.isNeedApproval ? (
              <div className={classes.showDetailButtonCon}>
                <Button
                  className={`${classes.showDetailButton} ${classes.showDetailButtonContained}`}
                  onClick={handleApproval}
                  disabled={fetchApprovalPending[pool.earnedToken]}
                >
                  {fetchApprovalPending[pool.earnedToken]
                    ? `${t('Vault-Approving')}`
                    : `${t('Vault-ApproveButton')}`}
                </Button>
              </div>
            ) : (
              <div className={classes.showDetailButtonCon}>
                <Button
                  className={`${classes.showDetailButton} ${classes.showDetailButtonOutlined}`}
                  type="button"
                  color="primary"
                  disabled={withdrawSettings.amount.isZero()}
                  onClick={() => onWithdraw(false)}
                >
                  {fetchWithdrawPending[index]
                    ? `${t('Vault-Withdrawing')}`
                    : `${t('Vault-WithdrawButton')}`}
                </Button>
                {!withdrawSettings.isSwap && (
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
                )}
              </div>
            )}
            <div className={classes.zapNote}>
              <span>Withdraw scenario:&nbsp;</span>
              {fetchZapEstimatePending[pool.tokenAddress] && <CircularProgress size={12} />}
              <ol>
                <li>Redeem {pool.earnedToken} receipts for {pool.token}</li>
                {withdrawSettings.isZap && (
                  <li>Remove liqudity from {pool.token} to receive {pool.assets.join(' and ')}</li>
                )}
                {withdrawSettings.isSwap && (
                  <li>Swap received {' '}
                    {convertAmountFromRawNumber(pool.swapEstimate.amountIn, withdrawSettings.swapInput.decimals).decimalPlaces(8, BigNumber.ROUND_DOWN).toFormat()} {' '}
                    {withdrawSettings.swapInput.symbol} {' '}
                    for {' '}
                    {convertAmountFromRawNumber(pool.swapEstimate.amountOut, withdrawSettings.swapOutput.decimals).decimalPlaces(8, BigNumber.ROUND_DOWN).toFormat()} {' '}
                    {withdrawSettings.swapOutput.symbol} {' '}
                    (&plusmn;1%) {' '}
                  </li>
                )}
              </ol>
            </div>
          </div>
        )}
      </div>
    </Grid >
  );
};

export default WithdrawSection;
