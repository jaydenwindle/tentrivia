import { createContext } from 'react'

export type NavigationContextType = {
  [key: string]: string
}

export default createContext<NavigationContextType>({})