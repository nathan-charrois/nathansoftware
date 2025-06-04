import { useCallback, useEffect, useState } from 'react'
import { Button, Stack, Text, Transition } from '@mantine/core'

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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClick = useCallback(() => {
    setActiveStep('form')
  }, [setActiveStep])

  return (
    <Stack align="center" py="xl">
      <Transition mounted={mounted} transition="fade-up" duration={300} timingFunction="ease-out">
        {styles => <Circle styles={styles} />}
      </Transition>
      <Transition mounted={mounted} transition="fade-up" duration={300} timingFunction="ease-out" enterDelay={300}>
        {styles => (
          <Text style={styles} fw={600} size="xl" mt="md">{latestResult?.title || '--'}</Text>
        )}
      </Transition>
      <Transition mounted={mounted} transition="fade" duration={600} timingFunction="ease-out" enterDelay={1200}>
        {styles => (
          <Button style={styles} onClick={handleClick} mt="xl">Next Meal</Button>
        )}
      </Transition>
    </Stack>
  )
}
