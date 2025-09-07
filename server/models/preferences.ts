import { generateImage, generateMeal } from '@server/services/openai'
import { buildImagePrompt, buildMealPrompt } from '@server/utils/prompt'
import type { GetPreferencesResponse, PostPreferencesResponse } from '@shared/types/api'
import { type SupportedLanguage } from '@shared/types/i18n'
import { NextFunction, Request, Response } from 'express'

const preferenceStrings = {
  en: {
    squishy: 'Squishy',
    crunchy: 'Crunchy',
    hot: 'Hot',
    cold: 'Cold',
    cute: 'Cute',
    veggieBoost: 'Veggie Boost',
    onTheGo: 'On-the-Go',
    brainFood: 'Brain Food',
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
  },
}

const getPreferencesByLanguage = (language: SupportedLanguage) => [
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

export const getLanguage = (req: Request): SupportedLanguage => {
  const acceptLanguage = req.headers['accept-language']

  let language: SupportedLanguage = 'en'

  if (acceptLanguage && acceptLanguage.includes('ru')) {
    language = 'ru'
  }

  return language
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
  const preferences = getPreferencesByLanguage(language)

  res.status(200).json(preferences)
}
