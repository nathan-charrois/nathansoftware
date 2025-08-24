import { useCallback, useEffect, useState } from 'react'
import { Button, Container, Stack, Text, Title, Transition } from '@mantine/core'

import { useI18n } from './DietI18nProvider'
import { useDietResult } from './DietResultContext'
import { useDietStep } from './DietStepContext'

const Circle = () => (
  <svg width="200" height="200">
    <circle cx="100" cy="100" r="80" fill="lightblue" />
  </svg>
)

function MealIngredient({ ingredient }: { ingredient: string }) {
  return (
    <svg width="200" height="200">
      <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="black">
        {ingredient}
      </text>
    </svg>
  )
}

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
        {latestResult.ingredients?.map(ingredient => (
          <div className="meal-layer-base meal-layer">
            <MealIngredient ingredient={ingredient} />
          </div>
        ))}
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
