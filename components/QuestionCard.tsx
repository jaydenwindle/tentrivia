import React from 'react'
import { StyleSheet } from 'react-native'
import { Card, Subheading } from 'react-native-paper'

const QuestionCard = ({ questionText }) => (
  <Card style={styles.surface}>
    <Subheading style={styles.text}>{questionText}</Subheading>
  </Card>
)

const styles = StyleSheet.create({
  surface: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    paddingHorizontal: 16,
    paddingVertical: 36,
  },
  text: {
    textAlign: 'center',
  },
})

export default QuestionCard
