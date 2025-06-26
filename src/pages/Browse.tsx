import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PlayCircle, Search, Filter, Lock, Clock, Eye, Star } from 'lucide-react'
import Header from '@/components/Header'
import { useAuth } from '@/contexts/AuthContext'

const Browse = () => {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'trending', label: 'Trending' },
    { value: 'new', label: 'New Releases' },
    { value: 'premium', label: 'Premium' },
    { value: 'vip', label: 'VIP Exclusive' }
  ]

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'recent', label: 'Most Recent' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'duration', label: 'Longest' }
  ]

  const content = [
    {
      id: 1,
      title: "Premium HD Experience",
      thumbnail: "https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?w=400&h=300&fit=crop",
      duration: "15:42",
      views: "2.1M",
      rating: 4.8,
      premium: true,
      vip: false,
      category: "premium"
    },
    {
      id: 2,
      title: "Trending Content #1",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      duration: "12:34",
      views: "1.8M",
      rating: 4.6,
      premium: false,
      vip: false,
      category: "trending"
    },
    {
      id: 3,
      title: "VIP Exclusive Content",
      thumbnail: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=300&fit=crop",
      duration: "18:22",
      views: "950K",
      rating: 4.9,
      premium: true,
      vip: true,
      category: "vip"
    },
    {
      id: 4,
      title: "New Release Today",
      thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
      duration: "10:15",
      views: "500K",
      rating: 4.7,
      premium: false,
      vip: false,
      category: "new"
    },
    {
      id: 5,
      title: "4K Ultra HD Premium",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      duration: "22:08",
      views: "1.2M",
      rating: 4.8,
      premium: true,
      vip: false,
      category: "premium"
    },
    {
      id: 6,
      title: "Trending Now #2",
      thumbnail: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&h=300&fit=crop",
      duration: "14:33",
      views: "800K",
      rating: 4.5,
      premium: false,
      vip: false,
      category: "trending"
    }
  ]

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedContent = [...filteredContent].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return b.id - a.id
      case 'rating':
        return b.rating - a.rating
      case 'duration':
        return parseInt(b.duration.split(':')[0]) - parseInt(a.duration.split(':')[0])
      case 'popular':
      default:
        return parseInt(b.views.replace(/[^\d]/g, '')) - parseInt(a.views.replace(/[^\d]/g, ''))
    }
  })

  const canAccess = (item: typeof content[0]) => {
    if (!item.premium && !item.vip) return true
    if (!user) return false
    if (item.vip) return user.subscription === 'vip'
    if (item.premium) return user.subscription === 'premium' || user.subscription === 'vip'
    return true
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Browse Content</h1>
          <p className="text-gray-400">Discover thousands of premium videos and exclusive content</p>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search videos..."
                className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 bg-slate-700/50 border-slate-600 text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value} className="text-white hover:bg-slate-700">
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 bg-slate-700/50 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-white hover:bg-slate-700">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {sortedContent.length} results
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedContent.map((item) => {
            const hasAccess = canAccess(item)
            
            return (
              <Card key={item.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 overflow-hidden group">
                <div className="relative">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Duration */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.duration}
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {item.vip && (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-xs">
                        VIP
                      </Badge>
                    )}
                    {item.premium && !item.vip && (
                      <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs">
                        Premium
                      </Badge>
                    )}
                  </div>
                  
                  {/* Play Button */}
                  <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${!hasAccess ? 'bg-black/50' : ''}`}>
                    {hasAccess ? (
                      <Link to={`/watch/${item.id}`}>
                        <PlayCircle className="h-16 w-16 text-white hover:text-purple-400 transition-colors" />
                      </Link>
                    ) : (
                      <div className="text-center">
                        <Lock className="h-12 w-12 text-white mx-auto mb-2" />
                        <p className="text-white text-sm">
                          {item.vip ? 'VIP Required' : 'Premium Required'}
                        </p>
                        <Link to="/auth">
                          <Button size="sm" className="mt-2 bg-gradient-to-r from-pink-500 to-purple-600">
                            Upgrade
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="text-white font-medium mb-2 line-clamp-2 min-h-[2.5rem]">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {item.views}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 mr-1 text-yellow-500" />
                      {item.rating}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* No Results */}
        {sortedContent.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No content found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
            <Button 
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setSortBy('popular')
              }}
              variant="outline"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Browse