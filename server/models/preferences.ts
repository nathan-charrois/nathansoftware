import { generateMealPrompt } from '@server/services/openai'
import { buildPrompt } from '@server/utils/prompt'
import type { GetPreferencesResponse, PostPreferencesResponse } from '@shared/types/api'
import { NextFunction, Request, Response } from 'express'

export const handlePostPreferences = async (
  req: Request,
  res: Response<PostPreferencesResponse>,
  next: NextFunction,
) => {
  try {
    const prompt = buildPrompt(req.body)
    const title = await generateMealPrompt(prompt)
    const image = ''

    res.status(200).json({ title, image })
  }
  catch (error) {
    next(error)
  }
}

export const handleGetPreferences = (
  req: Request,
  res: Response<GetPreferencesResponse[]>,
) => {
  const defaultPreferences = [
    {
      type: 'range',
      key: 'squishy-crunchy',
      labelStart: 'Squishy',
      labelEnd: 'Crunchy',
      value: 5,
      min: 1,
      max: 10,
    },
    {
      type: 'range',
      key: 'hot-cold',
      labelStart: 'Hot',
      labelEnd: 'Cold',
      value: 5,
      min: 1,
      max: 10,
    },
    {
      type: 'boolean',
      key: 'cute',
      label: 'Cute',
      icon: 'Brain',
      value: 0,
    },
    {
      type: 'boolean',
      key: 'veggie-boost',
      label: 'Veggie Boost',
      icon: 'Veggie',
      value: 0,
    },
    {
      type: 'boolean',
      key: 'on-the-go',
      label: 'On-the-Go',
      icon: 'Brain',
      value: 0,
    },
    {
      type: 'boolean',
      key: 'brain-food',
      label: 'Brain Food',
      icon: 'Brain',
      value: 0,
    },
  ]

  res.status(200).json(defaultPreferences)
}
