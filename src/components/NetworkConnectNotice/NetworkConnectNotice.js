import React, { useCallback, useMemo, useState } from 'react';
import Button from '@material-ui/core/Button';
import { networkSettings, networkSetup } from 'common/networkSetup';
import { getNetworkAppUrl, getNetworkFriendlyName } from 'features/helpers/getNetworkData';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(styles);
const targetNetworkId = Number(process.env.REACT_APP_NETWORK_ID);

export function NetworkConnectNotice({
  web3,
  address,
  networkId,
  connectWallet,
  disconnectWallet,
}) {
  const [networkSetupError, setNetworkSetupError] = useState(null);
  const { t } = useTranslation();
  const haveConnection = !!web3;
  const haveAddress = !!address;
  const isCorrectNetwork = networkId === targetNetworkId;
  const isSupportedNetwork = networkId && networkId in networkSettings;
  const targetNetworkFriendlyName = getNetworkFriendlyName();
  const classes = useStyles();
  let notice = null;

  const targetNetworkSetup = useCallback(() => {
    setNetworkSetupError(null);

    networkSetup(targetNetworkId)
      .then(() => {
        setNetworkSetupError(null);
      })
      .catch(e => {
        if (typeof e === 'object' && typeof e.message === 'string') {
          setNetworkSetupError(e.message);
        } else if (typeof e === 'string') {
          setNetworkSetupError(e);
        } else {
          setNetworkSetupError(t('Network-UnknownError'));
        }
      });
  }, [setNetworkSetupError, t]);

  const supportedNetwork = useMemo(() => {
    return isSupportedNetwork
      ? {
          id: networkId,
          app: getNetworkAppUrl(networkId),
          name: getNetworkFriendlyName(networkId),
        }
      : null;
  }, [isSupportedNetwork, networkId]);

  if (!haveConnection) {
    notice = (
      <>
        <div className={classes.message}>
          {t('Network-ConnectionRequired', { network: targetNetworkFriendlyName })}
        </div>
        <div className={classes.actions}>
          <Button onClick={connectWallet} className={classes.button}>
            {t('Network-ConnectWallet')}
          </Button>
        </div>
      </>
    );
  } else if (!isCorrectNetwork) {
    notice = (
      <>
        <div className={classes.message}>
          {t('Network-Supports', { network: targetNetworkFriendlyName })}{' '}
          {isSupportedNetwork
            ? t('Network-ConnectedTo', { network: supportedNetwork.name })
            : t('Network-ConnectedUnsupported')}
        </div>
        <div className={classes.actions}>
          <Button onClick={targetNetworkSetup} className={classes.button}>
            {t('Network-SwitchToNetwork', { network: targetNetworkFriendlyName })}
          </Button>
          {isSupportedNetwork ? (
            <Button href={supportedNetwork.app} className={classes.button}>
              {t('Network-GoToApp', { network: supportedNetwork.name })}
            </Button>
          ) : null}
          <Button onClick={disconnectWallet} className={classes.button}>
            {t('Network-DisconnectWallet')}
          </Button>
        </div>
        <div className={classes.note}>{t('Network-SwitchNote')}</div>
        {networkSetupError ? <div className={classes.error}>{networkSetupError}</div> : ''}
      </>
    );
  } else if (!haveAddress) {
    notice = (
      <>
        <div className={classes.message}>
          {t('Network-ConnectedTo', { network: targetNetworkFriendlyName })}
        </div>
        <div className={classes.error}>{t('Network-NoWalletAddress')}</div>
      </>
    );
  }

  return notice ? <div className={classes.notice}>{notice}</div> : null;
}
