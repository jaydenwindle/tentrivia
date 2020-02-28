import React, { createContext, useContext, useCallback } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  useHistory,
  Route,
} from 'react-router-dom'

import NavigationContext from '../context/navigation'

const useNavigation = () => {
  const history = useHistory()
  const navigationContext = useContext(NavigationContext)

  return {
    navigate: (name: string) => {
      const path = navigationContext[name]
      if (path) {
        history.push(path)
      }
    },
  }
}

export default useNavigation
