import { createContext, useContext, useState } from 'react'

export type DietStep = 'select-preference' | 'loading' | 'success' | 'error'

interface DietStepContextType {
  activeStep: DietStep
  setActiveStep: (step: DietStep) => void
}

const DietStepContext = createContext<DietStepContextType | undefined>(undefined)

export function DietStepProvider({ children }: { children: React.ReactNode }) {
  const [activeStep, setActiveStep] = useState<DietStep>('select-preference')

  return (
    <DietStepContext.Provider value={{ activeStep, setActiveStep }}>
      {children}
    </DietStepContext.Provider>
  )
}

export function useDietStep() {
  const ctx = useContext(DietStepContext)
  if (!ctx) throw new Error('useDietStep must be used within a DietStepProvider')
  return ctx
}
