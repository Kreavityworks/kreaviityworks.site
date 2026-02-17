import React, { useState, useEffect, useMemo, Dispatch, SetStateAction } from 'react';
import { 
  LayoutDashboard, 
  Bell, 
  Calendar, 
  Users, 
  DollarSign, 
  MessageSquare, 
  Search, 
  MoreVertical, 
  Plus, 
  ChevronRight, 
  ChevronLeft, 
  Cpu, 
  History, 
  CheckCircle, 
  FileText, 
  CreditCard, 
  Clock, 
  ShieldAlert, 
  StickyNote, 
  Wallet, 
  LogOut, 
  Send, 
  User as UserIcon, 
  Lock, 
  Settings, 
  Briefcase, 
  ExternalLink, 
  Eye, 
  X, 
  Edit3,
  Layers,
  Zap,
  Image,
  Video,
  Activity,
  Globe,
  Moon,
  Sun,
  Trash2,
  Save,
  Check,
  MessageCircle,
  Hash
} from 'lucide-react';

// --- Types & Interfaces ---

interface QueueItem {
  id: number;
  talent: string;
  client: string;
  project: string;
  status: string;
  price: string;
  priceType: string;
  totalHours?: string;
  startDate: string;
  endDate: string;
  projectLength: string;
}

interface UserProfile {
  name: string;
  title: string;
  role: string;
}

// --- Constants & Data ---

const AVATAR_OPTIONS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica&backgroundColor=ffdfbf&clothing=blazerAndShirt&top=longHairBun',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia&backgroundColor=ffdfbf&clothing=blazerAndShirt&top=longHairStraight&glasses=round',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Amelia&backgroundColor=ffdfbf&clothing=shirtCrewNeck&top=shortHairShaggyMullet',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert&backgroundColor=c0aede&clothing=blazerAndShirt&top=shortHairShortFlat&facialHair=beardMedium',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=James&backgroundColor=b6e3f4&clothing=collarAndSweater&top=shortHairTheCaesar&glasses=wayfarers',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=William&backgroundColor=c0aede&clothing=shirtScoopNeck&top=shortHairFrizzle&facialHair=beardLight',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Nando&backgroundColor=b6e3f4&clothing=hoodie&top=shortHairTheCaesarSidePart&facialHair=beardMajestic', 
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael&backgroundColor=ffdfbf&clothing=blazerAndSweater&top=shortHairDreads01',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=c0aede&clothing=shirtVNeck&top=shortHairSides',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas&backgroundColor=b6e3f4&clothing=graphicShirt&top=shortHairShortCurly&facialHair=moustacheFancy',
];

const PROJECT_SUGGESTIONS = [
  "DESIGN", "BRANDING", "UI/UX", "WEB3", "TRANSLATE", "AI TRAINING", "VIDEO EDITING"
];

// --- Shared Components ---

const ModalWrapper = ({ isOpen, onClose, title, children, isDarkMode }: any) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className={`w-full max-w-md p-8 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300 border overflow-y-auto max-h-[90vh] scrollbar-hide ${isDarkMode ? 'bg-[#1a1a1a] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-inherit z-10 pb-2 border-b border-inherit">
          <h3 className="text-xl font-bold tracking-tight uppercase whitespace-pre-line">{title}</h3>
          <button onClick={onClose} className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}><X size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  );
};

// --- Sub-Components ---

const UpdatesView = ({ isDarkMode }: any) => (
  <div className="space-y-12 animate-in fade-in slide-in-from-left-4 duration-500">
    <div className={`flex justify-between items-end border-b pb-8 ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
      <div className="text-left">
        <h2 className="text-5xl font-medium tracking-tighter">System Updates</h2>
        <p className={`mt-2 font-medium ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>Berita dan integrasi terbaru sistem KreavityWorks.</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className={`group p-8 rounded-2xl border transition-all cursor-pointer shadow-sm ${isDarkMode ? 'bg-[#1a1a1a] border-white/5 hover:border-white/20' : 'bg-white border-black/5 hover:border-black/20'}`}>
          <div className="flex justify-between mb-8">
            <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>Log v.2.7 • 17 Feb</span>
            <MoreVertical size={18} className={`${isDarkMode ? 'text-white/20 group-hover:text-white' : 'text-black/20 group-hover:text-black'} transition-colors`} />
          </div>
          <h3 className="text-2xl font-medium tracking-tight mb-4" contentEditable suppressContentEditableWarning>Neural Workflow 2.0</h3>
          <p className={`text-sm leading-relaxed mb-8 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`} contentEditable suppressContentEditableWarning>Optimasi rendering pipeline untuk mempercepat delivery aset brand sebesar 40%.</p>
          <div className={`flex items-center gap-3 pt-8 border-t ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>N</div>
            <span className="text-xs font-bold uppercase tracking-widest">System Director</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CalendarView = ({ onAddEvent, isDarkMode }: any) => {
  const [viewDate, setViewDate] = useState(new Date());
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-500">
      <div className={`flex justify-between items-end border-b pb-8 mb-12 ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
        <div className="text-left">
          <h2 className="text-5xl font-medium tracking-tighter">{monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}</h2>
          <p className={`mt-2 font-medium ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>Atur jadwal produksi dan meeting talent.</p>
        </div>
        <div className="flex items-center gap-6">
          <div className={`flex p-1 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
            <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1))} className={`p-3 rounded-lg transition-all ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-white'}`}><ChevronLeft size={20} /></button>
            <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1))} className={`p-3 rounded-lg transition-all ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-white'}`}><ChevronRight size={20} /></button>
          </div>
          <button onClick={() => onAddEvent('New Project Schedule')} className={`flex items-center gap-2 px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:opacity-90 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
            <Plus size={14} /> Add Event
          </button>
        </div>
      </div>

      <div className={`rounded-2xl border p-8 shadow-sm ${isDarkMode ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-black/5'}`}>
        <div className={`grid grid-cols-7 gap-4 mb-8 text-center text-[10px] uppercase tracking-[0.2em] font-bold ${isDarkMode ? 'text-white/30' : 'text-black/30'}`}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day}>{day}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-4">
          {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
          {Array.from({ length: daysInMonth(viewDate.getFullYear(), viewDate.getMonth()) }).map((_, i) => (
            <div 
              key={i} 
              onClick={() => onAddEvent(`Event Details: Day ${i+1}`)}
              className={`group min-h-[120px] rounded-xl p-4 border transition-all flex flex-col justify-between cursor-pointer ${isDarkMode ? 'border-white/5 hover:bg-white hover:text-black' : 'border-black/[0.04] hover:bg-black hover:text-white'}`}
            >
              <div className="flex justify-between items-start">
                <span className="text-sm font-black opacity-30 group-hover:opacity-100">{i + 1}</span>
                <Plus size={12} className="opacity-0 group-hover:opacity-100" />
              </div>
              {i === 14 && (
                <div className={`p-1.5 rounded-md text-[9px] font-bold uppercase tracking-tighter truncate ${isDarkMode ? 'bg-white text-black group-hover:bg-black group-hover:text-white' : 'bg-black text-white group-hover:bg-white group-hover:text-black'}`}>
                  Meeting: Reza
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const QueueView = ({ isDarkMode }: any) => {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([
    { id: 1, talent: 'Reza', client: 'Aether Corp', project: 'Branding', status: 'IN PROGRESS', price: '$ 1,000', priceType: 'Fixed', startDate: '2026-01-20', endDate: '2026-02-20', projectLength: '1 - 3 Months' },
    { id: 2, talent: 'Syams', client: 'Lumina Tech', project: 'UI/UX Design', status: 'REVIEW', price: '$ 1,850', priceType: 'Fixed', startDate: '2026-02-01', endDate: '2026-03-01', projectLength: '1 - 3 Months' },
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<QueueItem | null>(null);
  const [formData, setFormData] = useState<QueueItem>({ id: 0, talent: '', client: '', project: '', status: 'IN PROGRESS', price: '', priceType: 'Fixed', startDate: '', endDate: '', projectLength: '1 - 3 Months' });

  const handleOpenAdd = () => { 
    setEditItem(null); 
    setFormData({ id: 0, talent: '', client: '', project: '', status: 'IN PROGRESS', price: '', priceType: 'Fixed', startDate: '', endDate: '', projectLength: '1 - 3 Months' }); 
    setIsModalOpen(true); 
  };

  const handleOpenEdit = (item: QueueItem) => { 
    setEditItem(item); 
    setFormData(item); 
    setIsModalOpen(true); 
  };

  const handleSave = () => {
    if (editItem) { 
      setQueueItems(queueItems.map(i => i.id === editItem.id ? { ...formData, id: editItem.id } : i)); 
    } 
    else { 
      setQueueItems([...queueItems, { ...formData, id: Date.now() }]); 
    }
    setIsModalOpen(false);
  };

  const inputClass = `w-full px-4 py-3 rounded-xl text-sm font-bold outline-none transition-all ${isDarkMode ? 'bg-black/20 focus:bg-black/40 text-white placeholder-white/20' : 'bg-black/5 focus:bg-white focus:ring-1 ring-black text-black'}`;
  const labelClass = `text-[10px] font-black uppercase tracking-widest mb-2 block ${isDarkMode ? 'text-white/40' : 'text-black/40'}`;

  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-500">
      <div className={`flex justify-between items-end border-b pb-8 mb-10 text-left ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
        <div>
          <h2 className="text-5xl font-medium tracking-tighter">Client Queue</h2>
          <p className={`mt-2 font-medium ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>Monitoring status talent dan proposal aktif.</p>
        </div>
        <button onClick={handleOpenAdd} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:opacity-90 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
           <Plus size={14} /> Add Queue
        </button>
      </div>

      <div className={`rounded-2xl border overflow-hidden shadow-sm ${isDarkMode ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-black/5'}`}>
        <table className="w-full text-left">
          <thead className={`${isDarkMode ? 'bg-white/5 text-white/40' : 'bg-black/5 text-black/40'} text-[10px] uppercase tracking-[0.2em] font-black`}>
            <tr>
              <th className="px-8 py-6">Talent</th>
              <th className="px-8 py-6">Client / Project</th>
              <th className="px-8 py-6">Details</th>
              <th className="px-8 py-6">Status</th>
              <th className="px-8 py-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-black/5'}`}>
            {queueItems.map((q) => (
              <tr key={q.id} className={`group transition-colors ${isDarkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-black/[0.01]'}`}>
                <td className="px-8 py-6 font-bold text-base">{q.talent}</td>
                <td className="px-8 py-6">
                  <div className="text-sm font-bold tracking-tight">{q.client}</div>
                  <div className={`text-[10px] uppercase tracking-widest font-bold ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>{q.project}</div>
                </td>
                <td className="px-8 py-6">
                   <div className="text-sm font-bold">{q.price} {q.priceType === 'Hourly' ? '(Hourly)' : ''}</div>
                   <div className={`text-[10px] uppercase tracking-widest font-bold ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>{q.startDate} — {q.endDate || '?'}</div>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-4 py-1.5 text-[10px] rounded-lg font-black uppercase tracking-widest ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>{q.status}</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button onClick={() => handleOpenEdit(q)} className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white/50' : 'hover:bg-black/5 text-black/40'}`}><Edit3 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalWrapper isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editItem ? "Edit Queue" : "New Queue"} isDarkMode={isDarkMode}>
          <div className="space-y-5">
             <div><label className={labelClass}>Talent Name</label><input type="text" value={formData.talent} onChange={e => setFormData({...formData, talent: e.target.value})} className={inputClass} /></div>
             <div><label className={labelClass}>Client Name</label><input type="text" value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} className={inputClass} /></div>
             <div>
                <label className={labelClass}>Project Type</label>
                <input type="text" value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})} className={inputClass} />
                <div className="flex flex-wrap gap-2 mt-2">{PROJECT_SUGGESTIONS.map((tag, i) => (<button key={i} onClick={() => setFormData({...formData, project: tag})} className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider border ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>{tag}</button>))}</div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className={labelClass}>Pricing Model</label>
                    <div className={`flex p-1 rounded-xl ${isDarkMode ? 'bg-black/30' : 'bg-black/5'}`}>
                       <button onClick={() => setFormData({...formData, priceType: 'Fixed'})} className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${formData.priceType === 'Fixed' ? (isDarkMode ? 'bg-white text-black' : 'bg-black text-white') : 'opacity-40'}`}>Fixed</button>
                       <button onClick={() => setFormData({...formData, priceType: 'Hourly'})} className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${formData.priceType === 'Hourly' ? (isDarkMode ? 'bg-white text-black' : 'bg-black text-white') : 'opacity-40'}`}>Hourly</button>
                    </div>
                 </div>
                 <div><label className={labelClass}>Price</label><input type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className={inputClass} /></div>
             </div>
             <button onClick={handleSave} className={`w-full py-4 mt-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>{editItem ? 'Save Changes' : 'Add to Queue'}</button>
          </div>
      </ModalWrapper>
    </div>
  );
};

const TalentView = ({ onAction, isDarkMode }: any) => {
  const sections = [
    { title: "AI System", desc: "Core intelligence engine KreavityWorks.", icon: <Cpu /> },
    { title: "Revision Log", desc: "History revisi dan feedback klien.", icon: <History /> },
    { title: "Final Delivery", desc: "Arsip final asset dan handover.", icon: <CheckCircle /> }
  ];
  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-500">
      <h2 className="text-5xl font-medium tracking-tighter mb-12 text-left">Talent Ecosystem</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sections.map((s, i) => (
          <div key={i} className={`p-10 rounded-2xl border shadow-sm group transition-all text-left ${isDarkMode ? 'bg-[#1a1a1a] border-white/5 hover:border-white/40' : 'bg-white border-black/5 hover:border-black/40'}`}>
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-8 shadow-lg ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>{React.cloneElement(s.icon, { size: 28 })}</div>
            <h3 className="text-2xl font-medium tracking-tight mb-3">{s.title}</h3>
            <p className={`text-base mb-10 leading-relaxed ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{s.desc}</p>
            <button onClick={() => onAction(s.title)} className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>Open Module <ChevronRight size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

const FinanceView = ({ onAction, isDarkMode }: any) => {
  const docs = [
    { name: "Contract / Agreement", icon: <FileText /> }, { name: "Invoice System", icon: <CreditCard /> },
    { name: "Statement of Work (SOW)", icon: <FileText /> }, { name: "Brief / Discovery Form", icon: <Search /> },
    { name: "Timeline / Project Plan", icon: <Clock /> }, { name: "NDA Documents", icon: <ShieldAlert /> },
    { name: "Internal Memos", icon: <StickyNote /> }, { name: "Salary & Payouts", icon: <Wallet /> },
  ];
  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex justify-between items-center mb-12 text-left">
        <h2 className="text-5xl font-medium tracking-tighter">Finance & Ops</h2>
        <div className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 opacity-50 ${isDarkMode ? 'bg-white/5 text-white' : 'bg-black/5 text-black'}`}>Unlocked <Lock size={12} /></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {docs.map((doc, i) => (
          <div key={i} onClick={() => onAction(doc.name)} className={`p-8 rounded-2xl border flex flex-col gap-6 transition-all group cursor-pointer ${isDarkMode ? 'bg-[#1a1a1a] border-white/5 hover:bg-white hover:text-black' : 'bg-white border-black/5 hover:bg-black hover:text-white'}`}>
            <div className="transition-colors">{React.cloneElement(doc.icon, { size: 24 })}</div>
            <span className="text-sm font-bold tracking-tight uppercase">{doc.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const UserView = ({ onAction, currentAvatar, isDarkMode, userProfile }: any) => (
  <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-16">
    <div className={`flex justify-between items-end border-b pb-10 text-left ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
      <div><h2 className="text-5xl font-medium tracking-tighter">Profile Management</h2><p className={`mt-2 font-medium ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>Kelola akun dan brankas data pribadimu.</p></div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 text-left">
      <div className={`p-12 rounded-2xl border flex flex-col items-center text-center shadow-sm h-fit ${isDarkMode ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-black/5'}`}>
        <div className="relative group mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4"><img src={currentAvatar} alt="Profile" className="w-full h-full object-cover" /></div>
          <button onClick={() => onAction('System Settings')} className={`absolute bottom-2 right-2 p-2 rounded-lg shadow-2xl ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}><Settings size={16} /></button>
        </div>
        <h3 className="text-3xl font-black tracking-tight">{userProfile.name}</h3>
        <p className={`text-[10px] uppercase tracking-[0.3em] font-black mt-2 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>{userProfile.title}</p>
        <div className={`w-full h-[1px] my-10 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}></div>
        <div className="w-full space-y-3">
          <div className={`flex justify-between items-center text-sm ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}><span className="font-bold">Role</span><span className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{userProfile.role}</span></div>
          <div className={`flex justify-between items-center text-sm ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}><span className="font-bold">Status</span><span className="font-bold text-emerald-500">Active</span></div>
        </div>
      </div>
      <div className="lg:col-span-2 space-y-10">
        <div className={`p-12 rounded-2xl shadow-2xl relative overflow-hidden group ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
          <div className="absolute -top-10 -right-10 opacity-5 rotate-12"><Lock size={200} /></div>
          <h3 className="text-4xl font-medium tracking-tight mb-4 flex items-center gap-4">User Brankas <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div></h3>
          <p className={`text-base max-w-sm mb-12 font-medium ${isDarkMode ? 'text-black/40' : 'text-white/40'}`}>Tempat penyimpanan privat untuk password, link rahasia, dan dokumen sensitif.</p>
          <button onClick={() => onAction('Unlock Brankas')} className={`px-10 py-5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-4 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>Unlock Brankas <Eye size={16} /></button>
        </div>
        <div>
           <h4 className={`text-xl font-medium tracking-tight mb-6 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-black'}`}><Activity size={20} className="opacity-30" />Recent Activity</h4>
           <div className={`rounded-2xl border divide-y ${isDarkMode ? 'bg-[#1a1a1a] border-white/5 divide-white/5' : 'bg-white border-black/5 divide-black/5'}`}>
              {[
                { action: 'Login Detected', device: 'MacBook Pro M3 Max', time: '2 mins ago', icon: <UserIcon size={14} /> },
                { action: 'Vault Unlocked', device: 'Access via Biometric', time: '1 hour ago', icon: <Lock size={14} /> },
              ].map((log, i) => (
                <div key={i} className="p-6 flex items-center justify-between">
                   <div className="flex items-center gap-4"><div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>{log.icon}</div><div><div className="text-sm font-bold">{log.action}</div><div className={`text-[10px] font-bold uppercase opacity-40`}>{log.device}</div></div></div>
                   <div className="text-[10px] font-bold opacity-30">{log.time}</div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  </div>
);

const SettingsModal = ({ isOpen, onClose, currentAvatar, setAvatar, isDarkMode, setIsDarkMode, userProfile, setUserProfile, language, setLanguage }: any) => {
  if (!isOpen) return null;
  const [localProfile, setLocalProfile] = useState(userProfile);
  const handleSaveSettings = () => { setUserProfile(localProfile); onClose(); };
  const inputClass = `w-full px-4 py-3 rounded-xl text-sm font-bold outline-none ${isDarkMode ? 'bg-black/20 text-white' : 'bg-black/5 text-black'}`;
  const labelClass = `text-[10px] font-black uppercase tracking-widest mb-2 block opacity-40`;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className={`w-full max-w-2xl p-10 rounded-3xl shadow-2xl border overflow-y-auto max-h-[90vh] ${isDarkMode ? 'bg-[#1a1a1a] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
        <div className="flex justify-between items-center mb-8 sticky top-0 bg-inherit pb-2 border-b border-inherit"><h3 className="text-3xl font-medium tracking-tighter">System Settings</h3><button onClick={onClose} className="p-3"><X size={24} /></button></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
             <div className="space-y-4">
                 <div><label className={labelClass}>Display Name</label><input type="text" value={localProfile.name} onChange={e => setLocalProfile({...localProfile, name: e.target.value})} className={inputClass} /></div>
                 <div><label className={labelClass}>Job Title</label><input type="text" value={localProfile.title} onChange={e => setLocalProfile({...localProfile, title: e.target.value})} className={inputClass} /></div>
                 <div><label className={labelClass}>System Role</label><input type="text" value={localProfile.role} onChange={e => setLocalProfile({...localProfile, role: e.target.value})} className={inputClass} /></div>
             </div>
             <div className="pt-4 border-t border-inherit">
                 <div className="grid grid-cols-5 gap-3">{AVATAR_OPTIONS.map((av, idx) => (<button key={idx} onClick={() => setAvatar(av)} className={`rounded-full overflow-hidden border-2 transition-all ${currentAvatar === av ? 'border-black ring-2' : 'border-transparent opacity-50'}`}><img src={av} alt={`Avatar ${idx}`} /></button>))}</div>
             </div>
          </div>
          <div className="space-y-6">
             <div><label className={labelClass}>Interface Mode</label><div className={`flex p-1 rounded-xl ${isDarkMode ? 'bg-black/30' : 'bg-black/5'}`}><button onClick={() => setIsDarkMode(false)} className={`flex-1 py-3 rounded-lg text-xs font-bold ${!isDarkMode ? 'bg-white text-black shadow-sm' : 'text-white/40'}`}>White</button><button onClick={() => setIsDarkMode(true)} className={`flex-1 py-3 rounded-lg text-xs font-bold ${isDarkMode ? 'bg-white text-black shadow-sm' : 'text-black/40'}`}>Dark</button></div></div>
             <button onClick={handleSaveSettings} className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}><Save size={14} /> Save Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Application ---

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [gimmickTitle, setGimmickTitle] = useState('');
  const [isGimmickOpen, setIsGimmickOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [avatar, setAvatar] = useState<string | undefined>(AVATAR_OPTIONS[6]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [chatMode, setChatMode] = useState('system'); 
  const [userProfile, setUserProfile] = useState<UserProfile>({ name: 'KREAVITYWORKS', title: 'FRACTIONAL ART DIRECTOR', role: 'System Admin' });

  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard />, label: 'Updates' },
    { id: 'calendar', icon: <Calendar />, label: 'Calendar' },
    { id: 'queue', icon: <Briefcase />, label: 'Queue' },
    { id: 'talent', icon: <Cpu />, label: 'System' },
    { id: 'finance', icon: <DollarSign />, label: 'Finance' },
    { id: 'group', icon: <Users />, label: 'Group' },
    { id: 'user', icon: <UserIcon />, label: 'User' },
  ];

  const triggerGimmick = (title: string) => {
    if(title === 'System Settings') { setIsSettingsOpen(true); } 
    else if (title === 'Group') { setChatMode('group'); setIsChatOpen(true); } 
    else { setGimmickTitle(title); setIsGimmickOpen(true); }
  };

  return (
    <div className={`flex h-screen font-sans selection:bg-black selection:text-white overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-neutral-950 text-white' : 'bg-[#FDFDFD] text-black'}`}>
      
      <aside className={`w-28 border-r flex flex-col items-center py-6 z-30 ${isDarkMode ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-black/10'}`}>
        <nav className="flex-1 space-y-4">
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => item.id === 'group' ? triggerGimmick('Group') : setActiveTab(item.id)} className={`p-4 rounded-xl transition-all duration-300 group relative flex items-center justify-center ${activeTab === item.id ? (isDarkMode ? 'bg-white text-black shadow-xl scale-110' : 'bg-black text-white shadow-xl scale-110') : (isDarkMode ? 'text-white/60 hover:bg-white/10' : 'text-black/30 hover:bg-black/5')}`}>{React.cloneElement(item.icon, { size: 22 })}<span className={`absolute left-full ml-6 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-lg opacity-0 group-hover:opacity-100 transition-all z-50 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>{item.label}</span></button>
          ))}
        </nav>
        <button onClick={() => setIsSettingsOpen(true)} className="p-4"><Settings size={22} className="opacity-30" /></button>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className={`h-28 backdrop-blur-xl border-b px-16 flex items-center justify-between sticky top-0 z-20 ${isDarkMode ? 'bg-neutral-900/50 border-white/10' : 'bg-white/50 border-black/10'}`}>
          <span className="text-[10px] font-black uppercase tracking-[0.5em]">SYSTEM | KREAVITYWORKS</span>
          <div className="flex items-center gap-6">
            <div className="relative w-80"><Search className="absolute left-5 top-1/2 -translate-y-1/2 opacity-20" size={16} /><input type="text" placeholder="Search resources..." className={`w-full pl-14 pr-6 py-4 rounded-xl text-sm font-bold outline-none ${isDarkMode ? 'bg-white/5 focus:bg-white/10' : 'bg-black/5 focus:bg-white'}`} /></div>
            <button onClick={() => triggerGimmick('Notifications')} className="relative p-3"><Bell size={22} className="opacity-30" /><span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-emerald-500"></span></button>
            <div className="w-12 h-12 rounded-full overflow-hidden border-2"><img src={avatar} alt="Profile" className="w-full h-full object-cover" /></div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto px-16 py-16 scroll-smooth">
          <div className="max-w-[1400px] pb-20">
            {activeTab === 'dashboard' && <UpdatesView isDarkMode={isDarkMode} />}
            {activeTab === 'calendar' && <CalendarView onAddEvent={triggerGimmick} isDarkMode={isDarkMode} />}
            {activeTab === 'queue' && <QueueView isDarkMode={isDarkMode} />}
            {activeTab === 'talent' && <TalentView onAction={triggerGimmick} isDarkMode={isDarkMode} />}
            {activeTab === 'finance' && <FinanceView onAction={triggerGimmick} isDarkMode={isDarkMode} />}
            {activeTab === 'user' && <UserView onAction={triggerGimmick} currentAvatar={avatar} isDarkMode={isDarkMode} userProfile={userProfile} />}
          </div>
        </section>
      </main>

      <ModalWrapper isOpen={isGimmickOpen} onClose={() => setIsGimmickOpen(false)} title={gimmickTitle} isDarkMode={isDarkMode}><p className="text-sm opacity-60 mb-6">Fitur sedang dalam pengembangan sistem.</p><button onClick={() => setIsGimmickOpen(false)} className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>Close</button></ModalWrapper>
      
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        currentAvatar={avatar} 
        setAvatar={setAvatar} 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        userProfile={userProfile} 
        setUserProfile={setUserProfile} 
        language={language}
        setLanguage={setLanguage}
      />

      <div className={`fixed bottom-10 right-10 z-50 flex flex-col items-end transition-all ${isChatOpen ? 'w-[400px]' : 'w-20'}`}>
        {isChatOpen && (
          <div className={`w-full h-[600px] rounded-2xl shadow-2xl border flex flex-col overflow-hidden mb-6 ${isDarkMode ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-black/10'}`}>
            <div className={`p-6 flex flex-col gap-4 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
              <div className="flex justify-between items-center"><h4 className="text-sm font-black uppercase">{chatMode} Chat</h4><button onClick={() => setIsChatOpen(false)}><X size={20} /></button></div>
              <div className="flex p-1 rounded-lg bg-black/10"><button onClick={() => setChatMode('system')} className={`flex-1 py-1 rounded-md text-[9px] font-bold ${chatMode === 'system' ? 'bg-white text-black' : 'opacity-50'}`}>System</button><button onClick={() => setChatMode('group')} className={`flex-1 py-1 rounded-md text-[9px] font-bold ${chatMode === 'group' ? 'bg-white text-black' : 'opacity-50'}`}>Group</button></div>
            </div>
            <div className="flex-1 p-6 overflow-y-auto"><div className={`p-4 rounded-xl text-xs font-bold ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>System initialized. Standing by for commands, Boss.</div></div>
            <div className="p-5 border-t flex gap-3"><input type="text" placeholder="Message..." className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`} /><button className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}><Send size={18} /></button></div>
          </div>
        )}
        <button onClick={() => setIsChatOpen(!isChatOpen)} className={`w-20 h-20 rounded-2xl shadow-2xl flex items-center justify-center transition-all ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>{isChatOpen ? <Plus size={32} className="rotate-45" /> : <MessageSquare size={32} />}</button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
        .tracking-tighter { letter-spacing: -0.07em; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
      `}} />
    </div>
  );
};

export default App;