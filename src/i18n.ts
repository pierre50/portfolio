import { createI18n } from "vue-i18n";

// Type pour les messages : chaque locale contient un objet clé/valeur
type Messages = Record<string, Record<string, any>>;

function loadLocaleMessages(): Messages {
  const messages: Messages = {};

  const modules = import.meta.glob("./locales/*.json", {
    eager: true,
  }) as Record<string, { default: Record<string, any> }>;

  for (const path in modules) {
    const matched = path.match(/\/([A-Za-z0-9-_]+)\.json$/i);
    if (matched && matched[1]) {
      const locale = matched[1];
      const module = modules[path];
      if (module && module.default) {
        messages[locale] = module.default;
      }
    }
  }

  return messages;
}

const browserLang = (navigator.language || "en").split("-")[0]; // "fr", "en", etc.
const locale = browserLang === "fr" ? "fr" : "en";

export default createI18n({
  legacy: false,
  locale: import.meta.env.VITE_I18N_LOCALE || locale,
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || "en",
  globalInjection: true,
  messages: loadLocaleMessages(),
});
