import { useCallback } from 'react'
import { Button, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { fetchData } from 'app/utils/fetchUtils'
import { type PostPreferencesResponse } from 'shared/types/api'

import { useDietForm } from './DietFormContext'
import DietFormSlider from './DietFormSlider'
import { useDietStep } from './DietStepContext'

export default function DietForm() {
  const { initialValues, preferences, setPreference, validate } = useDietForm()
  const { setActiveStep } = useDietStep()

  const form = useForm({
    initialValues,
    validate,
  })

  const handleChange = useCallback(
    (key: string) => (val: number) => {
      form.setFieldValue(key, val)
    },
    [form],
  )

  const handleChangeEnd = useCallback(
    (key: string) => (val: number) => {
      setPreference(key, typeof val === 'number' ? val : 0)
    },
    [setPreference],
  )

  const handleSubmit = async (formValues: typeof initialValues) => {
    setActiveStep('loading')

    try {
      await fetchData<PostPreferencesResponse>({
        url: '/preferences',
        method: 'POST',
        body: formValues,
      })

      setActiveStep('result')
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
      <Group justify="center" mt="lg">
        <Button type="submit">Submit</Button>
        <Button type="reset">Reset</Button>
      </Group>
    </form>
  )
}
