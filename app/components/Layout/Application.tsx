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
      <AppShell.Main bg={bg}>
        <Center h="94vh">
          <Stack w="100%" maw={600}>
            {children}
          </Stack>
        </Center>
      </AppShell.Main>
      <AppShell.Footer bg={bg}>
        <Center w="100%" h={100}>
          {footer}
        </Center>
      </AppShell.Footer>
    </AppShell>
  )
}
