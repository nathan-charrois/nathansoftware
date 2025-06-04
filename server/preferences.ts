import { GoogleGenerativeAI } from '@google/generative-ai'
import { Request, Response } from 'express'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

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

const generateTitle = async (prompt: string): Promise<string> => {
  console.log('ke1y', process.env.GOOGLE_API_KEY)
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const result = await model.generateContent(prompt)
  const response = result.response

  return response.text()
}

export const handlePostPreferences = async (req: Request, res: Response) => {
  const prompt = buildPromptString(req.body)
  console.log('Received form values:', req.body)
  console.log('Generated LLM prompt:', prompt)

  try {
    const title = await generateTitle(prompt)
    console.log('LLM generated title:', title)

    res.json({
      meal: { title },
    })
  }
  catch (error: any) {
    console.error('Error calling LLM:', error)
    res.status(500).json({
      message: 'Error generating meal suggestion.',
      error: error.message,
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
