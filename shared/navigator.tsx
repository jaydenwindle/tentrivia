import {
  NavigationContainer,
  useNavigation as useReactNavigation,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import screens from './screens'

const Stack = createStackNavigator()

export const useNavigation = () => {
  return useReactNavigation()
}

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {screens.map(screen => {
          const { name, component } = screen
          return <Stack.Screen key={name} name={name} component={component} />
        })}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
