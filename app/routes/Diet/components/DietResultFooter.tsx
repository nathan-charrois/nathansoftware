import { Group } from '@mantine/core'

import DietResultCount from './DietResultCount'
import DietResultFooterAnimation from './DietResultFooterAnimation'
import DietSettings from './DietSettings'

export default function DietResultFooter() {
  return (
    <DietResultFooterAnimation>
      <Group gap="md">
        <DietSettings />
        <DietResultCount />
      </Group>
    </DietResultFooterAnimation>
  )
}
