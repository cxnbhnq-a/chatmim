import React from 'react'

const AboutPage = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* NAVBAR */}
      <nav className="max-w-7xl mx-auto px-6 py-5 w-full flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">C</div>
          <h1 className="text-xl font-bold tracking-tight text-emerald-900">chatMIM</h1>
        </div>
        <button onClick={onBack} className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition">
          ← Kembali
        </button>
      </nav>

      {/* CONTENT */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
        
        {/* HERO SECTION */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Bikin Chat Palsu,<br/>
            <span className="text-emerald-500">Tanpa Ribet. Tanpa Jejak.</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
            chatMIM adalah <i>Fake Chat Generator</i> berbasis web yang dirancang khusus untuk konten kreator, penulis AU (Alternate Universe), dan kebutuhan visual storytelling. Gratis, tanpa watermark, dan privasi terjaga.
          </p>
        </section>

        {/* FITUR HIGHLIGHT */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-bold text-lg mb-2">Tampilan Otentik</h3>
            <p className="text-slate-500 text-sm">Desain pixel-perfect menyerupai aplikasi chat asli. Font, ikon, dan layout disesuaikan agar terlihat nyata.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-bold text-lg mb-2">Privasi 100%</h3>
            <p className="text-slate-500 text-sm">Semua data diproses di browser kamu. Tidak ada percakapan atau gambar yang di-upload ke server kami.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold text-lg mb-2">Fitur Canggih</h3>
            <p className="text-slate-500 text-sm">Support <b>Bold</b>, <i>Italic</i>, Reply Chat, Dark Mode, hingga kustomisasi status bar (Baterai & Jam).</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-3">📸</div>
            <h3 className="font-bold text-lg mb-2">Ekspor HD</h3>
            <p className="text-slate-500 text-sm">Download hasil karya dalam format PNG resolusi tinggi. Tajam dan siap posting ke sosmed.</p>
          </div>
        </section>

        {/* FAQ SIMPLE */}
        <section className="bg-emerald-50 rounded-3xl p-8 md:p-10 text-center">
          <h2 className="text-2xl font-bold text-emerald-900 mb-4">Kenapa chatMIM?</h2>
          <p className="text-emerald-700 mb-6 max-w-xl mx-auto">
            Kami sadar betapa sulitnya mencari generator chat yang bersih dari iklan mengganggu dan watermark. chatMIM hadir sebagai solusi simpel: Buka, Edit, Download.
          </p>
          <div className="flex justify-center gap-4 text-sm font-bold text-emerald-800 opacity-70">
            <span>✅ Gratis Selamanya</span>
            <span>•</span>
            <span>✅ Tanpa Login</span>
            <span>•</span>
            <span>✅ Tanpa Iklan</span>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-8 text-center">
        <p className="text-slate-400 text-xs">
          &copy; 2026 chatMIM Project. Dibuat untuk komunitas kreatif.
        </p>
      </footer>
    </div>
  )
}

export default AboutPage