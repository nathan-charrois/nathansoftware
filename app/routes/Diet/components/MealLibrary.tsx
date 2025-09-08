import { useState } from 'react'
import { LibrariesIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '@mantine/core'
import { useDidUpdate } from '@mantine/hooks'

import { useI18n } from './DietI18nProvider'
import { useMealLibrary } from './MealLibraryContext'
import MealLibraryDialog from './MealLibraryDialog'
import { playSuccessSound } from '~/utils/sound'

export default function MealLibrary() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { count } = useMealLibrary()
  const { formatMessage } = useI18n()

  useDidUpdate(
    () => { playSuccessSound() },
    [count],
  )

  const handleOpenDialog = () => {
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <>
      <Button
        onClick={handleOpenDialog}
        leftSection={<HugeiconsIcon icon={LibrariesIcon} size="24" />}
        size="xs"
      >
        {formatMessage('meal_library')}
      </Button>
      <MealLibraryDialog
        opened={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </>
  )
}
