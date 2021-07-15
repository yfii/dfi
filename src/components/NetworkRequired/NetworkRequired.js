import { useTranslation } from 'react-i18next';
import { useConnectWallet } from '../../features/home/redux/connectWallet';
import { getNetworkFriendlyName } from '../../features/helpers/getNetworkData';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import classnames from 'classnames';

const useStyles = makeStyles(styles);

export function NetworkRequired({ children, inline = false }) {
  const { t } = useTranslation();
  const { web3, address } = useConnectWallet();
  const classes = useStyles();
  const targetNetworkFriendlyName = getNetworkFriendlyName();

  if (!web3 || !address) {
    return (
      <div
        className={classnames({
          [classes.common]: true,
          [classes.inline]: inline,
          [classes.contained]: !inline,
        })}
      >
        {t('Network-ConnectionRequired', { network: targetNetworkFriendlyName })}
      </div>
    );
  }

  return children;
}
