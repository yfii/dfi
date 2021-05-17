import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles(styles);

export default () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <a href="/" className={classes.link}>
      <i className={`fas fa-chevron-left ${classes.linkIcon}`} />
      {t('Vaults-Back')}
    </a>
  );
};
