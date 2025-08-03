import type { ReactNode } from 'react'

import { DietFormProvider } from './DietFormContext'
import { DietI18nProvider } from './DietI18nProvider'
import { DietResultProvider } from './DietResultContext'
import { DietStepProvider } from './DietStepContext'

export default function DietProviders({ children }: { children: ReactNode }) {
  return (
    <DietI18nProvider>
      <DietFormProvider>
        <DietResultProvider>
          <DietStepProvider>
            {children}
          </DietStepProvider>
        </DietResultProvider>
      </DietFormProvider>
    </DietI18nProvider>
  )
}
