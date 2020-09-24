import { StakePage, PoolPage } from './';

export default {
  path: 'stake',
  childRoutes: [
    { path: 'stake', component: StakePage, isIndex: true },
    { path: 'pool/:index', component: PoolPage },
  ],
};
