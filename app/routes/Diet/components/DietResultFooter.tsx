import { Group } from '@mantine/core'

import DietResultCount from './DietResultCount'
import DietResultFooterAnimation from './DietResultFooterAnimation'
import DietSettings from './DietSettings'
import DietThemeSwitch from './DietThemeSwitch'
import MealLibrary from './MealLibrary'

export default function DietResultFooter() {
  return (
    <DietResultFooterAnimation>
      <Group gap="md">
        <DietSettings />
        <MealLibrary />
        <DietResultCount />
        <DietThemeSwitch />
      </Group>
    </DietResultFooterAnimation>
  )
}
