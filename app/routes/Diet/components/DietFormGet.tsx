import { useEffect } from 'react'
import { Loader, Stack, Text } from '@mantine/core'
import { fetchData } from 'app/utils/fetchUtils'
import { type GetPreferencesResponse } from 'shared/types/api'

import { useDietForm } from './DietFormContext'
import { useDietStep } from './DietStepContext'

export default function DietFormGet() {
  const { setActiveStep } = useDietStep()
  const { setPreferences } = useDietForm()

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const preferences = await fetchData<GetPreferencesResponse[]>({
          url: '/preferences',
        })

        setPreferences(preferences)
        setActiveStep('select-preference')
      }
      catch {
        setActiveStep('error')
      }
    }

    fetchPreferences()
  }, [setActiveStep, setPreferences])

  return (
    <Stack align="center" py="xl">
      <Text size="lg">Fetching your diet preferences...</Text>
      <Loader />
    </Stack>
  )
}
