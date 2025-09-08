import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Flex, Transition } from '@mantine/core'

import { ANIMATION_MOUNT_MS, ANIMATION_POP_MS } from '~/utils/constant'

interface DietResultFooterAnimationProps {
  children: ReactNode
}

export default function DietResultFooterAnimation({ children }: DietResultFooterAnimationProps) {
  const [textMounted, setTextMounted] = useState(false)

  useEffect(() => {
    setTextMounted(false)

    const timer = setTimeout(() => {
      setTextMounted(true)
    }, ANIMATION_MOUNT_MS)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Transition mounted={textMounted} transition="pop" duration={ANIMATION_POP_MS} timingFunction="ease">
      {styles => <Flex style={styles} w="100%" justify="center">{children}</Flex>}
    </Transition>
  )
}
