import { useEffect, useState } from 'react'
import { Baby01Icon, EggsIcon, FishFoodIcon, SpoonIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Group } from '@mantine/core'
import { Text, ThemeIcon } from '@mantine/core'
import { useDidUpdate } from '@mantine/hooks'
import { playSuccessSound } from '@utils/sound'

import { useDietResult } from './DietResultContext'

const icons = [SpoonIcon, Baby01Icon, EggsIcon, FishFoodIcon]

export default function DietResultCount() {
  const { resultCount } = useDietResult()

  const [currentIconIndex, setCurrentIconIndex] = useState(0)

  useEffect(() => {
    setCurrentIconIndex(resultCount % icons.length)
  }, [resultCount, icons.length])

  useDidUpdate(
    () => { playSuccessSound() },
    [resultCount],
  )

  return (
    <Group gap="xs" align="center">
      <ThemeIcon variant="transparent" size="lg" color="lime">
        <HugeiconsIcon icon={icons[currentIconIndex]} size={24} />
      </ThemeIcon>
      <Text size="sm">{resultCount}</Text>
    </Group>
  )
}
