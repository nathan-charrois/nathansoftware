import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || 'YOUR_API_KEY')

const buildPreferenceString = ([key, value]) => {
  const level = typeof value === 'number' ? value : 0
  return `${key} preference level ${level}`
}

const buildPreferencesString = (preferences) => {
  return Object.entries(preferences)
    .map(buildPreferenceString)
    .join(', ')
}

const buildPromptString = (preferences) => {
  const preferencesString = buildPreferencesString(preferences)
  return `Generate a meal based on the following preferences: ${preferencesString}.`
}

const generateTitle = async (prompt) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const result = await model.generateContent(prompt)
  const response = result.response

  return response.text()
}

export const handlePreferencesRequest = async (req, res) => {
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
  catch (error) {
    console.error('Error calling LLM:', error)
    res.status(500).json({
      message: 'Error generating meal suggestion.',
      error: error.message,
    })
  }
}
