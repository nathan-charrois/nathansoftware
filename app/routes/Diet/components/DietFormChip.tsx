import { useCallback, useRef } from 'react'
import { Chip } from '@mantine/core'
import { Image } from '@mantine/core'
import { playSlideSound } from '@utils/sound'

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
    >
      <Image w="40px" mr="10px" display="inline" src={`/public/images/${icon}.png`} />
      {label}
    </Chip>
  )
}
