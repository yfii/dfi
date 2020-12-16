import { useState, useEffect } from 'react';

const usePoolsTvl = pools => {
  const [poolsTvl, setPoolsTvl] = useState(0);

  useEffect(() => {
    let globalTvl = 0;

    const isUniqueEarnContract = ((pool, index, pools) => {
      const earnContractAddress = pool.earnContractAddress
      return pools.findIndex(p => p.earnContractAddress === earnContractAddress) === index
    });

    pools.filter(p => p.status === 'active')
      .filter(isUniqueEarnContract)
      .forEach(({ tvl, oraclePrice, fallbackPrice }) => {
        globalTvl += tvl * (oraclePrice || fallbackPrice);
      });

    setPoolsTvl(globalTvl);
  }, [pools]);

  return { poolsTvl };
};

export default usePoolsTvl;