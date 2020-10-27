import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BigNumber from 'bignumber.js';
import { byDecimals, calculateReallyNum, format } from 'features/helpers/bignumber';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionActions';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import CustomOutlinedInput from 'components/CustomOutlinedInput/CustomOutlinedInput';
import { primaryColor } from 'assets/jss/material-kit-pro-react.js';
import { useSnackbar } from 'notistack';
import { useConnectWallet } from '../../home/redux/hooks';

import { useFetchBalances, useFetchPoolBalances, useFetchApproval, useFetchDeposit, useFetchWithdraw, useFetchContractApy } from '../redux/hooks';

import Button from 'components/CustomButtons/Button.js';
import CustomSlider from 'components/CustomSlider/CustomSlider';
import sectionPoolsStyle from '../jss/sections/sectionPoolsStyle';
import { inputLimitPass, inputFinalVal } from 'features/helpers/utils';

const FETCH_INTERVAL_MS = 30 * 1000;

const useStyles = makeStyles(sectionPoolsStyle);

export default function SectionPools() {
  const { t } = useTranslation();
  const { web3, address } = useConnectWallet();
  let { pools, fetchPoolBalances } = useFetchPoolBalances();
  const { tokens, fetchBalances } = useFetchBalances();
  const [openedCardList, setOpenCardList] = useState([0]);
  const classes = useStyles();

  const { fetchApproval, fetchApprovalPending } = useFetchApproval();
  const { fetchDeposit, fetchDepositEth, fetchDepositPending } = useFetchDeposit();
  const { fetchWithdraw, fetchWithdrawBnb, fetchWithdrawPending } = useFetchWithdraw();
  const { contractApy, fetchContractApy } = useFetchContractApy();

  const [depositedBalance, setDepositedBalance] = useState({});
  const [withdrawAmount, setWithdrawAmount] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  const changeDetailInputValue = (type, index, total, tokenDecimals, event) => {
    let value = event.target.value;
    if (!inputLimitPass(value, tokenDecimals)) {
      return;
    }
    let sliderNum = 0;
    let inputVal = Number(value.replace(',', ''));
    if (value) {
      sliderNum = byDecimals(inputVal / total, 0).toFormat(2) * 100;
    }
    switch (type) {
      case 'depositedBalance':
        setDepositedBalance({
          ...depositedBalance,
          [index]: inputFinalVal(value, total, tokenDecimals),
          [`slider-${index}`]: sliderNum,
        });
        break;
      case 'withdrawAmount':
        setWithdrawAmount({
          ...withdrawAmount,
          [index]: inputFinalVal(value, total, tokenDecimals),
          [`slider-${index}`]: sliderNum,
        });
        break;
      default:
        break;
    }
  };

  const formatTvl = (tvl, oraclePrice, fallbackPrice) => {
    // TODO: bignum?
    tvl *= oraclePrice || fallbackPrice;

    const order = Math.floor(Math.log10(tvl) / 3);
    if (order < 0) {
      return '$0.00';
    }

    const units = ['', 'k', 'M', 'B', 'T'];
    const num = tvl / 1000 ** order;
    const prefix = oraclePrice === 0 ? '~$' : '$';

    return prefix + num.toFixed(2) + units[order];
  };

  const formatApy = (apy) => {
    if (apy) {
      return `${(apy * 100).toFixed(1)}%`;
    } else {
      return '- %';
    }
  }

  const calcDaily = (apy, hpy) => {
    if (!apy) { return '- %'; }
    
    const g = (Math.pow(10, Math.log10(apy + 1) / hpy)) - 1;
    if (isNaN(g)) { return '- %'; }
    
    return `${(g * 100).toFixed(2)}%`;
  }

  const handleDepositedBalance = (index, total, _, sliderNum) => {
    setDepositedBalance({
      ...depositedBalance,
      [index]: sliderNum === 0 ? 0 : calculateReallyNum(total, sliderNum),
      [`slider-${index}`]: sliderNum === 0 ? 0 : sliderNum,
    });
  };

  const handleWithdrawAmount = (index, total, _, sliderNum) => {
    setWithdrawAmount({
      ...withdrawAmount,
      [index]: sliderNum === 0 ? 0 : calculateReallyNum(total, sliderNum),
      [`slider-${index}`]: sliderNum === 0 ? 0 : sliderNum,
    });
  };

  const onApproval = (pool, index, event) => {
    event.stopPropagation();
    fetchApproval({
      address,
      web3,
      tokenAddress: pool.tokenAddress,
      contractAddress: pool.earnContractAddress,
      index,
    })
      .then(() => enqueueSnackbar(`Approval success`, { variant: 'success' }))
      .catch(error => enqueueSnackbar(`Approval error: ${error}`, { variant: 'error' }));
  };

  const onDeposit = (pool, index, isAll, balanceSingle, event) => {
    event.stopPropagation();

    if (pool.depositsPaused) {
      console.error('Deposits paused!');
      return;
    }

    if (isAll) {
      setDepositedBalance({
        ...depositedBalance,
        [index]: format(balanceSingle),
        [`slider-${index}`]: 100,
      });
    }

    let amountValue = depositedBalance[index] ? depositedBalance[index].replace(',', '') : depositedBalance[index];
    if (!pool.tokenAddress) {
      fetchDepositEth({
        address,
        web3,
        amount: new BigNumber(amountValue).multipliedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals)).toString(10),
        contractAddress: pool.earnContractAddress,
        index,
      })
        .then(() => enqueueSnackbar(`Deposit success`, { variant: 'success' }))
        .catch(error => enqueueSnackbar(`Deposit error: ${error}`, { variant: 'error' }));
    } else {
      fetchDeposit({
        address,
        web3,
        isAll,
        amount: new BigNumber(amountValue).multipliedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals)).toString(10),
        contractAddress: pool.earnContractAddress,
        index,
      })
        .then(() => enqueueSnackbar(`Deposit success`, { variant: 'success' }))
        .catch(error => enqueueSnackbar(`Deposit error: ${error}`, { variant: 'error' }));
    }
  };

  const onWithdraw = (pool, index, isAll, singleDepositedBalance, event) => {
    event.stopPropagation();

    if (isAll) {
      setWithdrawAmount({
        ...withdrawAmount,
        [index]: format(singleDepositedBalance),
        [`slider-${index}`]: 100,
      });
    }

    let amountValue = withdrawAmount[index] ? withdrawAmount[index].replace(',', '') : withdrawAmount[index];
    if (!pool.tokenAddress) {
      fetchWithdrawBnb({
        address,
        web3,
        isAll,
        amount: new BigNumber(amountValue).multipliedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals)).toString(10),
        contractAddress: pool.earnContractAddress,
        index,
      })
        .then(() => enqueueSnackbar(`Withdraw success`, { variant: 'success' }))
        .catch(error => enqueueSnackbar(`Withdraw error: ${error}`, { variant: 'error' }));
    } else {
      fetchWithdraw({
        address,
        web3,
        isAll,
        amount: new BigNumber(amountValue).multipliedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals)).toString(10),
        contractAddress: pool.earnContractAddress,
        index,
      })
        .then(() => enqueueSnackbar(`Withdraw success`, { variant: 'success' }))
        .catch(error => enqueueSnackbar(`Withdraw error: ${error}`, { variant: 'error' }));
    }
  };

  const openCard = id => {
    return setOpenCardList(openedCardList => {
      if (openedCardList.includes(id)) {
        return openedCardList.filter(item => item !== id);
      } else {
        return [...openedCardList, id];
      }
    });
  };

  useEffect(() => {
    if (address && web3) {
      fetchBalances({ address, web3, tokens });
      fetchPoolBalances({ address, web3, pools });
      const id = setInterval(() => {
        fetchBalances({ address, web3, tokens });
        fetchPoolBalances({ address, web3, pools });
      }, FETCH_INTERVAL_MS);
      return () => clearInterval(id);
    }

    // Adding tokens and pools to this dep list, causes an endless loop, DDoSing the api
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, web3, fetchBalances, fetchPoolBalances]);

  useEffect(() => {
    fetchContractApy();
  }, [pools, fetchContractApy]);

  useEffect(() => {
    fetchContractApy();
  }, [pools, fetchContractApy]);

  return (
    <Grid container style={{ paddingTop: '4px' }}>
      <Grid item xs={12}>
        <h1 className={classes.mainTitle}>{t('Vault-MainTitle')}</h1>
        <Grid item container justify="space-between">
          <Grid item>
            <h3 className={classes.secondTitle}>{t('Vault-SecondTitle')}</h3>
          </Grid>
          <Grid item>
            <h3 className={classes.secondTitle}>{t('Vault-WithdrawFee')}</h3>
          </Grid>
        </Grid>
      </Grid>

      {pools.map((pool, index) => {
        let balanceSingle = byDecimals(tokens[pool.token].tokenBalance, pool.tokenDecimals);
        let singleDepositedBalance = byDecimals(tokens[pool.earnedToken].tokenBalance, pool.tokenDecimals);
        let depositedApy = contractApy[pool.id] || 0;
        return (
          <Grid item xs={12} container key={index} style={{ marginBottom: '24px', border: '1px solid #DED9D5' }} spacing={0}>
            <div style={{ width: '100%' }}>
              <Accordion expanded={Boolean(openedCardList.includes(index))} className={classes.accordion} TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                  className={pool.depositsPaused ? classes.detailsPaused : classes.details}
                  style={{ justifyContent: 'space-between' }}
                  onClick={event => {
                    event.stopPropagation();
                    openCard(index);
                  }}
                >
                  <Grid container alignItems="center" justify="space-around" spacing={4} style={{ paddingTop: '16px', paddingBottom: '16px' }}>
                    <Grid item>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                          <Avatar alt={pool.name} variant="square" src={require(`../../../images/${pool.logo}.png`)} />
                        </Grid>
                        <Grid item style={{ minWidth: '100px' }}>
                          <Typography className={classes.iconContainerMainTitle} variant="body2" gutterBottom>
                            {pool.name}
                            <Hidden smUp>
                              <i
                                style={{
                                  color: primaryColor[0],
                                  marginLeft: '4px',
                                  visibility: Boolean(pool.tokenDescriptionUrl) ? 'visible' : 'hidden',
                                }}
                                className={'far fa-question-circle'}
                                onClick={event => {
                                  event.stopPropagation();
                                  window.open(pool.tokenDescriptionUrl);
                                }}
                              />
                            </Hidden>
                          </Typography>
                          <Typography className={classes.iconContainerSubTitle} variant="body2">
                            {pool.tokenDescription}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item md={7} xs={4}>
                      <Grid item container justify="space-between">
                        <Hidden smDown>
                          <Grid item xs={4} md={3} container justify="center" alignItems="center">
                            <Grid item style={{ width: '200px' }}>
                              <Typography className={classes.iconContainerMainTitle} variant="body2" gutterBottom noWrap>
                                {format(balanceSingle)} {pool.token}
                              </Typography>
                              <Typography className={classes.iconContainerSubTitle} variant="body2">
                                {t('Vault-Balance')}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Hidden>

                        <Hidden mdDown>
                          <Grid item xs={4} md={3} container justify="center" alignItems="center">
                            <Grid item style={{ width: '200px' }}>
                              <Typography className={classes.iconContainerMainTitle} variant="body2" gutterBottom noWrap>
                                {format(singleDepositedBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)))}
                              </Typography>
                              <Typography className={classes.iconContainerSubTitle} variant="body2">
                                {t('Vault-Deposited')}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Hidden>

                        <Grid item xs={5} md={2} container justify="center" alignItems="center">
                          <Grid item>
                            <Typography className={classes.iconContainerMainTitle} variant="body2" gutterBottom noWrap>
                              {formatApy(depositedApy)}
                            </Typography>
                            <Typography className={classes.iconContainerSubTitle} variant="body2">
                              {t('Vault-APY')}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid item xs={5} md={2} container justify="center" alignItems="center">
                          <Grid item>
                            <Typography className={classes.iconContainerMainTitle} variant="body2" gutterBottom noWrap>
                              {calcDaily(depositedApy, pool.hpy)}
                            </Typography>
                            <Typography className={classes.iconContainerSubTitle} variant="body2">
                              {t('Vault-APYDaily')}
                            </Typography>
                          </Grid>
                        </Grid>
                        
                        <Grid item xs={5} md={2} container justify="center" alignItems="center">
                          <Grid item>
                            <Typography className={classes.iconContainerMainTitle} variant="body2" gutterBottom noWrap>
                              {' '}
                              {formatTvl(pool.tvl, pool.oraclePrice, pool.fallbackPrice)}
                            </Typography>
                            <Typography className={classes.iconContainerSubTitle} variant="body2">
                              {t('Vault-TVL')}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Grid item container justify="flex-end" alignItems="center" spacing={2}>
                        <Hidden mdDown>
                          <Grid item>
                            <IconButton
                              classes={{
                                root: classes.iconContainerSecond,
                              }}
                              style={{
                                visibility: Boolean(pool.tokenDescriptionUrl) ? 'visible' : 'hidden',
                              }}
                              onClick={event => {
                                event.stopPropagation();
                                window.open(pool.tokenDescriptionUrl);
                              }}
                            >
                              <i className={'far fa-question-circle'} />
                            </IconButton>
                          </Grid>
                        </Hidden>
                        <Grid item>
                          <IconButton
                            className={classes.iconContainerPrimary}
                            onClick={event => {
                              event.stopPropagation();
                              openCard(index);
                            }}
                          >
                            {openedCardList.includes(index) ? <i className={'far fa-arrow-alt-circle-up'} /> : <i className={'far fa-arrow-alt-circle-down'} />}
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionSummary>

                <Divider variant="middle" className={classes.accordionDivider} />
                <AccordionDetails style={{ justifyContent: 'space-between' }}>
                  <Grid container>
                    <Grid item xs={12} sm={6} className={classes.sliderDetailContainer}>
                      <div className={classes.showDetailLeft}>
                        {t('Vault-Balance')}:{balanceSingle.toFormat(4)} {pool.token}
                      </div>
                      <FormControl fullWidth variant="outlined" className={classes.numericInput}>
                        <CustomOutlinedInput
                          value={depositedBalance[index] !== undefined ? depositedBalance[index] : '0'}
                          onChange={changeDetailInputValue.bind(this, 'depositedBalance', index, balanceSingle.toNumber(), pool.tokenDecimals)}
                        />
                      </FormControl>
                      <CustomSlider
                        aria-labelledby="continuous-slider"
                        value={depositedBalance['slider-' + index] ? depositedBalance['slider-' + index] : 0}
                        onChange={handleDepositedBalance.bind(this, index, balanceSingle.toNumber())}
                      />
                      <div>
                        {pool.allowance === 0 ? (
                          <div className={classes.showDetailButtonCon}>
                            <Button className={`${classes.showDetailButton} ${classes.showDetailButtonContained}`} onClick={onApproval.bind(this, pool, index)} disabled={pool.depositsPaused || fetchApprovalPending[index]}>
                              {fetchApprovalPending[index] ? `${t('Vault-Approving')}` : `${t('Vault-ApproveButton')}`}
                            </Button>
                          </div>
                        ) : (
                          <div className={classes.showDetailButtonCon}>
                            <Button
                              className={`${classes.showDetailButton} ${classes.showDetailButtonOutlined}`}
                              color="primary"
                              onFocus={event => event.stopPropagation()}
                              disabled={pool.depositsPaused || !Boolean(depositedBalance[index]) || fetchDepositPending[index] || new BigNumber(depositedBalance[index]).toNumber() > balanceSingle.toNumber()}
                              onClick={onDeposit.bind(this, pool, index, false, balanceSingle)}
                            >
                              {t('Vault-DepositButton')}
                            </Button>
                            {Boolean(pool.tokenAddress) && (
                              <Button
                                className={`${classes.showDetailButton} ${classes.showDetailButtonContained}`}
                                onFocus={event => event.stopPropagation()}
                                disabled={pool.depositsPaused || fetchDepositPending[index] || new BigNumber(depositedBalance[index]).toNumber() > balanceSingle.toNumber()}
                                onClick={onDeposit.bind(this, pool, index, true, balanceSingle)}
                              >
                                {t('Vault-DepositButtonAll')}
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.sliderDetailContainer}>
                      <div className={classes.showDetailLeft}>
                        {singleDepositedBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)).toFormat(4)} {pool.token} ({singleDepositedBalance.toFormat(4)} {pool.earnedToken})
                      </div>
                      <FormControl fullWidth variant="outlined">
                        <CustomOutlinedInput
                          value={withdrawAmount[index] !== undefined ? withdrawAmount[index] : '0'}
                          onChange={changeDetailInputValue.bind(this, 'withdrawAmount', index, singleDepositedBalance.toNumber(), pool.tokenDecimals)}
                        />
                      </FormControl>
                      <CustomSlider
                        aria-labelledby="continuous-slider"
                        value={withdrawAmount['slider-' + index] ? withdrawAmount['slider-' + index] : 0}
                        onChange={handleWithdrawAmount.bind(this, index, singleDepositedBalance.toNumber())}
                      />
                      <div className={classes.showDetailButtonCon}>
                        <Button
                          className={`${classes.showDetailButton} ${classes.showDetailButtonOutlined}`}
                          type="button"
                          color="primary"
                          disabled={fetchWithdrawPending[index] || !Boolean(withdrawAmount[index])}
                          onClick={onWithdraw.bind(this, pool, index, false, singleDepositedBalance)}
                        >
                          {fetchWithdrawPending[index] ? `${t('Vault-Withdrawing')}` : `${t('Vault-WithdrawButton')}`}
                        </Button>
                        <Button
                          className={`${classes.showDetailButton} ${classes.showDetailButtonOutlined}`}
                          type="button"
                          color="primary"
                          onClick={onWithdraw.bind(this, pool, index, true, singleDepositedBalance)}
                        >
                          {fetchWithdrawPending[index] ? `${t('Vault-Withdrawing')}` : `${t('Vault-WithdrawButtonAll')}`}
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
}
