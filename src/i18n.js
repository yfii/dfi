
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationZH from './locales/zh/translation.json';
import translationJA from './locales/ja/translation.json';
import translationTH from './locales/th/translation.json';
import translationKO from './locales/ko/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  zh: {
    translation: translationZH
  },
  ja: {
    translation: translationJA
  },
  th: {
    translation: translationTH
  },
  ko: {
    translation: translationKO
  }
};

i18n
  // load translation using http -> see /public/locales
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'zh',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;