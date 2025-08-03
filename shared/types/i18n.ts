export type SupportedLanguage = 'en' | 'ru'

export const LANGUAGE_STORAGE_KEY = 'baby-diet-language'

export const isSupportedLangauge = (
  language: unknown,
): language is SupportedLanguage => {
  return language === 'en' || language === 'ru'
}
