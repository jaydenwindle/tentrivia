import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Subheading, Title } from 'react-native-paper'

import AnimatableView from '../components/AnimatableView'

const WelcomeTitle = () => (
  <AnimatableView animation="fadeInUp" style={styles.animatedContainer}>
    <Image source={require('../assets/logo-white.png')} style={styles.logo} />
    <Title style={styles.title}>Welcome to the Triva Challenge</Title>
    <Subheading style={styles.subtitle}>
      You will be presented with 10 True or False questions.
    </Subheading>
    <Subheading style={styles.subtitle}>Can you score 100%?</Subheading>
  </AnimatableView>
)

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 108,
    height: 66,
    marginBottom: 24,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 36,
  },
  subtitle: {
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 16,
  },
})

export default WelcomeTitle
