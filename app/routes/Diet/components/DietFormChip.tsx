import { useCallback, useRef } from 'react'
import { Chip } from '@mantine/core'
import { Image } from '@mantine/core'
import { playSlideSound } from '@utils/sound'

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

  const handleOnChangeSound = useCallback((val: boolean) => {
    if (val !== lastSoundValue.current) {
      playSlideSound()
      lastSoundValue.current = val
    }

    onChange(val ? 1 : 0)
  }, [])

  return (
    <Chip
      id={id}
      checked={!!value}
      onChange={handleOnChangeSound}
      ml={-15}
      mr={-15}
      mb="xs"
    >
      <Image w="50px" mr="10px" display="inline" src={`/images/${theme}/${icon}.png`} />
      {label}
    </Chip>
  )
}
