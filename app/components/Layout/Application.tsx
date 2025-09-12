import { type ReactNode } from 'react'
import { AppShell, Center, Stack } from '@mantine/core'

import { useIsMobile } from '~/hooks/useIsMobile'

type ApplicationProps = {
  children: ReactNode
  footer: ReactNode
}

export default function Application({ children, footer }: ApplicationProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <AppShell withBorder={false} padding="lg" offsetScrollbars={false}>
        <AppShell.Main>
          <Stack gap="xl" my="lg" justify="space-between" mih="100vh">
            {children}
            {footer}
          </Stack>
        </AppShell.Main>
      </AppShell>
    )
  }

  return (
    <AppShell withBorder={false}>
      <AppShell.Main>
        <Center h="80vh">
          <Stack maw={600}>
            {children}
          </Stack>
        </Center>
      </AppShell.Main>
      <AppShell.Footer mih="175px">
        {footer}
      </AppShell.Footer>
    </AppShell>
  )
}
