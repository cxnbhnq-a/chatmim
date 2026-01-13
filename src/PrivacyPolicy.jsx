import React from 'react';

const PrivacyPolicy = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 p-6 md:p-12 font-sans">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-[#00c896] hover:underline font-bold"
        >
          ← Kembali ke Beranda
        </button>

        <h1 className="text-3xl font-bold text-white mb-6">Kebijakan Privasi (Privacy Policy)</h1>
        <p className="mb-4 text-sm opacity-70">Terakhir diperbarui: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6 text-sm leading-relaxed border-t border-slate-700 pt-6">
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">1. Pendahuluan</h2>
            <p>Selamat datang di chatMIM (diakses melalui llnproject.my.id). Privasi pengunjung adalah prioritas utama kami. Dokumen Kebijakan Privasi ini menjabarkan jenis informasi yang kami kumpulkan dan catat, serta bagaimana kami menggunakannya.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">2. Log Files</h2>
            <p>chatMIM mengikuti prosedur standar menggunakan file log. File-file ini mencatat pengunjung ketika mereka mengunjungi situs web. Informasi yang dikumpulkan termasuk alamat protokol internet (IP), jenis browser, Penyedia Layanan Internet (ISP), tanggal dan waktu, serta halaman rujukan/keluar.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">3. Cookies dan Web Beacons</h2>
            <p>Seperti situs web lainnya, chatMIM menggunakan 'cookies'. Cookies ini digunakan untuk menyimpan informasi termasuk preferensi pengunjung dan halaman di situs web yang diakses atau dikunjungi pengunjung. Informasi tersebut digunakan untuk mengoptimalkan pengalaman pengguna.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">4. Google DoubleClick DART Cookie</h2>
            <p>Google adalah salah satu vendor pihak ketiga di situs kami. Google juga menggunakan cookie, yang dikenal sebagai cookie DART, untuk menayangkan iklan kepada pengunjung situs kami berdasarkan kunjungan mereka ke www.website.com dan situs lain di internet.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">5. Persetujuan</h2>
            <p>Dengan menggunakan situs web kami, Anda dengan ini menyetujui Kebijakan Privasi kami dan menyetujui Syarat dan Ketentuannya.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;