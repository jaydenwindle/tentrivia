import { AllHtmlEntities } from 'html-entities'
import { useObserver } from 'mobx-react-lite'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { ActivityIndicator, Title } from 'react-native-paper'
import AnimatableView from '../components/AnimatableView'
import Button from '../components/Button'
import QuestionCard from '../components/QuestionCard'
import { ANIMATION_DURATION } from '../shared/constants'
import useNavigation from '../shared/hooks/useNavigation'
import { useStore } from '../shared/store'
import theme from '../shared/theme'

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

  // Animates the current question out and the next quesiton in.
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
    }, ANIMATION_DURATION)
  }

  // Stores user's answer and triggers transition to next question.
  // End game and navigate to results if the user has answered the final
  // question.
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
      }, ANIMATION_DURATION)
    },
    [store, currentQuestionIndex],
  )

  return useObserver(() => {
    // Render spinner while fetching data
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
          <AnimatableView animationRef={titleRef} animation="fadeInDown">
            <Title style={styles.title}>{question.category}</Title>
          </AnimatableView>
          <AnimatableView
            animationRef={questionRef}
            animation="fadeInUp"
            style={styles.questionContainer}
          >
            <QuestionCard
              // Question text is HTML encoded, need to decode to display
              text={entities.decode(question.question)}
              questionIndex={currentQuestionIndex}
              questionCount={store.questionCount}
            />
          </AnimatableView>
          <AnimatableView
            animation="fadeInUp"
            delay={ANIMATION_DURATION}
            style={styles.answerContainer}
          >
            <Button onPress={() => answerQuestion('False')}>False</Button>
            <Button onPress={() => answerQuestion('True')}>True</Button>
          </AnimatableView>
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
