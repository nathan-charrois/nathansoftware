import { Button, Group } from '@mantine/core'

import { useI18n } from './DietI18nProvider'

export default function DietFormActions() {
  const { formatMessage } = useI18n()

  return (
    <Group pt="md">
      <Button type="submit" variant="primary" radius="lg">{formatMessage('submit')}</Button>
      <Button type="reset" variant="secondary" radius="lg">{formatMessage('reset')}</Button>
    </Group>
  )
}
