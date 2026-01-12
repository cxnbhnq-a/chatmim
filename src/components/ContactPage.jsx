import React, { useState } from 'react'

const ContactPage = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // --- GANTI EMAIL INI ---
    const myEmail = "nabhanqorialbana@gmail.com" 
    
    const subject = `Pesan dari ${formData.name} (chatMIM)`
    const body = `Halo Admin chatMIM,\n\nNama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`
    
    // --- TRIK: MEMBUKA GMAIL WEB (Browser) ---
    // Ini akan membuka tab baru langsung ke halaman tulis pesan Gmail
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    window.open(gmailLink, '_blank')
  }

  // --- ALTERNATIF: KIRIM KE WHATSAPP (Opsional) ---
  // Kalau mau ganti ke WA, ganti fungsi handleSubmit jadi ini:
  /*
  const handleWhatsApp = () => {
     const nomorWA = "6281234567890" // Ganti nomormu (pakai 62)
     const text = `Halo Admin, saya ${formData.name}. ${formData.message}`
     window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(text)}`, '_blank')
  }
  */

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* NAVBAR */}
      <nav className="max-w-7xl mx-auto px-6 py-5 w-full flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">C</div>
          <h1 className="text-xl font-bold tracking-tight text-emerald-900">chatMIM</h1>
        </div>
        <button onClick={onBack} className="text-sm font-bold text-slate-500 hover:text-emerald-600">
          ← Kembali
        </button>
      </nav>

      {/* CONTENT */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 max-w-lg w-full">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Hubungi Kami 👋</h2>
          <p className="text-slate-500 mb-8">Punya ide fitur baru? Atau nemu bug yang bikin kesel? Kirim pesan aja!</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nama</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" 
                placeholder="Siapa nama kamu?" 
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" 
                placeholder="email@contoh.com" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Pesan</label>
              <textarea 
                rows="4" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" 
                placeholder="Ceritain aja semuanya..."
              ></textarea>
            </div>

            <button type="submit" className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 hover:shadow-lg transition transform hover:-translate-y-1 flex justify-center items-center gap-2">
              <span>🚀</span> Kirim via Gmail
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">Atau DM langsung via Sosmed:</p>
            <div className="flex justify-center gap-4 mt-3">
              <a href="https://www.linkedin.com/in/nabhan-qori-albana-153027298" className="text-slate-400 hover:text-emerald-600 transition font-bold text-sm">LinkedIn</a>
              <span className="text-slate-200">•</span>
              <a href="https://www.instagram.com/nbhanq.al_/" className="text-slate-400 hover:text-emerald-600 transition font-bold text-sm">Instagram</a>
              <span className="text-slate-200">•</span>
              <a href="https://github.com/cxnbhnq-a" className="text-slate-400 hover:text-emerald-600 transition font-bold text-sm">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage