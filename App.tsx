import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'

import theme from './shared/theme'
import StoreProvider from './shared/store'
import Navigator from './shared/navigator'

export default function App() {
  return (
    <StoreProvider>
      <PaperProvider theme={theme}>
        <Navigator />
      </PaperProvider>
    </StoreProvider>
  )
}
