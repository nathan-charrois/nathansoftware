import { type ReactNode, useMemo } from 'react'
import { AppShell, Center, Stack, useMantineTheme } from '@mantine/core'

import { useIsMobile } from '~/hooks/useIsMobile'

type ApplicationProps = {
  children: ReactNode
  footer: ReactNode
}

export default function Application({ children, footer }: ApplicationProps) {
  const theme = useMantineTheme()
  const bg = theme.colors.brand[theme.other.surface]
  const isMobile = useIsMobile()

  const appShellHeight = useMemo(() =>
    isMobile ? '92vh' : '85vh',
  [isMobile],
  )

  return (
    <AppShell withBorder={false}>
      <AppShell.Main bg={bg} h="90vh" pl="lg" pr="lg">
        <Center h={appShellHeight}>
          <Stack maw={600}>
            {children}
          </Stack>
        </Center>
      </AppShell.Main>
      <AppShell.Footer bg={bg} h="8vh" pl="lg" pr="lg">
        {footer}
      </AppShell.Footer>
    </AppShell>
  )
}
