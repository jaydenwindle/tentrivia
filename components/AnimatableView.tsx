import React, { FunctionComponent, Ref, Component } from 'react'
import { ViewStyle } from 'react-native'
import * as Animatable from 'react-native-animatable'

import { ANIMATION_DURATION } from '../shared/constants'

type Props = {
  animationRef?: Ref<Animatable.View>
  animation: string
  delay?: number
  style?: ViewStyle
}

/* 
  Note: a bug in the latest react-native-animatable version causes
  Animatable.View ref assignment to fail typescript's type checks.
  
  See issue: https://github.com/oblador/react-native-animatable/issues/218

  I've fixed this issue on my own fork:
  https://github.com/jaydenwindle/react-native-animatable

  TODO: Return to using latest version of react-native-animatable
  once #218 is fixed.
*/
class AnimatableView extends Component<Props> {
  render() {
    return (
      <Animatable.View
        ref={this.props.animationRef}
        useNativeDriver
        duration={ANIMATION_DURATION}
        {...this.props}
      >
        {this.props.children}
      </Animatable.View>
    )
  }
}

export default AnimatableView
