import { useState } from 'react'
import LandingPage from './components/LandingPage'
import ChatGenerator from './components/ChatGenerator'
import ContactPage from './components/ContactPage'
import AboutPage from './components/AboutPage' // <--- Jangan lupa import

function App() {
  // State: 'landing', 'app', 'contact', 'about'
  const [view, setView] = useState('landing')

  return (
    <div className="overflow-hidden">
      {view === 'landing' && (
        <div className="animate-enter"> 
          <LandingPage 
            onStart={() => setView('app')} 
            onContact={() => setView('contact')}
            onAbout={() => setView('about')} // <--- Navigasi ke About
          />
        </div>
      )}
      
      {view === 'app' && (
        <div className="animate-enter">
          <ChatGenerator onBack={() => setView('landing')} />
        </div>
      )}

      {view === 'contact' && (
        <div className="animate-enter">
          <ContactPage onBack={() => setView('landing')} />
        </div>
      )}

      {/* HALAMAN TENTANG */}
      {view === 'about' && (
        <div className="animate-enter">
          <AboutPage onBack={() => setView('landing')} />
        </div>
      )}
    </div>
  )
}

export default App