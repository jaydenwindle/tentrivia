import React from "react";
import { Provider as PaperProvider } from "react-native-paper";

import theme from "./shared/theme";
import NavigationProvider, { Route } from "./shared/navigation";
import StoreProvider from "./shared/store";
import HomeScreen from "./screens/Home";
import QuizScreen from "./screens/Quiz";
import ResultsScreen from "./screens/Results";

export default function App() {
  return (
    <StoreProvider>
      <PaperProvider theme={theme}>
        <NavigationProvider>
          <Route name="Home" component={HomeScreen} />
          <Route name="Quiz" component={QuizScreen} />
          <Route name="Results" component={ResultsScreen} />
        </NavigationProvider>
      </PaperProvider>
    </StoreProvider>
  );
}
