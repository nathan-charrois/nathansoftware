import type { MetaArgs } from 'react-router'
import { Card } from '@mantine/core'

import DietError from './components/DietError'
import DietForm from './components/DietForm'
import DietInit from './components/DietInit'
import DietProviders from './components/DietProviders'
import DietResult from './components/DietResult'
import DietResultCount from './components/DietResultCount'
import DietSpinner from './components/DietSpinner'
import DietStep from './components/DietStep'
import DietTitle from './components/DietTitle'
import Application from '~/components/Layout/Application'

export function meta({}: MetaArgs) {
  return [
    { title: 'Diet' },
    { name: 'description', content: 'This is Diet!' },
  ]
}

export default function Diet() {
  return (
    <DietProviders>
      <Application footer={<DietResultCount />}>
        <DietStep step="initialize">
          <DietInit />
        </DietStep>
        <DietStep step="form">
          <DietTitle />
          <DietForm />
        </DietStep>
        <DietStep step="loading">
          <DietSpinner />
        </DietStep>
        <DietStep step="result">
          <DietResult />
        </DietStep>
        <DietStep step="error">
          <DietError />
        </DietStep>
      </Application>
    </DietProviders>
  )
}
