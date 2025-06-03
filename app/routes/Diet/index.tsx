import type { MetaArgs } from 'react-router'
import { Center, Stack } from '@mantine/core'

import DietForm from './components/DietForm'
import { DietFormProvider } from './components/DietFormContext'
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
      <Stack align="center">
        <DietTitle />
        <DietFormProvider>
          <DietForm />
        </DietFormProvider>
      </Stack>
    </Center>
  )
}
