import { useCallback } from 'react'
import { Baby01Icon, Female02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Group, Switch, ThemeIcon } from '@mantine/core'

import { useDietStep } from './DietStepContext'
import { useDietTheme } from './DietThemeContext'
import { playButtonSound, playThemeSound } from '~/utils/sound'

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export default function DietThemeSwitch() {
  const { theme, setTheme } = useDietTheme()
  const { setActiveStep } = useDietStep()

  const handleOnChange = useCallback(async (checked: boolean) => {
    playButtonSound()
    setActiveStep('loading')

    await delay(250)
    setTheme(checked ? 'mommy' : 'baby')

    await delay(250)
    setActiveStep('initialize')

    await delay(200)
    playThemeSound()
  }, [setTheme])

  return (
    <Group gap="xs" align="center">
      <Switch
        checked={theme === 'mommy'}
        onChange={event => handleOnChange(event.currentTarget.checked)}
        size="lg"
        color="dark.4"
        onLabel={(
          <ThemeIcon variant="transparent" size="lg" color="brand.3">
            <HugeiconsIcon icon={Female02Icon} size={22} />
          </ThemeIcon>
        )}
        offLabel={(
          <ThemeIcon variant="transparent" size="lg" color="brand.4">
            <HugeiconsIcon icon={Baby01Icon} size={22} />
          </ThemeIcon>
        )}
      />
    </Group>
  )
}
