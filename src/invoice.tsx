import React, { useState, ChangeEvent } from 'react';
import { Minus, Plus, Trash2, CheckCircle, UploadCloud, Printer, Plus as PlusIcon } from 'lucide-react';

// --- INTERFACES ---
interface RefData {
  year: number;
  seq: number;
}

interface Client {
  name: string;
  address: string;
  country: string;
}

interface Sender {
  location: string;
  email: string;
}

interface Dates {
  issue: string;
  valid: string;
}

interface Item {
  id: number;
  name: string;
  desc: string;
  qty: number;
  rate: number;
}

interface Term {
  id: number;
  text: string;
  active: boolean;
}

export default function DocGenerator() {
  // --- STATE ---
  const [docType, setDocType] = useState<'QUOTATION' | 'INVOICE' | 'RECEIPT'>('QUOTATION');
  const [refData, setRefData] = useState<RefData>({ year: new Date().getFullYear(), seq: 1 });

  // Client (Starts Empty)
  const [client, setClient] = useState<Client>({
    name: "",
    address: "",
    country: ""
  });

  // Sender (Default Kreavity Works)
  const [sender, setSender] = useState<Sender>({
    location: "Jakarta, Indonesia",
    email: "projects@kreavityworks.com"
  });

  const [dates, setDates] = useState<Dates>({
    issue: new Date().toISOString().split('T')[0] || "",
    valid: "30 Days"
  });

  // Items (Starts Empty Row)
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "", desc: "", qty: 1, rate: 0 }
  ]);

  // Terms & Conditions
  const [terms, setTerms] = useState<Term[]>([
    { id: 1, text: "Payment: 50% Upfront, 50% Upon Completion.", active: true },
    { id: 2, text: "Timeline: Estimated based on project scope.", active: true },
    { id: 3, text: "Revisions: Defined in the service agreement.", active: true }
  ]);

  // Signature (Default to signature.png in public/same folder)
  const [signature, setSignature] = useState<string>('signature.png');

  // --- COMPUTED ---
  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
  const tax = subtotal * 0.11; // 11% Tax (PPN)
  const total = subtotal + tax;

  const getPrefix = () => {
    if (docType === 'INVOICE') return 'I';
    if (docType === 'RECEIPT') return 'R';
    return 'Q';
  };

  const refNumber = `#${getPrefix()}-KW-${refData.year}-${String(refData.seq).padStart(3, '0')}`;

  // --- HANDLERS ---
  const handlePrint = () => {
    window.focus();
    window.print();
  };

  const handleSeqChange = (delta: number) => {
    setRefData(prev => ({ ...prev, seq: Math.max(1, prev.seq + delta) }));
  };

  const handleSeqInput = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setRefData(prev => ({ ...prev, seq: isNaN(val) ? 0 : val }));
  };

  const handleItemChange = (id: number, field: keyof Item, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    setItems([...items, { id: newId, name: "", desc: "", qty: 1, rate: 0 }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(i => i.id !== id));
  };

  const handleTermChange = (id: number, field: keyof Term, value: string | boolean) => {
    setTerms(terms.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleSignatureUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
            setSignature(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="main-layout flex flex-col md:flex-row h-screen overflow-hidden font-sans text-black bg-[#f5f5f5] antialiased">
      {/* Styles Injected Here for Component Portability */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        /* Font Overrides to match Tailwind classes if needed globally */
        body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        /* HIDE SCROLLBAR FOR CLEAN UI */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* REMOVE SPINNERS FROM NUMBER INPUT */
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
            -webkit-appearance: none; 
            margin: 0; 
        }

        /* PRINT STYLES - ROBUST METHOD */
        @media print {
            @page { margin: 0; size: auto; }
            
            html, body {
                height: auto !important;
                overflow: visible !important;
                background: white !important;
                margin: 0 !important;
                padding: 0 !important;
            }

            /* Hide Sidebar and UI Elements */
            .no-print { display: none !important; }

            /* Reset Layout for Print */
            .main-layout {
                display: block !important;
                height: auto !important;
                overflow: visible !important;
            }

            /* Ensure Print Area fills the page */
            .preview-container {
                display: block !important;
                padding: 0 !important;
                margin: 0 !important;
                background: white !important;
                height: auto !important;
                overflow: visible !important;
            }

            .print-area {
                width: 100% !important;
                max-width: none !important;
                box-shadow: none !important;
                margin: 0 !important;
                padding: 15mm 15mm !important; /* Standard A4 Padding */
                min-height: auto !important;
                page-break-after: always;
            }

            /* Force Colors */
            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
        }
      `}</style>

      {/* --- 1. CONTROLS (LEFT SIDE - NO PRINT) --- */}
      <div className="no-print w-full md:w-[400px] bg-white border-r border-gray-200 h-full overflow-y-auto p-6 shadow-xl z-20 relative">
        <div className="mb-8 border-b pb-4">
          <h2 className="text-xl font-bold tracking-tight">Document Controls</h2>
          <p className="text-xs text-gray-400 mt-1">Edit details here, preview updates live.</p>
        </div>

        {/* Doc Type Selector */}
        <div className="mb-6">
          <label className="block text-xs font-mono uppercase text-gray-400 mb-2">Document Type</label>
          <div className="grid grid-cols-3 gap-2">
            {(['QUOTATION', 'INVOICE', 'RECEIPT'] as const).map(type => (
              <button 
                key={type}
                onClick={() => setDocType(type)}
                className={`py-2 px-1 text-[10px] font-bold rounded border transition-colors ${docType === type ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-200 hover:border-black'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Reference Number Control */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <label className="block text-xs font-mono uppercase text-gray-400 mb-2">Reference Sequence</label>
          <div className="flex items-center justify-between bg-white border border-gray-200 rounded px-2 py-1">
            <button onClick={() => handleSeqChange(-1)} className="p-2 hover:bg-gray-100 rounded text-gray-500 hover:text-black transition-colors"><Minus size={14}/></button>
            <input 
                type="number" 
                value={refData.seq} 
                onChange={handleSeqInput}
                className="font-mono font-bold text-lg text-center w-20 outline-none bg-transparent"
            />
            <button onClick={() => handleSeqChange(1)} className="p-2 hover:bg-gray-100 rounded text-gray-500 hover:text-black transition-colors"><Plus size={14}/></button>
          </div>
          <div className="text-[10px] text-center mt-2 text-gray-400 font-mono">{refNumber}</div>
        </div>

        {/* Sender & Client Info */}
        <div className="space-y-4 mb-8">
            <div>
            <label className="block text-xs font-mono uppercase text-gray-400 mb-1">Your Location (Sender)</label>
            <input type="text" value={sender.location} onChange={(e) => setSender({...sender, location: e.target.value})} className="w-full border-b border-gray-200 focus:border-black outline-none py-1 text-sm text-gray-700" />
          </div>
          <div className="pt-4 border-t border-gray-100">
            <label className="block text-xs font-mono uppercase text-gray-400 mb-1">Client Name</label>
            <input type="text" value={client.name} onChange={(e) => setClient({...client, name: e.target.value})} placeholder="Enter Client Name" className="w-full border-b border-gray-200 focus:border-black outline-none py-1 text-sm font-medium" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-gray-400 mb-1">Client Address</label>
            <input type="text" value={client.address} onChange={(e) => setClient({...client, address: e.target.value})} placeholder="Enter Address" className="w-full border-b border-gray-200 focus:border-black outline-none py-1 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-gray-400 mb-1">Client Country</label>
            <input type="text" value={client.country} onChange={(e) => setClient({...client, country: e.target.value})} placeholder="Enter Country" className="w-full border-b border-gray-200 focus:border-black outline-none py-1 text-sm" />
          </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-xs font-mono uppercase text-gray-400 mb-1">Date</label>
              <input type="date" value={dates.issue} onChange={(e) => setDates({...dates, issue: e.target.value})} className="w-full border-b border-gray-200 focus:border-black outline-none py-1 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-gray-400 mb-1">Validity</label>
              <input type="text" value={dates.valid} onChange={(e) => setDates({...dates, valid: e.target.value})} className="w-full border-b border-gray-200 focus:border-black outline-none py-1 text-sm" />
            </div>
          </div>
        </div>

        {/* Items Editor */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-mono uppercase text-gray-400">Items List</label>
            <button onClick={addItem} className="text-[10px] bg-black text-white px-2 py-1 rounded flex items-center gap-1 hover:bg-gray-800"><PlusIcon size={10} /> Add</button>
          </div>
          <div className="space-y-3">
            {items.map((item, idx) => (
              <div key={item.id} className="bg-gray-50 p-3 rounded border border-gray-100 relative group">
                <button onClick={() => removeItem(item.id)} className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12} /></button>
                <input type="text" value={item.name} onChange={(e) => handleItemChange(item.id, 'name', e.target.value)} className="w-full bg-transparent border-none outline-none font-bold text-sm mb-1 placeholder-gray-300" placeholder="Item Name" />
                <input type="text" value={item.desc} onChange={(e) => handleItemChange(item.id, 'desc', e.target.value)} className="w-full bg-transparent border-none outline-none text-xs text-gray-500 mb-2 placeholder-gray-300" placeholder="Description" />
                <div className="flex gap-2">
                  <div className="flex flex-col w-16">
                    <label className="text-[9px] text-gray-400 uppercase">Qty</label>
                    <input type="number" value={item.qty} onChange={(e) => handleItemChange(item.id, 'qty', parseInt(e.target.value)||0)} className="w-full bg-white border border-gray-200 rounded px-1 py-1 text-xs text-right" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label className="text-[9px] text-gray-400 uppercase">Rate</label>
                    <input type="number" value={item.rate} onChange={(e) => handleItemChange(item.id, 'rate', parseInt(e.target.value)||0)} className="w-full bg-white border border-gray-200 rounded px-1 py-1 text-xs text-right" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terms & Conditions Editor */}
        <div className="mb-8">
          <label className="block text-xs font-mono uppercase text-gray-400 mb-2">Terms & Conditions</label>
          <div className="space-y-2">
            {terms.map(term => (
              <div key={term.id} className="flex gap-2 items-start bg-gray-50 p-2 rounded border border-gray-100">
                <input 
                  type="checkbox" 
                  checked={term.active} 
                  onChange={(e) => handleTermChange(term.id, 'active', e.target.checked)}
                  className="mt-1.5 cursor-pointer accent-black"
                />
                <textarea 
                  value={term.text} 
                  onChange={(e) => handleTermChange(term.id, 'text', e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-xs text-gray-600 resize-none h-auto"
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Signature Upload */}
          <div className="mb-8">
          <label className="block text-xs font-mono uppercase text-gray-400 mb-2">Signature (PNG)</label>
          <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors relative">
            <input type="file" accept="image/png" onChange={handleSignatureUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
            {signature ? (
              <div className="flex items-center justify-center gap-2 text-green-600 text-xs font-medium">
                <CheckCircle size={14} /> Image Loaded
              </div>
            ) : (
              <div className="text-gray-400 text-xs flex flex-col items-center gap-1">
                <UploadCloud size={18} />
                <span>Click to upload PNG</span>
              </div>
            )}
          </div>
        </div>

          <div className="mt-8 pt-6 border-t pb-8">
          <button onClick={handlePrint} className="w-full bg-black text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
            <Printer size={18} /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* --- 2. PREVIEW AREA (RIGHT SIDE - PRINTABLE) --- */}
      <div className="preview-container flex-1 bg-gray-200 p-8 md:p-12 overflow-y-auto flex justify-center">
        <div className="print-area bg-white shadow-2xl w-[210mm] min-h-[297mm] p-[15mm] md:p-[20mm] relative flex flex-col justify-between box-border">
          
          {/* --- HEADER --- */}
          <div>
            <div className="flex justify-between items-start border-b-2 border-black pb-6 mb-10">
              <div>
                <h1 className="text-5xl font-bold tracking-tighter mb-2">{docType}</h1>
                <p className="text-sm font-mono text-black/50 tracking-widest uppercase">{refNumber}</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold tracking-tighter">KREAVITY WORKS</div>
                <div className="text-xs text-black/50 mt-2 leading-relaxed font-medium">
                  Global Digital Architecture<br />
                  {sender.location}<br />
                  {sender.email}
                </div>
              </div>
            </div>

            {/* --- INFO GRID --- */}
            <div className="grid grid-cols-2 gap-12 mb-16">
              {/* Client */}
              <div>
                <p className="text-[10px] font-mono text-black/40 uppercase tracking-widest mb-3">Prepared For</p>
                <h2 className="text-xl font-semibold leading-tight">{client.name || 'Client Name'}</h2>
                <div className="text-black/60 text-sm mt-2 leading-relaxed">
                  <p>{client.address}</p>
                  <p>{client.country}</p>
                </div>
              </div>
              
              {/* Meta */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                <div>
                  <p className="text-[10px] font-mono text-black/40 uppercase tracking-widest mb-1">Date Issue</p>
                  <p className="font-medium text-sm">{new Date(dates.issue).toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-black/40 uppercase tracking-widest mb-1">Valid Until</p>
                  <p className="font-medium text-sm">{dates.valid}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] font-mono text-black/40 uppercase tracking-widest mb-1">Project Ref</p>
                  <p className="font-medium text-sm">Digital Transformation</p>
                </div>
              </div>
            </div>

            {/* --- TABLE --- */}
            <div className="mb-12">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 border-b border-black text-[10px] font-mono uppercase tracking-widest py-2 mb-4 text-black/40">
                <div className="col-span-1">No.</div>
                <div className="col-span-6">Description</div>
                <div className="col-span-2 text-right">Rate</div>
                <div className="col-span-1 text-center">Qty</div>
                <div className="col-span-2 text-right">Amount</div>
              </div>

              {/* Items */}
              <div className="space-y-1">
                {items.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 py-3 border-b border-black/5 items-start text-sm">
                    <div className="col-span-1 font-mono text-black/40 pt-1">{String(index + 1).padStart(2, '0')}</div>
                    <div className="col-span-6 pr-4">
                      <h3 className="font-semibold text-black/90">{item.name || "Item Name"}</h3>
                      <p className="text-xs text-black/50 mt-1 leading-relaxed">{item.desc || "Description"}</p>
                    </div>
                    <div className="col-span-2 text-right font-mono text-black/60 pt-1">${item.rate.toLocaleString()}</div>
                    <div className="col-span-1 text-center font-mono text-black/60 pt-1">{item.qty}</div>
                    <div className="col-span-2 text-right font-mono font-medium text-black pt-1">${(item.qty * item.rate).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- FOOTER & TOTALS --- */}
          <div>
            <div className="flex justify-end mb-16">
              <div className="w-[45%] space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-black/50">Subtotal</span>
                  <span className="font-mono">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black/50">Tax (11%)</span>
                  <span className="font-mono text-black/70">${tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t-2 border-black mt-2">
                  <span>Total</span>
                  <span className="font-mono">${total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 border-t border-black/10 pt-8 items-end">
              <div>
                <h4 className="font-bold text-xs mb-3 uppercase tracking-wider">Terms & Conditions</h4>
                <ul className="text-[10px] text-black/60 space-y-1 list-disc pl-3 leading-relaxed">
                  {terms.filter(t => t.active).map(term => (
                    <li key={term.id}>{term.text}</li>
                  ))}
                </ul>
              </div>
              
              {/* SIGNATURE AREA */}
              <div className="text-right flex flex-col justify-end items-end relative">
                {/* Image Container - Overlapping Line */}
                <div className="relative w-48 h-32 mb-[-10px] z-10 flex items-end justify-end pointer-events-none">
                  {signature && (
                    <img 
                      src={signature} 
                      alt="Signature" 
                      className="max-w-full max-h-full object-contain object-bottom filter contrast-125" 
                      style={{ transform: 'translateY(15%) scale(1.3)', transformOrigin: 'bottom right' }}
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  )}
                </div>
                
                {/* Line & Text */}
                <div className="w-48 border-b border-black/20 mb-2 relative z-0"></div>
                <p className="font-bold text-sm text-black">Authorized Signature</p>
                <p className="text-[10px] text-black/40 uppercase tracking-wide mt-1">Kreavity Works Management</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
