import { useState } from 'react'
import ChatGenerator from './components/ChatGenerator'
import LandingPage from './components/LandingPage'

function App() {
  const [isStarted, setIsStarted] = useState(false)

  // Fungsi Mulai
  const handleStart = () => {
    setIsStarted(true)
  }

  // Fungsi Scroll Paksa (Pixel Based)
  const handleScrollToContent = () => {
    console.log("Tombol diklik, mencoba scroll..."); // Cek di Console kalo masih macet
    
    // Scroll ke bawah sejauh tinggi layar laptop user
    window.scrollTo({
      top: window.innerHeight + 100, // Turun 1 layar + dikit biar pas
      behavior: 'smooth'
    });
  }

  return (
    <>
      {!isStarted ? (
        <LandingPage 
          onStart={handleStart}
          
          // Semua tombol menu kita arahin ke fungsi scroll yang sama
          onFeature={handleScrollToContent} 
          onAbout={handleScrollToContent}
          onContact={handleScrollToContent}
        />
      ) : (
        <ChatGenerator />
      )}
    </>
  )
}

export default App
