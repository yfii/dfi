import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import styles from './styles';

const assets = ['ALL', 'CAKE', 'DRUGS', 'BTC', 'DOT', 'ETH', 'BURGER'];

const useStyles = makeStyles(styles);

const Filters = ({ toggleFilter, filters, setOrder, asset, order, setAsset }) => {
  const classes = useStyles();

  const handleAssetChange = event => setAsset(event.target.value);
  const handleOrderChange = event => setOrder(event.target.value);
  return (
    <Grid container spacing={0} className={classes.container}>
      <Grid item xs={8}>
        <FormControl>
          <FormGroup className={classes.miscFilters}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.hideZeroBalances.active}
                  onChange={() => toggleFilter('hideZeroBalances')}
                  color="primary"
                />
              }
              label="Hide Zero Balances"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.hideDecomissioned.active}
                  onChange={() => toggleFilter('hideDecomissioned')}
                  color="primary"
                />
              }
              label="Hide Inactive Vaults"
            />
          </FormGroup>
        </FormControl>
        <div>
          <FormControl>
            <FormGroup className={classes.platformFilters}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!filters.hideThugs.active}
                    onChange={() => toggleFilter('hideThugs')}
                    color="primary"
                  />
                }
                label="Thugs"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!filters.hidePancake.active}
                    onChange={() => toggleFilter('hidePancake')}
                    color="primary"
                  />
                }
                label="Pancake"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!filters.hideFortube.active}
                    onChange={() => toggleFilter('hideFortube')}
                    color="primary"
                  />
                }
                label="Fortube"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!filters.hideFry.active}
                    onChange={() => toggleFilter('hideFry')}
                    color="primary"
                  />
                }
                label="Fry"
              />
            </FormGroup>
          </FormControl>
        </div>
      </Grid>
      <Grid container item xs={4} className={classes.selectors}>
        <FormControl className={classes.selectorContainer}>
          <InputLabel id="select-asset-label" className={classes.selectorLabel}>
            Find by Asset
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
            Order by
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
