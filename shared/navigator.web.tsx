import React, { createContext, useContext, useCallback } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  useHistory,
  Route,
} from 'react-router-dom'

import screens from './screens'

const NavigationContext = createContext({})

export const useNavigation = () => {
  const history = useHistory()
  const navigationContext = useContext(NavigationContext)

  return {
    navigate: name => {
      const path = navigationContext[name]
      console.log(navigationContext, path, name)
      if (path) {
        history.push(path)
      }
    },
  }
}

export function NavigationProvider({ children }) {
  const paths = {}
  children.map(child => {
    paths[child.props.name] = child.props.path
  })
  return (
    <NavigationContext.Provider value={paths}>
      <Router>
        <Switch>{children}</Switch>
      </Router>
    </NavigationContext.Provider>
  )
}

export default function Navigator() {
  return (
    <NavigationProvider>
      {screens.map(screen => {
        const { name, component, path } = screen
        return (
          <Route
            key={path}
            name={name}
            exact
            path={path}
            component={component}
          />
        )
      })}
    </NavigationProvider>
  )
}
