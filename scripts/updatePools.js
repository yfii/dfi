// To run: node --experimental-specifier-resolution=node updatePools.js 

import { pools } from '../src/features/configure/pools.js';
import { fetchStrategy } from '../src/features/web3/fetchStrategy.js';
import Web3 from 'web3';
import axios from 'axios';
import fs from 'fs';

async function main() {
   const web3 = new Web3('https://bsc-dataseed.nariox.org');
   let arr = [];

   for (let i=0; i < pools.length; i++){

        let contractAddress = pools[i].earnContractAddress;

        let strat = await fetchStrategy({web3, contractAddress: contractAddress});
        pools[i].strategyAddress = strat
        
        if (!pools[i].creationBlock) {
            let response = await axios.get(`https://api.bscscan.com/api?module=account&action=txlist&address=${contractAddress}&startblock=0&sort=asc&page=1&offset=1`).then() 
            pools[i].creationBlock = response.data["result"][0]["blockNumber"];
        }
        console.log(pools[i])
        arr.push(pools[i]);
    }

    const payload = `export const pools = ${JSON.stringify((arr),null,2)};`

    fs.writeFile('../src/features/configure/pools.js', payload, function (err) {
        if (err) return console.log(err);
    });


}
main().catch(e => console.error(e.stack));
