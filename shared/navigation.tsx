import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function NavigationProvider({ children }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>{children}</Stack.Navigator>
    </NavigationContainer>
  );
}

export const Route = Stack.Screen;
