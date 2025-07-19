// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import commonEN from "./locales/en/common.json";
import privacyEN from "./locales/en/privacy.json";
import biosEN from "./locales/en/bios.json";
import articlesEN from "./locales/en/articles.json";

import commonIT from "./locales/it/common.json";
import privacyIT from "./locales/it/privacy.json";
import biosIT from "./locales/it/bios.json";
import articlesIT from "./locales/it/articles.json";

import commonFR from "./locales/fr/common.json";
import privacyFR from "./locales/fr/privacy.json";
import biosFR from "./locales/fr/bios.json";
import articlesFR from "./locales/fr/articles.json";

import commonES from "./locales/es/common.json";
import privacyES from "./locales/es/privacy.json";
import biosES from "./locales/es/bios.json";
import articlesES from "./locales/es/articles.json";

import musicFiltersEN from "./locales/en/musicFilters.json";
import musicFiltersES from "./locales/es/musicFilters.json";
import musicFiltersIT from "./locales/it/musicFilters.json";
import musicFiltersFR from "./locales/fr/musicFilters.json";

import artFiltersEN from "./locales/en/artFilters.json";
import artFiltersES from "./locales/es/artFilters.json";
import artFiltersIT from "./locales/it/artFilters.json";
import artFiltersFR from "./locales/fr/artFilters.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: "en",
    ns: ["common", "privacy", "bios", "articles", "musicFilters"],
    defaultNS: "common",
    resources: {
      en: {
        common: commonEN,
        privacy: privacyEN,
        bios: biosEN,
        articles: articlesEN,
        musicFilters: musicFiltersEN,
        artFilters: artFiltersEN,
      },
      it: {
        common: commonIT,
        privacy: privacyIT,
        bios: biosIT,
        articles: articlesIT,
        musicFilters: musicFiltersIT,
        artFilters: artFiltersIT,
      },
      fr: {
        common: commonFR,
        privacy: privacyFR,
        bios: biosFR,
        articles: articlesFR,
        musicFilters: musicFiltersFR,
        artFilters: artFiltersFR,
      },
      es: {
        common: commonES,
        privacy: privacyES,
        bios: biosES,
        articles: articlesES,
        musicFilters: musicFiltersES,
        artFilters: artFiltersES,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
