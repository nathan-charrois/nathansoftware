import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'
import { formatMessage } from '@utils/formatMessage'
import { detectLanguage } from '@utils/languageDetection'

interface I18nContextType {
  formatMessage: typeof formatMessage
  currentLanguage: string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

interface I18nProviderProps {
  children: ReactNode
}

export function DietI18nProvider({ children }: I18nProviderProps) {
  const currentLanguage = detectLanguage()

  const value: I18nContextType = {
    formatMessage,
    currentLanguage,
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an DietI18nProvider')
  }
  return context
}
