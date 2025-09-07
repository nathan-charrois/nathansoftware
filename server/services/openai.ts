import { OPENAI_API_KEY, OPENAI_ORG_ID } from '@server/utils/config.ts'
import { PostImageResponse, PostPreferencesResponse } from '@shared/types/api'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  organization: OPENAI_ORG_ID,
})

export const generateMeal = async (prompt: string): Promise<PostPreferencesResponse> => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    tools: [
      {
        type: 'function',
        function: {
          name: 'create_meal',
          description: 'Return the created meal',
          parameters: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              ingredients: {
                type: 'array',
                items: {
                  type: 'string',
                },
                description: 'Meal ingredients',
              },
            },
            required: ['title', 'ingredients'],
            additionalProperties: false,
          },
        },
      },
    ],
    tool_choice: {
      type: 'function',
      function: {
        name: 'create_meal',
      },
    },
  })

  const isMealCreated = response.choices[0].message.tool_calls

  if (!isMealCreated) {
    throw new Error('Model did not call create_meal')
  }

  const meal = isMealCreated[0]

  const content = JSON.parse(meal.function.arguments) as PostPreferencesResponse

  if (!content) {
    throw new Error('Model returned invalid content for created_meal')
  }

  return content
}

export const generateImage = async (prompt: string): Promise<PostImageResponse> => {
  const response = await openai.images.generate({
    model: 'gpt-image-1',
    prompt,
    size: '1024x1024',
    quality: 'low',
  })

  const base64 = response.data && response.data[0].b64_json

  if (!base64) {
    throw new Error('Model did not create image')
  }

  return { image: `data:image/png;base64,${base64}` }
}
