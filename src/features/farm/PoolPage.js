import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { FarmPool } from './sections';

export default function PoolPage(props) {
  const history = useHistory();
  const [index] = useState(Number(props.match.params.index) - 1);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, [index]);
  return (
    <>
      <FarmPool {...props} />
    </>
  );
}
