import { useEffect, useState } from 'react'
import { Baby01Icon, EggsIcon, FishFoodIcon, SpoonIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Group } from '@mantine/core'
import { Text, ThemeIcon } from '@mantine/core'

import { useDietResult } from './DietResultContext'
import DietResultCountAnimation from './DietResultCountAnimation'

const icons = [SpoonIcon, Baby01Icon, EggsIcon, FishFoodIcon]

export default function DietResultCount() {
  const { resultCount } = useDietResult()

  const [currentIconIndex, setCurrentIconIndex] = useState(0)

  useEffect(() => {
    setCurrentIconIndex(resultCount % icons.length)
  }, [resultCount, icons.length])

  return (
    <DietResultCountAnimation count={resultCount}>
      <Group gap="xs" align="center">
        <ThemeIcon variant="transparent" size="lg" color="lime">
          <HugeiconsIcon icon={icons[currentIconIndex]} size={24} />
        </ThemeIcon>
        <Text size="lg" fw={400}>{resultCount}</Text>
      </Group>
    </DietResultCountAnimation>
  )
}
