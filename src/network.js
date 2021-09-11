/* eslint-disable import/first */
import { networks } from 'components/NetworksProvider/NetworksProvider';

const network = networks.find(n => window.location.hash.startsWith('#' + n.hash));

if (!network) {
  window.location.hash = networks[0].hash;
  window.location.reload();
} else {
  window.REACT_APP_NETWORK_ID = network.id;
}

export default network;
