import { Button, Group, NumberInput, Title } from '@mantine/core'
import { isInRange, useForm } from '@mantine/form'

import { useDietForm } from './DietFormContext'

export default function DietForm() {
  const { values, setValue, reset, transform } = useDietForm()

  const form = useForm({
    initialValues: values,
    transformValues: transform,
    validate: {
      preference1: isInRange({ min: 1, max: 10 }, 'Required (1-10)'),
      preference2: isInRange({ min: 1, max: 10 }, 'Required (1-10)'),
      preference3: isInRange({ min: 1, max: 10 }, 'Required (1-10)'),
    },
  })

  const handlePreference1Change = (val: string | number) => {
    form.setFieldValue('preference1', val)
    setValue('preference1', val)
  }

  const handlePreference2Change = (val: string | number) => {
    form.setFieldValue('preference2', val)
    setValue('preference2', val)
  }

  const handlePreference3Change = (val: string | number) => {
    form.setFieldValue('preference3', val)
    setValue('preference3', val)
  }

  const handleSubmit = async (formValues: typeof values) => {
    await fetch('/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValues),
    })
    reset()
    form.reset()
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Title order={2} mb="md">The Baby Diet</Title>
      <NumberInput
        label="Does your baby prefer an American Diet?"
        min={1}
        max={10}
        value={values.preference1}
        onChange={handlePreference1Change}
        required
        placeholder="Does your baby prefer an American Diet?"
        mb="md"
      />
      <NumberInput
        label="Does your baby prefer an American Diet?"
        min={1}
        max={10}
        value={values.preference2}
        onChange={handlePreference2Change}
        required
        placeholder="Does your baby prefer an American Diet?"
        mb="md"
      />
      <NumberInput
        label="Does your baby prefer an American Diet?"
        min={1}
        max={10}
        value={values.preference3}
        onChange={handlePreference3Change}
        required
        placeholder="Does your baby prefer an American Diet?"
        mb="md"
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  )
}
