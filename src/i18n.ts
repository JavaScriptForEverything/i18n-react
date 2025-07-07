import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./i18n/en.json";
import es from "./i18n/es.json";

i18n
  .use(LanguageDetector) // auto-detect user's language
  .use(initReactI18next) // pass i18n instance to react-i18next
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: "en", // use English if detection fails
    interpolation: {
      escapeValue: false, // react already escapes
      format: (value, format) => {
        if (format === "datetime" && value instanceof Date) {
          return value.toLocaleDateString(i18n.language, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        }
        return value;
      },
    },
    detection: {
      order: ["localStorage", "navigator"], // check localStorage, then browser language
      caches: ["localStorage"], // store selected language
    },
  });

export default i18n;
