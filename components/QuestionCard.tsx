import React from 'react'
import { StyleSheet } from 'react-native'
import { Card, Subheading, Text } from 'react-native-paper'

const QuestionCard = ({ text, questionIndex, questionCount }) => (
  <Card style={styles.surface}>
    <Subheading style={styles.questionText}>{text}</Subheading>
    <Text style={styles.countText}>
      {questionIndex + 1} of {questionCount}
    </Text>
  </Card>
)

const styles = StyleSheet.create({
  surface: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    padding: 24,
  },
  questionText: {
    textAlign: 'center',
  },
  countText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
  },
})

export default QuestionCard
