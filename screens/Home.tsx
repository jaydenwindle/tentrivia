import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import AnimatableView from '../components/AnimatableView'
import Button from '../components/Button'
import WelcomeHeading from '../components/WelcomeHeading'
import { ANIMATION_DURATION } from '../shared/constants'
import useNavigation from '../shared/hooks/useNavigation'
import theme from '../shared/theme'

export default function HomeScreen() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <WelcomeHeading />
        <AnimatableView delay={ANIMATION_DURATION} animation="fadeIn">
          <Button
            onPress={() => {
              navigation.navigate('Quiz')
            }}
          >
            Begin
          </Button>
        </AnimatableView>
      </View>
    </View>
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
})
