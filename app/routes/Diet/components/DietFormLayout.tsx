import type { ReactNode } from 'react'
import { Grid, SimpleGrid } from '@mantine/core'

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
  return (
    <Grid columns={20}>
      <Grid.Col span={20}>
        {slotOne}
      </Grid.Col>
      <Grid.Col span={11}>
        {slotTwo}
        <SimpleGrid cols={1} mb="lg">
          {slotThree}
        </SimpleGrid>
        {actions}
      </Grid.Col>
      <Grid.Col span={9}>
        {image}
      </Grid.Col>
    </Grid>
  )
}
