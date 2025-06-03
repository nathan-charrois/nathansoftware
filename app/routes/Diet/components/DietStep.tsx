import type { ReactNode } from 'react'
import { Transition } from '@mantine/core'

import type { DietStep as DietStepType } from './DietStepContext'
import { useDietStep } from './DietStepContext'

interface DietStepProps {
  children: ReactNode
  step: DietStepType
}

export default function DietStep({ children, step }: DietStepProps) {
  const { activeStep } = useDietStep()

  return (
    <Transition
      mounted={activeStep === step}
      transition="fade-left"
      duration={300}
      enterDelay={300}
      timingFunction="ease"
    >
      {styles => <div style={styles}>{children}</div>}
    </Transition>
  )
}
