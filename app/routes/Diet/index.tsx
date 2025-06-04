import type { MetaArgs } from 'react-router'
import { Center, Stack } from '@mantine/core'

import DietError from './components/DietError'
import DietForm from './components/DietForm'
import { DietFormProvider } from './components/DietFormContext'
import DietInit from './components/DietInit'
import DietResult from './components/DietResult'
import DietSpinner from './components/DietSpinner'
import DietStep from './components/DietStep'
import { DietStepProvider } from './components/DietStepContext'
import DietTitle from './components/DietTitle'

export function meta({}: MetaArgs) {
  return [
    { title: 'Diet' },
    { name: 'description', content: 'This is Diet!' },
  ]
}

export default function Diet() {
  return (
    <DietFormProvider>
      <DietStepProvider>
        <Center h="100vh">
          <Stack align="center" w="100%" h={400} maw={400}>
            <DietTitle />
            <DietStep step="initialize">
              <DietInit />
            </DietStep>
            <DietStep step="form">
              <DietForm />
            </DietStep>
            <DietStep step="loading">
              <DietSpinner />
            </DietStep>
            <DietStep step="result">
              <DietResult />
            </DietStep>
            <DietStep step="error">
              <DietError />
            </DietStep>
          </Stack>
        </Center>
      </DietStepProvider>
    </DietFormProvider>
  )
}
