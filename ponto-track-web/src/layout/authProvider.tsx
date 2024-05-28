import { ReactNode, createContext, useContext, useState } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  setAuthenticated: (isAuthenticated: boolean) => void
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setAuthenticated] = useState(
    !!localStorage.getItem('token'),
  )

  const login = (token: string) => {
    localStorage.setItem('token', token)
    setAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
