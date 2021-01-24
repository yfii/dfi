import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';

const useStyles = makeStyles(styles);

const Footer = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <div className={classes.column}>
        <div className={classes.title}>beefy.finance</div>
        <a
          href="https://docs.beefy.finance"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fas fa-book ${classes.linkIcon}`}></i>
          <span>docs</span>
        </a>

        <a
          href="https://medium.com/beefyfinance"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fab fa-medium ${classes.linkIcon}`}></i>
          <span>{t('news')}</span>
        </a>

        <a
          href="https://github.com/beefyfinance"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fab fa-github ${classes.linkIcon}`}></i>
          <span>{t('source')}</span>
        </a>
      </div>

      <div className={classes.column}>
        <div className={classes.title}>{t('products')}</div>
        <a
          href="https://gov.beefy.finance"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fas fa-landmark ${classes.linkIcon}`}></i>
          <span>gov</span>
        </a>

        <a
          href="https://vote.beefy.finance"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fas fa-vote-yea ${classes.linkIcon}`}></i>
          <span>vote</span>
        </a>

        <a
          href="https://app.beefy.finance"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fas fa-hand-holding-usd ${classes.linkIcon}`}></i>
          <span>app</span>
        </a>
      </div>

      <div className={classes.column}>
        <div className={classes.title}>{t('socials')}</div>
        <a
          href="https://twitter.com/beefyfinance"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fab fa-twitter ${classes.linkIcon}`}></i>

          <span>twitter</span>
        </a>
        <a
          href="https://t.me/beefyfinance"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fab fa-telegram ${classes.linkIcon}`}></i>

          <span>telegram</span>
        </a>
        <a
          href="https://discord.gg/9xfMvJY"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fab fa-discord ${classes.linkIcon}`}></i>
          <span>discord</span>
        </a>
      </div>
    </div>
  );
};

export default memo(Footer);
