import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PlayCircle, Users, Star, Lock, Crown, Zap } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/Header'

const Homepage = () => {
  const { user } = useAuth()

  const featuredContent = [
    {
      id: 1,
      title: "Featured Premium Content",
      thumbnail: "https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?w=400&h=300&fit=crop",
      duration: "12:34",
      views: "2.1M",
      premium: true
    },
    {
      id: 2,
      title: "Trending Now",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      duration: "8:45",
      views: "1.8M",
      premium: false
    },
    {
      id: 3,
      title: "VIP Exclusive",
      thumbnail: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=300&fit=crop",
      duration: "15:22",
      views: "950K",
      premium: true
    }
  ]

  const categories = [
    { name: "Popular", icon: Star, count: "12.5K" },
    { name: "Trending", icon: Zap, count: "8.2K" },
    { name: "Premium", icon: Crown, count: "3.1K" },
    { name: "Live", icon: Users, count: "245" }
  ]

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-pink-900/90 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&h=1080&fit=crop')"
          }}
        />
        
        <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Premium Adult Entertainment
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Discover exclusive content from the world's top creators
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <Link to="/auth">
                  <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/browse">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg">
                    Browse Content
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/browse">
                <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Start Watching
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link to="/browse" key={category.name}>
              <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <category.icon className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-1">{category.name}</h3>
                  <p className="text-gray-400 text-sm">{category.count} videos</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Featured Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredContent.map((content) => (
            <Link to={`/watch/${content.id}`} key={content.id}>
              <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
                <div className="relative">
                  <img 
                    src={content.thumbnail} 
                    alt={content.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                    {content.duration}
                  </div>
                  <div className="absolute top-2 left-2">
                    {content.premium && (
                      <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                        <Lock className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <PlayCircle className="h-16 w-16 text-white" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-white font-medium mb-2 line-clamp-2">{content.title}</h3>
                  <p className="text-gray-400 text-sm">{content.views} views</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Choose Your Plan</h2>
          <p className="text-gray-400 mb-12">Unlock premium content and exclusive features</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-white mb-2">Free</h3>
                <p className="text-3xl font-bold text-white mb-4">$0<span className="text-sm font-normal">/month</span></p>
                <ul className="text-gray-400 mb-6 space-y-2">
                  <li>Limited content access</li>
                  <li>Standard quality</li>
                  <li>Ads supported</li>
                </ul>
                <Button variant="outline" className="w-full">Current Plan</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-b from-purple-900/50 to-pink-900/50 border-purple-500 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600">
                Most Popular
              </Badge>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-white mb-2">Premium</h3>
                <p className="text-3xl font-bold text-white mb-4">$19.99<span className="text-sm font-normal">/month</span></p>
                <ul className="text-gray-300 mb-6 space-y-2">
                  <li>Full content library</li>
                  <li>HD & 4K quality</li>
                  <li>No ads</li>
                  <li>Download for offline</li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-white mb-2">VIP</h3>
                <p className="text-3xl font-bold text-white mb-4">$39.99<span className="text-sm font-normal">/month</span></p>
                <ul className="text-gray-400 mb-6 space-y-2">
                  <li>Everything in Premium</li>
                  <li>Exclusive VIP content</li>
                  <li>Early access</li>
                  <li>Priority support</li>
                </ul>
                <Button variant="outline" className="w-full">Choose VIP</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Homepage