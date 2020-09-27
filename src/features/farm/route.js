import { FarmPage, PoolPage } from './';

export default {
  path: 'farm',
  childRoutes: [
    { path: 'farm', component: FarmPage, isIndex: true },
    { path: 'pool/:index', component: PoolPage },
  ],
};
