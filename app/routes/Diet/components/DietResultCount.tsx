import { useEffect, useState } from 'react'
import { Baby01Icon, EggsIcon, FishFoodIcon, SpoonIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Group } from '@mantine/core'
import { Text, ThemeIcon } from '@mantine/core'
import { useDidUpdate } from '@mantine/hooks'
import { playSuccessSound } from '@utils/sound'

import { useMealLibrary } from './MealLibraryContext'

const icons = [SpoonIcon, Baby01Icon, EggsIcon, FishFoodIcon]

export default function DietResultCount() {
  const { count } = useMealLibrary()

  const [currentIconIndex, setCurrentIconIndex] = useState(0)

  useEffect(() => {
    setCurrentIconIndex(count % icons.length)
  }, [count, icons.length])

  useDidUpdate(
    () => { playSuccessSound() },
    [count],
  )

  return (
    <Group gap="xs" align="center">
      <ThemeIcon variant="transparent" size="lg">
        <HugeiconsIcon icon={icons[currentIconIndex]} size={24} />
      </ThemeIcon>
      <Text size="sm">{count}</Text>
    </Group>
  )
}
