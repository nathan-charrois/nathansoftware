import { useCallback, useEffect, useState } from 'react'
import { Button, Container, Stack, Text, Title, Transition } from '@mantine/core'

import { useI18n } from './DietI18nProvider'
import { useDietResult } from './DietResultContext'
import { useDietStep } from './DietStepContext'

const Circle = () => (
  <svg width="400" height="400">
    <circle cx="200" cy="200" r="200" fill="lightblue" />
  </svg>
)

export default function DietResult() {
  const { setActiveStep } = useDietStep()
  const { latestResult } = useDietResult()
  const { formatMessage } = useI18n()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClickNextMeal = useCallback(() => {
    setActiveStep('form')
  }, [setActiveStep])

  if (!latestResult) {
    return (
      <Stack align="center" py="xl">
        <Text>{formatMessage('no_results_yet')}</Text>
      </Stack>
    )
  }

  return (
    <Stack align="center" py="xl">
      <Container mb="xl" className="meal-layer-container">
        <div className="meal-layer-base meal-layer">
          <img src={latestResult.image} alt={latestResult.title} className="meal-image" />
        </div>
        <div className="meal-layer-base meal-layer-circle">
          <Circle />
        </div>
      </Container>
      <Stack mt="xl" mb="md">
        <Transition mounted={mounted} transition="fade-up" duration={300} timingFunction="ease-out">
          {styles => (
            <Title style={styles} size="lg">{latestResult.title}</Title>
          )}
        </Transition>
      </Stack>
      <Transition mounted={mounted} transition="fade" duration={600} timingFunction="ease-out">
        {styles => (
          <Button style={styles} onClick={handleClickNextMeal}>{formatMessage('next_meal')}</Button>
        )}
      </Transition>
    </Stack>
  )
}
