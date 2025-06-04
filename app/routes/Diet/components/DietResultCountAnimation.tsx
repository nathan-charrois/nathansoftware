import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Transition } from '@mantine/core'

import { ANIMATION_MOUNT_MS, ANIMATION_POP_MS } from '~/utils/constant'
import { playSuccessSound } from '~/utils/sound'

interface DietResultCountAnimationProps {
  count: number
  children: ReactNode
}

export default function DietResultCountAnimation({ count, children }: DietResultCountAnimationProps) {
  const [textMounted, setTextMounted] = useState(false)

  useEffect(() => {
    setTextMounted(false)

    const timer = setTimeout(() => {
      setTextMounted(true)
    }, ANIMATION_MOUNT_MS)

    if (count > 0) {
      playSuccessSound()
    }

    return () => clearTimeout(timer)
  }, [count])

  return (
    <Transition mounted={textMounted} transition="pop" duration={ANIMATION_POP_MS} timingFunction="ease">
      {styles => <div style={styles}>{children}</div>}
    </Transition>
  )
}
