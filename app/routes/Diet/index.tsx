import type { MetaArgs } from 'react-router'
import { Center, Stack } from '@mantine/core'

// import DietStepper from './components/DietStepper'
import DietForm from './components/DietForm'
import { DietFormProvider } from './components/DietFormContext'
import DietFormError from './components/DietFormError'
import DietFormLoading from './components/DietFormLoading'
import DietFormSuccess from './components/DietFormSuccess'
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
    <DietStepProvider>
      <Center h="100vh">
        <Stack align="center" w="100%" h={400} maw={400}>
          <DietTitle />
          <DietStep step="select-preference">
            <DietFormProvider>
              <DietForm />
            </DietFormProvider>
          </DietStep>
          <DietStep step="loading">
            <DietFormLoading />
          </DietStep>
          <DietStep step="success">
            <DietFormSuccess />
          </DietStep>
          <DietStep step="error">
            <DietFormError />
          </DietStep>
        </Stack>
      </Center>
    </DietStepProvider>
  )
}
