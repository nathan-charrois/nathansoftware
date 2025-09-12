import { Group, Stack, Text } from '@mantine/core'

import DietResultFooterAnimation from './DietResultFooterAnimation'
import DietSettings from './DietSettings'
import DietThemeSwitch from './DietThemeSwitch'
import MealLibrary from './MealLibrary'

export default function DietResultFooter() {
  return (
    <DietResultFooterAnimation>
      <Stack gap="xl" mt="xl">
        <Group gap="lg">
          <DietSettings />
          <MealLibrary />
          <DietThemeSwitch />
        </Group>
        <Text size="xs" ta="center"> © 2025 Nathan Software </Text>
      </Stack>
    </DietResultFooterAnimation>
  )
}
