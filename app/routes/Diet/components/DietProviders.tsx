import type { ReactNode } from 'react'

import { DietFormProvider } from './DietFormContext'
import { DietResultProvider } from './DietResultContext'
import { DietStepProvider } from './DietStepContext'

export default function DietProviders({ children }: { children: ReactNode }) {
  return (
    <DietFormProvider>
      <DietResultProvider>
        <DietStepProvider>
          {children}
        </DietStepProvider>
      </DietResultProvider>
    </DietFormProvider>
  )
}
