import { PoolPage, StakePage } from 'features/stake';
import { VaultPage } from 'features/vault';
import { App, HomePage } from '../features/home';

const routes = [
  {
    path: '/',
    component: App,
    childRoutes: [
      { path: '/', component: HomePage, isIndex: true },
      { path: '/stake', component: StakePage },
      { path: '/stake/pool/:id', component: PoolPage },
      { path: '/vault/:vaultId', component: VaultPage },
    ],
  },
];

export default routes;
