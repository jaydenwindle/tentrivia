import React from "react";
import { StyleSheet, View } from "react-native";

import { Title, Subheading, Button } from "react-native-paper";

import theme from "../shared/theme";

import { useStore } from "../shared/store";

export default function HomeScreen() {
  const store = useStore();

  return (
    <View style={styles.container}>
      <Title style={styles.headingText}>Welcome to the Triva Challenge</Title>
      <Subheading style={styles.headingText}>
        You will be presented with 10 True or False questions.
      </Subheading>
      <Subheading style={styles.headingText}>Can you score 100%?</Subheading>
      <Button
        mode="contained"
        color="#fff"
        style={styles.button}
        labelStyle={styles.buttonText}
        onPress={() => store.fetchQuestions()}
      >
        Begin
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    padding: 16
  },
  headingText: {
    color: "#fff",
    textAlign: "center",
    opacity: 0.9
  },
  button: {
    marginTop: 40
  },
  buttonText: {
    color: theme.colors.primary
  }
});
