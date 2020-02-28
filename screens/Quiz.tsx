import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { useObserver } from 'mobx-react-lite'
import { AllHtmlEntities } from 'html-entities'
import { Title, Subheading, ActivityIndicator } from 'react-native-paper'

import theme from '../shared/theme'
import { useStore } from '../shared/store'
import { useNavigation } from '../shared/navigator'
import Button from '../components/Button'

const entities = new AllHtmlEntities()

export default function QuizScreen() {
  const store = useStore()
  const navigation = useNavigation()
  const [currentQuestion, setCurrentQuestion] = useState(0)

  useEffect(() => {
    store.fetchQuestions()
  }, [])

  const answerQuestion = useCallback(
    answer => {
      store.answers[currentQuestion] = answer

      if (currentQuestion === store.questions.length - 1) {
        navigation.navigate('Results')
        return
      }

      setCurrentQuestion(currentQuestion + 1)
    },
    [store, currentQuestion],
  )

  return useObserver(() => {
    if (store.questionsLoading || store.questions.length === 0) {
      return (
        <View style={styles.container}>
          <ActivityIndicator color="#fff" />
        </View>
      )
    }

    const question = store.questions[currentQuestion]
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Title
              style={{ color: '#fff', textAlign: 'center', marginBottom: 30 }}
            >
              {question.category}
            </Title>
            <Subheading style={{ color: '#fff', textAlign: 'center' }}>
              {entities.decode(question.question)}
            </Subheading>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <Button onPress={() => answerQuestion('False')}>False</Button>
            <Button onPress={() => answerQuestion('True')}>True</Button>
          </View>
        </SafeAreaView>
      </View>
    )
  })
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
