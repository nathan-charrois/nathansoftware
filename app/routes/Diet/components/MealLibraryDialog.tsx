import { useMemo } from 'react'
import {
  ActionIcon,
  Badge,
  Card,
  Group,
  Image,
  Modal,
  ScrollArea,
  Stack,
  Text,
  Title } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'

import { useI18n } from './DietI18nProvider'
import { useMealLibrary } from './MealLibraryContext'

interface MealLibraryDialogProps {
  opened: boolean
  onClose: () => void
}

export default function MealLibraryDialog({ opened, onClose }: MealLibraryDialogProps) {
  const { meals, removeMeal } = useMealLibrary()
  const { formatMessage } = useI18n()

  const sortedMeals = useMemo(() => {
    return [...meals].sort((a, b) =>
      new Date(b.dateSaved).getTime() - new Date(a.dateSaved).getTime(),
    )
  }, [meals])

  const handleRemoveMeal = (id: string) => {
    removeMeal(id)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={formatMessage('meal_library')}
      size="lg"
      centered
    >
      <Stack gap="md">
        {sortedMeals.length === 0
          ? (
              <Text c="dimmed" ta="center" py="xl">
                {formatMessage('no_meals_saved')}
              </Text>
            )
          : (
              <ScrollArea h={400}>
                <Stack gap="md">
                  {sortedMeals.map(meal => (
                    <Card key={meal.id} withBorder padding="md">
                      <Group gap="md" align="flex-start">
                        <Image
                          src="/images/baby.png"
                          alt={meal.name}
                          width={80}
                          height={80}
                          radius="md"
                          fallbackSrc="/images/baby.png"
                        />

                        <Stack gap="xs" style={{ flex: 1 }}>
                          <Group justify="space-between" align="flex-start">
                            <Title order={4} size="sm">
                              {meal.name}
                            </Title>
                            <ActionIcon
                              variant="subtle"
                              color="red"
                              size="sm"
                              onClick={() => handleRemoveMeal(meal.id)}
                            >
                              <IconTrash size={16} />
                            </ActionIcon>
                          </Group>

                          <Text size="xs" c="dimmed">
                            {formatMessage('saved_on')}
                            :
                            {formatDate(meal.dateSaved)}
                          </Text>
                          <Group gap="xs">
                            {meal.ingredients && meal.ingredients.map((ingredient, index) => (
                              <Badge key={index} size="xs" variant="light">
                                {ingredient}
                              </Badge>
                            ))}
                          </Group>
                        </Stack>
                      </Group>
                    </Card>
                  ))}
                </Stack>
              </ScrollArea>
            )}
      </Stack>
    </Modal>
  )
}
