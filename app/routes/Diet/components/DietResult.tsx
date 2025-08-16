import { useCallback, useEffect, useState } from 'react'
import { Button, Stack, Text, Title, Transition } from '@mantine/core'

import { useI18n } from './DietI18nProvider'
import { useDietResult } from './DietResultContext'
import { useDietStep } from './DietStepContext'

const Circle = ({ styles }: { styles: React.CSSProperties }) => (
  <svg style={styles} width="200" height="200">
    <circle cx="100" cy="100" r="80" fill="lightblue" />
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
      <Transition mounted={mounted} transition="fade-up" duration={300} timingFunction="ease-out">
        {styles => <Circle styles={styles} />}
      </Transition>
      <Transition mounted={mounted} transition="fade-up" duration={300} timingFunction="ease-out" enterDelay={300}>
        {styles => (
          <Title style={styles} size="lg">{latestResult.title}</Title>
        )}
      </Transition>
      <Transition mounted={mounted} transition="fade" duration={600} timingFunction="ease-out" enterDelay={1200}>
        {styles => (
          <Button style={styles} onClick={handleClickNextMeal} mt="xl">{formatMessage('next_meal')}</Button>
        )}
      </Transition>
    </Stack>
  )
}
