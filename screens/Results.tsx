import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Title, Subheading } from 'react-native-paper'
import { useObserver } from 'mobx-react-lite'

import { useStore } from '../shared/store'
import theme from '../shared/theme'
import { useNavigation } from '../shared/navigation'

import Button from '../components/Button'

export default function ResultsScreen() {
  const store = useStore()
  const navigation = useNavigation()

  return useObserver(() => (
    <View style={styles.container}>
      <View>
        <Title style={{ color: '#fff' }}>Results</Title>
        <Subheading style={{ color: '#fff' }}>
          Score: {store.score} / {store.questions.length}
        </Subheading>
      </View>
      <Button
        onPress={() => {
          navigation.navigate('Home')
        }}
      >
        Play Again?
      </Button>
    </View>
  ))
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
})
