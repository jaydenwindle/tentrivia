import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Button from '../components/Button'
import WelcomeHeading from '../components/WelcomeHeading'
import useNavigation from '../shared/hooks/useNavigation'
import theme from '../shared/theme'

export default function HomeScreen() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <WelcomeHeading />
        <SafeAreaView>
          <Animatable.View
            useNativeDriver
            duration={300}
            delay={300}
            animation="fadeIn"
          >
            <Button
              onPress={() => {
                navigation.navigate('Quiz')
              }}
            >
              Begin
            </Button>
          </Animatable.View>
        </SafeAreaView>
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
  button: {
    marginTop: 40,
  },
  buttonText: {
    color: theme.colors.primary,
  },
})
