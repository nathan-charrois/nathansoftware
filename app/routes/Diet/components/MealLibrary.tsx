import { useState } from 'react'
import { LibrariesIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { ActionIcon } from '@mantine/core'

import MealLibraryDialog from './MealLibraryDialog'

export default function MealLibrary() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenDialog = () => {
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <>
      <ActionIcon
        variant="transparent"
        size="lg"
        onClick={handleOpenDialog}
      >
        <HugeiconsIcon icon={LibrariesIcon} size={24} />

      </ActionIcon>
      <MealLibraryDialog
        opened={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </>
  )
}
