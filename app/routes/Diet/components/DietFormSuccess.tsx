import { Button, Stack, Text } from '@mantine/core'

import { useDietStep } from './DietStepContext'

export default function DietFormSuccess() {
  const { setActiveStep } = useDietStep()
  return (
    <Stack align="center" py="xl">
      <Text c="green" fw={600} size="lg">Success! Preferences saved.</Text>
      <Button onClick={() => setActiveStep('select-preference')}>Back to form</Button>
    </Stack>
  )
}
