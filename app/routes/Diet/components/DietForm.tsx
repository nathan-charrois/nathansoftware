import { useCallback } from 'react'
import { Button, Group } from '@mantine/core'
import { useForm } from '@mantine/form'

import { useDietForm } from './DietFormContext'
import DietFormSlider from './DietFormSlider'
import { useDietStep } from './DietStepContext'

export default function DietForm() {
  const { preferences, setPreferenceValue, initialValues, validate } = useDietForm()
  const { setActiveStep } = useDietStep()

  const form = useForm({
    initialValues,
    validate,
    onValuesChange: (vals) => {
      Object.entries(vals).forEach(([key, value]) => {
        setPreferenceValue(key, typeof value === 'number' ? value : 0)
      })
    },
  })

  const handleChange = useCallback(
    (key: string) => (val: number) => {
      form.setFieldValue(key, val)
    },
    [form],
  )

  const handleChangeEnd = useCallback(
    (key: string) => (val: number) => {
      setPreferenceValue(key, typeof val === 'number' ? val : 0)
    },
    [setPreferenceValue],
  )

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

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} onReset={form.reset}>
      {preferences.map(pref => (
        <DietFormSlider
          key={pref.key}
          label={pref.label}
          id={pref.key}
          value={form.values[pref.key]}
          min={pref.min}
          max={pref.max}
          onChange={handleChange(pref.key)}
          onChangeEnd={handleChangeEnd(pref.key)}
        />
      ))}
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
        <Button type="reset">Reset</Button>
      </Group>
    </form>
  )
}
