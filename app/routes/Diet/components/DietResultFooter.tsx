import { useMemo } from 'react'
import { Group } from '@mantine/core'

import DietResultFooterAnimation from './DietResultFooterAnimation'
import DietSettings from './DietSettings'
import DietThemeSwitch from './DietThemeSwitch'
import MealLibrary from './MealLibrary'
import { useIsMobile } from '~/hooks/useIsMobile'

export default function DietResultFooter() {
  const isMobile = useIsMobile()

  const gap = useMemo(() => {
    return isMobile ? 'xs' : 'lg'
  }, [isMobile])

  return (
    <DietResultFooterAnimation>
      <Group justify="space-between" maw={600} w="100%">
        <Group gap={gap}>
          <DietSettings />
          <MealLibrary />
        </Group>
        <DietThemeSwitch />
      </Group>
    </DietResultFooterAnimation>
  )
}
