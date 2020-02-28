import React from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { Title, Subheading } from 'react-native-paper'

import theme from '../shared/theme'

import { useNavigation } from '../shared/navigation'

import Button from '../components/Button'

export default function HomeScreen() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Title style={[styles.headingText, { marginBottom: 36 }]}>
            Welcome to the Triva Challenge
          </Title>
          <Subheading style={styles.headingText}>
            You will be presented with 10 True or False questions.
          </Subheading>
          <Subheading style={styles.headingText}>
            Can you score 100%?
          </Subheading>
        </View>
        <Button
          onPress={() => {
            navigation.navigate('Quiz')
          }}
        >
          Begin
        </Button>
      </SafeAreaView>
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
  headingText: {
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  button: {
    marginTop: 40,
  },
  buttonText: {
    color: theme.colors.primary,
  },
})
