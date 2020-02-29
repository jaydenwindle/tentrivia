import HomeScreen from '../screens/Home'
import QuizScreen from '../screens/Quiz'
import ResultsScreen from '../screens/Results'

export default [
  {
    component: HomeScreen,
    name: 'Home',
    path: '/',
  },
  {
    component: QuizScreen,
    name: 'Quiz',
    path: '/quiz',
  },
  {
    component: ResultsScreen,
    name: 'Results',
    path: '/results',
  },
]
