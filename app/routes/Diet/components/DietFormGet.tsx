import { useEffect } from 'react'
import { Loader, Stack, Text } from '@mantine/core'

import { type DietPreference, useDietForm } from './DietFormContext'
import { useDietStep } from './DietStepContext'

export default function DietFormGet() {
  const { setActiveStep } = useDietStep()
  const { setPreferences } = useDietForm()

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await fetch('http://localhost:3001/preferences')
        if (!res.ok) throw new Error('Failed to fetch preferences')
        const fetchedPreferences: DietPreference[] = await res.json()

        setPreferences(fetchedPreferences)
        setActiveStep('select-preference')
      }
      catch (error) {
        console.error('Error fetching preferences:', error)
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
