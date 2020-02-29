import { AllHtmlEntities } from 'html-entities'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import Confetti from 'react-native-confetti'
import { Subheading, Title } from 'react-native-paper'
import Button from '../components/Button'
import GradedQuestionCard from '../components/GradedQuestionCard'
import useNavigation from '../shared/hooks/useNavigation'
import { useStore } from '../shared/store'
import theme from '../shared/theme'

import ResultsHeading from '../components/ResultsHeading'
const entities = new AllHtmlEntities()

export default function ResultsScreen() {
  const store = useStore()
  const navigation = useNavigation()
  const confettiRef = useRef<Confetti>(null)

  // Triggers confetti effect on mount when user gets a perfect score
  useEffect(() => {
    if (store.score !== 10) {
      return
    }

    if (confettiRef.current !== null) {
      confettiRef.current.startConfetti()
    }
    return () => {
      if (confettiRef.current !== null) {
        confettiRef.current.stopConfetti()
      }
    }
  }, [])

  return useObserver(() => (
    <View style={styles.container}>
      <Confetti ref={confettiRef} />
      <ResultsHeading score={store.score} questionCount={store.questionCount} />

      <FlatList
        data={store.questions}
        keyExtractor={item => item.question}
        renderItem={({ item, index }) => (
          <View style={styles.resultsList}>
            <GradedQuestionCard
              key={index.toString()}
              // Question text is HTML encoded, need to decode to display
              text={entities.decode(item.question)}
              correctAnswer={item.correct_answer}
              givenAnswer={store.answers[index]}
              category={item.category}
            />
          </View>
        )}
        ListFooterComponent={() => (
          <Button
            style={styles.button}
            onPress={() => {
              navigation.navigate('Home')
            }}
          >
            Play Again?
          </Button>
        )}
      />
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
  resultsList: {
    paddingHorizontal: 16,
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
})
