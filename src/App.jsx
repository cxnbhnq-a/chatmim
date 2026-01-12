import { useState } from 'react'
import ChatGenerator from './components/ChatGenerator'
import LandingPage from './components/LandingPage'

function App() {
  const [isStarted, setIsStarted] = useState(false)

  // Fungsi Mulai
  const handleStart = () => {
    setIsStarted(true)
  }

  // Fungsi Scroll Pintar (Mencari ID)
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      {!isStarted ? (
        <LandingPage 
          onStart={handleStart}
          
          // Arahkan tombol ke ID masing-masing
          onFeature={() => scrollToSection('features')} 
          onAbout={() => scrollToSection('about')}
          onContact={() => scrollToSection('contact')}
        />
      ) : (
        <ChatGenerator />
      )}
    </>
  )
}

export default App
