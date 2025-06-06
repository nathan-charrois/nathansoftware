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
      transition="fade-up"
      duration={150}
      enterDelay={150}
      timingFunction="ease-in-out"
    >
      {styles => <div style={styles}>{children}</div>}
    </Transition>
  )
}
