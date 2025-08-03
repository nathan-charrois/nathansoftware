import { useCallback, useMemo } from 'react'
import { Checkbox, Stack, Text } from '@mantine/core'
import { Combobox, useCombobox } from '@mantine/core'
import { isSupportedLangauge, type SupportedLanguage } from '@shared/types/i18n'

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

const LanguageSelector = ({
  value,
  onChange,
}: {
  value: SupportedLanguage
  onChange: (language: SupportedLanguage) => void
}) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  })

  const selectedOption = useMemo(() =>
    LANGUAGE_OPTIONS.find(option => option.value === value),
  [value],
  )

  const handleLanguageChange = useCallback((newLanguage: string) => {
    if (isSupportedLangauge(newLanguage)) {
      onChange(newLanguage as SupportedLanguage)
    }
    combobox.closeDropdown()
  }, [onChange, combobox])

  const options = useMemo(() =>
    LANGUAGE_OPTIONS.map(option => (
      <Combobox.Option value={option.value} key={option.value}>
        {option.label}
      </Combobox.Option>
    )),
  [],
  )

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleLanguageChange}
    >
      <Combobox.Target>
        <Combobox.EventsTarget>
          <div
            style={{
              cursor: 'pointer',
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              minWidth: '120px',
            }}
            onClick={() => combobox.toggleDropdown()}
          >
            <span>{selectedOption?.label || '🇺🇸 English'}</span>
            <Combobox.Chevron />
          </div>
        </Combobox.EventsTarget>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}

export default function DietSettingsForm({ settings, onSettingsChange }: DietSettingsFormProps) {
  const { formatMessage } = useI18n()

  const handleLanguageChange = useCallback((language: SupportedLanguage) => {
    onSettingsChange({ ...settings, language })
  }, [settings, onSettingsChange])

  const handleSoundToggle = useCallback((soundEnabled: boolean) => {
    onSettingsChange({ ...settings, soundEnabled })
  }, [settings, onSettingsChange])

  return (
    <Stack gap="lg">
      <div>
        <Text size="sm" mb="xs">{formatMessage('language')}</Text>
        <LanguageSelector
          value={settings.language}
          onChange={handleLanguageChange}
        />
      </div>

      <Checkbox
        label={formatMessage('play_sounds')}
        checked={settings.soundEnabled}
        onChange={event => handleSoundToggle(event.currentTarget.checked)}
      />
    </Stack>
  )
}
