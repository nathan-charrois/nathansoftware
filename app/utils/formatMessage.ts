import { en, type EnKeys } from '@i18n/en'

// For now, hardcoded to English
const currentLanguage = 'en'

const translations = {
  en,
} as const

export function formatMessage(key: EnKeys): string {
  const language = currentLanguage as keyof typeof translations
  const translation = translations[language]

  if (!translation) {
    console.warn(`Translation not found for language: ${language}`)
    return key
  }

  const message = translation[key]

  if (!message) {
    console.warn(`Message not found for key: ${key} in language: ${language}`)
    return key
  }

  return message
}
