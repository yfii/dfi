import Notify from "bnc-notify";

const notify = Notify({
  dappId: process.env.NOTIFY_ID,       // [String] The API key created by step one above
  networkId: Number(process.env.NETWORK_ID)  // [Integer] The Ethereum network ID your Dapp uses.
});

export default notify;