import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'
import { isInRange } from '@mantine/form'

export interface DietPreference {
  key: string
  label: string
  min: number
  max: number
  value: number
}

interface DietFormContextType {
  initialValues: Record<string, number>
  preferences: DietPreference[]
  setPreferences: (preferences: DietPreference[]) => void
  setPreference: (key: string, value: number) => void
  validate: Record<string, ReturnType<typeof isInRange>>
}

const DietFormContext = createContext<DietFormContextType | undefined>(undefined)

export const DietFormProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<DietPreference[]>([])

  const setPreference = (key: string, value: number) => {
    setPreferences(prev =>
      prev.map(pref => (pref.key === key ? { ...pref, value } : pref)),
    )
  }

  const initialValues = Object.fromEntries(
    preferences.map(pref => [pref.key, pref.value]),
  )

  const validate = Object.fromEntries(
    preferences.map(pref => [
      pref.key,
      isInRange({ min: pref.min, max: pref.max }, `Required (${pref.min}-${pref.max})`),
    ]),
  )

  return (
    <DietFormContext.Provider value={{
      initialValues,
      preferences,
      setPreference,
      setPreferences,
      validate,
    }}
    >
      {children}
    </DietFormContext.Provider>
  )
}

export const useDietForm = () => {
  const context = useContext(DietFormContext)
  if (!context) {
    throw new Error('useDietForm must be used within a DietFormProvider')
  }
  return context
}
