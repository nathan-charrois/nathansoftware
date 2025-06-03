import type { MetaArgs } from 'react-router'
import { Center, Stack } from '@mantine/core'

import DietForm from './components/DietForm'
import { DietFormProvider } from './components/DietFormContext'
import DietFormError from './components/DietFormError'
import DietFormGet from './components/DietFormGet'
import DietFormLoading from './components/DietFormLoading'
import DietResult from './components/DietResult'
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
            <DietStep step="fetch-preference">
              <DietFormGet />
            </DietStep>
            <DietStep step="select-preference">
              <DietForm />
            </DietStep>
            <DietStep step="loading">
              <DietFormLoading />
            </DietStep>
            <DietStep step="result">
              <DietResult />
            </DietStep>
            <DietStep step="error">
              <DietFormError />
            </DietStep>
          </Stack>
        </Center>
      </DietStepProvider>
    </DietFormProvider>
  )
}
