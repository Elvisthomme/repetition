import i18n from 'i18next';
import I18NexFsBackend from 'i18next-fs-backend';
import { LanguageDetector } from 'i18next-http-middleware';

i18n
  .use(I18NexFsBackend)
  .use(LanguageDetector)
  .init({
    backend: {
      loadPath: __dirname + '/../i18n/{{lng}}.json',
    },
    fallbackLng: 'en',
    preload: ['en', 'fr'],
  });

export default i18n;
