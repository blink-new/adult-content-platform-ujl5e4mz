import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings, 
  Heart, 
  Share2, 
  Star,
  Clock,
  Eye,
  ArrowLeft,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'
import Header from '@/components/Header'
import { useAuth } from '@/contexts/AuthContext'

const Watch = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(900) // 15 minutes in seconds

  // Mock content data
  const content = {
    id: parseInt(id || '1'),
    title: "Premium HD Experience - Exclusive Content",
    description: "Experience the finest in premium adult entertainment with this exclusive HD content. Featuring top-tier production quality and professional performers.",
    thumbnail: "https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?w=800&h=450&fit=crop",
    duration: "15:42",
    views: "2.1M",
    rating: 4.8,
    likes: 145000,
    dislikes: 3200,
    uploadDate: "2024-01-15",
    premium: true,
    vip: false,
    tags: ["HD", "Premium", "Professional", "Exclusive"],
    creator: {
      name: "EliteStudio",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      verified: true,
      subscribers: "1.2M"
    }
  }

  const relatedContent = [
    {
      id: 2,
      title: "Similar Premium Content",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      duration: "12:34",
      views: "1.8M"
    },
    {
      id: 3,
      title: "Trending in Premium",
      thumbnail: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=200&fit=crop",
      duration: "18:22",
      views: "950K"
    },
    {
      id: 4,
      title: "New Release",
      thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop",
      duration: "10:15",
      views: "500K"
    }
  ]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 1, duration))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, duration])

  const hasAccess = user && (user.subscription === 'premium' || user.subscription === 'vip')

  if (!hasAccess && content.premium) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link to="/browse" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Link>
          
          <Card className="bg-slate-800/50 border-slate-700 text-center p-12">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Settings className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Premium Content</h2>
              <p className="text-gray-400 mb-6">
                This content requires a Premium or VIP subscription to watch.
              </p>
              <div className="space-y-3">
                <Link to="/auth">
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                    Upgrade to Premium
                  </Button>
                </Link>
                <Link to="/browse">
                  <Button variant="outline" className="w-full">
                    Browse Free Content
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Back Button */}
            <Link to="/browse" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Link>

            {/* Video Player */}
            <Card className="bg-slate-900 border-slate-700 overflow-hidden mb-6">
              <AspectRatio ratio={16 / 9}>
                <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <img 
                    src={content.thumbnail} 
                    alt={content.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Video Controls Overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group">
                    <Button
                      size="lg"
                      variant="ghost"
                      className="w-20 h-20 rounded-full bg-black/50 hover:bg-black/70 transition-all"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <Pause className="h-8 w-8 text-white" />
                      ) : (
                        <Play className="h-8 w-8 text-white ml-1" />
                      )}
                    </Button>
                  </div>
                  
                  {/* Video Controls Bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center space-x-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:bg-white/20"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      
                      <div className="flex-1 flex items-center space-x-2">
                        <span className="text-white text-sm">{formatTime(currentTime)}</span>
                        <div className="flex-1 bg-white/20 rounded-full h-1">
                          <div 
                            className="bg-purple-500 h-1 rounded-full transition-all"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                          />
                        </div>
                        <span className="text-white text-sm">{formatTime(duration)}</span>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-white hover:bg-white/20"
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                      >
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </AspectRatio>
            </Card>

            {/* Video Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-white mb-2">{content.title}</h1>
                    <div className="flex items-center space-x-4 text-gray-400 text-sm">
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {content.views} views
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {content.duration}
                      </span>
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        {content.rating}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {content.premium && (
                      <Badge className="bg-gradient-to-r from-pink-500 to-purple-600">
                        Premium
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4 mb-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className={`${isLiked ? 'bg-green-600 border-green-600 text-white' : 'text-white border-slate-600'}`}
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    {formatNumber(content.likes)}
                  </Button>
                  
                  <Button variant="outline" size="sm" className="text-white border-slate-600">
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    {formatNumber(content.dislikes)}
                  </Button>
                  
                  <Button variant="outline" size="sm" className="text-white border-slate-600">
                    <Heart className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  
                  <Button variant="outline" size="sm" className="text-white border-slate-600">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                <Separator className="bg-slate-700" />
              </div>

              {/* Creator Info */}
              <div className="flex items-center space-x-4">
                <img 
                  src={content.creator.avatar} 
                  alt={content.creator.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-white font-semibold">{content.creator.name}</h3>
                    {content.creator.verified && (
                      <Badge variant="secondary" className="text-xs">Verified</Badge>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{content.creator.subscribers} subscribers</p>
                </div>
                <Button variant="outline" size="sm">
                  Subscribe
                </Button>
              </div>

              {/* Description */}
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-gray-300 mb-4">{content.description}</p>
                <div className="flex flex-wrap gap-2">
                  {content.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Related Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Related Content</h2>
              <div className="space-y-4">
                {relatedContent.map((item) => (
                  <Link to={`/watch/${item.id}`} key={item.id}>
                    <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 transition-colors cursor-pointer">
                      <div className="flex">
                        <div className="relative w-32 h-20 flex-shrink-0">
                          <img 
                            src={item.thumbnail} 
                            alt={item.title}
                            className="w-full h-full object-cover rounded-l"
                          />
                          <div className="absolute bottom-1 right-1 bg-black/80 text-white px-1 py-0.5 rounded text-xs">
                            {item.duration}
                          </div>
                        </div>
                        <div className="p-3 flex-1 min-w-0">
                          <h3 className="text-white text-sm font-medium line-clamp-2 mb-1">
                            {item.title}
                          </h3>
                          <p className="text-gray-400 text-xs">{item.views} views</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Watch