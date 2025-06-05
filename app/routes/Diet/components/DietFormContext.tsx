import type { ReactNode } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'
import { isInRange, isNotEmpty } from '@mantine/form'
import type { DietPreference, DietPreferencesByType } from '@shared/types/context'

interface DietFormContextType {
  initialValues: Record<string, number>
  preferences: DietPreference[]
  preferencesByType: DietPreferencesByType
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

  const preferencesByType = useMemo(() => ({
    range: preferences.filter(pref => pref.type === 'range'),
    boolean: preferences.filter(pref => pref.type === 'boolean'),
  }), [preferences])

  const validate = Object.fromEntries(
    (
      preferencesByType.range.map(pref => [
        pref.key, isInRange({ min: pref.min, max: pref.max }),
      ]),
      preferencesByType.boolean.map(pref => [
        pref.key, isNotEmpty(),
      ])
    ),
  )

  return (
    <DietFormContext.Provider value={{
      initialValues,
      preferences,
      preferencesByType,
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
