import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { ru, en } from './index';

const i18nClient = i18n.use(LanguageDetector).init({
  load: 'all',
  whitelist: ['en', 'en-US', 'ru', 'ru-RU'],
  nonExplicitWhitelist: false,
  lngs: ['en-US', 'ru-RU'],
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false
  },
  react: {
    wait: true, // set to true if you like to wait for loaded in every translated hoc
    nsMode: 'default' // set it to fallback to let passed namespaces to translated hoc act as fallbacks
  },
  defaultNS: 'locale.en',
  resources: {
    en: {
      'locale.en': en
    },
    'en-US': {
      'locale.en': en
    },
    ru: {
      'locale.ru': ru
    },
    'ru-RU': {
      'locale.ru': ru
    }
  }
});

export default i18nClient;
