const SOUND_STORAGE_KEY = 'baby-diet-sound-enabled'

const isSoundEnabled = (): boolean => {
  if (typeof localStorage === 'undefined') return false
  if (typeof Audio === 'undefined') return false

  const storedSound = localStorage.getItem(SOUND_STORAGE_KEY)
  return storedSound !== null ? storedSound === 'true' : true
}

export const playSuccessSound = () => {
  if (isSoundEnabled()) {
    const successSound = new Audio('/sounds/result-success.wav')
    successSound.currentTime = 0
    successSound.volume = 0.20

    successSound.play()
  }

  return null
}

export const playSlideSound = () => {
  if (isSoundEnabled()) {
    const slideSound = new Audio('/sounds/drag-slider.wav')
    slideSound.currentTime = 0
    slideSound.volume = 0.1

    slideSound.play()
  }

  return null
}
