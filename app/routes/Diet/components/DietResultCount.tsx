import { useEffect, useState } from 'react'
import { Baby01Icon, EggsIcon, FishFoodIcon, SpoonIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Group, Text, ThemeIcon, Transition } from '@mantine/core'

import { useDietResult } from './DietResultContext'

const icons = [SpoonIcon, Baby01Icon, EggsIcon, FishFoodIcon]

const TRANSITION_TIME = 50

export default function DietResultCount() {
  const { resultCount } = useDietResult()

  const [currentIconIndex, setCurrentIconIndex] = useState(0)
  const [textMounted, setTextMounted] = useState(false)

  useEffect(() => {
    setCurrentIconIndex(resultCount % icons.length)
    setTextMounted(false)

    const timer = setTimeout(() => {
      setTextMounted(true)
    }, TRANSITION_TIME)

    return () => clearTimeout(timer)
  }, [resultCount, icons.length])

  return (
    <Group gap="xs" align="center">
      <Transition mounted={textMounted} transition="pop" duration={300} timingFunction="ease">
        {styles => (
          <ThemeIcon style={styles} variant="transparent" size="lg" color="lime">
            <HugeiconsIcon icon={icons[currentIconIndex]} size={24} />
          </ThemeIcon>
        )}
      </Transition>
      <Transition mounted={textMounted} transition="pop" duration={300} timingFunction="ease">
        {styles => <Text style={styles} size="lg" fw={400}>{resultCount}</Text>}
      </Transition>
    </Group>
  )
}
