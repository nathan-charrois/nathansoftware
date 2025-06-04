import { Button, Stack, Text } from '@mantine/core'

import { useDietStep } from './DietStepContext'

export default function DietError() {
  const { setActiveStep } = useDietStep()
  return (
    <Stack align="center" py="xl">
      <Text c="red" fw={600} size="lg">Error saving preferences.</Text>
      <Button onClick={() => setActiveStep('form')}>Try again</Button>
    </Stack>
  )
}
