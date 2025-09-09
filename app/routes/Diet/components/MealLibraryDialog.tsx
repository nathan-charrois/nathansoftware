import { useMemo } from 'react'
import {
  ActionIcon,
  Badge,
  Card,
  Group,
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
  const { meals, removeFromLibrary } = useMealLibrary()
  const { formatMessage } = useI18n()

  const sortedMeals = useMemo(() => {
    return [...meals].sort((a, b) =>
      new Date(b.dateSaved).getTime() - new Date(a.dateSaved).getTime(),
    )
  }, [meals])

  const handleRemoveFromLibrary = (id: string) => {
    removeFromLibrary(id)
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={formatMessage('meal_library')}
      size="lg"
      withCloseButton={false}
    >
      <Stack>
        {sortedMeals.length === 0
          ? (
              <Text c="dark" ta="center" py="xl">
                {formatMessage('no_meals_saved')}
              </Text>
            )
          : (
              <ScrollArea h="50vh">
                <Stack gap="md">
                  {sortedMeals.map(meal => (
                    <Card key={meal.id} withBorder padding="md">
                      <Group gap="md" align="flex-start">
                        <img
                          src={meal.image}
                          alt={meal.name}
                          width="100px"
                        />
                        <Stack gap="xs" flex="1">
                          <Group justify="space-between" align="flex-start">
                            <Title order={4} c="dark" size="sm">
                              {meal.name}
                            </Title>
                            <ActionIcon
                              variant="subtle"
                              c="dark"
                              size="sm"
                              onClick={() => handleRemoveFromLibrary(meal.id)}
                            >
                              <IconTrash size={16} />
                            </ActionIcon>
                          </Group>
                          <Group gap="xs">
                            {meal.ingredients && meal.ingredients.map((ingredient, index) => (
                              <Badge key={index} size="xl" variant="light">
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
