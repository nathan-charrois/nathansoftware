import { en, type EnKeys } from '@i18n/en'
import { ru, type RuKeys } from '@i18n/ru'

import { detectLanguage } from './languageDetection'

const translations = {
  en,
  ru,
} as const

type AllKeys = EnKeys | RuKeys

export function formatMessage(key: AllKeys): string {
  const currentLanguage = detectLanguage()
  const translation = translations[currentLanguage]

  if (!translation) {
    console.warn(`Translation not found for language: ${currentLanguage}`)
    return key
  }

  const message = translation[key as keyof typeof translation]

  if (!message) {
    console.warn(`Message not found for key: ${key} in language: ${currentLanguage}`)
    return key
  }

  return message
}
