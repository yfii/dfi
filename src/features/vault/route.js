import { VaultPage } from './';

export default {
  path: 'vault',
  childRoutes: [
    { path: 'vault', component: VaultPage, isIndex: true },
  ],
};
