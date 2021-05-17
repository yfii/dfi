import BigNumber from 'bignumber.js';
import { useState, useEffect } from 'react';
import { byDecimals } from '../../helpers/bignumber';

const usePoolsTvl = pools => {
  const [poolsTvl, setPoolsTvl] = useState(0);

  useEffect(() => {
    let globalTvl = 0;

    pools
      .filter(p => p.status === 'active')
      .filter(isUniqueEarnContract)
      .forEach(({ tvl, oraclePrice }) => {
        globalTvl += tvl * oraclePrice;
      });

    setPoolsTvl(globalTvl);
  }, [pools]);

  return { poolsTvl };
};

const useUserTvl = (pools, tokens) => {
  const [userTvl, setUserTvl] = useState(0);

  useEffect(() => {
    let userTvl = 0;

    pools.filter(isUniqueEarnContract).forEach(pool => {
      const sharesBalance = new BigNumber(tokens[pool.earnedToken].tokenBalance);
      if (sharesBalance > 0) {
        const deposited = byDecimals(
          sharesBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)),
          pool.tokenDecimals
        );
        userTvl += deposited * pool.oraclePrice;
      }
    });

    setUserTvl(userTvl);
  }, [pools, tokens]);

  return { userTvl };
};

const isUniqueEarnContract = (pool, index, pools) => {
  const earnContractAddress = pool.earnContractAddress;
  return pools.findIndex(p => p.earnContractAddress === earnContractAddress) === index;
};

export { usePoolsTvl, useUserTvl };
