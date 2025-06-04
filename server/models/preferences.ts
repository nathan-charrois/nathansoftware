import { OPENAI_API_KEY } from '@server/utils/config.ts'
import { Request, Response } from 'express'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

const buildPreferenceString = ([key, value]: [string, number]): string => {
  const level = typeof value === 'number' ? value : 0
  return `${key} preference level ${level}`
}

const buildPreferencesString = (preferences: Record<string, number>): string => {
  return Object.entries(preferences)
    .map(buildPreferenceString)
    .join(', ')
}

const buildPromptString = (preferences: Record<string, number>): string => {
  const preferencesString = buildPreferencesString(preferences)
  return `Generate a meal based on the following preferences: ${preferencesString}.`
}

const buildTitleOrError = async (prompt: string): Promise<string> => {
  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{
      role: 'user',
      content: prompt,
    }],
  })

  const title = chatCompletion.choices[0]?.message?.content

  if (!title) {
    throw new Error('OpenAI returned an empty response.')
  }

  return title
}

export const handlePostPreferences = async (req: Request, res: Response) => {
  const prompt = buildPromptString(req.body)

  try {
    const title = await buildTitleOrError(prompt)
    res.json({ title })
  }
  catch (error) {
    res.status(500).json({
      message: 'Error generating meal suggestion.',
      error: error instanceof Error ? error.message : error,
    })
  }
}

export const handleGetPreferences = (req: Request, res: Response) => {
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
