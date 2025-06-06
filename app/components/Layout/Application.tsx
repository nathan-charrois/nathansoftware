import type { ReactNode } from 'react'
import { AppShell, Center, Stack } from '@mantine/core'

type ApplicationProps = {
  children: ReactNode
  footer: ReactNode
}

export default function Application({ children, footer }: ApplicationProps) {
  return (
    <AppShell withBorder={false}>
      <AppShell.Main>
        <Center h="100vh">
          <Stack w="100%" h={800} maw={400}>
            {children}
          </Stack>
        </Center>
      </AppShell.Main>
      <AppShell.Footer>
        <Center w="100%" h={100}>
          {footer}
        </Center>
      </AppShell.Footer>
    </AppShell>
  )
}
