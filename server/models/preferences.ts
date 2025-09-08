import { generateImage, generateMeal } from '@server/services/openai'
import { buildImagePrompt, buildMealPrompt } from '@server/utils/prompt'
import type { GetPreferencesResponse, PostPreferencesResponse, QueryParamTheme } from '@shared/types/api'
import { type SupportedLanguage } from '@shared/types/i18n'
import { NextFunction, Request, Response } from 'express'

const preferenceStrings = {
  en: {
    // Baby
    squishy: 'Squishy',
    crunchy: 'Crunchy',
    hot: 'Hot',
    cold: 'Cold',
    cute: 'Cute',
    veggieBoost: 'Veggie Boost',
    onTheGo: 'On-the-Go',
    brainFood: 'Brain Food',
    // Mommy
    light: 'Light',
    rich: 'Rich',
    sweet: 'Sweet',
  },
  ru: {
    squishy: 'Мягкий',
    crunchy: 'Хрустящий',
    hot: 'Горячий',
    cold: 'Холодный',
    cute: 'Милый',
    veggieBoost: 'Овощной буст',
    onTheGo: 'На ходу',
    brainFood: 'Пища для ума',
    // Mommy
    light: 'Легкий',
    rich: 'Питательный',
    sweet: 'Сладкий',
  },
}

const getPreferencesByLanguage = (language: SupportedLanguage, theme: QueryParamTheme) => {
  if (theme === 'mommy') {
    return [
      {
        type: 'range',
        key: 'light-rich',
        labelStart: preferenceStrings[language].light,
        labelEnd: preferenceStrings[language].rich,
        iconStart: 'light',
        iconEnd: 'rich',
        value: 10,
        min: 0,
        max: 20,
      },
      {
        type: 'boolean',
        key: 'sweet',
        label: preferenceStrings[language].sweet,
        icon: 'sweet',
        value: 0,
      },
    ]
  }

  return [
    {
      type: 'range',
      key: 'squishy-crunchy',
      labelStart: preferenceStrings[language].squishy,
      labelEnd: preferenceStrings[language].crunchy,
      iconStart: 'squishy',
      iconEnd: 'crunchy',
      value: 10,
      min: 0,
      max: 20,
    },
    {
      type: 'range',
      key: 'hot-cold',
      labelStart: preferenceStrings[language].hot,
      labelEnd: preferenceStrings[language].cold,
      iconStart: 'hot',
      iconEnd: 'cold',
      value: 10,
      min: 0,
      max: 20,
    },
    {
      type: 'boolean',
      key: 'cute',
      label: preferenceStrings[language].cute,
      icon: 'brain',
      value: 0,
    },
    {
      type: 'boolean',
      key: 'veggie_boost',
      label: preferenceStrings[language].veggieBoost,
      icon: 'veggie',
      value: 0,
    },
    {
      type: 'boolean',
      key: 'on_the_go',
      label: preferenceStrings[language].onTheGo,
      icon: 'brain',
      value: 0,
    },
    {
      type: 'boolean',
      key: 'brain_food',
      label: preferenceStrings[language].brainFood,
      icon: 'brain',
      value: 0,
    },
  ]
}

export const getLanguage = (req: Request): SupportedLanguage => {
  const acceptLanguage = req.headers['accept-language']

  let language: SupportedLanguage = 'en'

  if (acceptLanguage && acceptLanguage.includes('ru')) {
    language = 'ru'
  }

  return language
}
export const getTheme = (req: Request): 'baby' | 'mommy' => {
  const theme = req.query.theme as string | undefined

  if (theme === 'baby' || theme === 'mommy') {
    return theme
  }

  return 'baby'
}

export const handlePostPreferences = async (
  req: Request,
  res: Response<PostPreferencesResponse>,
  next: NextFunction,
) => {
  try {
    const language = getLanguage(req)

    const mealPrompt = buildMealPrompt(req.body, language)
    const { title, ingredients } = await generateMeal(mealPrompt)

    const imagePrompt = buildImagePrompt(title, ingredients)
    const { image } = await generateImage(imagePrompt)

    res.status(200).json({ title, ingredients, image })
  }
  catch (error) {
    next(error)
  }
}

export const handleGetPreferences = (
  req: Request,
  res: Response<GetPreferencesResponse[]>,
) => {
  const language = getLanguage(req)
  const theme = getTheme(req)
  const preferences = getPreferencesByLanguage(language, theme)

  res.status(200).json(preferences)
}
