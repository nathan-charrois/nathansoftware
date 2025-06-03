import type { MetaArgs } from 'react-router'
import { Center, Stack } from '@mantine/core'

import DietStepper from './components/DietStepper'
import { DietStepperProvider } from './components/DietStepperContext'
import DietTitle from './components/DietTitle'

export function meta({}: MetaArgs) {
  return [
    { title: 'Diet' },
    { name: 'description', content: 'This is Diet!' },
  ]
}

export default function Diet() {
  return (
    <Center h="100vh">
      <Stack align="center" w="100%" h={400} maw={400}>
        <DietStepperProvider>
          <DietTitle />
          <DietStepper />
        </DietStepperProvider>
      </Stack>
    </Center>
  )
}
