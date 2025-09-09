import { useCallback, useMemo } from 'react'
import { Slider, Stack } from '@mantine/core'
import { playSlideSound } from '@utils/sound'

import { DietFormSliderLabel } from './DietFormSliderLabel'
import { useIsMobile } from '~/hooks/useIsMobile'

interface DietFormSliderProps {
  labelStart: string
  labelEnd: string
  iconStart: string
  iconEnd: string
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

const sliderClassNames = {
  track: 'custom-slider-track',
}

export default function DietFormSlider({
  labelStart,
  labelEnd,
  iconStart,
  iconEnd,
  id,
  value,
  min,
  max,
  onChange,
  onChangeEnd,
}: DietFormSliderProps) {
  const isMobile = useIsMobile()

  const handleOnChangeSound = useCallback((val: number) => {
    playSlideSound()
    onChange(val)
  }, [])

  const sliderMarks = useMemo(() => (
    buildSliderMarks(min, max)
  ), [min, max])

  const marginBottom = useMemo(() => {
    return isMobile ? 'xs' : 'xl'
  }, [isMobile])

  return (
    <Stack gap="xs" mb={marginBottom}>
      <DietFormSliderLabel
        id={id}
        labelStart={labelStart}
        labelEnd={labelEnd}
        iconStart={iconStart}
        iconEnd={iconEnd}
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
        marks={sliderMarks}
        classNames={sliderClassNames}
      />
    </Stack>
  )
}
