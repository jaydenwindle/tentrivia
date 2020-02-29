import * as React from 'react'

interface ConfettiProps {
  confettiCount?: number
  timeout?: number
  untilStopped?: boolean
  duration?: number
  colors?: string[]
  size?: number
  bsize?: number
}

declare class Confetti extends React.Component<ConfettiProps, any> {
  startConfetti: () => void
  stopConfetti: () => void
}

export default Confetti
