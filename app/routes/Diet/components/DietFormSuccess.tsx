import { Button, Stack, Text } from '@mantine/core'

import { useDietStepper } from './DietStepperContext'

export default function DietFormSuccess() {
  const { setActiveStep } = useDietStepper()
  return (
    <Stack align="center" py="xl">
      <Text c="green" fw={600} size="lg">Success! Preferences saved.</Text>
      <Button onClick={() => setActiveStep('select-preferences')}>Back to form</Button>
    </Stack>
  )
}
