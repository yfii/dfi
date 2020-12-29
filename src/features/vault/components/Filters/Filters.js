import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';

import styles from './styles';
import { platforms, assets } from './constants';

const useStyles = makeStyles(styles);

const Filters = ({
  toggleFilter,
  filters,
  platform,
  asset,
  order,
  setPlatform,
  setAsset,
  setOrder,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const handlePlatformChange = event => setPlatform(event.target.value);
  const handleAssetChange = event => setAsset(event.target.value);
  const handleOrderChange = event => setOrder(event.target.value);

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item xs={4} md={2}>
        <FormControl>
          <FormControlLabel
            className={classes.label}
            control={
              <Checkbox
                checked={filters.hideZeroBalances}
                onChange={() => toggleFilter('hideZeroBalances')}
                color="primary"
              />
            }
            // TODO: translate labels
            label={t('Hide-Zero-Balances')}
          />
        </FormControl>
      </Grid>

      <Grid item xs={4} md={2}>
        <FormControl>
          <FormControlLabel
            className={classes.label}
            control={
              <Checkbox
                checked={!filters.hideDecomissioned}
                onChange={() => toggleFilter('hideDecomissioned')}
                color="primary"
              />
            }
            // TODO: translate labels
            label={t('Retired-Vaults')}
          />
        </FormControl>
      </Grid>

      <Grid item xs={4} md={2}>
        <FormControl>
          <FormControlLabel
            className={classes.label}
            control={
              <Checkbox
                checked={filters.hideZeroVaultBalances}
                onChange={() => toggleFilter('hideZeroVaultBalances')}
                color="primary"
              />
            }
            // TODO: translate labels
            label={t('Hide-Zero-Vault-Balances')}
          />
        </FormControl>
      </Grid>

      <Grid item xs={4} md={2}>
        <FormControl className={classes.selectorContainer}>
          <InputLabel id="select-asset-label" className={classes.selectorLabel}>
            {t('Filters-Platform')}
          </InputLabel>
          <Select
            value={platform}
            onChange={handlePlatformChange}
            className={classes.selector}
            id="select-platform"
            labelId="select-platform-label"
          >
            <MenuItem key={'All'} value={'All'}>
              {t('Filters-All')}
            </MenuItem>
            {platforms.map(platform => (
              <MenuItem key={platform} value={platform}>
                {platform}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={4} md={2}>
        <FormControl className={classes.selectorContainer}>
          <InputLabel id="select-asset-label" className={classes.selectorLabel}>
            {t('Filters-Asset')}
          </InputLabel>
          <Select
            value={asset}
            onChange={handleAssetChange}
            className={classes.selector}
            id="select-asset"
            labelId="select-asset-label"
          >
            <MenuItem key={'All'} value={'All'}>
              {t('Filters-All')}
            </MenuItem>
            <MenuItem key={'Singles'} value={'Singles'}>
              {t('Single Assets')}
            </MenuItem>
            <MenuItem key={'StableLPs'} value={'StableLPs'}>
              {t('Stable LPs')}
            </MenuItem>
            <MenuItem key={'Stables'} value={'Stables'}>
              {t('Stables')}
            </MenuItem>
            {assets.map(asset => (
              <MenuItem key={asset} value={asset}>
                {asset}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={4} md={2}>
        <FormControl className={classes.selectorContainer}>
          <InputLabel id="select-order-label" className={classes.selectorLabel}>
            {t('Filters-Sort')}
          </InputLabel>
          <Select
            value={order}
            onChange={handleOrderChange}
            className={classes.selector}
            id="select-order"
            labelId="select-order-label"
          >
            <MenuItem value={'default'}>{t('Filters-Default')}</MenuItem>
            <MenuItem value={'apy'}>APY</MenuItem>
            <MenuItem value={'tvl'}>TVL</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Filters;
