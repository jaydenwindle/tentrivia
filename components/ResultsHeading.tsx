import React, { FunctionComponent } from 'react'
import { StyleSheet, Image, SafeAreaView, View } from 'react-native'
import { Subheading, Title } from 'react-native-paper'

import theme from '../shared/theme'
import AnimatableView from '../components/AnimatableView'

type Props = {
  score: number
  questionCount: number
}

const WelcomeTitle: FunctionComponent<Props> = ({ score, questionCount }) => (
  <SafeAreaView>
    <View style={styles.resultsContainer}>
      <Title style={styles.resultsTitle}>You Scored</Title>
      <Subheading style={styles.resultsTally}>
        {score} / {questionCount}
      </Subheading>
    </View>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  resultsContainer: {
    alignItems: 'center',
    paddingVertical: 36,
  },
  resultsTitle: {
    color: '#fff',
  },
  resultsTally: {
    color: '#fff',
  },
})

export default WelcomeTitle
