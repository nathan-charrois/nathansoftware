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
      key: 'american-food',
      label: 'Inspration from American food?',
      value: 1,
      min: 1,
      max: 5,
    },
    {
      key: 'sea-food',
      label: 'Inspration from SeaFood and Asian Pacific?',
      value: 1,
      min: 1,
      max: 5,
    },
    {
      key: 'stomach-safe',
      label: 'Inspration from Stomach Safe?',
      value: 1,
      min: 1,
      max: 5,
    },
  ]

  res.status(200).json(defaultPreferences)
}
