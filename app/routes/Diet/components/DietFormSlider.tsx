import { useCallback, useRef } from 'react'
import { Slider, Stack } from '@mantine/core'
import { playSlideSound } from '@utils/sound'

import { DietFormSliderLabel } from './DietFormSliderLabel'

interface DietFormSliderProps {
  labelStart: string
  labelEnd: string
  id: string
  value: number
  min: number
  max: number
  onChange: (val: number) => void
  onChangeEnd: (val: number) => void
}

function buildSliderMarks(min: number, max: number) {
  return Array
    .from({ length: max - min + 1 })
    .map((_, i) => ({ value: min + i }))
}

export default function DietFormSlider({
  labelStart,
  labelEnd,
  id,
  value,
  min,
  max,
  onChange,
  onChangeEnd,
}: DietFormSliderProps) {
  const lastSoundValue = useRef(value)

  const handleOnChangeSound = useCallback((val: number) => {
    if (val !== lastSoundValue.current) {
      playSlideSound()
      lastSoundValue.current = val
    }

    onChange(val)
  }, [])

  return (
    <Stack gap="xs" mb="xl">
      <DietFormSliderLabel
        id={id}
        labelStart={labelStart}
        labelEnd={labelEnd}
      />
      <Slider
        id={id}
        label={null}
        min={min}
        max={max}
        value={value}
        size={10}
        thumbSize={28}
        onChange={handleOnChangeSound}
        onChangeEnd={onChangeEnd}
        marks={buildSliderMarks(min, max)}
        classNames={{ track: 'custom-slider-track' }}
      />
    </Stack>
  )
}
