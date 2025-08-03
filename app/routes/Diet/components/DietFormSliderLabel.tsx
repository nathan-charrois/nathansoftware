import { Flex, Text } from '@mantine/core'
import { Image } from '@mantine/core'

import { useI18n } from './DietI18nProvider'

interface DietFormSliderLabelProps {
  labelStart: string
  labelEnd: string
  id: string
}

export function DietFormSliderLabel({
  labelStart,
  labelEnd,
  id,
}: DietFormSliderLabelProps) {
  const { formatMessage } = useI18n()

  return (
    <Flex justify="space-between" align="center">
      <Image flex="50px" src={`/images/${labelStart}.png`} />
      <Flex flex={10} justify="center" align="center" gap={10}>
        <Text component="label" htmlFor={id}>{labelStart}</Text>
        <Text component="label" htmlFor={id}>{formatMessage('arrow_symbol')}</Text>
        <Text component="label" htmlFor={id}>{labelEnd}</Text>
      </Flex>
      <Image flex="50px" src={`/images/${labelEnd}.png`} />
    </Flex>
  )
}
