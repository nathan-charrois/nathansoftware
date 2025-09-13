import { useEffect } from 'react'
import type { DietPreference } from '@shared/types/context'
import { fetchData } from 'app/utils/fetchUtils'
import { type GetPreferencesResponse } from 'shared/types/api'

import { useDietForm } from './DietFormContext'
import { useDietStep } from './DietStepContext'
import { useDietTheme } from './DietThemeContext'

export default function DietInit() {
  const { setActiveStep } = useDietStep()
  const { setPreferences } = useDietForm()
  const { theme } = useDietTheme()

  useEffect(() => {
    if (theme) {
      const fetchPreferences = async () => {
        try {
          const preferences = await fetchData<GetPreferencesResponse[]>({
            url: '/preferences?theme=' + theme,
            method: 'GET',
          })

          setPreferences(preferences as DietPreference[])
          setActiveStep('form')
        }
        catch {
          setActiveStep('error')
        }
      }

      fetchPreferences()
    }
  }, [setActiveStep, setPreferences, theme])

  return null
}
