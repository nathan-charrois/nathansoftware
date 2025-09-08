import type { ReactNode } from 'react'
import { AppShell, Center, Stack, useMantineTheme } from '@mantine/core'

type ApplicationProps = {
  children: ReactNode
  footer: ReactNode
}

export default function Application({ children, footer }: ApplicationProps) {
  const theme = useMantineTheme()
  const bg = theme.colors.brand[theme.other.surface]

  return (
    <AppShell withBorder={false}>
      <AppShell.Main bg={bg} h="80vh">
        <Center h="80vh">
          <Stack maw={600}>
            {children}
          </Stack>
        </Center>
      </AppShell.Main>
      <AppShell.Footer bg={bg} h="10vh">
        {footer}
      </AppShell.Footer>
    </AppShell>
  )
}
