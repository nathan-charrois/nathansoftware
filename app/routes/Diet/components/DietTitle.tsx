import { useMemo } from 'react'
import { Flex, Space, Title } from '@mantine/core'

import { useI18n } from './DietI18nProvider'
import { useDietTheme } from './DietThemeContext'
import { useIsMobile } from '~/hooks/useIsMobile'

export default function DietTitle() {
  const { formatMessage } = useI18n()
  const { theme } = useDietTheme()
  const isMobile = useIsMobile()

  const titleBottomMargin = useMemo(() =>
    isMobile ? 'sm' : 'xl',
  [isMobile],
  )

  return (
    <Flex justify="center">
      <Title ta="center" size="xl" mb={titleBottomMargin} maw={375}>
        {theme === 'baby'
          ? formatMessage('baby_diet_preferences')
          : formatMessage('mommy_diet_preferences')}
      </Title>
      {isMobile ? null : <Space h="xl" />}
    </Flex>
  )
}
