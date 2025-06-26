import { useRef, useState } from 'react'
import { UploadCloud } from 'lucide-react'

interface VideoUploadProps {
  onUpload: (files: FileList) => void
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return
    // Only accept video files
    const valid = Array.from(files).every(file => file.type.startsWith('video/'))
    if (!valid) {
      setError('Only video files are allowed.')
      return
    }
    setError(null)
    onUpload(files)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 transition-colors cursor-pointer ${dragActive ? 'border-purple-500 bg-purple-900/20' : 'border-slate-700 bg-slate-800/50 hover:border-purple-400'}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragActive(true) }}
        onDragLeave={e => { e.preventDefault(); setDragActive(false) }}
        onDrop={handleDrop}
        tabIndex={0}
        role="button"
        aria-label="Upload video"
      >
        <UploadCloud className="h-12 w-12 text-purple-400 mb-4" />
        <p className="text-lg text-white font-semibold mb-2">Drag & drop videos here</p>
        <p className="text-gray-400 mb-4">or click to select files</p>
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          multiple
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
        />
        {error && <p className="text-red-400 mt-2">{error}</p>}
      </div>
    </div>
  )
}

export default VideoUpload
