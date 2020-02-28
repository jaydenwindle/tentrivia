import React, { FunctionComponent, ReactNode } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavigationContext, { NavigationContextType } from './context/navigation'
import screens from './screens'

export const NavigationProvider: FunctionComponent = ({ children }) => {
  const paths: NavigationContextType = {}
  if (!children || !Array.isArray(children)) {
    return null
  }

  children.forEach((child: ReactNode): void => {
    if (child instanceof Route) {
      paths[child.props.name] = child.props.path
    }
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
