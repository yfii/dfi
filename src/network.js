/* eslint-disable import/first */
import { networks } from 'components/NetworksProvider/NetworksProvider';

const location = window.location.pathname + window.location.hash;
const network = networks.find(n => location.startsWith(n.url));

if (!network) {
  window.location.assign(networks[0].url);
  window.location.reload();
} else {
  window.REACT_APP_NETWORK_ID = network.id;
}

export default network;
