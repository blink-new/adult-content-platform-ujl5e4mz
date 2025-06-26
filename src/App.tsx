import { useState } from 'react'
import VideoUpload from './components/VideoUpload'
import VideoFeed from './components/VideoFeed'
import AgeVerifyModal from './components/AgeVerifyModal'

export interface UploadedVideo {
  id: string
  url: string
  name: string
}

function App() {
  const [videos, setVideos] = useState<UploadedVideo[]>([])

  const handleUpload = (files: FileList) => {
    const newVideos: UploadedVideo[] = []
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file)
      newVideos.push({
        id: `${file.name}-${Date.now()}`,
        url,
        name: file.name,
      })
    })
    setVideos((prev) => [...newVideos, ...prev])
  }

  return (
    <>
      <AgeVerifyModal />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center px-4 py-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 drop-shadow-lg">
          Open Video Hub
        </h1>
        <p className="text-lg text-gray-300 mb-8 text-center max-w-xl">
          Upload and watch videos instantly. No sign up, no hassle. Just pure entertainment.
        </p>
        <VideoUpload onUpload={handleUpload} />
        <div className="w-full max-w-5xl mt-12">
          <VideoFeed videos={videos} />
        </div>
      </div>
    </>
  )
}

export default App