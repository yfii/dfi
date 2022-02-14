import axios from 'axios';
import Web3 from 'web3';
import { chainPools, chainRpcs } from './config.js';

const explorerApiUrls = {
  cronos: 'https://api.cronoscan.com/api',
  bsc: 'https://api.bscscan.com/api',
  polygon: 'https://api.polygonscan.com/api',
  fantom: 'https://api.ftmscan.com/api',
  heco: 'https://api.hecoinfo.com/api',
  avax: 'https://api.snowtrace.io//api',
  heco: 'https://api.hecoinfo.com/api',
  moonbeam: 'https://api-moonbeam.moonscan.io/api',
  celo: 'https://explorer.celo.org/',
  moonriver: 'https://api-moonriver.moonscan.io/api',
  arbitrum: 'https://api.arbiscan.io/api',
  aurora: 'https://explorer.mainnet.aurora.dev/',
  metis: 'https://andromeda-explorer.metis.io/',
  // one: "https://explorer.harmony.one/",
  fuse: 'https://explorer.fuse.io/',
};

const blockScoutChainsTimeout = new Set(['fuse', 'aurora', 'metis', 'celo']);

const getCreationTimestamp = async (vaultAddress, explorerUrl) => {
  var url =
    explorerUrl +
    `?module=account&action=txlist&address=${vaultAddress}&startblock=1&endblock=99999999&page=1&offset=1&sort=asc&limit=1`;
  const resp = await axios.get(url);

  const block = resp.data.result[0].blockNumber;
  const timestamp = resp.data.result[0].timeStamp;

  console.log(`Creation block: ${block} - timestamp: ${timestamp}`);
  return timestamp;
};

const getCreationTimestampBlockScoutScraping = async (vaultAddress, explorerUrl, chain) => {
  var url = explorerUrl + `/address/${vaultAddress}`;

  let resp = await axios.get(url);

  let tx = resp.data.split(`<a data-test="transaction_hash_link" href="/`)[1].split(`"`)[0];

  let txResp = await axios.get(`${explorerUrl}/${tx}/internal-transactions`);

  let block = txResp.data.split(`<a class="transaction__link" href="/block/`)[1].split(`"`)[0];

  const rpc = chainRpcs[chain];
  let web3 = new Web3(rpc);
  let timestamp = (await web3.eth.getBlock(block)).timestamp;

  console.log(`Creation block: ${block} - timestamp: ${timestamp}`);
  return timestamp;
};

const getTimestamp = async (vaultAddress, chain) => {
  if (blockScoutChainsTimeout.has(chain)) {
    console.log('BlockScout explorer detected for this chain, proceeding to scrape');
    return await getCreationTimestampBlockScoutScraping(
      vaultAddress,
      explorerApiUrls[chain],
      chain
    );
  } else {
    return await getCreationTimestamp(vaultAddress, explorerApiUrls[chain]);
  }
};

const getPoolDate = async () => {
  const poolId = process.argv[2];
  var chain = process.argv[3];

  let pool;
  try {
    pool = chainPools[chain].filter(p => p.id === poolId)[0];
  } catch (err) {
    return console.log(`${poolId} not found in pools for chain ${chain}`);
  }
  let address = pool.earnContractAddress;

  let explorer = explorerApiUrls[chain];
  if (!explorer) return console.log(`No explorer api url found for chain ${chain}`);

  let ts = await getTimestamp(address, chain);
  console.log(ts);
};

getPoolDate();
