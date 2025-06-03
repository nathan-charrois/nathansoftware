import type { ReactNode } from 'react'
import { Transition } from '@mantine/core'

import type { DietStep as DietStepType } from './DietStepperContext'
import { useDietStepper } from './DietStepperContext'

interface DietStepProps {
  children: ReactNode
  step: DietStepType
}

export default function DietStep({ children, step }: DietStepProps) {
  const { activeStep } = useDietStepper()

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
