import { useCallback, useEffect, useRef } from 'react'

type Props = {
  className: string
  playSound: () => void
}

export function useAnimationTrigger({ className, playSound }: Props) {
  const ref = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const handleStart = () => {
      playSound()
    }

    const handleEnd = () => {
      ref.current?.classList.forEach((c) => {
        if (c.startsWith('animate')) {
          ref.current?.classList.remove(c)
        }
      })
    }

    ref.current?.addEventListener('animationstart', handleStart)
    ref.current?.addEventListener('animationend', handleEnd)

    return () => {
      ref.current?.removeEventListener('animationstart', handleStart)
      ref.current?.removeEventListener('animationend', handleEnd)
    }
  }, [ref.current])

  const handleTriggerAnimation = useCallback(() => {
    ref.current?.classList.remove(className)
    ref.current?.classList.add(className)
  }, [className])

  return { ref, handleTriggerAnimation }
}
