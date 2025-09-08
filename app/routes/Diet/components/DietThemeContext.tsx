import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { MantineProvider, mergeThemeOverrides } from '@mantine/core'
import { themeBaby, themeBase, themeMommy } from '@utils/theme'

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

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const storedTheme = localStorage.getItem(LOCAL_STORAGE_KEY)

      if (isTheme(storedTheme)) {
        setTheme(storedTheme)
      }
    }
  }, [])

  useEffect(() => {
    if (theme) {
      localStorage.setItem(LOCAL_STORAGE_KEY, theme)
    }
  }, [theme])

  const currentTheme = useMemo(() =>
    mergeThemeOverrides(
      themeBase,
      theme === 'baby' ? themeBaby : themeMommy,
    ), [
    theme,
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
