import { useCallback } from 'react'
import { Button, Group } from '@mantine/core'
import { SimpleGrid } from '@mantine/core'
import { Image } from '@mantine/core'
import { Grid } from '@mantine/core'
import { useForm } from '@mantine/form'
import { type PostPreferencesResponse } from '@shared/types/api'
import { fetchData } from '@utils/fetchUtils'

import DietFormChip from './DietFormChip'
import { useDietForm } from './DietFormContext'
import DietFormSlider from './DietFormSlider'
import { useDietResult } from './DietResultContext'
import { useDietStep } from './DietStepContext'
import baby from '/public/images/baby.png'

export default function DietForm() {
  const { initialValues, preferencesByType, setPreference, validate } = useDietForm()

  const { setActiveStep } = useDietStep()
  const { addResult } = useDietResult()

  const form = useForm({ initialValues, validate })

  const [firstPreference, ...restPreferences] = preferencesByType.range

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
      <Grid columns={20}>
        <Grid.Col span={20}>
          <DietFormSlider
            key={firstPreference.key}
            labelStart={firstPreference.labelStart}
            labelEnd={firstPreference.labelEnd}
            id={firstPreference.key}
            value={form.values[firstPreference.key]}
            min={firstPreference.min}
            max={firstPreference.max}
            onChange={handleChange(firstPreference.key)}
            onChangeEnd={handleChangeEnd(firstPreference.key)}
          />
        </Grid.Col>
        <Grid.Col span={11}>
          {restPreferences.map(pref => (
            <DietFormSlider
              key={pref.key}
              labelStart={pref.labelStart}
              labelEnd={pref.labelEnd}
              id={pref.key}
              min={pref.min}
              max={pref.max}
              value={form.values[pref.key]}
              onChange={handleChange(pref.key)}
              onChangeEnd={handleChangeEnd(pref.key)}
            />
          ))}
          <SimpleGrid cols={1} mb="lg">
            {preferencesByType.boolean.map(pref => (
              <DietFormChip
                key={pref.key}
                label={pref.label}
                id={pref.key}
                icon={pref.icon}
                value={form.values[pref.key]}
                onChange={handleChange(pref.key)}
              />
            ))}
          </SimpleGrid>
          <Group pt="md">
            <Button type="submit" variant="primary" radius="lg">Submit</Button>
            <Button type="reset" variant="secondary" radius="lg">Reset</Button>
          </Group>
        </Grid.Col>
        <Grid.Col span={9}>
          <Image src={baby} />
        </Grid.Col>
      </Grid>
    </form>
  )
}
