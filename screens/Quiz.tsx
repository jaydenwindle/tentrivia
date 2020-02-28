import React, { useEffect, useState, useCallback, useRef } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { useObserver } from 'mobx-react-lite'
import { AllHtmlEntities } from 'html-entities'
import { Title, Subheading, ActivityIndicator } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'

import theme from '../shared/theme'
import { useStore } from '../shared/store'
import useNavigation from '../shared/hooks/useNavigation'

import Button from '../components/Button'
import QuestionCard from '../components/QuestionCard'

const entities = new AllHtmlEntities()

export default function QuizScreen() {
  const store = useStore()
  const navigation = useNavigation()
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const titleRef = useRef(null)
  const questionRef = useRef(null)

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
        <SafeAreaView style={styles.safeArea}>
          <Animatable.View
            ref={titleRef}
            useNativeDriver
            animation="fadeInDown"
            duration={300}
          >
            <Title style={styles.title}>{question.category}</Title>
          </Animatable.View>
          <Animatable.View
            ref={questionRef}
            useNativeDriver
            animation="fadeInUp"
            duration={300}
            style={styles.questionContainer}
          >
            <QuestionCard questionText={entities.decode(question.question)} />
          </Animatable.View>
          <Animatable.View
            useNativeDriver
            animation="fadeInUp"
            duration={300}
            delay={300}
            style={styles.answerContainer}
          >
            <Button onPress={() => answerQuestion('False')}>False</Button>
            <Button onPress={() => answerQuestion('True')}>True</Button>
          </Animatable.View>
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
  safeArea: {
    flex: 1,
    width: '100%',
    maxWidth: 800,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  answerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})
