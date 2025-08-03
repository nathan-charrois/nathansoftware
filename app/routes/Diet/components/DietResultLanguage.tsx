import { useEffect, useMemo, useState } from 'react'
import { Combobox, useCombobox } from '@mantine/core'
import {
  isSupportedLangauge,
  LANGUAGE_STORAGE_KEY,
  type SupportedLanguage,
} from '@shared/types/i18n'
import { detectLanguage } from '@utils/languageDetection'

interface LanguageOption {
  value: SupportedLanguage
  label: string
}

const languageOptions: LanguageOption[] = [
  { value: 'en', label: '🇺🇸' },
  { value: 'ru', label: '🇷🇺' },
]

export default function DietResultLanguage() {
  const [value, setValue] = useState<SupportedLanguage>('en')

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  })

  useEffect(() => {
    const detectedLanguage = detectLanguage()
    setValue(detectedLanguage)
  }, [])

  const handleLanguageChange = (language: string) => {
    if (isSupportedLangauge(language)) {
      setValue(language)
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    }

    combobox.closeDropdown()
    window.location.reload()
  }

  const options = useMemo(() =>
    languageOptions.map(option => (
      <Combobox.Option value={option.value} key={option.value}>
        {option.label}
      </Combobox.Option>
    )),
  [languageOptions])

  const selectedOption = useMemo(() =>
    languageOptions.find(option => option.value === value),
  [languageOptions])

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleLanguageChange}
    >
      <Combobox.Target>
        <Combobox.EventsTarget>
          <div onClick={() => combobox.toggleDropdown()}>
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
