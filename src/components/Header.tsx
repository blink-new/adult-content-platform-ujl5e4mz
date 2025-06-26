import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Search, Menu, User, Settings, LogOut, Crown } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-black/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              EliteHub
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search content..."
                className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder-gray-400 focus:border-purple-500"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/browse" className="text-gray-300 hover:text-white transition-colors">
              Browse
            </Link>
            <Link to="/categories" className="text-gray-300 hover:text-white transition-colors">
              Categories
            </Link>
            <Link to="/live" className="text-gray-300 hover:text-white transition-colors">
              Live
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.username} />
                      <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-600">
                        {user.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-white">{user.username}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem className="text-white hover:bg-slate-700" asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-slate-700">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-slate-700">
                    <Crown className="mr-2 h-4 w-4" />
                    Subscription: {user.subscription}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem 
                    className="text-red-400 hover:bg-red-900/20"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/auth">
                  <Button variant="ghost" className="text-white hover:bg-slate-800">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-800">
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search content..."
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder-gray-400 focus:border-purple-500"
                />
              </div>
            </div>
            <nav className="mt-4 space-y-2">
              <Link 
                to="/browse" 
                className="block py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse
              </Link>
              <Link 
                to="/categories" 
                className="block py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                to="/live" 
                className="block py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Live
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header