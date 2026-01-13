import { useState, useRef, useEffect } from 'react'
import { toPng } from 'html-to-image'

// --- KONFIGURASI WARNA USER ---
const COLOR_OPTIONS = [
  { class: "text-red-500", label: "Merah", hex: "#ef4444" },
  { class: "text-orange-500", label: "Oren", hex: "#f97316" },
  { class: "text-purple-500", label: "Ungu", hex: "#a855f7" },
  { class: "text-blue-500", label: "Biru", hex: "#3b82f6" },
  { class: "text-pink-500", label: "Pink", hex: "#ec4899" },
  { class: "text-green-500", label: "Hijau", hex: "#22c55e" },
  { class: "text-teal-600", label: "Teal", hex: "#0d9488" },
]

const ChatGenerator = ({ onBack }) => {
  // =========================================
  // 1. STATE MANAGEMENT
  // =========================================
  
  const [mode, setMode] = useState("light")
  const [chatType, setChatType] = useState("private")
  const [bgImage, setBgImage] = useState(null)
  
  // --- FITUR ZOOM ---
  const [uiScale, setUiScale] = useState(1)      
  const [previewScale, setPreviewScale] = useState(1) 

  // --- IDENTITAS HP ---
  const [contactName, setContactName] = useState("Ayang")
  const [status, setStatus] = useState("Online")
  const [time, setTime] = useState("21:03")
  const [battery, setBattery] = useState(75) 
  const [profilePic, setProfilePic] = useState(null)
  
  // --- CUSTOM INPUT TEXT ---
  const [inputBarText, setInputBarText] = useState("Ketik Pesan") 

  // --- INPUT CHAT ---
  const [activeTab, setActiveTab] = useState("text") 
  const [inputText, setInputText] = useState("")
  const [selectedImage, setSelectedImage] = useState(null)
  
  const [senderName, setSenderName] = useState("Angga")
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].class)
  
  const [replyData, setReplyData] = useState(null)

  const [locTitle, setLocTitle] = useState("Lokasi Banjir")
  const [locAddress, setLocAddress] = useState("Jakarta Selatan")
  const [locMapImage, setLocMapImage] = useState(null)
  
  // --- WARNING BANNER ---
  const [showWarning, setShowWarning] = useState(true)

  const [messages, setMessages] = useState([
    { id: 1, type: 'text', content: "Hallo Ayang", sender: "them", senderName: "Ayang", senderColor: "text-red-500", time: "20:23" },
    { 
      id: 2, 
      type: 'text', 
      content: "Allo Juga Ayang", 
      sender: "me", 
      time: "20:24",
      reply: { senderName: "Ayang", content: "Hallo Ayang", color: "text-red-500" } 
    }
  ])

  const chatPreviewRef = useRef(null) 
  const chatContainerRef = useRef(null)

  // =========================================
  // 2. LOGIC FUNCTIONS
  // =========================================

  const handleProfilePicUpload = (e) => e.target.files[0] && setProfilePic(URL.createObjectURL(e.target.files[0]))
  const handleBgUpload = (e) => e.target.files[0] && setBgImage(URL.createObjectURL(e.target.files[0]))
  const handleImageUpload = (e) => e.target.files[0] && setSelectedImage(URL.createObjectURL(e.target.files[0]))
  const handleMapUpload = (e) => e.target.files[0] && setLocMapImage(URL.createObjectURL(e.target.files[0]))

  const handleSelectReply = (msg) => {
    const contentPreview = msg.type === 'image' ? '📷 Foto' : (msg.type === 'location' ? '📍 Lokasi' : msg.content)
    const replyColor = msg.sender === 'me' ? 'text-[#00a884]' : (msg.senderColor || 'text-orange-500')

    setReplyData({
      senderName: msg.sender === 'me' ? 'Anda' : (msg.senderName || contactName),
      content: contentPreview,
      color: replyColor
    })
  }

  const cancelReply = () => setReplyData(null)

  const addMessage = (who) => {
    let newMessage = {
      id: Date.now(),
      sender: who,
      senderName: who === 'them' ? senderName : null,
      senderColor: who === 'them' ? selectedColor : null, 
      time: time,
      type: activeTab,
      reply: replyData
    }

    if (activeTab === 'text') {
      if (!inputText.trim()) return
      newMessage.content = inputText
      setInputText("")
    } 
    else if (activeTab === 'image') {
      if (!selectedImage) return alert("Pilih gambar dulu!")
      newMessage.content = selectedImage
      newMessage.caption = inputText
      setSelectedImage(null)
      setInputText("")
      document.getElementById('fileInput').value = ""
    }
    else if (activeTab === 'location') {
       if (!locTitle.trim()) return
       newMessage.content = locTitle
       newMessage.address = locAddress
       newMessage.mapImg = locMapImage
    }

    setMessages([...messages, newMessage])
    setReplyData(null)
  }

  const deleteMessage = (id) => setMessages(messages.filter(msg => msg.id !== id))

  useEffect(() => {
    if(chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
  }, [messages])

  const handleDownload = async () => {
    if (chatPreviewRef.current === null) return;

    try {
      const dataUrl = await toPng(chatPreviewRef.current, { 
          pixelRatio: 3 / previewScale,
          skipAutoScale: true, // Tambahin ini biar aman
      });

      const link = document.createElement('a');
      link.download = `chat-${contactName}.png`;
      link.href = dataUrl;
      link.click();
      } catch (err) { 
      console.error(err); // Biar kelihatan error aslinya di console
      alert("Gagal download: Ada gambar yang bermasalah."); 
      }
  }

  const getBubbleColor = (isMe) => {
    if (mode === 'dark') return isMe ? 'bg-[#005c4b] text-[#e9edef]' : 'bg-[#202c33] text-[#e9edef]'
    return isMe ? 'bg-[#d9fdd3] text-[#111b21]' : 'bg-white text-[#111b21]'
  }

  const getReplyBorderColor = (colorClass) => {
    if (!colorClass) return '#a768ea'; 
    if (colorClass === 'text-[#00a884]') return '#00a884';
    const foundColor = COLOR_OPTIONS.find(opt => opt.class === colorClass);
    return foundColor ? foundColor.hex : '#a768ea';
  }

  const getBatteryWidth = () => {
    const safeBattery = Math.max(0, Math.min(battery, 100));
    return (safeBattery / 100) * 17;
  }

  // --- TEXT FORMATTER ---
  const formatText = (text) => {
    if (!text) return "";
    let formatted = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

    formatted = formatted.replace(/```(.*?)```/g, '<code class="font-mono text-[0.9em] bg-black/10 px-1 rounded">$1</code>');
    formatted = formatted.replace(/\*(.*?)\*/g, '<b>$1</b>');
    formatted = formatted.replace(/_(.*?)_/g, '<i>$1</i>');
    formatted = formatted.replace(/~(.*?)~/g, '<strike>$1</strike>');
    formatted = formatted.replace(/\n/g, '<br/>');

    return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 font-sans flex justify-center overflow-x-hidden">
      
      {/* --- TOMBOL KEMBALI (FIXED & SOLID) --- */}
      <button 
        onClick={onBack}
        className="fixed top-6 left-6 z-[100] bg-slate-800 text-white px-5 py-2.5 rounded-full text-sm font-bold border border-slate-600 shadow-xl hover:bg-slate-700 hover:scale-105 transition flex items-center gap-2 cursor-pointer"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Kembali
      </button>

      {/* --- CONTENT CONTAINER (MARGIN TOP 24) --- */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-24">
        
        {/* PANEL KIRI */}
        <div className="bg-white p-6 rounded-xl shadow-lg space-y-5 z-20 relative">
          
          {/* WARNING BANNER */}
          {showWarning && (
            <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded flex justify-between items-start animate-fade-in">
              <div className="flex gap-2">
                <span className="text-yellow-500">⚠️</span>
                <div>
                  <p className="font-bold text-yellow-800 text-xs">Peringatan!</p>
                  <p className="text-yellow-700 text-[10px]">Data hilang jika di-refresh. Download dulu sebelum keluar.</p>
                </div>
              </div>
              <button onClick={() => setShowWarning(false)} className="text-yellow-400 hover:text-yellow-600 font-bold text-xs">✕</button>
            </div>
          )}

          <div className="border-b pb-3">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">🎛️ Panel V1.0.1</h2>
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Zoom Isi (UI)</label>
                    <div className="flex items-center space-x-2 bg-gray-100 p-1 px-2 rounded-lg">
                        <input type="range" min="0.5" max="1.3" step="0.01" value={uiScale} onChange={(e) => setUiScale(parseFloat(e.target.value))} className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer" />
                        <span className="text-xs font-bold text-gray-600 w-8">{Math.round(uiScale * 100)}%</span>
                    </div>
                </div>
                <div className="flex-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Zoom HP (Luar)</label>
                    <div className="flex items-center space-x-2 bg-gray-100 p-1 px-2 rounded-lg">
                        <input type="range" min="0.5" max="1.5" step="0.1" value={previewScale} onChange={(e) => setPreviewScale(parseFloat(e.target.value))} className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer" />
                        <span className="text-xs font-bold text-gray-600 w-8">{Math.round(previewScale * 100)}%</span>
                    </div>
                </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="p-3 bg-gray-100 rounded-lg">
                <label className="text-xs font-bold text-gray-500 block mb-2">TEMA</label>
                <div className="flex gap-2">
                  <button onClick={()=>setMode('light')} className={`flex-1 py-2 text-sm rounded font-bold ${mode==='light' ? 'bg-white shadow text-green-600' : 'text-gray-400'}`}>☀️ Terang</button>
                  <button onClick={()=>setMode('dark')} className={`flex-1 py-2 text-sm rounded font-bold ${mode==='dark' ? 'bg-gray-800 shadow text-white' : 'text-gray-400'}`}>🌙 Gelap</button>
                </div>
             </div>
             <div className="p-3 bg-gray-100 rounded-lg">
                <label className="text-xs font-bold text-gray-500 block mb-2">TIPE CHAT</label>
                <div className="flex gap-2">
                  <button onClick={()=>setChatType('private')} className={`flex-1 py-2 text-sm rounded font-bold ${chatType==='private' ? 'bg-white shadow text-blue-600' : 'text-gray-400'}`}>👤 Pribadi</button>
                  <button onClick={()=>setChatType('group')} className={`flex-1 py-2 text-sm rounded font-bold ${chatType==='group' ? 'bg-white shadow text-purple-600' : 'text-gray-400'}`}>👥 Grup</button>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <input type="text" placeholder="Nama Kontak / Grup" value={contactName} onChange={(e)=>setContactName(e.target.value)} className="p-2 border rounded" />
             <input type="text" placeholder="Status / Anggota Grup" value={status} onChange={(e)=>setStatus(e.target.value)} className="p-2 border rounded" />
             <input type="time" value={time} onChange={(e)=>setTime(e.target.value)} className="p-2 border rounded" />
             <input type="number" placeholder="Baterai %" value={battery} onChange={(e)=>setBattery(e.target.value)} className="p-2 border rounded" />
          </div>

          <div className="grid grid-cols-2 gap-3">
             <div>
                <label className="text-xs font-bold text-gray-500">Foto Profil</label>
                <input type="file" accept="image/*" onChange={handleProfilePicUpload} className="text-xs w-full mt-1"/>
             </div>
             <div>
                <label className="text-xs font-bold text-gray-500">Background Chat</label>
                <input type="file" accept="image/*" onChange={handleBgUpload} className="text-xs w-full mt-1"/>
             </div>
          </div>

          <div className="border-t pt-4">
             <label className="text-xs font-bold text-gray-500 block mb-2">TEKS INPUT BAWAH (Support *bold*, _italic_)</label>
             <input 
                type="text" 
                value={inputBarText} 
                onChange={(e)=>setInputBarText(e.target.value)} 
                placeholder="Contoh: Ketik pesan, Mengetik..., dll"
                className="w-full p-2 border rounded text-sm mb-3 font-medium text-gray-700 bg-gray-50" 
             />
          </div>

          {/* Area Input Chat */}
          <div className="border-t pt-4">
             {replyData && (
                <div className="mb-3 p-2 bg-blue-50 border-l-4 border-blue-500 rounded flex justify-between items-center animate-pulse">
                  <div className="overflow-hidden">
                    <p className={`text-[10px] font-bold ${replyData.color}`}>Membalas: {replyData.senderName}</p>
                    <p className="text-[10px] text-gray-500 truncate w-40">{replyData.content}</p>
                  </div>
                  <button onClick={cancelReply} className="text-red-500 font-bold text-xs hover:bg-red-100 p-1 px-2 rounded">Batal</button>
                </div>
             )}

             <div className="flex space-x-2 mb-3">
                {['text', 'image', 'location'].map(tab => (
                   <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-1 px-3 capitalize font-bold text-sm ${activeTab === tab ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-400'}`}>
                    {tab}
                   </button>
                ))}
             </div>

             <div className="bg-gray-50 p-3 rounded-lg border mb-3">
                {chatType === 'group' && (
                  <div className="mb-3 border-b pb-3">
                    <label className="text-[10px] font-bold text-gray-500 block mb-1">SETTING PENGIRIM (Khusus Grup)</label>
                    <div className="flex gap-2">
                       <input type="text" placeholder="Nama" value={senderName} onChange={(e)=>setSenderName(e.target.value)} className="flex-1 p-1 border rounded text-sm font-bold text-gray-700" />
                       <div className="flex items-center gap-1 bg-white border p-1 rounded">
                          {COLOR_OPTIONS.map((opt) => (
                            <button key={opt.hex} onClick={() => setSelectedColor(opt.class)} className={`w-5 h-5 rounded-full border ${selectedColor === opt.class ? 'ring-2 ring-offset-1 ring-gray-400 scale-110' : ''}`} style={{ backgroundColor: opt.hex }} title={opt.label} />
                          ))}
                       </div>
                    </div>
                  </div>
                )}

                {activeTab === 'text' && <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Support *bold*, _italic_, ~strike~" className="w-full p-2 border rounded h-20 text-sm"></textarea>}
                
                {activeTab === 'image' && (
                  <div className="space-y-2">
                     <input id="fileInput" type="file" onChange={handleImageUpload} className="text-xs w-full"/>
                     {selectedImage && <img src={selectedImage} className="h-16 rounded border" />}
                     <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Caption..." className="w-full p-2 border rounded text-sm"/>
                  </div>
                )}
                
                {activeTab === 'location' && (
                  <div className="space-y-2">
                    <input type="text" value={locTitle} onChange={(e)=>setLocTitle(e.target.value)} placeholder="Nama Lokasi" className="w-full p-2 border rounded text-sm" />
                    <input type="text" value={locAddress} onChange={(e)=>setLocAddress(e.target.value)} placeholder="Alamat Detail" className="w-full p-2 border rounded text-sm" />
                    <input type="file" onChange={handleMapUpload} className="text-xs w-full"/>
                  </div>
                )}
             </div>

             <div className="flex gap-2">
               <button onClick={() => addMessage('them')} className="flex-1 bg-gray-200 py-2 rounded font-bold text-sm text-gray-700">⬅️ Kirim (Dia)</button>
               <button onClick={() => addMessage('me')} className="flex-1 bg-green-600 py-2 rounded font-bold text-sm text-white">Kirim (Kita) ➡️</button>
             </div>
          </div>
          
          <button onClick={handleDownload} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg">📸 Download HD</button>
          
          <div className="h-32 overflow-y-auto border p-2 rounded text-xs bg-gray-50">
             <p className="text-[10px] text-gray-400 mb-2 text-center">Klik ↩️ untuk reply, X untuk hapus</p>
             {messages.map(m => (
               <div key={m.id} className="p-2 bg-white border-b mb-1 rounded flex justify-between items-center shadow-sm">
                 <div className="truncate w-2/3">
                   <span className={`font-bold ${m.senderColor || 'text-gray-700'}`}>{m.sender === 'me' ? 'Anda' : (m.senderName || 'Dia')}: </span>
                   <span className="text-gray-500">{m.content?.substring?.(0,20)}...</span>
                 </div>
                 <div className="flex gap-2">
                   <button onClick={()=>handleSelectReply(m)} className="text-blue-500 hover:bg-blue-100 px-2 py-1 rounded">↩️</button>
                   <button onClick={()=>deleteMessage(m.id)} className="text-red-500 hover:bg-red-100 px-2 py-1 rounded">X</button>
                 </div>
               </div>
             ))}
          </div>

          <div className="text-center space-y-2 opacity-80 text-gray-500 mt-4">
            <p className="text-xs">Suka dengan tools ini?</p>
            <a href="https://saweria.co/cxnq" target="_blank" rel="noreferrer" className="inline-block bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-xs font-bold hover:bg-yellow-300 transition shadow">
              ☕ Traktir Kopi Guys, Disini!
            </a>
            <p className="text-[10px] text-gray-400 pt-2">
              Kritik & Saran? Silakan <button onClick={onBack} className="underline text-green-600">hubungi kontak tertera</button>.
            </p>
          </div>

        </div>

        {/* PANEL KANAN (PREVIEW) */}
        <div className="flex justify-center sticky top-4 mb-20 origin-top transition-transform duration-200" style={{ transform: `scale(${previewScale})` }}>
          <div ref={chatPreviewRef} className="w-[375px] h-[667px] shadow-2xl overflow-hidden relative font-sans flex flex-col" style={{ backgroundColor: 'black' }}>
            <div className="absolute top-0 left-0 flex flex-col origin-top-left" style={{ width: `${100 / uiScale}%`, height: `${100 / uiScale}%`, transform: `scale(${uiScale})`, backgroundImage: bgImage ? `url(${bgImage})` : 'none', backgroundSize: 'cover', backgroundColor: mode === 'dark' ? '#0b141a' : '#efe7dd' }}>
              
              {!bgImage && (<div className={`absolute inset-0 opacity-[0.4] pointer-events-none ${mode === 'dark' ? 'invert opacity-[0.05]' : ''}`} style={{backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')"}}></div>)}
              
              {/* STATUS BAR */}
              <div className={`h-7 flex justify-between items-center px-5 text-[12px] font-medium z-20 shrink-0 ${mode === 'dark' ? 'bg-[#111b21] text-gray-400' : 'bg-white text-gray-800'}`}>
                 <span>{time}</span>
                 <div className="flex items-center space-x-2">
                   <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z" fillOpacity="0.3"></path><path d="M3.54 10.15c2.11-1.63 5.15-2.73 8.46-2.73 3.32 0 6.36 1.1 8.47 2.73L12.01 21.49 3.54 10.15z" fill="currentColor"></path></svg>
                   <div className="flex items-center gap-1">
                      <span>{battery}%</span>
                      <div className="relative flex items-center">
                        <svg width="26" height="13" viewBox="0 0 26 13" fill="none" className="text-current">
                           <rect x="1" y="1" width="21" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                           <path d="M24 4V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                           <rect x="3" y="3" width={getBatteryWidth()} height="7" rx="1" fill="currentColor" />
                        </svg>
                      </div>
                   </div>
                 </div>
              </div>

              {/* HEADER */}
              <div className={`h-[60px] flex items-center px-2 shadow-md z-10 shrink-0 ${mode === 'dark' ? 'bg-[#111b21] text-[#e9edef]' : 'bg-white text-gray-800'}`}>
                <div className="mr-1">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-2 overflow-hidden shrink-0 relative">
                   {profilePic ? <img src={profilePic} className="w-full h-full object-cover" /> : <svg className="text-gray-500 w-8 h-8 m-auto mt-1" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>}
                </div>
                <div className="flex-1 overflow-hidden">
                  <h3 className="font-semibold text-[17px] leading-tight truncate">{contactName}</h3>
                  <p className="text-[13px] opacity-80 truncate">{status}</p>
                </div>
                <div className="flex items-center space-x-5 pr-2">
                   <div className="flex items-center">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"></path></svg>
                      {chatType === 'group' && (<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="-ml-1"><path d="M7 10l5 5 5-5z"></path></svg>)}
                   </div>
                   {chatType === 'private' && (<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.26-.26.35-.65.24-1-.35-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"></path></svg>)}
                   <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                </div>
              </div>

              {/* 3. AREA CHAT */}
              <div 
                ref={chatContainerRef} 
                className="flex-1 p-3 space-y-1 overflow-y-auto pb-4 relative z-0 bg-transparent"
                style={{ fontSize: '14.2px', lineHeight: '19px', fontFamily: 'Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif' }}
              >
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex w-full z-10 relative ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    
                    <div className={`
                      relative max-w-[85%] rounded-lg shadow-sm text-[14.2px] flex flex-col min-w-[80px]
                      ${msg.sender === 'me' ? 'rounded-tr-none' : 'rounded-tl-none'}
                      ${getBubbleColor(msg.sender === 'me')}
                    `}>
                      
                      {msg.reply && (
                        <div 
                          className="mx-1 mt-1 mb-1 rounded-[4px] bg-black/5 dark:bg-black/20 overflow-hidden border-l-[4px] p-1"
                          style={{ borderLeftColor: getReplyBorderColor(msg.reply.color) }}
                        >
                           <p className={`text-[12px] font-bold leading-none mb-1 ${msg.reply.color}`}>
                             {msg.reply.senderName}
                           </p>
                           <p className={`text-[12px] leading-tight truncate pr-2 ${mode==='dark' ? 'text-gray-300 opacity-80' : 'text-gray-500'}`}>
                             {formatText(msg.reply.content)}
                           </p>
                        </div>
                      )}

                      {chatType === 'group' && msg.sender === 'them' && (
                         <p className={`text-[12.8px] font-bold leading-tight px-2 pt-1 ${msg.senderColor || 'text-red-500'}`}>
                           {msg.senderName || "Anonim"}
                         </p>
                      )}
                      
                      <div className="px-2 pb-1 relative">
                          <div className="pb-1">
                              {msg.type === 'text' && (
                                <span className={`leading-relaxed break-words whitespace-pre-wrap ${mode==='dark' ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>
                                  {formatText(msg.content)}
                                  <span className="inline-block w-12 h-0"></span> 
                                </span>
                              )}
                              
                              {msg.type === 'image' && (
                                <div className="flex flex-col mt-1 -mx-1">
                                  <img src={msg.content} className="rounded-lg mb-1 w-full max-h-64 object-cover"/>
                                  {msg.caption && <span className="px-1">{formatText(msg.caption)}</span>}
                                </div>
                              )}
                              
                              {msg.type === 'location' && (
                                <div className={`w-60 rounded overflow-hidden mt-1 -mx-1 mb-1 ${mode==='dark' ? 'bg-[#2a3942]' : 'bg-[#f0f2f5]'}`}>
                                  <div className="h-32 bg-slate-400 relative">
                                      {msg.mapImg ? <img src={msg.mapImg} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center bg-gray-300">🗺️ Peta</div>}
                                  </div>
                                  <div className="p-2">
                                      <p className="font-bold text-sm truncate">{msg.content}</p>
                                      <p className="text-xs opacity-70 truncate">{msg.address}</p>
                                  </div>
                                </div>
                              )}
                          </div>

                          <div className="float-right -mt-2 flex items-center space-x-1 ml-2 relative top-[0.1em]">
                            <span className={`text-[11px] min-w-fit ${mode==='dark' ? 'text-gray-400' : 'text-[#667781]'}`}>{msg.time}</span>
                            {msg.sender === 'me' && (
                              <svg viewBox="0 0 16 11" width="16" height="11" className="text-[#53bdeb]" fill="currentColor" preserveAspectRatio="xMidYMid meet">
                                <path d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z" fill="currentColor"></path></svg>
                            )}
                          </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

              {/* 4. FOOTER */}
               <div className="px-2 pb-2 pt-2 flex items-end space-x-2 shrink-0 z-10 bg-transparent"> 
                 <div className={`flex-1 rounded-[24px] h-11 flex items-center px-2 mb-1 shadow-sm ${mode === 'dark' ? 'bg-[#2a3942]' : 'bg-white'}`}>
                   <div className={`mr-2 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      <svg viewBox="0 0 24 24" height="26" width="26" preserveAspectRatio="xMidYMid meet" className="" fill="none"><title>expressions</title><path d="M8.49893 10.2521C9.32736 10.2521 9.99893 9.5805 9.99893 8.75208C9.99893 7.92365 9.32736 7.25208 8.49893 7.25208C7.6705 7.25208 6.99893 7.92365 6.99893 8.75208C6.99893 9.5805 7.6705 10.2521 8.49893 10.2521Z" fill="currentColor"></path><path d="M17.0011 8.75208C17.0011 9.5805 16.3295 10.2521 15.5011 10.2521C14.6726 10.2521 14.0011 9.5805 14.0011 8.75208C14.0011 7.92365 14.6726 7.25208 15.5011 7.25208C16.3295 7.25208 17.0011 7.92365 17.0011 8.75208Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M16.8221 19.9799C15.5379 21.2537 13.8087 21.9781 12 22H9.27273C5.25611 22 2 18.7439 2 14.7273V9.27273C2 5.25611 5.25611 2 9.27273 2H14.7273C18.7439 2 22 5.25611 22 9.27273V11.8141C22 13.7532 21.2256 15.612 19.8489 16.9776L16.8221 19.9799ZM14.7273 4H9.27273C6.36068 4 4 6.36068 4 9.27273V14.7273C4 17.6393 6.36068 20 9.27273 20H11.3331C11.722 19.8971 12.0081 19.5417 12.0058 19.1204L11.9935 16.8564C11.9933 16.8201 11.9935 16.784 11.9941 16.7479C11.0454 16.7473 10.159 16.514 9.33502 16.0479C8.51002 15.5812 7.84752 14.9479 7.34752 14.1479C7.24752 13.9479 7.25585 13.7479 7.37252 13.5479C7.48919 13.3479 7.66419 13.2479 7.89752 13.2479L13.5939 13.2479C14.4494 12.481 15.5811 12.016 16.8216 12.0208L19.0806 12.0296C19.5817 12.0315 19.9889 11.6259 19.9889 11.1248V9.07648H19.9964C19.8932 6.25535 17.5736 4 14.7273 4ZM14.0057 19.1095C14.0066 19.2605 13.9959 19.4089 13.9744 19.5537C14.5044 19.3124 14.9926 18.9776 15.4136 18.5599L18.4405 15.5576C18.8989 15.1029 19.2653 14.5726 19.5274 13.996C19.3793 14.0187 19.2275 14.0301 19.0729 14.0295L16.8138 14.0208C15.252 14.0147 13.985 15.2837 13.9935 16.8455L14.0057 19.1095Z" fill="currentColor"></path></svg>
                   </div>
                   {/* --- [FIXED: FONT SIZE 15px & COLOR MATCHING CHAT] --- */}
                   <div className={`flex-1 text-[15px] flex items-center font-normal ${mode === 'dark' ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>
                      {formatText(inputBarText)}
                   </div>
                   
                   <div className={`flex space-x-4 mr-2 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      <svg viewBox="0 0 24 24" width="24" height="24" className="rotate-[-45deg]" fill="currentColor"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"></path></svg>
                      <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" className="" fill="none"><title>ic-photo-camera-filled</title><path d="M12 17.5C13.25 17.5 14.3125 17.0625 15.1875 16.1875C16.0625 15.3125 16.5 14.25 16.5 13C16.5 11.75 16.0625 10.6875 15.1875 9.8125C14.3125 8.9375 13.25 8.5 12 8.5C10.75 8.5 9.6875 8.9375 8.8125 9.8125C7.9375 10.6875 7.5 11.75 7.5 13C7.5 14.25 7.9375 15.3125 8.8125 16.1875C9.6875 17.0625 10.75 17.5 12 17.5ZM12 15.5C11.3 15.5 10.7083 15.2583 10.225 14.775C9.74167 14.2917 9.5 13.7 9.5 13C9.5 12.3 9.74167 11.7083 10.225 11.225C10.7083 10.7417 11.3 10.5 12 10.5C12.7 10.5 13.2917 10.7417 13.775 11.225C14.2583 11.7083 14.5 12.3 14.5 13C14.5 13.7 14.2583 14.2917 13.775 14.775C13.2917 15.2583 12.7 15.5 12 15.5ZM4 21C3.45 21 2.97917 20.8042 2.5875 20.4125C2.19583 20.0208 2 19.55 2 19V7C2 6.45 2.19583 5.97917 2.5875 5.5875C2.97917 5.19583 3.45 5 4 5H7.15L8.4 3.65C8.58333 3.45 8.80417 3.29167 9.0625 3.175C9.32083 3.05833 9.59167 3 9.875 3H14.125C14.4083 3 14.6792 3.05833 14.9375 3.175C15.1958 3.29167 15.4167 3.45 15.6 3.65L16.85 5H20C20.55 5 21.0208 5.19583 21.4125 5.5875C21.8042 5.97917 22 6.45 22 7V19C22 19.55 21.8042 20.0208 21.4125 20.4125C21.0208 20.8042 20.55 21 20 21H4Z" fill="currentColor"></path></svg>
                   </div>
                 </div>
                 <div className="bg-[#00a884] rounded-full p-3 mb-1 text-white shadow-md flex items-center justify-center">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path></svg>
                 </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ChatGenerator
