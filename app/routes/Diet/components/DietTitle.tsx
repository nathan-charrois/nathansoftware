import { Space, Title } from '@mantine/core'

import { useI18n } from './DietI18nProvider'

export default function DietTitle() {
  const { formatMessage } = useI18n()

  return (
    <>
      <Title ta="center" mb="lg">
        {formatMessage('baby_diet_preferences')}
      </Title>
      <Space h="xl" />
    </>
  )
}
