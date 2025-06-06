import { useCallback, useRef } from 'react'
import { Chip, Stack } from '@mantine/core'
import { playSlideSound } from '@utils/sound'

interface DietFormChipProps {
  label: string
  id: string
  value: number
  onChange: (checked: number) => void
}

export default function DietFormChip({ label, id, value, onChange }: DietFormChipProps) {
  const lastSoundValue = useRef(!!value)

  const handleOnChangeSound = useCallback((val: boolean) => {
    if (val !== lastSoundValue.current) {
      playSlideSound()
      lastSoundValue.current = val
    }

    onChange(val ? 1 : 0)
  }, [])

  return (
    <Stack gap="md" mb="sm" justify="center" align="center">
      <Chip id={id} checked={!!value} onChange={handleOnChangeSound}>
        {label}
      </Chip>
    </Stack>
  )
}
