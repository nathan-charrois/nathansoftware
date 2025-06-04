export const playSuccessSound = () => {
  if (typeof Audio !== 'undefined') {
    const successSound = new Audio('/sounds/result-success.wav')
    successSound.currentTime = 0
    successSound.volume = 0.20

    successSound.play()
  }

  return null
}

export const playSlideSound = (playbackRate = 0.25) => {
  if (typeof Audio !== 'undefined') {
    const slideSound = new Audio('/sounds/drag-slider.wav')
    slideSound.currentTime = 0
    slideSound.playbackRate = playbackRate
    slideSound.volume = 0.20

    slideSound.play()
  }

  return null
}
