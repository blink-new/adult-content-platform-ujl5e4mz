import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { 
  Settings, 
  Heart, 
  Clock, 
  Crown, 
  Star, 
  Eye,
  PlayCircle,
  Download,
  Calendar,
  Mail,
  Edit3
} from 'lucide-react'
import Header from '@/components/Header'
import { useAuth } from '@/contexts/AuthContext'

const Profile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    username: user?.username || '',
    email: user?.email || ''
  })

  const watchHistory = [
    {
      id: 1,
      title: "Premium HD Experience",
      thumbnail: "https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?w=300&h=200&fit=crop",
      duration: "15:42",
      watchedAt: "2024-01-20",
      progress: 85
    },
    {
      id: 2,
      title: "Trending Content #1",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      duration: "12:34",
      watchedAt: "2024-01-19",
      progress: 100
    },
    {
      id: 3,
      title: "VIP Exclusive Content",
      thumbnail: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=200&fit=crop",
      duration: "18:22",
      watchedAt: "2024-01-18",
      progress: 45
    }
  ]

  const favorites = [
    {
      id: 4,
      title: "Favorite Premium Video",
      thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop",
      duration: "20:15",
      views: "1.5M",
      rating: 4.9
    },
    {
      id: 5,
      title: "Best of Collection",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
      duration: "16:30",
      views: "980K",
      rating: 4.7
    }
  ]

  const subscriptionPlans = [
    {
      name: "Free",
      price: "$0",
      features: ["Limited content", "Standard quality", "Ads supported"],
      current: user?.subscription === 'free'
    },
    {
      name: "Premium",
      price: "$19.99",
      features: ["Full library", "HD & 4K quality", "No ads", "Download for offline"],
      current: user?.subscription === 'premium'
    },
    {
      name: "VIP",
      price: "$39.99",
      features: ["Everything in Premium", "Exclusive VIP content", "Early access", "Priority support"],
      current: user?.subscription === 'vip'
    }
  ]

  const handleSaveProfile = () => {
    // In a real app, this would make an API call
    setIsEditing(false)
    // Update user context if needed
  }

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case 'vip': return 'from-yellow-500 to-orange-600'
      case 'premium': return 'from-pink-500 to-purple-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <Card className="bg-slate-800/50 border-slate-700 p-12">
            <h2 className="text-2xl font-bold text-white mb-4">Sign In Required</h2>
            <p className="text-gray-400 mb-6">Please sign in to view your profile</p>
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                Sign In
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback className={`bg-gradient-to-r ${getSubscriptionColor(user.subscription || 'free')} text-white text-2xl`}>
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{user.username}</h1>
                  <Badge className={`bg-gradient-to-r ${getSubscriptionColor(user.subscription || 'free')}`}>
                    <Crown className="h-3 w-3 mr-1" />
                    {user.subscription?.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-gray-400 mb-4">{user.email}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined Jan 2024
                  </span>
                  <span className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {watchHistory.length} videos watched
                  </span>
                  <span className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    {favorites.length} favorites
                  </span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(!isEditing)}
                className="text-white border-slate-600"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="history" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
                <TabsTrigger value="history" className="data-[state=active]:bg-purple-600">
                  <Clock className="h-4 w-4 mr-2" />
                  Watch History
                </TabsTrigger>
                <TabsTrigger value="favorites" className="data-[state=active]:bg-purple-600">
                  <Heart className="h-4 w-4 mr-2" />
                  Favorites
                </TabsTrigger>
                <TabsTrigger value="downloads" className="data-[state=active]:bg-purple-600">
                  <Download className="h-4 w-4 mr-2" />
                  Downloads
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="history" className="space-y-4 mt-6">
                {watchHistory.map((item) => (
                  <Card key={item.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 transition-colors">
                    <div className="flex p-4">
                      <div className="relative w-32 h-20 flex-shrink-0 mr-4">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title}
                          className="w-full h-full object-cover rounded"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white px-1 py-0.5 rounded text-xs">
                          {item.duration}
                        </div>
                        <Link to={`/watch/${item.id}`} className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/50 transition-opacity rounded">
                          <PlayCircle className="h-8 w-8 text-white" />
                        </Link>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium mb-2 line-clamp-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">Watched on {item.watchedAt}</p>
                        <div className="w-full bg-slate-700 rounded-full h-1">
                          <div 
                            className="bg-purple-500 h-1 rounded-full"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <p className="text-gray-400 text-xs mt-1">{item.progress}% complete</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="favorites" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favorites.map((item) => (
                    <Card key={item.id} className="bg-slate-800/50 border-slate-700 hover:scale-105 transition-transform overflow-hidden">
                      <div className="relative">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white px-1 py-0.5 rounded text-xs">
                          {item.duration}
                        </div>
                        <Link to={`/watch/${item.id}`} className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/50 transition-opacity">
                          <PlayCircle className="h-10 w-10 text-white" />
                        </Link>
                      </div>
                      <CardContent className="p-3">
                        <h3 className="text-white text-sm font-medium mb-1 line-clamp-2">{item.title}</h3>
                        <div className="flex items-center text-xs text-gray-400 space-x-2">
                          <span className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {item.views}
                          </span>
                          <span className="flex items-center">
                            <Star className="h-3 w-3 mr-1 text-yellow-500" />
                            {item.rating}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="downloads" className="mt-6">
                <Card className="bg-slate-800/50 border-slate-700 p-12 text-center">
                  <Download className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Downloads Yet</h3>
                  <p className="text-gray-400 mb-4">
                    {user.subscription === 'free' 
                      ? 'Upgrade to Premium to download videos for offline viewing'
                      : 'Start downloading videos to watch offline'
                    }
                  </p>
                  {user.subscription === 'free' && (
                    <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                      Upgrade to Premium
                    </Button>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Settings */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="username" className="text-white">Username</Label>
                      <Input
                        id="username"
                        value={editForm.username}
                        onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleSaveProfile}>Save</Button>
                      <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Username</span>
                      <span className="text-white">{user.username}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Email</span>
                      <span className="text-white">{user.email}</span>
                    </div>
                    <Separator className="bg-slate-700" />
                    <Button variant="outline" size="sm" className="w-full text-white border-slate-600">
                      <Mail className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Subscription Status */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Crown className="h-5 w-5 mr-2" />
                  Subscription
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subscriptionPlans.map((plan) => (
                    <div key={plan.name} className={`p-3 rounded-lg border ${plan.current ? 'border-purple-500 bg-purple-900/20' : 'border-slate-600'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{plan.name}</h4>
                        <span className="text-white font-bold">{plan.price}/mo</span>
                      </div>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {plan.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                      {plan.current && (
                        <Badge className="mt-2 bg-green-600">Current Plan</Badge>
                      )}
                    </div>
                  ))}
                  
                  {user.subscription === 'free' && (
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 mt-4">
                      Upgrade Now
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile