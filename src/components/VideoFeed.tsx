import { UploadedVideo } from '../App'
import { PlayCircle } from 'lucide-react'
import { useRef, useState } from 'react'

interface VideoFeedProps {
  videos: UploadedVideo[]
}

const VideoFeed: React.FC<VideoFeedProps> = ({ videos }) => {
  if (videos.length === 0) {
    return (
      <div className="text-center text-gray-400 py-24">
        <PlayCircle className="mx-auto mb-4 h-16 w-16 text-purple-400 opacity-60" />
        <h2 className="text-2xl font-bold mb-2 text-white">No videos yet</h2>
        <p>Upload a video to get started!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}

const VideoCard: React.FC<{ video: UploadedVideo }> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setPlaying(!playing)
    }
  }

  return (
    <div className="bg-slate-800/60 rounded-xl shadow-lg overflow-hidden flex flex-col">
      <div className="relative group aspect-video bg-black">
        <video
          ref={videoRef}
          src={video.url}
          controls
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop"
        />
        {/* Overlay play button for style */}
        <button
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handlePlay}
          tabIndex={-1}
        >
          <PlayCircle className="h-16 w-16 text-white/80 hover:text-purple-400 drop-shadow-lg" />
        </button>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-white font-semibold mb-2 truncate" title={video.name}>{video.name}</h3>
      </div>
    </div>
  )
}

export default VideoFeed
