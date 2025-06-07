import { useCallback, useRef } from 'react'
import { Flex, Slider, Stack, Text } from '@mantine/core'
import { Image } from '@mantine/core'
import { playSlideSound } from '@utils/sound'

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
    <Stack gap="lg" mb="xl">
      <Flex justify="space-between" align="center">
        <Image flex="60px" src={`/public/images/${labelStart}.png`} />
        <Flex flex={10} justify="center" align="center" gap={8}>
          <Text component="label" htmlFor={id}>{labelStart}</Text>
          <Text component="label" htmlFor={id}>↔</Text>
          <Text component="label" htmlFor={id}>{labelEnd}</Text>
        </Flex>
        <Image flex="60px" src={`/public/images/${labelEnd}.png`} />
      </Flex>
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
