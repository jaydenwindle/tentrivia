import React from "react";
import { StyleSheet, View, Text } from "react-native";

import theme from "../shared/theme";
import { useStore } from "../shared/store";

export default function QuizScreen() {
  const store = useStore();
  return (
    <View style={styles.container}>
      {store.questions.map(question => (
        <View>
          <Text>{question.question}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary
  }
});
