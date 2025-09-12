import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { MantineProvider, mergeThemeOverrides } from '@mantine/core'
import { isSupportedLangauge } from '@shared/types/i18n'
import { russianOverrides, themeBaby, themeBase, themeMommy } from '@utils/theme'

import { detectLanguage } from '~/utils/languageDetection'

type ThemeName = 'baby' | 'mommy' | undefined

interface DietThemeContextType {
  theme: ThemeName
  setTheme: (theme: ThemeName) => void
}

const DietThemeContext = createContext<DietThemeContextType | null>(null)

const LOCAL_STORAGE_KEY = 'dietTheme'

const isTheme = (theme: unknown): theme is ThemeName => {
  return theme === 'baby' || theme === 'mommy'
}

export function DietThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>(undefined)

  const language = detectLanguage()

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const storedTheme = localStorage.getItem(LOCAL_STORAGE_KEY)

      if (isTheme(storedTheme)) {
        setTheme(storedTheme)
      }

      if (!storedTheme) {
        setTheme('baby')
      }
    }
  }, [])

  useEffect(() => {
    if (theme) {
      localStorage.setItem(LOCAL_STORAGE_KEY, theme)
    }
  }, [theme])

  const currentTheme = useMemo(() => {
    if (isSupportedLangauge(language) && language === 'ru') {
      return mergeThemeOverrides(
        themeBase,
        theme === 'baby' ? themeBaby : themeMommy,
        russianOverrides,
      )
    }

    return mergeThemeOverrides(
      themeBase,
      theme === 'baby' ? themeBaby : themeMommy,
    )
  }, [
    theme,
    language,
  ])

  return (
    <DietThemeContext.Provider value={{ theme, setTheme }}>
      <MantineProvider theme={currentTheme}>
        {children}
      </MantineProvider>
    </DietThemeContext.Provider>
  )
}

export function useDietTheme() {
  const ctx = useContext(DietThemeContext)
  if (!ctx) throw new Error('useDietTheme must be used inside DietThemeProvider')
  return ctx
}
