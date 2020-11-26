import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';

import styles from './styles';
import { platforms, assets } from "./constants";

const useStyles = makeStyles(styles);

const Filters = ({ toggleFilter, filters, platform, asset, order, setPlatform, setAsset, setOrder }) => {
  const classes = useStyles();

  const handlePlatformChange = event => setPlatform(event.target.value);
  const handleAssetChange = event => setAsset(event.target.value);
  const handleOrderChange = event => setOrder(event.target.value);

  return (
    <Grid container spacing={0} className={classes.container}>
      <Grid item>
        <FormControl>
          <FormGroup className={classes.miscFilters}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.hideZeroBalances}
                  onChange={() => toggleFilter('hideZeroBalances')}
                  color="primary"
                />
              }
              label="My Vaults"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!filters.hideDecomissioned}
                  onChange={() => toggleFilter('hideDecomissioned')}
                  color="primary"
                />
              }
              label="Retired Vaults"
            />
          </FormGroup>
        </FormControl>
      </Grid>

      <Grid item className={classes.selectors}>
        <FormControl className={classes.selectorContainer}>
          <InputLabel id="select-asset-label" className={classes.selectorLabel}>
            Filter by Platform
          </InputLabel>
          <Select
            value={platform}
            onChange={handlePlatformChange}
            className={classes.selector}
            id="select-platform"
            labelId="select-platform-label"
          >
            {platforms.map(platform => (
              <MenuItem key={platform} value={platform}>
                {platform}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.selectorContainer}>
          <InputLabel id="select-asset-label" className={classes.selectorLabel}>
            Filter by Asset
          </InputLabel>
          <Select
            value={asset}
            onChange={handleAssetChange}
            className={classes.selector}
            id="select-asset"
            labelId="select-asset-label"
          >
            {assets.map(asset => (
              <MenuItem key={asset} value={asset}>
                {asset}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.selectorContainer}>
          <InputLabel id="select-order-label" className={classes.selectorLabel}>
            Sort by
          </InputLabel>
          <Select
            value={order}
            onChange={handleOrderChange}
            className={classes.selector}
            id="select-order"
            labelId="select-order-label"
            margin="dense"
          >
            <MenuItem value={'default'}>Default</MenuItem>
            <MenuItem value={'apy'}>APY</MenuItem>
            <MenuItem value={'tvl'}>TVL</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Filters;
