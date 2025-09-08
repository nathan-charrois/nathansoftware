import { Space, Title } from '@mantine/core'

import { useI18n } from './DietI18nProvider'
import { useDietTheme } from './DietThemeContext'

export default function DietTitle() {
  const { formatMessage } = useI18n()
  const { theme } = useDietTheme()

  return (
    <>
      <Title ta="center" size="xl" mb="lg">
        {theme === 'baby' ? formatMessage('baby_diet_preferences') : formatMessage('mommy_diet_preferences')}
      </Title>
      <Space h="xl" />
    </>
  )
}
