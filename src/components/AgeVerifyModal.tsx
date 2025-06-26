import { useEffect, useState } from 'react'
import { Lock, AlertTriangle } from 'lucide-react'

const AGE_KEY = 'age_verified'

const AgeVerifyModal = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const verified = localStorage.getItem(AGE_KEY)
    if (!verified) setOpen(true)
  }, [])

  const handleConfirm = () => {
    localStorage.setItem(AGE_KEY, 'true')
    setOpen(false)
  }

  const handleDeny = () => {
    // Try to close the window, fallback to redirect
    window.close()
    setTimeout(() => {
      window.location.href = 'https://www.google.com'
    }, 500)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-slate-900 rounded-2xl shadow-2xl p-8 max-w-md w-full border-2 border-purple-600 flex flex-col items-center animate-fade-in">
        <Lock className="h-12 w-12 text-purple-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Age Verification</h2>
        <p className="text-gray-300 text-center mb-6">
          This site contains adult content. You must be 18 years or older to enter. Please confirm your age.
        </p>
        <div className="flex flex-col gap-3 w-full">
          <button
            className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-lg shadow-lg hover:from-pink-600 hover:to-purple-700 transition-colors"
            onClick={handleConfirm}
            autoFocus
          >
            I am 18 or older
          </button>
          <button
            className="w-full py-3 rounded-lg bg-slate-800 text-red-400 font-semibold text-lg flex items-center justify-center gap-2 border border-slate-700 hover:bg-slate-700 transition-colors"
            onClick={handleDeny}
          >
            <AlertTriangle className="h-5 w-5" />
            I am under 18
          </button>
        </div>
      </div>
    </div>
  )
}

export default AgeVerifyModal
