import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// key - locale folder name/code (IETF BCP 47 language tag)
// value - language label
export const supportedLanguages = {
  ar: 'العربية',
  de: 'Deutsch',
  el: 'Ελληνικά',
  en: 'English',
  es: 'Español',
  fil: 'Filipino',
  fr: 'Français',
  hi: 'हिन्दी',
  id: 'Bahasa Indonesia',
  it: 'Italiano',
  ko: '한글',
  ms: 'Bahasa Melayu',
  nl: 'Nederlands',
  pl: 'Polski',
  'pt-BR': 'Português do Brasil',
  'pt-PT': 'Português de Portugal',
  ru: 'Pусский',
  se: 'Svenska',
  tr: 'Türkçe',
  uk: 'Українська',
  zh: '中文',
};

const resources = Object.fromEntries(
  Object.keys(supportedLanguages).map(code => [
    code,
    { translation: require(`./locales/${code}/translation.json`) },
  ])
);

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
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
