import { Button, Group, Slider } from '@mantine/core'
import { useForm } from '@mantine/form'

import { useDietForm } from './DietFormContext'

export default function DietForm() {
  const { preferences, setPreferenceValue, initialValues, validate } = useDietForm()

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
    await fetch('/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValues),
    })
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} onReset={form.reset}>
      {preferences.map(pref => (
        <Slider
          key={pref.key}
          label={form.values[pref.key].toString()}
          min={pref.min}
          max={pref.max}
          value={form.values[pref.key]}
          onChange={val => form.setFieldValue(pref.key, val)}
          onChangeEnd={val => setPreferenceValue(pref.key, typeof val === 'number' ? val : 0)}
          step={1}
          marks={Array.from({ length: pref.max - pref.min + 1 }).map((_, i) => ({ value: pref.min + i }))}
          mb="md"
        />
      ))}
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
        <Button type="reset">Reset</Button>
      </Group>
    </form>
  )
}
