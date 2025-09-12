import { Flex, Text } from '@mantine/core'
import { Image } from '@mantine/core'

import { useI18n } from './DietI18nProvider'
import { useDietTheme } from './DietThemeContext'

interface DietFormSliderLabelProps {
  labelStart: string
  labelEnd: string
  iconStart: string
  iconEnd: string
  id: string
}

export function DietFormSliderLabel({
  labelStart,
  labelEnd,
  iconStart,
  iconEnd,
  id,
}: DietFormSliderLabelProps) {
  const { formatMessage } = useI18n()
  const { theme } = useDietTheme()

  return (
    <Flex justify="space-between" align="center">
      <Image flex="50px" miw="65px" maw="100px" src={`/images/${theme}/${iconStart}.png`} />
      <Flex flex={10} justify="space-between" align="center">
        <Text component="label" htmlFor={id} ml="sm">{labelStart}</Text>
        <Text component="label" htmlFor={id}>{formatMessage('arrow_symbol')}</Text>
        <Text component="label" htmlFor={id} mr="sm">{labelEnd}</Text>
      </Flex>
      <Image flex="50px" miw="65px" maw="100px" src={`/images/${theme}/${iconEnd}.png`} />
    </Flex>
  )
}
