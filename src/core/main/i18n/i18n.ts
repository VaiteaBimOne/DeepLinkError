import LocaleService from 'core/main/services/LocaleService';
import i18n, { LanguageDetectorModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import main from './index';

const resources = {
  en: main.en,
  fr: main.fr,
};

const languageDetector: LanguageDetectorModule = {
  cacheUserLanguage: () => undefined,
  detect: LocaleService.detect,
  init: () => undefined,
  type: 'languageDetector',
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    keySeparator: '.',
    resources,
    returnObjects: true,
  });

export default i18n;
