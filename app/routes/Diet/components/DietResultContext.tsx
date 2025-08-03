import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { type PostPreferencesResponse } from '@shared/types/api'
import { isDietPreferenceResponseArray } from '@shared/types/typeguard'

interface DietResultContextType {
  results: PostPreferencesResponse[]
  resultCount: number
  latestResult: PostPreferencesResponse | undefined
  addResult: (result: PostPreferencesResponse) => void
}

const DietResultContext = createContext<DietResultContextType | undefined>(undefined)

const LOCAL_STORAGE_KEY = 'dietResults'

export function DietResultProvider({ children }: { children: React.ReactNode }) {
  const [results, setResults] = useState<PostPreferencesResponse[]>([])

  useEffect(() => {
    if (localStorage) {
      const savedResults = localStorage.getItem(LOCAL_STORAGE_KEY)
      const parsedResults = savedResults ? JSON.parse(savedResults) : []

      if (isDietPreferenceResponseArray(parsedResults)) {
        setResults(parsedResults)
      }
    }
  }, [])

  const addResult = useCallback((result: PostPreferencesResponse) => {
    setResults((prevResults) => {
      const newResults = [...prevResults, result]

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newResults))

      return newResults
    })
  }, [])

  const resultCount = results.length
  const latestResult = results.length > 0 ? results[results.length - 1] : undefined

  return (
    <DietResultContext.Provider value={{
      results,
      resultCount,
      latestResult,
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
