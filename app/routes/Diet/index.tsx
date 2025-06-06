import type { MetaArgs } from 'react-router'
import { AppShell, Center, Stack } from '@mantine/core'

import DietError from './components/DietError'
import DietForm from './components/DietForm'
import DietInit from './components/DietInit'
import DietProviders from './components/DietProviders'
import DietResult from './components/DietResult'
import DietResultCount from './components/DietResultCount'
import DietSpinner from './components/DietSpinner'
import DietStep from './components/DietStep'
import DietTitle from './components/DietTitle'

export function meta({}: MetaArgs) {
  return [
    { title: 'Diet' },
    { name: 'description', content: 'This is Diet!' },
  ]
}

export default function Diet() {
  return (
    <DietProviders>
      <AppShell withBorder={false}>
        <AppShell.Main>
          <Center h="100vh">
            <Stack align="center" w="100%" h={800} maw={400}>
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
        </AppShell.Main>
        <AppShell.Footer>
          <Center w="100%" h={100}>
            <DietResultCount />
          </Center>
        </AppShell.Footer>
      </AppShell>
    </DietProviders>
  )
}
