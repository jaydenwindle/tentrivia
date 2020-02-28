import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import NavigationContext from '../context/navigation'


const useNavigation = () => {
  const history = useHistory()
  const navigationContext = useContext(NavigationContext)

  return {
    navigate: name => {
      const path = navigationContext[name]
      if (path) {
        history.push(path)
      }
    },
  }
}

export default useNavigation
