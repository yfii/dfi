import { LiquidityPoolPage } from '.';

export default {
  path: 'lp',
  childRoutes: [
    { path: 'index', component: LiquidityPoolPage, isIndex: true },
  ],
};
