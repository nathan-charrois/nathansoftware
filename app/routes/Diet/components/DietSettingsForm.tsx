import { useCallback } from 'react'
import { Checkbox, NativeSelect, Stack } from '@mantine/core'
import { type SupportedLanguage } from '@shared/types/i18n'

import { useI18n } from './DietI18nProvider'

const LANGUAGE_OPTIONS = [
  { value: 'en' as const, label: '🇺🇸 English' },
  { value: 'ru' as const, label: '🇷🇺 Русский' },
] as const

interface SettingsState {
  language: SupportedLanguage
  soundEnabled: boolean
}

interface DietSettingsFormProps {
  settings: SettingsState
  onSettingsChange: (settings: SettingsState) => void
}

export default function DietSettingsForm({ settings, onSettingsChange }: DietSettingsFormProps) {
  const { formatMessage } = useI18n()

  const handleSoundToggle = useCallback((soundEnabled: boolean) => {
    onSettingsChange({ ...settings, soundEnabled })
  }, [settings, onSettingsChange])

  const handleLanguageChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.currentTarget.value as SupportedLanguage
    if (newLanguage === 'en' || newLanguage === 'ru') {
      onSettingsChange({ ...settings, language: newLanguage })
    }
  }, [settings, onSettingsChange])

  return (
    <Stack gap="lg">

      <NativeSelect
        value={settings.language}
        label={formatMessage('language')}
        onChange={handleLanguageChange}
        data={LANGUAGE_OPTIONS.map(option => ({
          value: option.value,
          label: option.label,
        }))}
      />

      <Checkbox
        label={formatMessage('play_sounds')}
        checked={settings.soundEnabled}
        onChange={event => handleSoundToggle(event.currentTarget.checked)}
      />
    </Stack>
  )
}
