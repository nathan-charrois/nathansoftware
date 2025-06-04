import { generateMealPrompt } from '@server/services/openai'
import { buildPrompt } from '@server/utils/preferences'
import { NextFunction, Request, Response } from 'express'

export const handlePostPreferences = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const prompt = buildPrompt(req.body)
    const title = await generateMealPrompt(prompt)

    res.status(200).json({ title })
  }
  catch (error) {
    next(error)
  }
}

export const handleGetPreferences = (
  req: Request,
  res: Response,
) => {
  const defaultPreferences = [
    {
      key: 'preference1',
      label: 'Does your1 0baby prefer an American Diet?',
      value: 1,
      min: 1,
      max: 3,
    },
    {
      key: 'preference2',
      label: 'Does your 1baby prefer an American Diet?',
      value: 1,
      min: 1,
      max: 3,
    },
    {
      key: 'preference3',
      label: 'Does your 2baby prefer an American Diet?',
      min: 1,
      max: 3,
      value: 1,
    },
  ]

  res.json(defaultPreferences)
}
