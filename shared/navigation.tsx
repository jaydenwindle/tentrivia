import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation as useReactNavigation } from '@react-navigation/native'

const Stack = createStackNavigator()

export const useNavigation = () => {
  return useReactNavigation()
}

export default function NavigationProvider({ children }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {children}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export const Route = Stack.Screen
