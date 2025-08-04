export const SOUND_STORAGE_KEY = 'baby-diet-sound-enabled'

let slideSound: HTMLAudioElement | null = null

let successSound: HTMLAudioElement | null = null

const isSoundEnabled = (): boolean => {
  if (typeof localStorage === 'undefined') return false
  if (typeof Audio === 'undefined') return false

  const storedSound = localStorage.getItem(SOUND_STORAGE_KEY)
  return storedSound !== null ? storedSound === 'true' : true
}

const getSlideSound = (): HTMLAudioElement => {
  if (!slideSound) {
    slideSound = new Audio('/sounds/drag-slider.wav')
    slideSound.volume = 0.1
  }

  return slideSound
}

const getSuccessSound = (): HTMLAudioElement => {
  if (!successSound) {
    successSound = new Audio('/sounds/result-success.wav')
    successSound.volume = 0.20
  }

  return successSound
}

export const playSuccessSound = () => {
  if (isSoundEnabled()) {
    const audio = getSuccessSound()
    audio.currentTime = 0
    audio.play()
  }

  return null
}

export const playSlideSound = () => {
  if (isSoundEnabled()) {
    const audio = getSlideSound()
    audio.currentTime = 0
    audio.play()
  }

  return null
}
