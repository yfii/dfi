import { useState, useEffect } from 'react';

const usePoolsTvl = pools => {
  const [poolsTvl, setPoolsTvl] = useState(0);

  useEffect(() => {
    let globalTvl = 0;

    pools.filter(p => p.status === 'active')
      .forEach(({ tvl, oraclePrice, fallbackPrice }) => {
        globalTvl += tvl * (oraclePrice || fallbackPrice);
      });

    setPoolsTvl(globalTvl);
  }, [pools]);

  return { poolsTvl };
};

export default usePoolsTvl;