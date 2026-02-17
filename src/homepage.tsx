import React, { useState, useMemo, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Bell, 
  Calendar, 
  Briefcase, 
  Cpu, 
  DollarSign, 
  User as UserIcon, 
  Search, 
  MoreVertical, 
  Plus, 
  ChevronRight, 
  ChevronLeft, 
  History, 
  CheckCircle, 
  FileText, 
  CreditCard, 
  Clock, 
  ShieldAlert, 
  StickyNote, 
  Wallet, 
  LogOut, 
  Lock, 
  Settings, 
  Eye, 
  X, 
  Edit3, 
  Zap, 
  Image, 
  Activity, 
  Globe, 
  Moon, 
  Sun, 
  Trash2, 
  Save,
  Send,
  MessageSquare
} from 'lucide-react';

// --- Types & Interfaces ---

interface QueueItem {
  id: number;
  talent: string;
  client: string;
  project: string;
  status: string;
  price: string;
  priceType: 'Fixed' | 'Hourly';
  startDate: string;
  endDate: string;
  projectLength: string;
  totalHours?: string;
}

interface UserProfile {
  name: string;
  title: string;
  role: string;
}

interface FormData {
  talent: string;
  client: string;
  project: string;
  status: string;
  price: string;
  priceType: 'Fixed' | 'Hourly';
  totalHours: string;
  startDate: string;
  endDate: string;
  projectLength: string;
}

// --- Constants & Data ---

const AVATAR_OPTIONS: string[] = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica&backgroundColor=ffdfbf&clothing=blazerAndShirt&top=longHairBun',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia&backgroundColor=ffdfbf&clothing=blazerAndShirt&top=longHairStraight&glasses=round',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Amelia&backgroundColor=ffdfbf&clothing=shirtCrewNeck&top=shortHairShaggyMullet',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert&backgroundColor=c0aede&clothing=blazerAndShirt&top=shortHairShortFlat&facialHair=beardMedium',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=James&backgroundColor=b6e3f4&clothing=collarAndSweater&top=shortHairTheCaesar&glasses=wayfarers',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=William&backgroundColor=c0aede&clothing=shirtScoopNeck&top=shortHairFrizzle&facialHair=beardLight',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Nando&backgroundColor=b6e3f4&clothing=hoodie&top=shortHairTheCaesarSidePart&facialHair=beardMajestic', // Boss
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael&backgroundColor=ffdfbf&clothing=blazerAndSweater&top=shortHairDreads01',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=c0aede&clothing=shirtVNeck&top=shortHairSides',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas&backgroundColor=b6e3f4&clothing=graphicShirt&top=shortHairShortCurly&facialHair=moustacheFancy',
];

const PROJECT_SUGGESTIONS: string[] = [
  "DESIGN", "BRANDING", "UI/UX", "WEB3", "TRANSLATE", "AI TRAINING", "VIDEO EDITING"
];

// --- Shared Components ---

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isDarkMode: boolean;
}

// FIXED: Modal responsive logic for iPhone 16 Pro
const ModalWrapper: React.FC<ModalWrapperProps> = ({ isOpen, onClose, title, children, isDarkMode }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-300 px-4 pb-4 md:pb-0">
      {/* Container: w-full with max-width constraint, auto margins, and max-height for scrolling */}
      <div className={`relative w-full max-w-md md:max-w-lg p-5 md:p-8 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300 border flex flex-col max-h-[85vh] ${isDarkMode ? 'bg-[#1a1a1a] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
        
        {/* Header - Sticky */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-inherit shrink-0">
          <h3 className="text-lg md:text-xl font-bold tracking-tight uppercase truncate pr-4">{title}</h3>
          <button onClick={onClose} className={`p-2 rounded-xl transition-colors shrink-0 ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'}`}>
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto scrollbar-hide -mr-2 pr-2">
           {children}
        </div>

      </div>
    </div>
  );
};

// --- Sub-Components ---

const UpdatesView: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <div className="space-y-6 md:space-y-12 animate-in fade-in slide-in-from-left-4 duration-500">
    <div className={`flex flex-col md:flex-row md:justify-between md:items-end border-b pb-4 md:pb-8 gap-2 ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
      <div className="text-left">
        <h2 className="text-2xl md:text-4xl font-medium tracking-tighter">System Updates</h2>
        <p className={`mt-1 font-medium text-xs md:text-base ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>Berita dan integrasi terbaru.</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className={`group p-5 md:p-6 rounded-2xl border transition-all cursor-pointer shadow-sm ${isDarkMode ? 'bg-[#1a1a1a] border-white/5 hover:border-white/20' : 'bg-white border-black/5 hover:border-black/20'}`}>
          <div className="flex justify-between mb-4 md:mb-6">
            <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>Log v.3.2 • 17 Feb</span>
            <MoreVertical size={16} className={`${isDarkMode ? 'text-white/20 group-hover:text-white' : 'text-black/20 group-hover:text-black'} transition-colors`} />
          </div>
          <h3 className="text-lg md:text-xl font-medium tracking-tight mb-2 md:mb-3" contentEditable>Neural Workflow 2.0</h3>
          <p className={`text-xs md:text-sm leading-relaxed mb-4 md:mb-6 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`} contentEditable>Optimasi rendering pipeline untuk mempercepat delivery aset brand sebesar 40%.</p>
          <div className={`flex items-center gap-3 pt-4 md:pt-6 border-t ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
            <div className={`w-6 h-6 md:w-8 md:h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>N</div>
            <span className="text-[10px] font-bold uppercase tracking-widest">System Director</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CalendarView: React.FC<{ onAddEvent: (title: string) => void; isDarkMode: boolean }> = ({ onAddEvent, isDarkMode }) => {
  const [viewDate, setViewDate] = useState(new Date());
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-500">
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-end border-b pb-4 md:pb-8 mb-6 md:mb-12 gap-4 ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
        <div className="text-left w-full md:w-auto">
          <h2 className="text-2xl md:text-4xl font-medium tracking-tighter">{monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}</h2>
          <p className={`mt-1 font-medium text-xs md:text-base ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>Atur jadwal produksi.</p>
        </div>
        <div className="flex w-full md:w-auto items-center gap-3">
          <div className={`flex p-1 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
            <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1))} className={`p-2 md:p-3 rounded-lg transition-all ${isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-white text-black'}`}><ChevronLeft size={18} /></button>
            <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1))} className={`p-2 md:p-3 rounded-lg transition-all ${isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-white text-black'}`}><ChevronRight size={18} /></button>
          </div>
          <button onClick={() => onAddEvent('New Project Schedule')} className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-8 py-3 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-widest hover:opacity-90 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
            <Plus size={12} /> <span className="inline">Event</span>
          </button>
        </div>
      </div>

      <div className={`rounded-2xl border p-4 md:p-8 shadow-sm ${isDarkMode ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-black/5'}`}>
        <div className={`grid grid-cols-7 gap-2 md:gap-4 mb-4 text-center text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold ${isDarkMode ? 'text-white/30' : 'text-black/30'}`}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day}>{day}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1 md:gap-4">
          {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
          {Array.from({ length: daysInMonth(viewDate.getFullYear(), viewDate.getMonth()) }).map((_, i) => (
            <div 
              key={i} 
              onClick={() => onAddEvent(`Event Details: Day ${i+1}`)}
              className={`group min-h-[50px] md:min-h-[120px] rounded-lg md:rounded-xl p-1.5 md:p-4 border transition-all flex flex-col justify-between cursor-pointer ${isDarkMode ? 'border-white/5 hover:bg-white hover:text-black text-white' : 'border-black/[0.04] hover:bg-black hover:text-white text-black'}`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] md:text-sm font-black opacity-30 group-hover:opacity-100">{i + 1}</span>
                <Plus size={10} className="hidden md:block opacity-0 group-hover:opacity-100" />
              </div>
              {i === 14 && (
                <div className={`p-1 rounded md:rounded-md text-[6px] md:text-[9px] font-bold uppercase tracking-tighter truncate ${isDarkMode ? 'bg-white text-black group-hover:bg-black group-hover:text-white' : 'bg-black text-white group-hover:bg-white group-hover:text-black'}`}>
                  Meeting
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const QueueView: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([
    { 
        id: 1, 
        talent: 'Reza', 
        client: 'Aether Corp', 
        project: 'Branding', 
        status: 'IN PROGRESS', 
        price: '$ 1,000', 
        priceType: 'Fixed',
        startDate: '2026-01-20',
        endDate: '2026-02-20',
        projectLength: '1 - 3 Months'
    },
    { 
        id: 2, 
        talent: 'Syams', 
        client: 'Lumina Tech', 
        project: 'UI/UX Design', 
        status: 'REVIEW', 
        price: '$ 1,850', 
        priceType: 'Fixed',
        startDate: '2026-02-01',
        endDate: '2026-03-01',
        projectLength: '1 - 3 Months'
    },
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<QueueItem | null>(null);
  const [formData, setFormData] = useState<FormData>({ 
      talent: '', 
      client: '', 
      project: '', 
      status: 'Pending', 
      price: '', 
      priceType: 'Fixed',
      totalHours: '',
      startDate: '',
      endDate: '',
      projectLength: '1 - 3 Months'
  });

  const handleOpenAdd = () => {
    setEditItem(null);
    setFormData({ 
        talent: '', 
        client: '', 
        project: '', 
        status: 'IN PROGRESS', 
        price: '', 
        priceType: 'Fixed',
        totalHours: '',
        startDate: '',
        endDate: '',
        projectLength: '1 - 3 Months'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: QueueItem) => {
    setEditItem(item);
    setFormData({
        talent: item.talent,
        client: item.client,
        project: item.project,
        status: item.status,
        price: item.price,
        priceType: item.priceType,
        totalHours: item.totalHours || '',
        startDate: item.startDate,
        endDate: item.endDate,
        projectLength: item.projectLength
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editItem) {
      setQueueItems(queueItems.map(i => i.id === editItem.id ? { ...formData, id: editItem.id } : i));
    } else {
      setQueueItems([...queueItems, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setQueueItems(queueItems.filter(i => i.id !== id));
  };

  // FIXED: Text-base for mobile input to prevent zoom
  const inputClass = `w-full px-4 py-3 rounded-xl text-base md:text-sm font-bold outline-none transition-all ${isDarkMode ? 'bg-black/20 focus:bg-black/40 text-white placeholder-white/20' : 'bg-black/5 focus:bg-white focus:ring-1 ring-black text-black'}`;
  const labelClass = `text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-2 block ${isDarkMode ? 'text-white/40' : 'text-black/40'}`;

  // Card Component for Mobile View
  const MobileCard = ({ item }: { item: QueueItem }) => (
    <div className={`p-5 rounded-2xl border mb-4 shadow-sm ${isDarkMode ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-black/5'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-base font-bold">{item.talent}</h4>
          <p className={`text-[10px] uppercase tracking-wider font-bold ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>{item.client}</p>
        </div>
        <span className={`px-2 py-1 text-[8px] rounded-lg font-black uppercase tracking-widest ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
          {item.status}
        </span>
      </div>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-xs">
          <span className={isDarkMode ? 'text-white/40' : 'text-black/40'}>Project</span>
          <span className="font-bold">{item.project}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className={isDarkMode ? 'text-white/40' : 'text-black/40'}>Price</span>
          <span className="font-bold">{item.price}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className={isDarkMode ? 'text-white/40' : 'text-black/40'}>Timeline</span>
          <span className="font-bold">{item.startDate}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => handleOpenEdit(item)} className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10'}`}>Edit</button>
        <button onClick={() => handleDelete(item.id)} className={`px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-500`}>Del</button>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-500">
      <div className={`flex justify-between items-end border-b pb-4 md:pb-8 mb-8 text-left ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
        <div>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tighter">Client Queue</h2>
          <p className={`mt-1 font-medium text-xs md:text-base ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>Monitoring status talent.</p>
        </div>
        <button onClick={handleOpenAdd} className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-widest hover:opacity-90 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
           <Plus size={12} /> <span className="hidden md:inline">Add Queue</span> <span className="md:hidden">Add</span>
        </button>
      </div>

      {/* Mobile View: Cards */}
      <div className="md:hidden">
        {queueItems.map(item => <MobileCard key={item.id} item={item} />)}
        {queueItems.length === 0 && (
           <div className={`p-8 text-center text-xs font-bold uppercase tracking-widest opacity-30 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              No Active Queue
           </div>
        )}
      </div>

      {/* Desktop View: Table */}
      <div className={`hidden md:block rounded-2xl border overflow-hidden shadow-sm ${isDarkMode ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-black/5'}`}>
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
                   <div className={`text-[10px] uppercase tracking-widest font-bold ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                       {q.startDate} — {q.endDate || '?'}
                   </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-4 py-1.5 text-[10px] rounded-lg font-black uppercase tracking-widest ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    {q.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button onClick={() => handleOpenEdit(q)} className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white/50 hover:text-white' : 'hover:bg-black/5 text-black/40 hover:text-black'}`}>
                      <Edit3 size={16} />
                    </button>
                    <button onClick={() => handleDelete(q.id)} className={`p-2 rounded-lg transition-colors hover:bg-red-500/10 text-red-500`}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {queueItems.length === 0 && (
           <div className={`p-12 text-center text-sm font-bold uppercase tracking-widest opacity-30 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              No Active Queue
           </div>
        )}
      </div>

      <ModalWrapper isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editItem ? "Edit Queue" : "New Queue"} isDarkMode={isDarkMode}>
          <div className="space-y-5">
             <div>
                <label className={labelClass}>Talent Name</label>
                <input type="text" value={formData.talent} onChange={e => setFormData({...formData, talent: e.target.value})} className={inputClass} placeholder="e.g. Reza" />
             </div>
             
             <div>
                <label className={labelClass}>Client Name</label>
                <input type="text" value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} className={inputClass} placeholder="e.g. Aether Corp" />
             </div>
             
             <div>
                <label className={labelClass}>Project Type</label>
                <input type="text" value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})} className={inputClass} placeholder="e.g. Branding" />
                <div className="flex flex-wrap gap-2 mt-2">
                    {PROJECT_SUGGESTIONS.map((tag, i) => (
                        <button key={i} onClick={() => setFormData({...formData, project: tag})} className={`px-2 py-1.5 rounded-md text-[8px] font-bold uppercase tracking-wider border transition-all ${isDarkMode ? 'border-white/10 hover:bg-white/10' : 'border-black/10 hover:bg-black/5'}`}>
                            {tag}
                        </button>
                    ))}
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className={labelClass}>Pricing Model</label>
                    <div className={`flex p-1 rounded-xl ${isDarkMode ? 'bg-black/30' : 'bg-black/5'}`}>
                       <button onClick={() => setFormData({...formData, priceType: 'Fixed'})} className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${formData.priceType === 'Fixed' ? (isDarkMode ? 'bg-white text-black' : 'bg-black text-white') : 'opacity-40'}`}>Fixed</button>
                       <button onClick={() => setFormData({...formData, priceType: 'Hourly'})} className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${formData.priceType === 'Hourly' ? (isDarkMode ? 'bg-white text-black' : 'bg-black text-white') : 'opacity-40'}`}>Hourly</button>
                    </div>
                 </div>
                 <div>
                    <label className={labelClass}>{formData.priceType === 'Hourly' ? 'Rate / Price' : 'Price'}</label>
                    <input type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className={inputClass} placeholder={formData.priceType === 'Hourly' ? "$20/hr" : "$ 1,000"} />
                 </div>
             </div>

             {formData.priceType === 'Hourly' && (
                 <div>
                    <label className={labelClass}>Total Hours (USD Calculation)</label>
                    <input type="text" value={formData.totalHours} onChange={e => setFormData({...formData, totalHours: e.target.value})} className={inputClass} placeholder="e.g. 40 Hours ($800)" />
                 </div>
             )}

             <div>
                 <label className={labelClass}>Project Length</label>
                 <select value={formData.projectLength} onChange={e => setFormData({...formData, projectLength: e.target.value})} className={inputClass}>
                     <option value="Under 1 month">Under 1 month</option>
                     <option value="1 - 3 Months">1 - 3 Months</option>
                     <option value="1 - 6 Months">1 - 6 Months</option>
                     <option value="1 - 12 Months">1 - 12 Months</option>
                 </select>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Start Date</label>
                  <input type="date" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>End Date</label>
                  <input type="date" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} className={inputClass} />
                </div>
             </div>
             
             <div>
                <label className={labelClass}>Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className={inputClass}>
                   <option value="IN PROGRESS">IN PROGRESS</option>
                   <option value="REVISED">REVISED</option>
                   <option value="IN CHECK">IN CHECK</option>
                   <option value="DONE - PAYMENT PROGRESS">DONE - PAYMENT PROGRESS</option>
                   <option value="DONE - PAYMENT CLEAR">DONE - PAYMENT CLEAR</option>
                </select>
             </div>
             
             <button onClick={handleSave} className={`w-full py-3.5 mt-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-90 active:scale-95 transition-all ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                {editItem ? 'Save Changes' : 'Add to Queue'}
             </button>
          </div>
      </ModalWrapper>
    </div>
  );
};

const TalentView: React.FC<{ onAction: (title: string) => void; isDarkMode: boolean }> = ({ onAction, isDarkMode }) => {
  const sections = [
    { title: "AI System", desc: "Core intelligence engine KreavityWorks.", icon: <Cpu /> },
    { title: "Revision Log", desc: "History revisi dan feedback klien.", icon: <History /> },
    { title: "Final Delivery", desc: "Arsip final asset dan handover.", icon: <CheckCircle /> }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-500">
      <h2 className="text-2xl md:text-4xl font-medium tracking-tighter mb-6 md:mb-12 text-left">Talent Ecosystem</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {sections.map((s, i) => (
          <div key={i} className={`p-6 md:p-10 rounded-2xl border shadow-sm group transition-all flex flex-col text-left ${isDarkMode ? 'bg-[#1a1a1a] border-white/5 hover:border-white/40' : 'bg-white border-black/5 hover:border-black/40'}`}>
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-6 md:mb-8 shadow-lg transition-transform group-hover:-translate-y-1 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
              {React.cloneElement(s.icon, { size: 24 })}
            </div>
            <h3 className="text-lg md:text-2xl font-medium tracking-tight mb-2 md:mb-3">{s.title}</h3>
            <p className={`text-xs md:text-base mb-8 md:mb-10 leading-relaxed flex-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{s.desc}</p>
            <button onClick={() => onAction(s.title)} className={`w-full py-3 md:py-4 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-[0.2em] hover:opacity-90 transition-all flex items-center justify-center gap-3 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
              Open Module <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const FinanceView: React.FC<{ onAction: (title: string) => void; isDarkMode: boolean }> = ({ onAction, isDarkMode }) => {
  const [isLocked, setIsLocked] = useState(true);
  const [creds, setCreds] = useState({ user: '', pass: '' });
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if(creds.pass === 'adminkw') {
      setIsLocked(false);
      setError(false);
    } else {
      setError(true);
    }
  };

  const docs = [
    { name: "Contract / Agreement", icon: <FileText /> },
    { name: "Invoice System", icon: <CreditCard /> },
    { name: "Statement of Work (SOW)", icon: <FileText /> },
    { name: "Brief / Discovery Form", icon: <Search /> },
    { name: "Timeline / Project Plan", icon: <Clock /> },
    { name: "NDA Documents", icon: <ShieldAlert /> },
    { name: "Internal Memos", icon: <StickyNote /> },
    { name: "Salary & Payouts", icon: <Wallet /> },
  ];

  if (isLocked) {
    return (
      <div className="h-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-500 py-10 md:py-0">
        <div className={`w-full max-w-sm p-8 md:p-12 rounded-3xl border shadow-2xl ${isDarkMode ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-black/5'}`}>
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-10 shadow-xl ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
            <Lock size={28} />
          </div>
          <h2 className="text-xl md:text-2xl font-medium text-center tracking-tight mb-2 uppercase">Finance Login</h2>
          <p className={`text-center text-[10px] md:text-xs mb-10 font-bold tracking-widest uppercase ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>Authorized Only.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" placeholder="Username" className={`w-full px-6 py-3 md:py-4 border-none rounded-xl text-base md:text-sm font-bold focus:ring-1 outline-none transition-all ${isDarkMode ? 'bg-black/30 focus:bg-black/50 focus:ring-white/20 text-white placeholder-white/20' : 'bg-black/5 focus:bg-white focus:ring-black text-black'}`} value={creds.user} onChange={e => setCreds({...creds, user: e.target.value})} />
            <input type="password" placeholder="Password" className={`w-full px-6 py-3 md:py-4 border-none rounded-xl text-base md:text-sm font-bold focus:ring-1 outline-none transition-all ${isDarkMode ? 'bg-black/30 focus:bg-black/50 focus:ring-white/20 text-white placeholder-white/20' : 'bg-black/5 focus:bg-white focus:ring-black text-black'}`} value={creds.pass} onChange={e => setCreds({...creds, pass: e.target.value})} />
            {error && <p className="text-red-500 text-[9px] text-center font-black uppercase tracking-widest">Access Denied</p>}
            <button className={`w-full py-3 md:py-4 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mt-4 hover:opacity-90 active:scale-95 transition-all ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>Authorize</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex justify-between items-center mb-8 md:mb-12 text-left">
        <h2 className="text-2xl md:text-4xl font-medium tracking-tighter">Finance & Ops</h2>
        <button onClick={() => setIsLocked(true)} className={`px-4 md:px-6 py-2 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 transition-all hover:opacity-80 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
          Lock <Lock size={12} className="hidden md:block" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {docs.map((doc, i) => (
          <div key={i} onClick={() => onAction(doc.name)} className={`p-6 md:p-8 rounded-2xl border flex flex-col gap-4 md:gap-6 transition-all group cursor-pointer shadow-sm ${isDarkMode ? 'bg-[#1a1a1a] border-white/5 hover:bg-white hover:text-black' : 'bg-white border-black/5 hover:bg-black hover:text-white'}`}>
            <div className={`${isDarkMode ? 'text-white group-hover:text-black' : 'text-black group-hover:text-white'} transition-colors`}>{React.cloneElement(doc.icon, { size: 24 })}</div>
            <span className="text-xs md:text-sm font-bold tracking-tight leading-tight uppercase">{doc.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface UserViewProps {
  onAction: (title: string) => void;
  currentAvatar: string;
  isDarkMode: boolean;
  userProfile: UserProfile;
}

const UserView: React.FC<UserViewProps> = ({ onAction, currentAvatar, isDarkMode, userProfile }) => (
  <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-10 md:space-y-16">
    <div className={`flex justify-between items-end border-b pb-4 md:pb-10 text-left ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
      <div>
        <h2 className="text-2xl md:text-4xl font-medium tracking-tighter">Profile Management</h2>
        <p className={`mt-2 font-medium text-xs md:text-base ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>Kelola akun dan brankas data pribadimu.</p>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16 text-left">
      <div className={`p-8 md:p-12 rounded-2xl border flex flex-col items-center text-center shadow-sm h-fit ${isDarkMode ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-black/5'}`}>
        <div className="relative group mb-8">
          <div className={`w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 transition-all shadow-xl ${isDarkMode ? 'border-white/5 group-hover:border-white/20' : 'border-black/5 group-hover:border-black/20'}`}>
            <img src={currentAvatar || AVATAR_OPTIONS[0]} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button onClick={() => onAction('System Settings')} className={`absolute bottom-2 right-2 p-2 rounded-lg shadow-2xl hover:scale-110 transition-transform ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}><Settings size={16} /></button>
        </div>
        <h3 className="text-2xl md:text-3xl font-black tracking-tight">{userProfile.name}</h3>
        <p className={`text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-black mt-2 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>{userProfile.title}</p>
        <div className={`w-full h-[1px] my-8 md:my-10 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}></div>
        <div className="w-full space-y-3">
          <div className={`flex justify-between items-center text-xs md:text-sm ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
             <span className="font-bold">Role</span>
             <button onClick={() => onAction('System Settings')} className={`font-bold hover:underline ${isDarkMode ? 'text-white' : 'text-black'}`}>{userProfile.role}</button>
          </div>
          <div className={`flex justify-between items-center text-xs md:text-sm ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
             <span className="font-bold">Status</span>
             <span className="font-bold text-emerald-500">Active</span>
          </div>
          <div className="pt-6 mt-6 border-t border-dashed border-inherit opacity-30 text-center">
             <p className={`text-[8px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white' : 'text-black'}`}>SYSTEM BUILD BY NANDO</p>
             <p className={`text-[8px] mt-1 font-black tracking-widest ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>KREAVITYWORKS © 2026</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-8 md:space-y-10">
        
        {/* Brankas Section */}
        <div className={`p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden group ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
          <div className="absolute -top-10 -right-10 opacity-5 rotate-12"><Lock size={150} className="w-[150px] h-[150px] md:w-[200px] md:h-[200px]" /></div>
          <h3 className="text-2xl md:text-4xl font-medium tracking-tight mb-4 flex items-center gap-4">User Brankas <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div></h3>
          <p className={`text-xs md:text-base max-w-sm mb-10 md:mb-12 leading-relaxed font-medium ${isDarkMode ? 'text-black/40' : 'text-white/40'}`}>Tempat penyimpanan privat untuk password, link rahasia, dan dokumen sensitif KreavityWorks.</p>
          <button onClick={() => onAction('Unlock Brankas')} className={`px-8 md:px-10 py-4 md:py-5 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all flex items-center gap-4 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>Unlock Brankas <Eye size={16} /></button>
        </div>

        {/* Recent Activity Section */}
        <div>
           <h4 className={`text-lg md:text-xl font-medium tracking-tight mb-6 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>
             <Activity size={20} className="opacity-30" />
             Recent Activity
           </h4>
           <div className={`rounded-2xl border divide-y ${isDarkMode ? 'bg-[#1a1a1a] border-white/5 divide-white/5' : 'bg-white border-black/5 divide-black/5'}`}>
              {[
                { action: 'Login Detected', device: 'MacBook Pro M3 Max', time: '2 mins ago', icon: <UserIcon size={14} /> },
                { action: 'Vault Unlocked', device: 'Access via Biometric', time: '1 hour ago', icon: <Lock size={14} /> },
                { action: 'System Update', device: 'Neural Workflow 2.0 Installed', time: 'Yesterday', icon: <Zap size={14} /> },
                { action: 'Proposal Sent', device: 'To Aether Corp', time: 'Yesterday', icon: <Send size={14} /> },
              ].map((log, i) => (
                <div key={i} className={`p-4 md:p-6 flex items-center justify-between transition-colors ${isDarkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-black/[0.01]'}`}>
                   <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-white/5 text-white/40' : 'bg-black/5 text-black/40'}`}>
                         {React.cloneElement(log.icon, { size: 14 })}
                      </div>
                      <div>
                         <div className="text-xs md:text-sm font-bold tracking-tight">{log.action}</div>
                         <div className={`text-[8px] md:text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>{log.device}</div>
                      </div>
                   </div>
                   <div className="text-[8px] md:text-[10px] font-bold opacity-30">{log.time}</div>
                </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  </div>
);

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar: string;
  setAvatar: (avatar: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
  language: string;
  setLanguage: (lang: string) => void;
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, currentAvatar, setAvatar, isDarkMode, setIsDarkMode, language, setLanguage, userProfile, setUserProfile }) => {
  if (!isOpen) return null;

  const [localProfile, setLocalProfile] = useState<UserProfile>(userProfile);

  const handleSaveSettings = () => {
      setUserProfile(localProfile);
      onClose();
  };

  const inputClass = `w-full px-4 py-3 rounded-xl text-base md:text-sm font-bold outline-none transition-all ${isDarkMode ? 'bg-black/20 focus:bg-black/40 text-white placeholder-white/20' : 'bg-black/5 focus:bg-white focus:ring-1 ring-black text-black'}`;
  const labelClass = `text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-2 block ${isDarkMode ? 'text-white/40' : 'text-black/40'}`;


  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-300 px-4 pb-4 md:pb-0">
      <div className={`w-full max-w-2xl p-5 md:p-10 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300 border overflow-y-auto max-h-[85vh] scrollbar-hide relative ${isDarkMode ? 'bg-[#1a1a1a] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
        <div className="flex justify-between items-center mb-6 md:mb-8 sticky top-0 bg-inherit z-10 pb-2 border-b border-inherit shrink-0">
          <h3 className="text-xl md:text-3xl font-medium tracking-tighter">System Settings</h3>
          <button onClick={onClose} className={`p-2 md:p-3 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}><X size={24} /></button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          
          <div className="space-y-6">
             {/* Personal Data */}
             <div className="space-y-4">
                 <div className="flex items-center gap-3 mb-2">
                    <UserIcon size={18} />
                    <span className="text-xs font-black uppercase tracking-widest">Personal Data</span>
                 </div>
                 <div>
                    <label className={labelClass}>Display Name</label>
                    <input type="text" value={localProfile.name} onChange={e => setLocalProfile({...localProfile, name: e.target.value})} className={inputClass} />
                 </div>
                 <div>
                    <label className={labelClass}>Job Title</label>
                    <input type="text" value={localProfile.title} onChange={e => setLocalProfile({...localProfile, title: e.target.value})} className={inputClass} />
                 </div>
                 <div>
                    <label className={labelClass}>System Role</label>
                    <input type="text" value={localProfile.role} onChange={e => setLocalProfile({...localProfile, role: e.target.value})} className={inputClass} />
                 </div>
             </div>

             {/* Avatar Selection */}
             <div className="space-y-4 pt-4 border-t border-inherit">
                 <div className="flex items-center gap-3 mb-2">
                    <Image size={18} />
                    <span className="text-xs font-black uppercase tracking-widest">Avatar</span>
                 </div>
                 <div className="grid grid-cols-5 gap-3">
                    {AVATAR_OPTIONS.map((av, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => { if(av) setAvatar(av); }}
                        className={`rounded-full overflow-hidden border-2 transition-all hover:scale-110 aspect-square ${currentAvatar === av ? `border-${isDarkMode ? 'white' : 'black'} ring-2 ring-${isDarkMode ? 'white/20' : 'black/20'} scale-110` : 'border-transparent opacity-50 hover:opacity-100'}`}
                      >
                        {av && <img src={av} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />}
                      </button>
                    ))}
                 </div>
             </div>
          </div>

          {/* Preferences */}
          <div className="space-y-6">
             
             {/* Theme Toggle */}
             <div>
                <div className="flex items-center gap-3 mb-4">
                   {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
                   <span className="text-xs font-black uppercase tracking-widest">Interface Mode</span>
                </div>
                <div className={`flex p-1 rounded-xl ${isDarkMode ? 'bg-black/30' : 'bg-black/5'}`}>
                   <button 
                     onClick={() => setIsDarkMode(false)}
                     className={`flex-1 py-3 rounded-lg text-xs font-bold transition-all ${!isDarkMode ? 'bg-white shadow-sm text-black' : 'text-white/40'}`}
                   >White</button>
                   <button 
                     onClick={() => setIsDarkMode(true)}
                     className={`flex-1 py-3 rounded-lg text-xs font-bold transition-all ${isDarkMode ? 'bg-white shadow-sm text-black' : 'text-black/40'}`}
                   >Dark</button>
                </div>
             </div>

             {/* Language Toggle */}
             <div>
                <div className="flex items-center gap-3 mb-4">
                   <Globe size={18} />
                   <span className="text-xs font-black uppercase tracking-widest">System Language</span>
                </div>
                <div className={`flex p-1 rounded-xl ${isDarkMode ? 'bg-black/30' : 'bg-black/5'}`}>
                   <button 
                     onClick={() => setLanguage('id')}
                     className={`flex-1 py-3 rounded-lg text-xs font-bold transition-all ${language === 'id' ? 'bg-white shadow-sm text-black' : `${isDarkMode ? 'text-white/40' : 'text-black/40'}`}`}
                   >Indonesia</button>
                   <button 
                     onClick={() => setLanguage('en')}
                     className={`flex-1 py-3 rounded-lg text-xs font-bold transition-all ${language === 'en' ? 'bg-white shadow-sm text-black' : `${isDarkMode ? 'text-white/40' : 'text-black/40'}`}`}
                   >English</button>
                </div>
             </div>

             <div className={`pt-6 border-t space-y-3 ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                <button onClick={handleSaveSettings} className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-95 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                   <Save size={14} /> Save Settings
                </button>
                
                <button className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all ${isDarkMode ? 'bg-red-900/20 text-red-400 hover:bg-red-900/40' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}>
                   <LogOut size={14} /> Log Out Session
                </button>
             </div>

          </div>
        </div>

      </div>
    </div>
  );
};

// --- Command/AI Interface Component (Similar to Screenshot) ---
const AICommandModal: React.FC<{ isOpen: boolean; onClose: () => void; isDarkMode: boolean }> = ({ isOpen, onClose, isDarkMode }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-300 px-4 pb-4 md:pb-0">
        <div className={`relative w-full max-w-md rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300 border flex flex-col overflow-hidden ${isDarkMode ? 'bg-[#1a1a1a] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
            
            {/* Header */}
            <div className={`p-4 border-b flex justify-between items-center ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-black/5 bg-black/5'}`}>
               <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-green-400' : 'bg-green-600'}`}></div>
                  <span className="text-xs font-black uppercase tracking-[0.2em]">System Command</span>
               </div>
               <button onClick={onClose}><X size={16} className="opacity-50" /></button>
            </div>

            {/* Chat Body */}
            <div className="p-6 min-h-[300px] flex flex-col justify-center items-center text-center space-y-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    <Cpu size={24} />
                </div>
                <h3 className="text-lg font-bold">System initialized.</h3>
                <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Standing by for commands, Boss.</p>
            </div>

            {/* Input Area - Matches Screenshot Style */}
            <div className="p-4 pt-0">
                <div className={`flex items-center gap-2 p-2 rounded-xl border ${isDarkMode ? 'bg-black/30 border-white/10' : 'bg-black/5 border-black/5'}`}>
                   <input 
                      type="text" 
                      placeholder="Type command..." 
                      className="flex-1 bg-transparent border-none outline-none px-2 text-base font-medium"
                      autoFocus
                   />
                   <button className={`p-3 rounded-lg transition-transform active:scale-95 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                      <Send size={18} />
                   </button>
                </div>
            </div>

        </div>
      </div>
    );
};

// --- Main Application ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  
  // Gimmick State
  const [gimmickTitle, setGimmickTitle] = useState('');
  const [isGimmickOpen, setIsGimmickOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false); // New AI Modal

  // Settings State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [avatar, setAvatar] = useState<string>(AVATAR_OPTIONS[6] || AVATAR_OPTIONS[0] || "");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>({
      name: 'KREAVITYWORKS',
      title: 'USER',
      role: 'Please Edit'
  });

  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard />, label: 'Updates' },
    { id: 'calendar', icon: <Calendar />, label: 'Calendar' },
    { id: 'queue', icon: <Briefcase />, label: 'Queue' },
    { id: 'talent', icon: <Cpu />, label: 'System' },
    { id: 'finance', icon: <DollarSign />, label: 'Finance' },
    { id: 'user', icon: <UserIcon />, label: 'User' },
  ];

  const filteredResults = useMemo(() => {
    if (!searchQuery) return [];
    const ALL_RESOURCES = [
       { id: 1, name: 'Branding Guide', tab: 'dashboard', category: 'Asset' },
       { id: 2, name: 'Invoice Template', tab: 'finance', category: 'Finance' }
    ];
    return ALL_RESOURCES.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const triggerGimmick = (title: string) => {
    if(title === 'System Settings') {
        setIsSettingsOpen(true);
    } else if (title === 'AI System') {
        setIsAIModalOpen(true); // Open the fix for the screenshot issue
    } else {
        setGimmickTitle(title);
        setIsGimmickOpen(true);
    }
  };

  return (
    <div className={`flex h-screen font-sans selection:bg-black selection:text-white overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-neutral-950 text-white' : 'bg-[#FDFDFD] text-black'}`}>
      
      {/* Sidebar - Desktop */}
      <aside className={`hidden md:flex w-28 border-r flex-col items-center py-6 z-30 ${isDarkMode ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-black/10'}`}>
        <div onClick={() => setActiveTab('dashboard')} className="mb-2 hover:scale-110 transition-transform cursor-pointer h-10 w-10 flex items-center justify-center">
        </div>
        
        <nav className="flex-1 space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-4 rounded-xl transition-all duration-300 group relative flex items-center justify-center ${
                activeTab === item.id 
                  ? (isDarkMode ? 'bg-white text-black shadow-xl scale-110' : 'bg-black text-white shadow-xl scale-110') 
                  : (isDarkMode ? 'text-white/60 hover:bg-white/10' : 'text-black/30 hover:bg-black/5')
              }`}
            >
              {React.cloneElement(item.icon, { size: 22 })}
              <span className={`absolute left-full ml-6 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-8 flex flex-col items-center w-full">
          <button onClick={() => setIsSettingsOpen(true)} className={`p-4 rounded-xl transition-colors ${isDarkMode ? 'text-white/30 hover:text-white hover:bg-white/10' : 'text-black/30 hover:text-black hover:bg-black/5'}`}>
            <Settings size={22} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        <header className={`h-20 md:h-28 backdrop-blur-xl border-b px-4 md:px-16 flex items-center justify-between sticky top-0 z-20 ${isDarkMode ? 'bg-neutral-900/50 border-white/10' : 'bg-white/50 border-black/10'}`}>
          <div className="flex items-center gap-6">
             <span className={`text-[10px] font-black uppercase tracking-[0.1em] md:tracking-[0.5em] flex items-center ${isDarkMode ? 'text-white' : 'text-black'}`}>SYSTEM | KREAVITYWORKS</span>
          </div>

          <div className="flex items-center gap-2 md:gap-6 flex-1 max-w-2xl justify-end">
            <div className="relative w-full max-w-md hidden md:block">
              <Search className={`absolute left-5 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/20' : 'text-black/20'}`} size={16} />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className={`w-full pl-14 pr-6 py-4 border-none focus:ring-1 rounded-xl text-sm font-bold transition-all outline-none ${isDarkMode ? 'bg-white/5 focus:bg-white/10 focus:ring-white/20 text-white placeholder-white/30' : 'bg-black/5 focus:bg-white focus:ring-black/10 text-black'}`}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowSearchDropdown(true); }}
                onFocus={() => setShowSearchDropdown(true)}
              />
              {showSearchDropdown && searchQuery && (
                <div className={`absolute top-full mt-3 w-full border rounded-2xl shadow-2xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 ${isDarkMode ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-black/10'}`}>
                  <div className="max-h-[300px] overflow-y-auto">
                    {filteredResults.map(res => (
                      <button key={res.id} onClick={() => { setActiveTab(res.tab); setSearchQuery(''); }} className={`w-full text-left px-6 py-4 flex items-center justify-between group ${isDarkMode ? 'hover:bg-white hover:text-black' : 'hover:bg-black hover:text-white'}`}>
                        <div>
                          <div className="text-sm font-black uppercase tracking-tight">{res.name}</div>
                          <div className="text-[9px] opacity-40 uppercase font-black tracking-widest">{res.category}</div>
                        </div>
                        <ChevronRight size={14} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className={`flex items-center gap-3 md:gap-4 pl-0 md:pl-6 md:border-l ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                {/* Mobile Command Trigger - Fix for "AI" access on Mobile */}
                <button onClick={() => setIsAIModalOpen(true)} className={`md:hidden relative p-2 transition-all rounded-xl ${isDarkMode ? 'text-white/30 hover:text-white hover:bg-white/5' : 'text-black/30 hover:text-black hover:bg-black/5'}`}>
                    <MessageSquare size={20} />
                </button>

                <button onClick={() => triggerGimmick('System Notifications')} className={`relative p-2 md:p-3 transition-all rounded-xl ${isDarkMode ? 'text-white/30 hover:text-white hover:bg-white/5' : 'text-black/30 hover:text-black hover:bg-black/5'}`}>
                  <Bell size={20} className="md:w-6 md:h-6" />
                  <span className="absolute top-2 right-2 md:top-3 md:right-3 w-2 h-2 rounded-full border-2 border-inherit bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                </button>
                
                <button onClick={() => setIsSettingsOpen(true)} className="group relative">
                   <div className={`w-9 h-9 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-transparent transition-all shadow-sm ${isDarkMode ? 'group-hover:border-white/10' : 'group-hover:border-black/10'}`}>
                      <img src={avatar || AVATAR_OPTIONS[0]} alt="Profile" className="w-full h-full object-cover" />
                   </div>
                </button>
            </div>

          </div>
        </header>

        <section className="flex-1 overflow-y-auto px-4 md:px-16 py-6 md:py-16 scroll-smooth relative pb-28 md:pb-20">
          <div className="max-w-[1400px] ml-0">
            {activeTab === 'dashboard' && <UpdatesView isDarkMode={isDarkMode} />}
            {activeTab === 'calendar' && <CalendarView onAddEvent={triggerGimmick} isDarkMode={isDarkMode} />}
            {activeTab === 'queue' && <QueueView isDarkMode={isDarkMode} />}
            {activeTab === 'talent' && <TalentView onAction={triggerGimmick} isDarkMode={isDarkMode} />}
            {activeTab === 'finance' && <FinanceView onAction={triggerGimmick} isDarkMode={isDarkMode} />}
            {activeTab === 'user' && <UserView onAction={triggerGimmick} currentAvatar={avatar} isDarkMode={isDarkMode} userProfile={userProfile} />}
          </div>
        </section>
      </main>

      {/* Mobile Bottom Navigation - Added pb-safe */}
      <nav className={`md:hidden fixed bottom-0 w-full pb-safe pt-2 px-6 flex justify-between items-center border-t backdrop-blur-xl z-40 ${isDarkMode ? 'bg-neutral-900/90 border-white/10' : 'bg-white/90 border-black/10'}`}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`p-3 rounded-xl transition-all duration-300 flex flex-col items-center gap-1 ${
              activeTab === item.id 
                ? (isDarkMode ? 'text-white' : 'text-black') 
                : (isDarkMode ? 'text-white/40' : 'text-black/30')
            }`}
          >
            {React.cloneElement(item.icon, { size: 20 })}
            {activeTab === item.id && <span className="w-1 h-1 rounded-full bg-current"></span>}
          </button>
        ))}
      </nav>

      {/* Gimmick Modal */}
      <ModalWrapper isOpen={isGimmickOpen} onClose={() => setIsGimmickOpen(false)} title={gimmickTitle} isDarkMode={isDarkMode}>
          <div className="space-y-4">
             <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Fitur sedang diproses sistem.</p>
             <button onClick={() => setIsGimmickOpen(false)} className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] hover:opacity-90 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
               Close Module
             </button>
          </div>
      </ModalWrapper>
      
      {/* AI Command Modal - Specific fix for screenshot */}
      <AICommandModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} isDarkMode={isDarkMode} />

      <SettingsModal 
         isOpen={isSettingsOpen} 
         onClose={() => setIsSettingsOpen(false)} 
         currentAvatar={avatar} 
         setAvatar={setAvatar}
         isDarkMode={isDarkMode}
         setIsDarkMode={setIsDarkMode}
         language={language}
         setLanguage={setLanguage}
         userProfile={userProfile}
         setUserProfile={setUserProfile}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; letter-spacing: -0.01em; }
        .tracking-tighter { letter-spacing: -0.07em; }
        .tracking-tight { letter-spacing: -0.03em; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        [contenteditable]:focus { outline: none; background: rgba(0,0,0,0.02); border-radius: 4px; padding: 0 4px; }
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          .pb-safe { padding-bottom: env(safe-area-inset-bottom); padding-bottom: max(env(safe-area-inset-bottom), 20px); }
        }
      `}} />
    </div>
  );
};

export default App;