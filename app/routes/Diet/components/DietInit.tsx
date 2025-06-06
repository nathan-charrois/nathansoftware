import { useEffect } from 'react'
import type { DietPreference } from '@shared/types/context'
import { fetchData } from 'app/utils/fetchUtils'
import { type GetPreferencesResponse } from 'shared/types/api'

import { useDietForm } from './DietFormContext'
import { useDietStep } from './DietStepContext'

export default function DietInit() {
  const { setActiveStep } = useDietStep()
  const { setPreferences } = useDietForm()

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const preferences = await fetchData<GetPreferencesResponse[]>({
          url: '/preferences',
        })

        setPreferences(preferences)
        setActiveStep('form')
      }
      catch {
        setActiveStep('error')
      }
    }

    fetchPreferences()
  }, [setActiveStep, setPreferences])

  return null
}
