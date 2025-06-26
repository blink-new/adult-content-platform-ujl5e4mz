import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/contexts/AuthContext'
import { Crown, Mail, Lock, User, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

const Auth = () => {
  const { login, register, isLoading } = useAuth()
  const navigate = useNavigate()
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })
  
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(loginForm.email, loginForm.password)
      toast.success('Welcome back!')
      navigate('/')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed')
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    
    if (registerForm.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    
    try {
      await register(registerForm.email, registerForm.password, registerForm.username)
      toast.success('Account created successfully!')
      navigate('/')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              EliteHub
            </span>
          </div>
          <p className="text-gray-400">Join the premium adult entertainment platform</p>
        </div>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white">
              Get Started
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-700/50">
                <TabsTrigger value="login" className="data-[state=active]:bg-purple-600">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-purple-600">
                  Sign Up
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4 mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-white">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-purple-500"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-white">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-purple-500"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4 mt-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-username" className="text-white">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-username"
                        type="text"
                        placeholder="Choose a username"
                        className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-purple-500"
                        value={registerForm.username}
                        onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-white">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-purple-500"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-white">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="Create a password"
                        className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-purple-500"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-white">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-purple-500"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <p className="text-center text-gray-400 text-sm mt-6">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

export default Auth