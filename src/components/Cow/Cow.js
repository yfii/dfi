import React, { useState, useEffect } from 'react';

const Cow = ({ total, index }) => {
  const [dimensions, setDimensions] = useState(null);

  useEffect(() => {
    const r = 100 / total;
    const x = (index + Math.random() * 0.5) * r;
    const y = Math.ceil(Math.random() * 30) / 10 + 0.5;
    const w = Math.round(Math.random() * 5) + 2.25;
    const d = Math.random() < 0.5 ? -1 : 1;

    setDimensions({ x, y, w, d });
  }, [total, index]);

  if (!dimensions) return null;

  return (
    <img
      alt="cow"
      src={require('assets/img/beefy.svg')}
      style={{
        position: 'absolute',
        bottom: `${dimensions.y}rem`,
        left: `${dimensions.x}vw`,
        width: `${dimensions.w}rem`,
        transform: `scaleX(${dimensions.d})`,
        zIndex: `${Math.ceil(dimensions.y)}`,
      }}
    />
  );
};

export default Cow;
