import { useState } from 'react'
import ChatGenerator from './components/ChatGenerator'
import LandingPage from './components/LandingPage'

function App() {
  const [isStarted, setIsStarted] = useState(false)

  // 1. Fungsi buat tombol "Buat Chat Sekarang"
  const handleStart = () => {
    setIsStarted(true)
  }

  // 2. Fungsi buat tombol Menu (Fitur / Tentang / Kontak)
  // Karena teks "daging"-nya ada di bawah, kita suruh dia scroll ke bawah 1 layar penuh
  const handleScrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight, // Scroll ke bawah sejauh tinggi layar monitor
      behavior: 'smooth'       // Gerakannya halus (gak kaget)
    })
  }

  return (
    <>
      {/* Logika Tampilan: */}
      {!isStarted ? (
        // Tampilkan Landing Page kalau belum mulai
        <LandingPage 
          onStart={handleStart}
          
          // Sambungin kabel tombol menu ke fungsi scroll tadi
          onFeature={handleScrollToContent} 
          onAbout={handleScrollToContent}
          onContact={handleScrollToContent}
        />
      ) : (
        // Tampilkan Aplikasi Chat kalau udah mulai
        <ChatGenerator />
      )}
    </>
  )
}

export default App
