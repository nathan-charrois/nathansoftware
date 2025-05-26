import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'

interface DietFormData {
  preference1: number | string
  preference2: number | string
  preference3: number | string
}

const initialValues: DietFormData = {
  preference1: 0,
  preference2: 0,
  preference3: 0,
}

interface DietFormContextType {
  values: DietFormData
  reset: () => void
  setValues: (values: DietFormData) => void
  transform: (values: DietFormData) => DietFormData
}

const DietFormContext = createContext<DietFormContextType | undefined>(undefined)

export const DietFormProvider = ({ children }: { children: ReactNode }) => {
  const [values, setValues] = useState<DietFormData>(initialValues)

  const reset = () => {
    setValues(initialValues)
  }

  const transform = (values: DietFormData) => {
    return {
      preference1: Number(values.preference1) || 0,
      preference2: Number(values.preference2) || 0,
      preference3: Number(values.preference3) || 0,
    }
  }

  return (
    <DietFormContext.Provider value={{ values, setValues, reset, transform }}>
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
