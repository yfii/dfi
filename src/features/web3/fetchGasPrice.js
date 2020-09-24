import axios from 'axios';

export const fetchGasPrice = async () => {
  try {
    const url = 'https://www.gasnow.org/api/v3/gas/price?utm_source=dfi.money';
    // const url = 'https://gasprice.poa.network/'
    const { data } = await axios.get(url);
    // console.log(data.fast.toFixed(0));
    // return data.fast.toFixed(0).toString() || '70';
    // console.log(data.data.fast.toString())
    return data.data.fast.toString() || '70';
  } catch(error) {
    // console.log(error)
    return '70';
  }
}