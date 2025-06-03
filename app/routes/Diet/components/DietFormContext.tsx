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
  preferences: DietPreference[]
  setPreferenceValue: (key: string, value: number) => void
  initialValues: Record<string, number>
  onValuesChange: (values: Record<string, unknown>) => void
  validate: Record<string, ReturnType<typeof isInRange>>
  setPreferences: (preferences: DietPreference[]) => void
}

const DietFormContext = createContext<DietFormContextType | undefined>(undefined)

export const DietFormProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<DietPreference[]>([])

  const setPreferenceValue = (key: string, value: number) => {
    setPreferences(prev =>
      prev.map(pref => (pref.key === key ? { ...pref, value } : pref)),
    )
  }

  const initialValues = Object.fromEntries(
    preferences.map(pref => [pref.key, pref.value]),
  )

  const onValuesChange = (values: Record<string, unknown>) => {
    Object.entries(values).forEach(([key, value]) => {
      setPreferenceValue(key, typeof value === 'number' ? value : 0)
    })
  }

  const validate = Object.fromEntries(
    preferences.map(pref => [
      pref.key,
      isInRange({ min: pref.min, max: pref.max }, `Required (${pref.min}-${pref.max})`),
    ]),
  )

  return (
    <DietFormContext.Provider value={{ preferences, setPreferenceValue, initialValues, onValuesChange, validate, setPreferences }}>
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
