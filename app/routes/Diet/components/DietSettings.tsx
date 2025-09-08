import { useCallback, useState } from 'react'
import { Settings01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '@mantine/core'

import { useI18n } from './DietI18nProvider'
import DietSettingsModal from './DietSettingsModal'

export default function DietSettings() {
  const [opened, setOpened] = useState(false)
  const { formatMessage } = useI18n()

  const handleOpenSettings = useCallback(() => {
    setOpened(true)
  }, [setOpened])

  const handleCloseSettings = useCallback(() => {
    setOpened(false)
  }, [setOpened])

  return (
    <>
      <Button
        onClick={handleOpenSettings}
        leftSection={<HugeiconsIcon icon={Settings01Icon} />}
        size="xs"
      >
        {formatMessage('settings')}
      </Button>
      <DietSettingsModal
        opened={opened}
        onClose={handleCloseSettings}
      />
    </>
  )
}
