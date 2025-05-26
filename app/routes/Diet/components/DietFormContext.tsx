import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'

interface DietFormData {
  preference1: number | string
  preference2: number | string
  preference3: number | string
}

interface DietFormContextType {
  values: DietFormData
  setValue: (field: keyof DietFormData, value: number | string) => void
  reset: () => void
  transform: (values: DietFormData) => DietFormData
}

const DietFormContext = createContext<DietFormContextType | undefined>(undefined)

export const DietFormProvider = ({ children }: { children: ReactNode }) => {
  const [values, setValues] = useState<DietFormData>({
    preference1: 0,
    preference2: 0,
    preference3: 0,
  })

  const setValue = (field: keyof DietFormData, value: number | string) => {
    setValues(prev => ({ ...prev, [field]: value }))
  }

  const reset = () => {
    setValues({ preference1: 0, preference2: 0, preference3: 0 })
  }

  const transform = (values: DietFormData) => {
    return {
      preference1: Number(values.preference1) || 0,
      preference2: Number(values.preference2) || 0,
      preference3: Number(values.preference3) || 0,
    }
  }

  return (
    <DietFormContext.Provider value={{ values, setValue, reset, transform }}>
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
