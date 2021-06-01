import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetchHalfTime, useFetchPoolData } from '../redux/hooks';
import {
  Grid,
  Typography,
  Avatar,
  makeStyles,
  Box,
  Accordion,
  AccordionDetails,
} from '@material-ui/core';
import Disclaimer from 'components/Disclaimer/Disclaimer';
import Button from 'components/CustomButtons/Button';
import styles from './styles/list';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useConnectWallet } from 'features/home/redux/hooks';
import { formatCountdown } from 'features/helpers/format';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

const useStyles = makeStyles(styles);

export default function StakePools(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { pools } = useFetchPoolData();
  const { networkId, address } = useConnectWallet();
  const { halfTime, fetchHalfTime } = useFetchHalfTime();
  const [time, setTime] = React.useState(new Date());

  useEffect(() => {
    const fetchEndPeriod = () => {
      for (const key in pools) {
        if (halfTime[key] === undefined || halfTime[key] === 0) {
          fetchHalfTime(key);
        }
      }
    };

    fetchEndPeriod();

    const id = setInterval(() => {
      fetchEndPeriod();
    }, 10000);
    return () => clearInterval(id);
  }, [address, halfTime, fetchHalfTime, pools]);

  const [expanded, setExpanded] = React.useState('faq-1');

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    const fetchCountdown = () => {
      setTime(new Date());
      let obj = {};
      for (const key in pools) {
        if (halfTime[key] === undefined) {
          pools[key].countdown = pools[key].status === 'closed' ? t('Finished') : '';
          continue;
        }

        if (halfTime[key] === '0') {
          obj = { status: 'soon', countdown: t('Coming-Soon') };
        } else {
          const deadline = halfTime[key] * 1000;
          const diff = deadline - time;

          obj =
            diff > 0
              ? { status: 'active', countdown: formatCountdown(deadline) }
              : { status: 'closed', countdown: t('Finished') };
        }

        if (!pools[key].hideCountdown === true) {
          pools[key].status = obj.status;
        }
        pools[key].countdown = obj.countdown;
      }
    };

    const id = setInterval(() => {
      fetchCountdown();
    }, 1000);
    return () => clearInterval(id);
  }, [halfTime, pools, t, time, address]);

  const [showPools, setShowActive] = React.useState('active');

  const handleShowPools = (event, value) => {
    setShowActive(value);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.launchpool}>
          <img alt="Launchpool" src={require('images/stake/launchpool.png')} />
        </div>
      </Grid>
      <Grid item xs={12} style={{ paddingBottom: '20px', textAlign: 'right' }}>
        <ToggleButtonGroup value={showPools} exclusive onChange={handleShowPools}>
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="active">Live</ToggleButton>
          <ToggleButton value="closed">Finished</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid container spacing={4} justify={'center'}>
        {pools.map((pool, index) => (
          <React.Fragment key={index}>
            {showPools === 'all' ||
            (showPools === 'active' && pools[index].status === showPools) ||
            (showPools === 'active' && pools[index].status === 'soon') ||
            (showPools === 'closed' && pools[index].status === showPools) ? (
              <Grid xs={12} sm={6} md={6} lg={3} key={index} item>
                <Grid
                  className={[
                    classes.item,
                    pools[index].status === 'closed'
                      ? classes.itemRetired
                      : pools[index].status === 'soon'
                      ? classes.itemSoon
                      : '',
                  ].join(' ')}
                >
                  {pool.partnership ? (
                    <Box className={classes.boosted}>
                      {t('Stake-BoostedBy', { name: pool.name })}
                    </Box>
                  ) : (
                    ''
                  )}
                  <Typography className={classes.title} variant="body2" gutterBottom>
                    Earn {pool.earnedToken}
                  </Typography>
                  <Avatar
                    src={require('images/' + pool.logo)}
                    alt={pool.earnedToken}
                    variant="square"
                    imgProps={{ style: { objectFit: 'contain' } }}
                  />

                  <Typography className={classes.countdown}>
                    {pools[index].hideCountdown ? '' : pools[index].countdown}
                  </Typography>

                  <Typography className={classes.subtitle} variant="body2">
                    {pool.token === 'mooAutoWbnbFixed' ? 'mooAutoWBNB' : pool.token}
                  </Typography>
                  <Button
                    xs={5}
                    md={2}
                    className={classes.stakeBtn}
                    href={`/stake/pool/${index + 1}`}
                  >
                    {pools[index].status === 'closed'
                      ? t('Stake-Button-Claim')
                      : t('Stake-Button-Stake')}
                  </Button>
                  {pools[index].status === 'closed' || pools[index].status === 'soon' ? (
                    <Box className={classes.ribbon}>
                      <span className={pools[index].status}>{pools[index].countdown}</span>
                    </Box>
                  ) : (
                    ''
                  )}
                </Grid>
              </Grid>
            ) : (
              ''
            )}
          </React.Fragment>
        ))}
      </Grid>
      <Grid container spacing={4} justify={'center'}>
        <Grid className={classes.faq} item xs={12} lg={9}>
          <Accordion square expanded={expanded === 'faq-1'} onChange={handleChange('faq-1')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How do I use Beefy Launchpool?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <img
                  alt="launchpool how to"
                  src={require('images/stake/f1.png')}
                  style={{ width: '100%', marginBottom: '20px' }}
                />
                Look for a boosted partner Vault in our main app and stake the tokens that are asked
                for in the vault. You will get a “receipt” called mooToken in your wallet. Proceed
                to the related partner Launchpool vault here on the Beefy Launchpool site and enter
                the corresponding vault (or press the shortcut on the main vault page called Boost).
                The vault will ask for you to stake yourmooToken “receipts''. Stake these mooTokens
                and you are all done, you can easily come back here and follow your earned partner
                tokens and withdraw at any time.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={expanded === 'faq-2'} onChange={handleChange('faq-2')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How do I see my earned tokens?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Enter the vault where you deposited your mooTokens and it will show you a nice
                summary of your earned tokens.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={expanded === 'faq-3'} onChange={handleChange('faq-3')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How long will the Boosted vault last?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Since we introduced multiple partner vaults at different times, there is a timer
                shown on each partner vault. This is nothing you really need to keep track of since
                you can always come back after a vault is finished and withdraw then.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={expanded === 'faq-4'} onChange={handleChange('faq-4')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                Do I have to manually unstake from the Launchpool vault when it’s finished?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes! Just come back after a partner vault is finished and you can unstake your
                deposited MooTokens together with the partner tokens, at any time.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={expanded === 'faq-5'} onChange={handleChange('faq-5')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Can I enter multiple Launchpool vaults at once?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Absolutely! Just deposit the required tokens in one or multiple of our boosted
                vaults, one by one, and then deposit your mooTokens (vault receipts) in the
                accompanied partner vaults. Repeat this step for every boosted partner vault you
                want to be a part of.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={expanded === 'faq-6'} onChange={handleChange('faq-6')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>I can’t see my deposited tokens in the Boosted vault!</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                No worries! Your deposit is safe and where it should be! Since you have deposited
                your mooTokens (vault receipts) in one of our partner vaults, the main boosted vault
                don’t see these receipts in your wallet, hence it shows you zero. As soon as you are
                finished with a partner vault, you withdraw your mooTokens (receipts) back to your
                wallet and your initial vault deposit will show up again.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={expanded === 'faq-7'} onChange={handleChange('faq-7')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>What are MooTokens?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Once you stake in any of Beefy Finance vaults, you get in return something called
                mooTokens. These are different depending on the vault you participate in, this can
                be called ‘mooBIFI’ or ‘mooAutoCake’. Basically, these are receipts for the funds
                you deposited. They have no value, they’re just a way to show that you have a
                certain amount of tokens deposited in that vault. When you want to withdraw, your
                mooTokens are exchanged back into the tokens you deposited + compound.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={expanded === 'faq-8'} onChange={handleChange('faq-8')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>What is mooBifi?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                mooBifi is the token you receive from depositing $BIFI into the Beefy Maxi vault.
                These mooTokens do not 1:1 represent the token amount initially deposited but it
                does represent the value of your share in the vault. The Beefy Maxi vault gathers a
                performance fee from every Beefy Vault when they are harvested, and uses it to buy
                more $BIFI and redeposit in the vault. The more profit the Beefy generates, the more
                $BIFI you'll own in the vault. Do NOT sell your mooTokens, or else you lose access
                to your deposit.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={expanded === 'faq-9'} onChange={handleChange('faq-9')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Are these partner vaults safe to use?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes! These partner vaults are hosted by Beefy and are completely safe. Beefy has
                gotten tokens from our partners and uses our own vaults for the reward. Those
                mooTokens your stake doesn’t leave Beefy.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={expanded === 'faq-10'} onChange={handleChange('faq-10')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                If I enter a partner vault with my mooTokens, will I still earn the ordinary vault
                reward?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes! The ordinary tokens you deposited in our main vaults even if it’s boosted will
                earn the ordinary reward and be compounded as usual. What you place in these partner
                vaults is your “receipt” from the ordinary vault that normally is worth nothing. By
                using these partner vaults, you earn both tokens on the ordinary vault and tokens
                from our partner vaults.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={expanded === 'faq-11'} onChange={handleChange('faq-11')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Why is APY and Daily rates not matching?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                That’s because APR and APY show two different things. APR means “Annual Percentage
                Rate” and is a fixed rate. Beefy shows APR by dividing the annual yield into 365
                days and presents that to you as “Daily”. APY on the other hand means “Annual
                percentage yield” which is when you take the daily yield and compound it. Beefy
                compounds your rewards automatically most of the time multiple times a day, this
                makes the APY much higher than a yearly APR would be.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={expanded === 'faq-12'} onChange={handleChange('faq-12')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How come the APY shown when deposited is not the same now?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                APY is the “Annual percentage yield” and is your daily yield compounded. The daily
                yield in turn is based on factors such as the yield rate and the total amount
                deposited that share this yield. When more people and in turn tokens enter the pool,
                the fixed yield is shared by more people (tokens) hence the daily yield will become
                lower and in turn, lower the APY. In the same way, if people (tokens) exit the
                vault, there are fewer people (tokens) sharing the fixed reward and the daily yield
                will increase and in turn, APY will increase.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={expanded === 'faq-13'} onChange={handleChange('faq-13')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Are the promoted project and its tokens safe?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                When partnering with a certain project, Beefy always tries to make an overall check
                of the project to get a sense of its sincerity and safety. Before adding vaults that
                are hosted by the partnering project, we also try to look for vulnerabilities in the
                code. Despite all this, we can never be 100% sure about a partner, hence it’s up to
                you to make sure that the partnering project is a project that you want to support.
                Beefy cannot, and will not take any responsibility for your personal actions.
              </Typography>
            </AccordionDetails>
          </Accordion>
          {networkId === 56 ? (
            <Accordion square expanded={expanded === 'faq-14'} onChange={handleChange('faq-14')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>How to earn free BNB indefinitely?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Buy our own token $BIFI, and stake it here in the BIFI Gov vault and you will earn
                  part of every harvest done on all our over 200 vaults, every day.
                </Typography>
              </AccordionDetails>
            </Accordion>
          ) : (
            ''
          )}
        </Grid>
        <Grid item xs={12}>
          <Disclaimer />
        </Grid>
      </Grid>
    </Grid>
  );
}

StakePools.defaultProps = {
  fromPage: 'page',
};
