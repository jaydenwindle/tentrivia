import React from 'react'
import { BrowserRouter as Router, Switch, useHistory } from 'react-router-dom'

export { Route } from 'react-router-dom'

export const useNavigation = () => {
  return useHistory()
}

export default function NavigationProvider({ children }) {
  return (
    <Router>
      <Switch>{children}</Switch>
    </Router>
  )
}
