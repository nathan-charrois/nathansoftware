import { useCallback, useEffect, useMemo, useState } from 'react'
import { Slider, Stack } from '@mantine/core'

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
  onChangeEnd,
}: DietFormSliderProps) {
  const isMobile = useIsMobile()
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleOnChange = useCallback((val: number) => {
    setLocalValue(val)
  }, [])

  const sliderMarks = useMemo(() => (
    buildSliderMarks(min, max)
  ), [min, max])

  const marginBottom = useMemo(() => (
    isMobile ? 'xs' : 'xl'
  ), [isMobile])

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
        value={localValue}
        size={10}
        thumbSize={28}
        onChange={handleOnChange}
        onChangeEnd={onChangeEnd}
        marks={sliderMarks}
        classNames={sliderClassNames}
      />
    </Stack>
  )
}
