import { Group, Text, ThemeIcon } from '@mantine/core'

import { useDietResult } from './DietResultContext'

export default function DietResultCount() {
  const { resultCount } = useDietResult()

  return (
    <Group gap="xs" align="center">
      <ThemeIcon variant="transparent" size="lg" color="lime">
        {/* Find replacement icon lib */}
      </ThemeIcon>
      <Text size="lg" fw={400}>{resultCount}</Text>
    </Group>
  )
}
