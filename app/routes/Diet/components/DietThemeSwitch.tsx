import { useCallback } from 'react'
import { Baby01Icon, Female02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Group, Switch, ThemeIcon } from '@mantine/core'

import { useDietTheme } from './DietThemeContext'

export default function DietThemeSwitch() {
  const { theme, setTheme } = useDietTheme()

  const handleOnChange = useCallback((checked: boolean) => {
    setTheme(checked ? 'mommy' : 'baby')
  }, [setTheme])

  return (
    <Group gap="xs" align="center">
      <Switch
        checked={theme === 'mommy'}
        onChange={event => handleOnChange(event.currentTarget.checked)}
        size="lg"
        color="dark.4"
        onLabel={(
          <ThemeIcon variant="transparent" size="lg" color="dark.3">
            <HugeiconsIcon icon={Female02Icon} size={24} />
          </ThemeIcon>
        )}
        offLabel={(
          <ThemeIcon variant="transparent" size="lg" color="dark.3">
            <HugeiconsIcon icon={Baby01Icon} size={24} />
          </ThemeIcon>
        )}
      />
    </Group>
  )
}
