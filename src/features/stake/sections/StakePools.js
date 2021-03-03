import React,{ useEffect } from 'react';
import BigNumber from 'bignumber.js'
import { useTranslation } from 'react-i18next';
import { useFetchPoolsInfo } from '../redux/hooks';
import {Grid, Typography, Avatar, makeStyles, Box, Link, Accordion, AccordionDetails} from "@material-ui/core";
import Disclaimer from '../../../components/Disclaimer/Disclaimer';
import Button from "../../../components/CustomButtons/Button";
import styles from './styles/list';
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(styles);

export default function StakePools(props) {
    const { fromPage } = props;
    const classes = useStyles();
    const {t} = useTranslation();
    const { pools, poolsInfo, fetchPoolsInfo } = useFetchPoolsInfo();

    useEffect(() => {
        fetchPoolsInfo();
    }, [fetchPoolsInfo]);

    const [expanded, setExpanded] = React.useState('faq-1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <div className={classes.launchpool}>
                    <img alt="Launchpool" src={require('../../../images/stake/launchpool.png')} />
                </div>
            </Grid>
            <Grid container spacing={4} justify={'center'}>
                {pools.map((pool, index) => (
                    <Grid xs={12} sm={6} md={6} lg={3} key={index} item>
                        <Grid className={[classes.item, poolsInfo[index].status === 'closed' ? classes.itemRetired : ''].join(' ')}>
                            {pool.partnership ? (
                                <Box className={classes.boosted}>Boosted by {pool.name}</Box>
                            ) : ''}
                            <Typography className={classes.title} variant='body2' gutterBottom>Earn {pool.earnedToken}</Typography>
                            <Avatar src={require('../../../images/' + pool.logo)} alt={pool.earnedToken} variant='square' imgProps={{ style: { objectFit: 'contain' } }}/>
                            <Typography className={classes.countdown}>{poolsInfo[index].status === 'closed' ? 'FINISHED' : ('')}</Typography>
                            <Typography className={classes.subtitle} variant='body2'>{pool.token}</Typography>
                            <Button xs={5} md={2} className={classes.stakeBtn} href={`/stake/pool/${index + 1}`}>
                                {poolsInfo[index].status === 'closed' ? t('Stake-Button-Claim') : t('Stake-Button-Stake')}
                            </Button>
                            {poolsInfo[index].status === 'closed' ? (
                                <Box className={classes.ribbon}><span>FINISHED</span></Box>
                            ) : ''}
                        </Grid>
                    </Grid>
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
                                <img alt="launchpool how to" src={require('../../../images/stake/f1.png')} style={{width: '100%', marginBottom: '20px'}} />
                                Look for a boosted partner Vault in our main app and stake the tokens that are asked for in the vault. You will get a “receipt” called mooToken in your wallet. Proceed to the related partner Launchpool vault here on the Beefy Launchpool site and enter the corresponding vault (or press the shortcut on the main vault page called Boost). The vault will ask for you to stake yourmooToken “receipts''. Stake these mooTokens and you are all done, you can easily come back here and follow your earned partner tokens and withdraw at any time.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion square expanded={expanded === 'faq-2'} onChange={handleChange('faq-2')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>How do I see my earned tokens?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Enter the vault where you deposited your mooTokens and it will show you a nice summary of your earned tokens.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion square expanded={expanded === 'faq-3'} onChange={handleChange('faq-3')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>How long will the Boosted vault last?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Since we introduced multiple partner vaults at different times, there is a timer shown on each partner vault. This is nothing you really need to keep track of, since you can always come back after a vault is finished and withdraw then.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion square expanded={expanded === 'faq-4'} onChange={handleChange('faq-4')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Do I have to manually unstake from the Launchpool vault when it’s finished?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Yes! Just come back after a partner vault is finished and you can unstake your deposited MooTokens together with the partner tokens, at any time.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion square expanded={expanded === 'faq-5'} onChange={handleChange('faq-5')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Can I enter multiple Launchpool vaults at once?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Absolutely! Just deposit the required tokens in one or multiple of our boosted vaults, one by one, and then deposit your mooTokens (vault receipts) in the accompanied partner vaults. Repeat this step for every boosted partner vault you want to be a part of.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion square expanded={expanded === 'faq-6'} onChange={handleChange('faq-6')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>I can’t see my deposited tokens in the Boosted vault!</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                No worries! Your deposit is safe and where it should be! Since you have deposited your mooTokens (vault receipts) in one of our partner vaults, the main boosted vault don’t see these receipts in your wallet, hence it shows you zero. As soon as you are finished with a partner vault, you withdraw your mooTokens (receipts) back to your wallet and your initial vault deposit will show up again.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion square expanded={expanded === 'faq-7'} onChange={handleChange('faq-7')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>What are MooTokens?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Once you stake in any of Beefy Finance vaults, you get in return something called mooTokens. These are different depending on the vault you participate in, this can be called ‘mooBIFI’ or ‘mooAutoCake’. Basically these are receipts for the funds you deposited. They have no value, they’re just a way to show that you have a certain amount of tokens deposited in that vault. When you want to withdraw, your mooTokens are exchanged back into the tokens you deposited + compound.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12}>
                    <Disclaimer />
                </Grid>
            </Grid>
        </Grid>
    )
}

StakePools.defaultProps = {
    fromPage:'page',
}