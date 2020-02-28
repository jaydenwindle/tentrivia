import React from "react";
import { StyleSheet, View } from "react-native";

import theme from "../shared/theme";

export default function ResultsScreen() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary
  }
});
