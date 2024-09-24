import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enUS from './en-US';
import zhCN from './zh-CN';
import zhTW from './zh-TW';

i18n
  // Detect the user's current language
  // Documentation: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // Inject the react-i18next instance
  .use(initReactI18next)
  // Initialize i18next
  // Configuration parameters documentation: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'zhCN',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      enUS: {
        translation: enUS
      },
      zhCN: {
        translation: zhCN
      },
      zhTW: {
        translation: zhTW
      }
    },
  });

export default i18n;
