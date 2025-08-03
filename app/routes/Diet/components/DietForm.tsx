import { useCallback } from 'react'
import { Image } from '@mantine/core'
import { useForm } from '@mantine/form'
import { type PostPreferencesResponse } from '@shared/types/api'
import { fetchData } from '@utils/fetchUtils'

import DietFormActions from './DietFormActions'
import DietFormChip from './DietFormChip'
import { useDietForm } from './DietFormContext'
import DietFormLayout from './DietFormLayout'
import DietFormSlider from './DietFormSlider'
import { useDietResult } from './DietResultContext'
import { useDietStep } from './DietStepContext'

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
      <DietFormLayout
        slotOne={(
          <DietFormSlider
            key={firstPreference.key}
            labelStart={firstPreference.labelStart}
            labelEnd={firstPreference.labelEnd}
            iconStart={firstPreference.iconStart}
            iconEnd={firstPreference.iconEnd}
            id={firstPreference.key}
            value={form.values[firstPreference.key]}
            min={firstPreference.min}
            max={firstPreference.max}
            onChange={handleChange(firstPreference.key)}
            onChangeEnd={handleChangeEnd(firstPreference.key)}
          />
        )}
        slotTwo={restPreferences.map(pref => (
          <DietFormSlider
            key={pref.key}
            labelStart={pref.labelStart}
            labelEnd={pref.labelEnd}
            iconStart={pref.iconStart}
            iconEnd={pref.iconEnd}
            id={pref.key}
            min={pref.min}
            max={pref.max}
            value={form.values[pref.key]}
            onChange={handleChange(pref.key)}
            onChangeEnd={handleChangeEnd(pref.key)}
          />
        ))}
        slotThree={preferencesByType.boolean.map(pref => (
          <DietFormChip
            key={pref.key}
            label={pref.label}
            id={pref.key}
            icon={pref.icon}
            value={form.values[pref.key]}
            onChange={handleChange(pref.key)}
          />
        ))}
        image={<Image src="/images/baby.png" />}
        actions={<DietFormActions />}
      />
    </form>
  )
}
