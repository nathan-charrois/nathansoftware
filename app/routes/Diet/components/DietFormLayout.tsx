import type { ReactNode } from 'react'
import { Grid, Group, SimpleGrid } from '@mantine/core'

import { useIsMobile } from '~/hooks/useIsMobile'

interface DietFormLayoutProps {
  slotOne: ReactNode
  slotTwo: ReactNode
  slotThree: ReactNode
  image: ReactNode
  actions: ReactNode
}

export default function DietFormLayout({
  slotOne,
  slotTwo,
  slotThree,
  image,
  actions,
}: DietFormLayoutProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Grid columns={20}>
        <Grid.Col span={20}>
          {slotOne}
        </Grid.Col>
        <Grid.Col span={20}>
          {slotTwo}
        </Grid.Col>
        <Grid.Col span={13}>
          <Group gap="xs" mx={-10}>
            {slotThree}
          </Group>
        </Grid.Col>
        <Grid.Col span={7} pl={0}>
          {image}
        </Grid.Col>
        <Grid.Col span={20}>
          {actions}
        </Grid.Col>
      </Grid>
    )
  }

  return (
    <Grid columns={20}>
      <Grid.Col span={20}>
        {slotOne}
      </Grid.Col>
      <Grid.Col span={11}>
        {slotTwo}
        <SimpleGrid cols={1} mb="lg" mx={-10}>
          {slotThree}
        </SimpleGrid>
        {actions}
      </Grid.Col>
      <Grid.Col span={9} h={520}>
        {image}
      </Grid.Col>
    </Grid>
  )
}
