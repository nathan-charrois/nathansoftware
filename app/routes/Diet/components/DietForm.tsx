import { useCallback } from 'react'
import { Button, Group, Slider, Stack, Text } from '@mantine/core'
import { useForm } from '@mantine/form'

import { useDietForm } from './DietFormContext'
import { useDietStepper } from './DietStepperContext'

export default function DietForm() {
  const { preferences, setPreferenceValue, initialValues, validate } = useDietForm()
  const { setActiveStep } = useDietStepper()

  const form = useForm({
    initialValues,
    validate,
    onValuesChange: (vals) => {
      Object.entries(vals).forEach(([key, value]) => {
        setPreferenceValue(key, typeof value === 'number' ? value : 0)
      })
    },
  })

  const handleSubmit = async (formValues: typeof initialValues) => {
    setActiveStep('loading')
    try {
      const res = await fetch('/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      })
      if (!res.ok) throw new Error('Failed')
      setActiveStep('success')
    }
    catch {
      setActiveStep('error')
    }
  }

  const buildSliderMarks = useCallback(
    (min: number, max: number) =>
      Array.from({ length: max - min + 1 }).map((_, i) => ({ value: min + i })),
    [],
  )

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} onReset={form.reset}>
      {preferences.map(pref => (
        <Stack key={pref.key} gap="xs" mb="md">
          <Text component="label" htmlFor={pref.key} fw={500} mb={4}>{pref.label}</Text>
          <Slider
            id={pref.key}
            label={form.values[pref.key].toString()}
            min={pref.min}
            max={pref.max}
            value={form.values[pref.key]}
            onChange={val => form.setFieldValue(pref.key, val)}
            onChangeEnd={val => setPreferenceValue(pref.key, typeof val === 'number' ? val : 0)}
            step={1}
            marks={buildSliderMarks(pref.min, pref.max)}
          />
        </Stack>
      ))}
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
        <Button type="reset">Reset</Button>
      </Group>
    </form>
  )
}
