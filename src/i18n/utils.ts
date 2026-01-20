import { ui, defaultLang, type Lang, type TranslationKey } from "./ui";

/**
 * Extract language code from URL pathname
 * /en/about -> "en"
 * /es/services -> "es"
 */
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang && lang in ui) {
    return lang as Lang;
  }
  return defaultLang;
}

/**
 * Get translation function for a specific language
 * Usage: const t = useTranslations(lang); t("site.title")
 */
export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

/**
 * Get the pathname without the locale prefix
 * /en/about -> /about
 * /es/ -> /
 */
export function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] && segments[0] in ui) {
    segments.shift();
  }
  return "/" + segments.join("/") || "/";
}
