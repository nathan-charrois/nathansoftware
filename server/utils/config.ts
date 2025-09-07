import dotenv from 'dotenv'
dotenv.config()

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY
if (!OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not defined in .env')
}

export const OPENAI_ORG_ID = process.env.OPENAI_ORG_ID
if (!OPENAI_ORG_ID) {
  throw new Error('OPENAI_ORG_ID is not defined in .env')
}
