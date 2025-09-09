import { useMemo } from 'react'
import { Button, Group } from '@mantine/core'

import { useI18n } from './DietI18nProvider'
import { useIsMobile } from '~/hooks/useIsMobile'

export default function DietFormActions() {
  const { formatMessage } = useI18n()
  const isMobile = useIsMobile()

  const marginBottom = useMemo(() => {
    return isMobile ? '' : 'xl'
  }, [isMobile])

  return (
    <Group pt={marginBottom}>
      <Button type="submit" variant="primary" radius="lg">{formatMessage('submit')}</Button>
      <Button type="reset" variant="secondary" radius="lg">{formatMessage('reset')}</Button>
    </Group>
  )
}
