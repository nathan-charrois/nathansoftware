import { useCallback, useState } from 'react'
import { Settings01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { ActionIcon } from '@mantine/core'

import DietSettingsModal from './DietSettingsModal'

export default function DietSettings() {
  const [opened, setOpened] = useState(false)

  const handleOpenSettings = useCallback(() => {
    setOpened(true)
  }, [setOpened])

  const handleCloseSettings = useCallback(() => {
    setOpened(false)
  }, [setOpened])

  return (
    <>
      <ActionIcon
        variant="transparent"
        color="lime"
        size="lg"
        onClick={handleOpenSettings}
      >
        <HugeiconsIcon icon={Settings01Icon} size={24} />
      </ActionIcon>
      <DietSettingsModal
        opened={opened}
        onClose={handleCloseSettings}
      />
    </>
  )
}
