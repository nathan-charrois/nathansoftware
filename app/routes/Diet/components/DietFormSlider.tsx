import { Slider, Stack, Text } from '@mantine/core'

interface DietFormSliderProps {
  label: string
  id: string
  value: number
  min: number
  max: number
  onChange: (val: number) => void
  onChangeEnd: (val: number) => void
}

function buildSliderMarks(min: number, max: number) {
  return Array.from({ length: max - min + 1 }).map((_, i) => ({ value: min + i }))
}

export default function DietFormSlider({
  label,
  id,
  value,
  min,
  max,
  onChange,
  onChangeEnd,
}: DietFormSliderProps) {
  return (
    <Stack gap="xs" mb="md">
      <Text component="label" htmlFor={id} fw={500} mb={4}>{label}</Text>
      <Slider
        id={id}
        label={value.toString()}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        onChangeEnd={onChangeEnd}
        step={1}
        marks={buildSliderMarks(min, max)}
      />
    </Stack>
  )
}
