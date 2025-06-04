import { OPENAI_API_KEY } from '@server/utils/config.ts'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

export const generateMealPrompt = async (prompt: string): Promise<string> => {
  console.log('prompt', prompt)
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  })

  const content = response.choices[0]?.message?.content

  if (!content) {
    throw new Error('OpenAI returned an empty response.')
  }

  return content
}
