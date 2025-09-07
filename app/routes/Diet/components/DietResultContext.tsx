import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { type PostPreferencesResponse } from '@shared/types/api'
import { isDietPreferenceResponse } from '@shared/types/typeguard'

interface DietResultContextType {
  result: PostPreferencesResponse | undefined
  addResult: (result: PostPreferencesResponse) => void
}

const DietResultContext = createContext<DietResultContextType | undefined>(undefined)

const LOCAL_STORAGE_KEY = 'dietResult'

export function DietResultProvider({ children }: { children: React.ReactNode }) {
  const [result, setResult] = useState<PostPreferencesResponse | undefined>()

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const storedResult = localStorage.getItem(LOCAL_STORAGE_KEY)
      const parsedResult = storedResult ? JSON.parse(storedResult) : undefined

      if (isDietPreferenceResponse(parsedResult)) {
        setResult(parsedResult)
      }
    }
  }, [])

  const addResult = useCallback((result: PostPreferencesResponse) => {
    setResult(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(result))
      return result
    })
  }, [])

  return (
    <DietResultContext.Provider value={{
      result,
      addResult,
    }}
    >
      {children}
    </DietResultContext.Provider>
  )
}

export function useDietResult() {
  const context = useContext(DietResultContext)
  if (!context) {
    throw new Error('useDietResult must be used within a DietResultProvider')
  }
  return context
}
