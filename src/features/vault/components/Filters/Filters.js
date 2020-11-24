import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const assets = ['ALL', 'CAKE', 'DRUGS', 'BTC', 'DOT', 'ETH', 'BURGER'];

const Filters = ({ toggleFilter, setOrder, asset, order, setAsset }) => {
  const handleAssetChange = event => {
    setAsset(event.target.value);
  };

  const handleOrderChange = event => {
    setOrder(event.target.value);
  };

  return (
    <>
      <button onClick={() => toggleFilter('hideDecomissioned')}>Hide Inactive Pools</button>
      <button onClick={() => toggleFilter('hideZeroBalances')}>Hide Zero</button>

      <button onClick={() => toggleFilter('hidePancake')}>Hide Pancake</button>
      <button onClick={() => toggleFilter('hideFortube')}>Hide Fortube</button>
      <button onClick={() => toggleFilter('hideThugs')}>Hide Thugs</button>
      <button onClick={() => toggleFilter('hideFry')}>Hide Fries</button>

      <button onClick={() => setOrder('default')}>Default</button>
      <button onClick={() => setOrder('apy')}>APY</button>
      <button onClick={() => setOrder('tvl')}>TVL</button>

      <Select value={asset} onChange={handleAssetChange}>
        {assets.map(asset => (
          <MenuItem key={asset} value={asset}>
            {asset}
          </MenuItem>
        ))}
      </Select>

      <Select value={order} onChange={handleOrderChange}>
        <MenuItem value={'default'}>Default</MenuItem>
        <MenuItem value={'apy'}>APY</MenuItem>
        <MenuItem value={'tvl'}>TVL</MenuItem>
      </Select>
    </>
  );
};

export default Filters;
