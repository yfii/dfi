import { StakePage } from './';

export default {
  path: 'stake',
  childRoutes: [
    { path: '', component: StakePage, isIndex: true },
  ],
};
