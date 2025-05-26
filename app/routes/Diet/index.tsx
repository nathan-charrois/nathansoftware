import type { MetaArgs } from 'react-router'

import DietForm from './components/DietForm'
import { DietFormProvider } from './components/DietFormContext'

export function meta({}: MetaArgs) {
  return [
    { title: 'Diet' },
    { name: 'description', content: 'This is Diet!' },
  ]
}

export default function Diet() {
  return (
    <DietFormProvider>
      <DietForm />
    </DietFormProvider>
  )
}
