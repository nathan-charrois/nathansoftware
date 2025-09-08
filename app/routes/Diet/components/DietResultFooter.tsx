import { Group } from '@mantine/core'

import DietResultFooterAnimation from './DietResultFooterAnimation'
import DietSettings from './DietSettings'
import DietThemeSwitch from './DietThemeSwitch'
import MealLibrary from './MealLibrary'

export default function DietResultFooter() {
  return (
    <DietResultFooterAnimation>
      <Group justify="space-between" maw={600} w="100%">
        <Group gap="lg">
          <DietSettings />
          <MealLibrary />
        </Group>
        <DietThemeSwitch />
      </Group>
    </DietResultFooterAnimation>
  )
}
