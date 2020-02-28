import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavigationContext from './context/navigation'
import screens from './screens'

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
