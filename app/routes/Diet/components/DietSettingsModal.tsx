import { useCallback, useEffect, useState } from 'react'
import { Modal, Stack, Title } from '@mantine/core'
import {
  isSupportedLangauge,
  LANGUAGE_STORAGE_KEY,
  type SupportedLanguage,
} from '@shared/types/i18n'
import { detectLanguage } from '@utils/languageDetection'

import { useI18n } from './DietI18nProvider'
import DietSettingsActions from './DietSettingsActions'
import DietSettingsForm from './DietSettingsForm'

// TODO
const SOUND_STORAGE_KEY = 'baby-diet-sound-enabled'

interface DietSettingsModalProps {
  opened: boolean
  onClose: () => void
}

interface SettingsState {
  language: SupportedLanguage
  soundEnabled: boolean
}

const loadSettingsFromStorage = (): SettingsState => {
  const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY)
  const storedSound = localStorage.getItem(SOUND_STORAGE_KEY)

  const language = isSupportedLangauge(storedLanguage) ? storedLanguage : detectLanguage()
  const soundEnabled = storedSound !== null ? storedSound === 'true' : true

  return { language, soundEnabled }
}

const saveSettingsToStorage = (settings: SettingsState) => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, settings.language)
  localStorage.setItem(SOUND_STORAGE_KEY, settings.soundEnabled.toString())
}

export default function DietSettingsModal({ opened, onClose }: DietSettingsModalProps) {
  const [currentSettings, setCurrentSettings] = useState<SettingsState>({ language: 'en', soundEnabled: true })
  const [tempSettings, setTempSettings] = useState<SettingsState>({ language: 'en', soundEnabled: true })
  const { formatMessage } = useI18n()

  useEffect(() => {
    const settings = loadSettingsFromStorage()
    setCurrentSettings(settings)
    setTempSettings(settings)
  }, [])

  useEffect(() => {
    if (opened) {
      setTempSettings(currentSettings)
    }
  }, [opened, currentSettings])

  const handleApply = useCallback(() => {
    const hasLanguageChanged = tempSettings.language !== currentSettings.language
    const hasSoundChanged = tempSettings.soundEnabled !== currentSettings.soundEnabled

    if (hasLanguageChanged || hasSoundChanged) {
      setCurrentSettings(tempSettings)
      saveSettingsToStorage(tempSettings)

      if (hasLanguageChanged) {
        window.location.reload()
      }
    }

    onClose()
  }, [tempSettings, currentSettings, onClose])

  const handleClose = useCallback(() => {
    setTempSettings(currentSettings)
    onClose()
  }, [currentSettings, onClose])

  const handleSettingsChange = useCallback((newSettings: SettingsState) => {
    setTempSettings(newSettings)
  }, [])

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={<Title>{formatMessage('settings')}</Title>}
      size="md"
      withCloseButton={false}
    >
      <Stack gap="lg">
        <DietSettingsForm
          settings={tempSettings}
          onSettingsChange={handleSettingsChange}
        />
        <DietSettingsActions onApply={handleApply} onClose={handleClose} />
      </Stack>
    </Modal>
  )
}
