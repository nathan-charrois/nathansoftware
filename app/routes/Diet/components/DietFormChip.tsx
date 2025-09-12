import { useCallback, useMemo, useRef } from 'react'
import { Chip } from '@mantine/core'
import { Image } from '@mantine/core'
import { playSlideSound } from '@utils/sound'

import { useI18n } from './DietI18nProvider'
import { useDietTheme } from './DietThemeContext'

interface DietFormChipProps {
  label: string
  id: string
  icon: string
  value: number
  onChange: (checked: number) => void
}

export default function DietFormChip({
  label,
  id,
  icon,
  value,
  onChange,
}: DietFormChipProps) {
  const lastSoundValue = useRef(!!value)
  const { theme } = useDietTheme()
  const { currentLanguage } = useI18n()

  const handleOnChangeSound = useCallback((val: boolean) => {
    if (val !== lastSoundValue.current) {
      playSlideSound()
      lastSoundValue.current = val
    }

    onChange(val ? 1 : 0)
  }, [])

  const marginTop = useMemo(() => (
    currentLanguage === 'ru' ? '-6px' : ''
  ), [currentLanguage])

  const styles = useMemo(() => {
    return currentLanguage === 'ru'
      ? {
          label: { padding: '31px 18px 25px' },
        }
      : {
          label: { padding: '28px 16px' },
        }
  }, [currentLanguage])

  return (
    <Chip
      id={id}
      checked={!!value}
      onChange={handleOnChangeSound}
      styles={styles}
    >
      <Image w="50px" mr="10px" mt={marginTop} display="inline" src={`/images/${theme}/${icon}.png`} />
      {label}
    </Chip>
  )
}
