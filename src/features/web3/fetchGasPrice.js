import axios from 'axios';

export const fetchGasPrice = async () => {
  try {
    // const url = 'https://www.gasnow.org/api/v1/gas/price';
    const url = 'https://gasprice.poa.network/'
    const { data } = await axios.get(url);
    // console.log(data.fast.toFixed(0));
    return data.fast.toFixed(0).toString() || '70';
  } catch(error) {
    console.log(error)
    return '70';
  }
}