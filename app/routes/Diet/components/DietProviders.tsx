import type { ReactNode } from 'react'

import { DietFormProvider } from './DietFormContext'
import { DietI18nProvider } from './DietI18nProvider'
import { DietResultProvider } from './DietResultContext'
import { DietStepProvider } from './DietStepContext'
import { MealLibraryProvider } from './MealLibraryContext'

export default function DietProviders({ children }: { children: ReactNode }) {
  return (
    <DietI18nProvider>
      <DietFormProvider>
        <MealLibraryProvider>
          <DietResultProvider>
            <DietStepProvider>
              {children}
            </DietStepProvider>
          </DietResultProvider>
        </MealLibraryProvider>
      </DietFormProvider>
    </DietI18nProvider>
  )
}
