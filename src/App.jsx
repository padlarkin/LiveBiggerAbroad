import React, { useState } from 'react';
import { 
  CheckCircle, MessageSquare, Send, X, User, 
  Award, Phone, Zap, FileText, 
  Calendar, Clock, CreditCard, Star, PlusCircle, 
  Trophy, Check, ExternalLink, Link as LinkIcon,
  TrendingUp, Bell, ShieldCheck, Download, Eye,
  LayoutDashboard
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [chatHistory, setChatHistory] = useState({});
  const [chatInput, setChatInput] = useState("");
  const [showBooking, setShowBooking] = useState(false);
  const [showTopUp, setShowTopUp] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(null);
  
  const [credits, setCredits] = useState(5);
  const [userPoints, setUserPoints] = useState(120);
  const [xpToNextLevel] = useState(500);

  // Profile Data
  const userName = "Patrick Larkin";
  const advisorName = "David Jones";

  const [tasks, setTasks] = useState([
    { id: 1, stage: 'Visa', title: 'Upload Passport for E-Visa', detail: 'High-res color scan required for the UAE Ministry.', points: 50, status: 'complete', docName: 'Passport_Scan_PL.pdf', completedDate: '26/03/2026' },
    { id: 2, stage: 'Housing', title: 'Review Ejari Requirements', detail: 'Essential steps for your Dubai tenancy registration.', points: 100, status: 'pending', docName: 'Ejari_Guide.pdf' },
  ]);

  const [newTask, setNewTask] = useState({ title: '', detail: '', points: 50, stage: 'Visa', docName: '', linkUrl: '' });

  const handleCreateTask = (e) => {
    e.preventDefault();
    const taskToAdd = { ...newTask, id: Date.now(), status: 'pending', completedDate: null };
    setTasks([taskToAdd, ...tasks]);
    setNewTask({ title: '', detail: '', points: 50, stage: 'Visa', docName: '', linkUrl: '' });
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.2 }, colors: ['#0d9488'] });
  };

  const completeTask = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id && task.status !== 'complete') {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#0d9488', '#fbbf24'] });
        setUserPoints(prev => prev + task.points);
        setShowSuccessModal(task);
        return { ...task, status: 'complete', completedDate: new Date().toLocaleDateString() };
      }
      return task;
    }));
  };

  const sendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const msg = { sender: isAdmin ? 'Advisor' : 'You', text: chatInput, time: 'Now' };
    setChatHistory(prev => ({ ...prev, [activeChat.id]: [...(prev[activeChat.id] || []), msg] }));
    setChatInput("");
  };

  const progressPercent = (userPoints / xpToNextLevel) * 100;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col relative pb-20">
      
      {/* RESTORED TEAL HEADER */}
      <nav className="bg-white border-b p-3 px-6 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-teal-800 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-teal-900/20">L</div>
          <div className="hidden lg:block border-l pl-4 border-slate-100 text-left">
            <h1 className="text-lg font-black text-teal-900 leading-none tracking-tight">LIVE BIGGER ABROAD</h1>
            <p className="text-[9px] font-bold text-teal-600 tracking-[0.2em] uppercase mt-1 italic">Premium Relocation</p>
          </div>
        </div>

        {/* PROFILE & XP BAR */}
        <div className="flex items-center gap-6 flex-1 max-w-2xl justify-center px-8">
           <div className="hidden md:flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-full bg-teal-50 border-2 border-white shadow-sm flex items-center justify-center font-black text-teal-700 text-xs">PL</div>
              <div className="text-left">
                <p className="text-sm font-black text-slate-800 leading-none">{userName}</p>
                <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mt-1">Silver Member</p>
              </div>
           </div>
           <div className="flex flex-col flex-1 max-w-sm">
              <div className="flex justify-between w-full mb-1 items-end">
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter flex items-center gap-1"><TrendingUp size={10}/> Level 1</span>
                 <span className="text-[10px] font-black text-teal-700">{userPoints} XP</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-100 shadow-inner relative">
                 <div className="bg-teal-600 h-full transition-all duration-1000" style={{ width: `${progressPercent}%` }} />
              </div>
           </div>
        </div>

        <button 
          onClick={() => setIsAdmin(!isAdmin)} 
          className={`flex items-center gap-2 text-[10px] font-black px-4 py-2 rounded-xl shadow-md transition-all ${isAdmin ? 'bg-amber-500 text-white' : 'bg-slate-900 text-white hover:bg-teal-800'}`}
        >
          <LayoutDashboard size={14} />
          {isAdmin ? 'CLOSE ADMIN' : 'ADMIN PANEL'}
        </button>
      </nav>

      <main className="p-6 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT FEED */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* ADMIN PANEL */}
          {isAdmin && (
            <section className="bg-white p-8 rounded-[2.5rem] border-2 border-dashed border-teal-200 shadow-xl animate-in slide-in-from-top duration-300">
               <h2 className="text-xl font-black text-teal-800 mb-6 flex items-center gap-2 underline decoration-amber-400 decoration-4 underline-offset-4">
                 <PlusCircle size={24}/> Consultant Command Center
               </h2>
               <form onSubmit={handleCreateTask} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required placeholder="Task Title" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} className="p-4 bg-slate-50 border rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                  <select value={newTask.stage} onChange={e => setNewTask({...newTask, stage: e.target.value})} className="p-4 bg-slate-50 border rounded-2xl text-sm font-bold">
                    <option>Visa</option><option>Employment</option><option>Housing</option><option>Lifestyle</option>
                  </select>
                  <textarea required placeholder="Consultant Instructions for Patrick..." value={newTask.detail} onChange={e => setNewTask({...newTask, detail: e.target.value})} className="md:col-span-2 p-4 bg-slate-50 border rounded-2xl text-sm h-24 outline-none focus:ring-2 focus:ring-teal-500" />
                  <input placeholder="Attach Doc Name" value={newTask.docName} onChange={e => setNewTask({...newTask, docName: e.target.value})} className="p-3 bg-slate-50 border rounded-xl text-xs" />
                  <input placeholder="Resource Link" value={newTask.linkUrl} onChange={e => setNewTask({...newTask, linkUrl: e.target.value})} className="p-3 bg-slate-50 border rounded-xl text-xs" />
                  <button type="submit" className="md:col-span-2 bg-teal-800 text-white font-black py-4 rounded-2xl shadow-lg hover:bg-teal-900 transition flex items-center justify-center gap-2">
                    <Zap size={18}/> Deploy to Patrick's Feed
                  </button>
               </form>
            </section>
          )}

          {/* UPCOMING SESSION CARD */}
          <section className="bg-teal-900 rounded-[2.5rem] p-8 text-white shadow-2xl flex flex-col md:flex-row items-center gap-8 border border-teal-700 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400 rounded-full blur-[100px] opacity-10 -mr-32 -mt-32"></div>
             <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                <Calendar size={32} className="text-teal-300" />
             </div>
             <div className="flex-1 text-center md:text-left z-10">
                <p className="text-[10px] font-black text-teal-400 uppercase tracking-[0.2em] mb-1">Your Monthly Strategy Session</p>
                <h3 className="text-2xl font-black tracking-tight">Tuesday, April 14th • 10:00 AM</h3>
                <p className="text-sm font-bold opacity-60">With Senior Advisor: <span className="text-white">{advisorName}</span></p>
             </div>
             <div className="flex flex-col gap-2 w-full md:w-auto z-10">
                <button className="bg-white text-teal-900 px-8 py-3 rounded-xl font-black text-xs hover:bg-teal-50 transition shadow-xl">Reschedule</button>
                <button className="bg-teal-800/50 text-white px-8 py-3 rounded-xl font-black text-xs border border-teal-600 hover:bg-teal-800 transition">Agenda Info</button>
             </div>
          </section>

          {/* ROADMAP FEED */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3 tracking-tight underline decoration-teal-500 decoration-4 underline-offset-8">Relocation Roadmap</h2>
            {tasks.map(task => (
              <div key={task.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm hover:border-teal-300 transition-all group relative overflow-hidden">
                <div className="flex gap-6">
                  <button onClick={() => completeTask(task.id)} className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all ${task.status === 'complete' ? 'bg-teal-500 text-white shadow-lg' : 'border-2 border-slate-200 bg-white group-hover:border-teal-500'}`}>
                    {task.status === 'complete' ? <Check size={24} /> : <div className="w-2 h-2 rounded-full bg-slate-100" />}
                  </button>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className={`text-lg font-black ${task.status === 'complete' ? 'text-slate-300 line-through' : 'text-slate-800'}`}>{task.title}</h4>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-2 py-1 rounded-md border border-teal-100 uppercase tracking-widest">+{task.points} XP</span>
                        <span className="text-[8px] font-bold text-slate-300 mt-1 uppercase tracking-widest">{task.stage}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 mb-5 leading-relaxed font-medium">{task.detail}</p>
                    <div className="flex items-center gap-4">
                      <button onClick={() => setActiveChat(task)} className="text-xs font-black text-teal-800 flex items-center gap-1.5 px-4 py-2 bg-teal-50 rounded-xl hover:bg-teal-100 transition border border-transparent hover:border-teal-200 shadow-sm"><MessageSquare size={14}/> Support</button>
                      {task.docName && <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1"><FileText size={16}/> {task.docName}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DOCUMENT VAULT */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
            <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3"><ShieldCheck className="text-teal-600" size={28}/> Secure Vault</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {[
                 { n: 'Passport_PL.pdf', t: 'Identity' },
                 { n: 'Degree_Attest.pdf', t: 'Legal' },
                 { n: 'Draft_Visa.pdf', t: 'Visa' }
               ].map((file, i) => (
                 <div key={i} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all group/file relative border-b-4 border-b-transparent hover:border-b-teal-500">
                   <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-teal-700 mb-4 shadow-sm group-hover:bg-teal-50 transition-colors"><FileText size={24}/></div>
                   <p className="text-xs font-black text-slate-800 truncate mb-1">{file.n}</p>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{file.t}</p>
                   <button className="absolute top-4 right-4 p-2 bg-white rounded-lg shadow-sm opacity-0 group-hover/file:opacity-100 transition hover:text-teal-600"><Download size={14}/></button>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
             <div className="flex justify-between items-start mb-6">
               <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 tracking-tighter">On-Demand Credits</p>
                 <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{credits}</h3>
               </div>
               <div className="bg-teal-50 p-3 rounded-2xl text-teal-600 shadow-sm"><PlusCircle size={28} /></div>
             </div>
             <button onClick={() => setShowBooking(true)} className="w-full bg-teal-800 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-teal-900 shadow-xl transition active:scale-95 mb-4 tracking-tight">
               <Phone size={18} fill="currentColor" /> Book Extra Strategy Session
             </button>
             
             <div className="bg-amber-50 p-5 rounded-[1.5rem] border border-amber-100 relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10 -rotate-12"><Star size={64} fill="currentColor" className="text-amber-600"/></div>
                <div className="flex items-center gap-2 mb-2">
                  <Star size={16} className="text-amber-600" fill="currentColor" />
                  <p className="text-[10px] font-black text-amber-800 uppercase tracking-widest">Premium Perk</p>
                </div>
                <p className="text-xs font-bold text-amber-900 leading-tight">1 Free Monthly Session Remaining</p>
                <p className="text-[10px] text-amber-700 font-bold uppercase mt-2 opacity-60">Expires April 1st</p>
             </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
             <h4 className="font-black text-slate-800 mb-6 flex items-center gap-2 tracking-tight">
                <Trophy className="text-amber-500" size={20} /> Accomplishments
             </h4>
             <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl grayscale opacity-30 shadow-inner">
                   <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm"><Star size={24} /></div>
                   <div><p className="text-xs font-black text-slate-400 uppercase tracking-widest">Residency Badge</p></div>
                </div>
             </div>
          </div>
        </div>
      </main>

      {/* CHAT DRAWER */}
      {activeChat && (
        <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-[120] flex flex-col animate-in slide-in-from-right duration-300 border-l border-slate-200">
          <div className="p-6 bg-teal-800 text-white flex justify-between items-center shadow-lg">
            <div className="text-left">
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">Private Channel</p>
              <h3 className="font-black truncate w-64 text-base tracking-tight">{activeChat.title}</h3>
            </div>
            <button onClick={() => setActiveChat(null)} className="p-2 hover:bg-white/10 rounded-full transition"><X/></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
            {(chatHistory[activeChat.id] || []).map((m, i) => (
              <div key={i} className={`flex flex-col ${m.sender === 'Advisor' ? 'items-start' : 'items-end'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-xs font-bold shadow-sm ${m.sender === 'Advisor' ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-none' : 'bg-teal-700 text-white rounded-tr-none'}`}>
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-2 uppercase font-black">{m.sender}</span>
              </div>
            ))}
          </div>
          <form onSubmit={sendChatMessage} className="p-4 bg-white border-t flex gap-2">
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Type a message..." className="flex-1 bg-slate-100 p-4 rounded-xl text-xs outline-none focus:ring-2 focus:ring-teal-700 transition-all shadow-inner" />
            <button className="bg-teal-800 text-white p-4 rounded-xl shadow-lg hover:bg-teal-900 transition active:scale-90"><Send size={18}/></button>
          </form>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-teal-900/40 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white p-12 rounded-[3.5rem] text-center shadow-2xl border-b-8 border-teal-600 max-w-sm animate-in zoom-in-75">
              <Trophy size={64} className="text-amber-400 mx-auto mb-6 animate-bounce" />
              <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Milestone Met!</h3>
              <p className="text-slate-500 mb-8 font-bold leading-relaxed">You've moved one step closer to your new life. Earned <span className="text-teal-600 font-black">{showSuccessModal.points} XP</span>.</p>
              <button onClick={() => setShowSuccessModal(null)} className="w-full bg-teal-900 text-white py-4 rounded-2xl font-black shadow-xl hover:bg-teal-800 transition active:scale-95">Next Step</button>
           </div>
        </div>
      )}

    </div>
  );
}