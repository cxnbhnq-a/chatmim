import React from 'react';

const LandingPage = ({ onStart, onAbout, onFeature, onContact }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-6 font-sans text-white">
      
      {/* HEADER SIMPLE */}
      <header className="absolute top-6 left-6 flex items-center gap-3 select-none animate-fade-in-down">
         <div className="w-11 h-11 bg-[#00c896] rounded-xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform">
            <span className="text-white font-bold text-3xl leading-none pb-[2px]">C</span>
         </div>
         <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">
            chatMIM
         </h1>
      </header>

      {/* HERO SECTION (Pancingan Utama) */}
      <main className="text-center max-w-3xl space-y-8 mt-20 relative z-10">
        <div className="space-y-4 animate-fade-in-up">
           <span className="bg-white/10 text-[#00c896] px-4 py-1.5 rounded-full text-xs font-bold border border-white/10 uppercase tracking-wider inline-block mb-2">
             Tool Kebutuhan Konten Kreator
           </span>
           <h2 className="text-5xl md:text-7xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 drop-shadow-sm">
             Bikin Chat Meme <br/> <span className="text-white">Mirip Asli.</span>
           </h2>
           <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
             Generator Meme Chat WhatsApp Bahasa Indonesia. Buat screenshot percakapan palsu untuk konten hiburan, testimoni, atau materi edukasi tanpa perlu instal aplikasi. 100% Gratis & Privasi Aman.
           </p>
        </div>

        <button 
          onClick={onStart}
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-[#00a884] font-lg rounded-full hover:bg-[#008f6f] hover:scale-110 hover:shadow-[0_0_40px_-10px_rgba(0,168,132,0.7)] focus:outline-none ring-offset-2 focus:ring-2 ring-green-400"
        >
          <span className="mr-2 text-xl">✨</span> Buat Chat Sekarang
          <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>

        {/* MENU LINK */}
        <div className="flex justify-center gap-6 text-sm font-medium text-slate-400 mt-8">
           <button onClick={onFeature} className="hover:text-[#00c896] transition-colors">Fitur Unggulan</button>
           <button onClick={onAbout} className="hover:text-[#00c896] transition-colors">Tentang Kami</button>
           <button onClick={onContact} className="hover:text-[#00c896] transition-colors">Kontak</button>
        </div>
      </main>

      {/* --- SEO CONTENT AREA (PENTING BUAT ADSENSE) --- */}
      {/* Bagian ini berisi teks panjang agar Google menganggap web ini punya "Value" */}
      <section className="mt-24 max-w-4xl text-left bg-slate-800/50 p-8 rounded-3xl border border-white/5 shadow-2xl space-y-8">
        
        <div>
          <h3 className="text-2xl font-bold text-[#00c896] mb-3">Apa itu chatMIM?</h3>
          <p className="text-slate-300 leading-relaxed">
            chatMIM adalah <strong>Meme Chat Generator Online</strong> canggih yang memungkinkan Anda membuat tiruan percakapan WhatsApp Web yang sangat realistis. Tools ini dirancang khusus untuk konten kreator, marketer, dan penulis cerita (AU) yang membutuhkan visualisasi chat tanpa harus memiliki dua handphone. Dengan tampilan antarmuka (UI) terbaru yang mendukung Mode Gelap (Dark Mode) dan Mode Terang (Light Mode), hasil screenshot yang dihasilkan hampir tidak bisa dibedakan dari aslinya.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div>
               <h3 className="text-xl font-bold text-white mb-2">✨ Fitur Utama</h3>
               <ul className="list-disc list-inside text-slate-400 space-y-1">
                 <li>Tampilan 99% Mirip WA Web Asli.</li>
                 <li>Dukungan Emoji, Reply Chat, dan Gambar.</li>
                 <li>Mode Baterai & Jam Custom.</li>
                 <li>Download Kualitas HD.</li>
                 <li>Tanpa Watermark & Gratis Selamanya.</li>
               </ul>
            </div>
            <div>
               <h3 className="text-xl font-bold text-white mb-2">💡 Kegunaan</h3>
               <ul className="list-disc list-inside text-slate-400 space-y-1">
                 <li>Bahan Konten TikTok / Reels / Shorts.</li>
                 <li>Visualisasi Cerita Fiksi (AU Twitter).</li>
                 <li>Mockup Testimoni Toko Online.</li>
                 <li>Prank Teman atau Pacar.</li>
                 <li>Kebutuhan Presentasi & Edukasi Digital.</li>
               </ul>
            </div>
        </div>

        <div>
           <h3 className="text-xl font-bold text-white mb-3">Disclaimer</h3>
           <p className="text-slate-400 text-sm italic border-l-4 border-yellow-500 pl-4 py-1 bg-yellow-500/10">
             chatMIM dibuat hanya untuk tujuan hiburan dan kreatif. Pengembang tidak bertanggung jawab atas penyalahgunaan tools ini untuk tujuan penipuan (hoax), pemalsuan bukti hukum, atau tindakan ilegal lainnya. Gunakan dengan bijak.
           </p>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="mt-20 text-center text-slate-500 text-xs">
        <p>&copy; {new Date().getFullYear()} chatMIM Project. All Rights Reserved.</p>
        <p className="mt-2 opacity-50">Powered by llnproject.my.id</p>
      </footer>

    </div>
  )
}

export default LandingPage