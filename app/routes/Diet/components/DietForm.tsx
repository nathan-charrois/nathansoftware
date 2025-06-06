import { useCallback } from 'react'
import { Button, Group, Stack } from '@mantine/core'
import { SimpleGrid } from '@mantine/core'
import { useForm } from '@mantine/form'
import { type PostPreferencesResponse } from '@shared/types/api'
import { fetchData } from '@utils/fetchUtils'

import DietFormChip from './DietFormChip'
import { useDietForm } from './DietFormContext'
import DietFormSlider from './DietFormSlider'
import { useDietResult } from './DietResultContext'
import { useDietStep } from './DietStepContext'

export default function DietForm() {
  const { initialValues, preferencesByType, setPreference, validate } = useDietForm()

  const { setActiveStep } = useDietStep()
  const { addResult } = useDietResult()

  const form = useForm({ initialValues, validate })

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
      const response = await fetchData<PostPreferencesResponse>({
        url: '/preferences',
        method: 'POST',
        body: formValues,
      })

      addResult(response)
      setActiveStep('result')
    }
    catch {
      setActiveStep('error')
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} onReset={form.reset}>
      <Stack mb="lg">
        {preferencesByType.range.map(pref => (
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
      </Stack>
      <SimpleGrid cols={3} mt="lg">
        {preferencesByType.boolean.map(pref => (
          <DietFormChip
            key={pref.key}
            label={pref.label}
            id={pref.key}
            value={form.values[pref.key]}
            onChange={handleChange(pref.key)}
          />
        ))}
      </SimpleGrid>
      <Group justify="center" mt="lg">
        <Button type="submit">Submit</Button>
        <Button type="reset">Reset</Button>
      </Group>
    </form>
  )
}
