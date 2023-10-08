import en from '../i18n/en.json';
import fr from '../i18n/fr.json';
import resources from './resources';
declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: 'en';
    // custom resources type
    resources: resources;
    // other
  }
}
