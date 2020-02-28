import React, { useEffect, useState, useCallback, useRef } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { useObserver } from 'mobx-react-lite'
import { AllHtmlEntities } from 'html-entities'
import { Title, ActivityIndicator } from 'react-native-paper'
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)

  const titleRef = useRef<Animatable.View>(null)
  const questionRef = useRef<Animatable.View>(null)

  useEffect(() => {
    store.fetchQuestions()
  }, [])

  const animateNextQuestion = () => {
    if (!titleRef.current?.fadeOutUp || !questionRef.current?.fadeOutDown) {
      return
    }

    titleRef.current.fadeOutUp()
    questionRef.current.fadeOutDown()
    setTimeout(() => {
      if (!titleRef.current?.fadeInDown || !questionRef.current?.fadeInUp) {
        return
      }
      titleRef.current.fadeInDown()
      questionRef.current.fadeInUp()
    }, 300)
  }

  const answerQuestion = useCallback(
    answer => {
      store.answers[currentQuestionIndex] = answer

      if (currentQuestionIndex === store.questionCount - 1) {
        navigation.navigate('Results')
        return
      }

      animateNextQuestion()
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }, 300)
    },
    [store, currentQuestionIndex],
  )

  return useObserver(() => {
    if (store.questionsLoading || store.questionCount === 0) {
      return (
        <View style={styles.container}>
          <ActivityIndicator color="#fff" />
        </View>
      )
    }

    const question = store.questions[currentQuestionIndex]
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          {/* 
              Note: a bug in the latest react-native-animatable version causes
              Animatable.View ref assignment to fail typescript's type checks.
              
              See issue: https://github.com/oblador/react-native-animatable/issues/218

              I've fixed this issue on my own fork:
              https://github.com/jaydenwindle/react-native-animatable

              TODO: Return to using latest version of react-native-animatable
              once #218 is fixed.
          */}
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
            <QuestionCard
              text={entities.decode(question.question)}
              questionIndex={currentQuestionIndex}
              questionCount={store.questionCount}
            />
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
