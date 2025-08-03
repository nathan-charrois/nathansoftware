import { useCallback } from 'react'
import { Button, Stack, Text } from '@mantine/core'

import { useI18n } from './DietI18nProvider'
import { useDietStep } from './DietStepContext'

export default function DietError() {
  const { setActiveStep } = useDietStep()
  const { formatMessage } = useI18n()

  const handleClickTryAgain = useCallback(() => {
    setActiveStep('form')
  }, [setActiveStep])

  return (
    <Stack align="center" py="xl">
      <Text c="red" fw={600} size="lg">{formatMessage('error_saving_preferences')}</Text>
      <Button onClick={handleClickTryAgain}>{formatMessage('try_again')}</Button>
    </Stack>
  )
}
