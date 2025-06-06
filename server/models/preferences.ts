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
      key: 'mushy-crunchy',
      labelStart: 'Squish',
      labelEnd: 'Crunch',
      value: 3,
      min: 1,
      max: 5,
    },
    {
      type: 'range',
      key: 'grabbable-slippery',
      labelStart: 'Grab',
      labelEnd: 'Slip',
      value: 3,
      min: 1,
      max: 5,
    },
    {
      type: 'boolean',
      key: 'cute',
      label: 'Cute',
      value: 0,
    },
    {
      type: 'boolean',
      key: 'veggie-boost',
      label: 'Veggie Boost',
      value: 0,
    },
    {
      key: 'eat-with-hands',
      label: 'Eat with Hands',
      type: 'boolean',
      value: 0,
    },
    {
      type: 'boolean',
      key: 'on-the-go',
      label: 'On-the-Go',
      value: 0,
    },
    {
      type: 'boolean',
      key: 'brain-food',
      label: 'Brain Food',
      value: 0,
    },
    {
      type: 'boolean',
      key: 'animal-theme',
      label: 'Animal Theme',
      value: 0,
    },
  ]

  res.status(200).json(defaultPreferences)
}
