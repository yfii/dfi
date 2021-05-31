import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { getNetworkFriendlyName } from '../helpers/getNetworkData';

const translate = (data, key, t) => t(key, data);
const appendTitle = str => str + APPEND_TITLE;
const translateAppendTitle = (data, key, t) => appendTitle(translate(data, key, t));

// Appended to title and og:title
const APPEND_TITLE = ' | Beefy Finance';

// Defined here to avoid adding an entry to translation.json where not needed
const PAGE_META = {
  'App-Meta-Title': ({ networkName }) => appendTitle(`${networkName}`),
  'Vault-Meta-Title': ({ vaultName, vaultDescription, networkName }) =>
    appendTitle(`${vaultName} - ${vaultDescription} - ${networkName}`),
  'App-Meta-Description': translate,
  'Stakes-Meta-Title': translateAppendTitle,
  'Stake-Meta-Title': translateAppendTitle,
};

function getPageMeta(t, key, data = {}) {
  const networkName = getNetworkFriendlyName();

  // add common data
  data = { networkName, ...data };

  // handle meta defined above
  if (PAGE_META.hasOwnProperty(key)) {
    return PAGE_META[key](data, key, t);
  }

  // fallback to translation
  return t(key, data);
}

export function usePageMeta() {
  const { t } = useTranslation();

  return {
    getPageMeta: useCallback((key, data) => getPageMeta(t, key, data), [t]),
  };
}
