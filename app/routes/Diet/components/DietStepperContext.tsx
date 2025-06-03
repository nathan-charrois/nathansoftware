import { createContext, useContext, useState } from 'react'

export type DietStep = 'select-preferences' | 'loading' | 'success' | 'error'

interface DietStepperContextType {
  activeStep: DietStep
  setActiveStep: (step: DietStep) => void
}

const DietStepperContext = createContext<DietStepperContextType | undefined>(undefined)

export function DietStepperProvider({ children }: { children: React.ReactNode }) {
  const [activeStep, setActiveStep] = useState<DietStep>('select-preferences')

  return (
    <DietStepperContext.Provider value={{ activeStep, setActiveStep }}>
      {children}
    </DietStepperContext.Provider>
  )
}

export function useDietStepper() {
  const ctx = useContext(DietStepperContext)
  if (!ctx) throw new Error('useDietStepper must be used within a DietStepperProvider')
  return ctx
}
