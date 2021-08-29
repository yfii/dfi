// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { HomePage } from 'features/home';
import { PoolPage, StakePage } from 'features/stake';
import { VaultPage } from 'features/vault';

export default {
  path: 'common',
  indexRoute: { component: HomePage },
  childRoutes: [
    { path: '/#/stake', component: StakePage },
    { path: '/#/stake/pool/:id', component: PoolPage },
    { path: '/#/vault/:vaultId', component: VaultPage },
  ],
};
