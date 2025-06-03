import { Button, Group, NumberInput } from '@mantine/core'
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
        <NumberInput
          key={pref.key}
          label={pref.label}
          min={pref.min}
          max={pref.max}
          value={form.values[pref.key]}
          onChange={val => setPreferenceValue(pref.key, typeof val === 'number' ? val : 0)}
          required
          placeholder={pref.label}
          mb="md"
          clampBehavior="strict"
          allowNegative={false}
          allowDecimal={false}
          error={form.errors[pref.key]}
        />
      ))}
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
        <Button type="reset">Reset</Button>
      </Group>
    </form>
  )
}
