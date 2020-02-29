import React, { FunctionComponent, ReactText } from 'react'
import { StyleSheet, SafeAreaView, ViewStyle } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'

import theme from '../shared/theme'

type Props = {
  onPress: () => void
  style?: ViewStyle
  children: ReactText
}

const Button: FunctionComponent<Props> = ({ onPress, children, ...props }) => {
  return (
    <SafeAreaView>
      <PaperButton
        mode="contained"
        color="#fff"
        labelStyle={styles.buttonText}
        contentStyle={styles.buttonContent}
        onPress={onPress}
        {...props}
      >
        {children}
      </PaperButton>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    padding: 16,
  },
  headingText: {
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  buttonText: {
    color: theme.colors.primary,
  },
  buttonContent: {
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
})

export default Button
