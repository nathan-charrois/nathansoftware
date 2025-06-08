import { Button, Group } from '@mantine/core'

export default function DietFormActions() {
  return (
    <Group pt="md">
      <Button type="submit" variant="primary" radius="lg">Submit</Button>
      <Button type="reset" variant="secondary" radius="lg">Reset</Button>
    </Group>
  )
}
