import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Subheading, Text } from 'react-native-paper'

const GradedQuestionCard = ({ text, category, correctAnswer, givenAnswer }) => {
  const isCorrect = givenAnswer === correctAnswer
  return (
    <Card style={styles.card}>
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        <Text style={{ marginRight: 8 }}>
          {isCorrect ? '\u2705' : '\u274C'}
        </Text>
        <Text style={styles.countText}>Answer: </Text>
        <Text
          style={[
            styles.countText,
            !isCorrect && { textDecorationLine: 'line-through' },
          ]}
        >
          {givenAnswer}
        </Text>
        {!isCorrect && <Text style={styles.countText}> {correctAnswer}</Text>}
      </View>
      <View>
        <Subheading>{text}</Subheading>
        <Text style={[styles.countText, { marginTop: 8 }]}>
          Category: {category}
        </Text>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    elevation: 4,
    padding: 16,
    marginBottom: 24,
  },
  countText: {
    color: '#aaa',
  },
})

export default GradedQuestionCard
