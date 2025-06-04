import { Loader, Stack, Text } from '@mantine/core'

export default function DietSpinner() {
  return (
    <Stack align="center" py="xl">
      <Loader size="lg" />
      <Text mt="md">Saving your preferences...</Text>
    </Stack>
  )
}
