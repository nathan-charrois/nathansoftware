import { Button, Stack, Text } from '@mantine/core'

import { useDietStepper } from './DietStepperContext'

export default function DietFormError() {
  const { setActiveStep } = useDietStepper()
  return (
    <Stack align="center" py="xl">
      <Text c="red" fw={600} size="lg">Error saving preferences.</Text>
      <Button onClick={() => setActiveStep('select-preferences')}>Try again</Button>
    </Stack>
  )
}
