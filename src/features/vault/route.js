import { VaultPage } from './';

export default {
  path: 'vault',
  childRoutes: [
    { path: '', component: VaultPage, isIndex: true },
  ],
};
