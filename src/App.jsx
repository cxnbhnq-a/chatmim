import { useState } from 'react'
import ChatGenerator from './components/ChatGenerator'
import LandingPage from './components/LandingPage'
// Pastikan path import ini sesuai sama lokasi file lu
import AboutPage from './components/AboutPage'     
import ContactPage from './components/ContactPage'

function App() {
  // State sekarang bukan cuma true/false, tapi nama halaman
  const [currentPage, setCurrentPage] = useState('home') // home, app, about, contact

  // --- FUNGSI NAVIGASI ---
  const goHome = () => setCurrentPage('home')
  const goApp = () => setCurrentPage('app')
  const goAbout = () => setCurrentPage('about')
  const goContact = () => setCurrentPage('contact')

  // --- RENDER HALAMAN SESUAI STATE ---
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <LandingPage 
            onStart={goApp}       // Tombol Mulai -> ke App
            onAbout={goAbout}     // Tombol Tentang -> ke Halaman About
            onContact={goContact} // Tombol Kontak -> ke Halaman Contact
          />
        )
      case 'app':
        return <ChatGenerator onBack={goHome} />
      case 'about':
        // Jangan lupa kasih tombol back di AboutPage lu nanti
        return <AboutPage onBack={goHome} /> 
      case 'contact':
        // Jangan lupa kasih tombol back di ContactPage lu nanti
        return <ContactPage onBack={goHome} />
      default:
        return <LandingPage onStart={goApp} />
    }
  }

  return (
    <>
      {renderPage()}
    </>
  )
}

export default App