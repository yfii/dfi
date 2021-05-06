import { VaultPage } from './';

export default {
  path: 'vault',
  childRoutes: [{ path: ':vaultId', component: VaultPage, isIndex: true }],
};
