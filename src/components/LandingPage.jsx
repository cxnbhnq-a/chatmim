import React from 'react'

// Tambahkan prop 'onAbout' di sini
const LandingPage = ({ onStart, onContact, onAbout }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* NAVBAR */}
      <nav className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">C</div>
          <h1 className="text-xl font-bold tracking-tight text-emerald-900">chatMIM</h1>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
          {/* Update Link Tentang */}
          <a href="#" onClick={(e) => { e.preventDefault(); onAbout(); }} className="hover:text-emerald-600 transition">Tentang</a>
          
          <a href="#fitur" className="hover:text-emerald-600 transition">Fitur</a>
          
          {/* Link Kontak */}
          <a href="#" onClick={(e) => { e.preventDefault(); onContact(); }} className="hover:text-emerald-600 transition">Kontak</a>
        </div>
        <button 
          onClick={onStart}
          className="bg-emerald-100 text-emerald-700 px-5 py-2 rounded-full text-sm font-bold hover:bg-emerald-200 transition"
        >
          Buka App
        </button>
      </nav>

      {/* HERO SECTION */}
      <header className="max-w-5xl mx-auto px-6 py-20 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold mb-6 tracking-wide">
          ✨ UPDATE TERBARU V33
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
          Bikin Chat Meme <br/> <span className="text-emerald-500">Se-Realistis Aslinya.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Tools pembuat konten percakapan (AU) terbaik untuk kreator. 
          Support Dark Mode, Reply Chat, hingga Custom Warna Grup. Gratis tanpa login.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button 
            onClick={onStart}
            className="px-8 py-4 bg-emerald-600 text-white rounded-full font-bold text-lg shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:scale-105 transition transform"
          >
            Mulai Buat Chat Sekarang 🚀
          </button>
          <button onClick={onAbout} className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-full font-bold text-lg hover:bg-slate-50 transition">
            Tentang App
          </button>
        </div>
      </header>

      {/* FITUR SECTION */}
      <section id="fitur" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mb-4">🎨</div>
            <h3 className="text-xl font-bold mb-2">Tampilan Otentik</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Ikon SVG asli, font presisi, dan layout yang 100% mirip dengan aplikasi aslinya. Tidak ada yang tahu ini palsu.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl mb-4">🌙</div>
            <h3 className="text-xl font-bold mb-2">Dark & Light Mode</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Sesuaikan dengan tema kontenmu. Warna gelap yang nyaman di mata atau terang yang klasik.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl mb-4">📸</div>
            <h3 className="text-xl font-bold mb-2">Ekspor HD</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Download hasil chat dalam format PNG resolusi tinggi. Tajam walaupun di-zoom berkali-kali.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER SIMPLE */}
      <footer className="bg-white border-t border-slate-100 py-10 text-center">
        <p className="text-slate-400 text-sm">
          &copy; 2026 chatMIM Project. Dibuat dengan ☕ dan Kode.
        </p>
      </footer>
    </div>
  )
}

export default LandingPage