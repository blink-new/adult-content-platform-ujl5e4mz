import React, { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: string
  email: string
  username: string
  avatar?: string
  subscription?: 'free' | 'premium' | 'vip'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, username: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call with password validation
      await new Promise(resolve => setTimeout(resolve, 1000))
      if (password.length < 6) {
        throw new Error('Password too short')
      }
      const mockUser: User = {
        id: '1',
        email,
        username: email.split('@')[0],
        subscription: 'free'
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
    } catch (error) {
      throw new Error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, password: string, username: string) => {
    setIsLoading(true)
    try {
      // Simulate API call with validation
      await new Promise(resolve => setTimeout(resolve, 1000))
      if (password.length < 6) {
        throw new Error('Password too short')
      }
      const mockUser: User = {
        id: '1',
        email,
        username,
        subscription: 'free'
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
    } catch (error) {
      throw new Error(`Registration failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  // Check for stored user on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const value = {
    user,
    login,
    register,
    logout,
    isLoading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}