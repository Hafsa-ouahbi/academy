// // // export default function Concept() {
// // //     return (
// // //         <div>
// // //             <h1>conceptPage hhhhhhhhhhhhhhhhh</h1>
// // //         </div>
// // //     );
// // // }
























// // import React, { useState } from 'react';
// // import { 
// //   Plus, 
// //   Trash2, 
// //   GripVertical, 
// //   BookOpen, 
// //   HelpCircle, 
// //   Award, 
// //   Save, 
// //   Eye,
// //   Video,
// //   FileText,
// //   Link2,
// //   Image,
// //   Maximize2,
// //   X
// // } from 'lucide-react';

// // export default function ConceptBuilderWorkspace() {
// //   // Empty states ready for real data ingestion via Inertia page props
// //   const [topics, setTopics] = useState([]);
// //   const [activeId, setActiveId] = useState(null);

// //   // Modal Trigger States
// //   const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
// //   const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);

// //   // Asset Management temporary field states
// //   const [newAssetName, setNewAssetName] = useState('');
// //   const [newAssetType, setNewAssetType] = useState('pdf');
// //   const [newAssetUrl, setNewAssetUrl] = useState('');

// //   const currentTopic = topics.find(t => t.id === activeId) || null;

// //   const handleUpdateTopic = (field, value) => {
// //     setTopics(prev => prev.map(topic => 
// //       topic.id === activeId ? { ...topic, [field]: value } : topic
// //     ));
// //   };

// //   const handleAddTopic = (type) => {
// //     const newId = topics.length > 0 ? Math.max(...topics.map(t => t.id)) + 1 : 1;
// //     const newOrder = topics.length + 1;

// //     const newTopic = {
// //       id: newId,
// //       type: type, // 'topic' | 'quiz' | 'exercise'
// //       title: '',
// //       order: newOrder,
// //       content: '', // Plain text field description/guidelines context
// //       videoUrl: '',
// //       assets: []
// //     };

// //     setTopics([...topics, newTopic]);
// //     setActiveId(newId);
// //   };

// //   const handleDeleteTopic = (id, e) => {
// //     e.stopPropagation();
// //     const filtered = topics.filter(t => t.id !== id);
// //     const reOrdered = filtered.map((topic, index) => ({ ...topic, order: index + 1 }));
// //     setTopics(reOrdered);
// //     if (activeId === id) setActiveId(reOrdered.length > 0 ? reOrdered[0].id : null);
// //   };

// //   const handleAddAsset = (e) => {
// //     e.preventDefault();
// //     if (!newAssetName || !newAssetUrl) return;
// //     const freshAsset = { id: Date.now(), type: newAssetType, name: newAssetName, url: newAssetUrl };
// //     handleUpdateTopic('assets', [...(currentTopic.assets || []), freshAsset]);
// //     setNewAssetName('');
// //     setNewAssetUrl('');
// //   };

// //   const handleDeleteAsset = (assetId) => {
// //     handleUpdateTopic('assets', currentTopic.assets.filter(a => a.id !== assetId));
// //   };

// //   return (
// //     <div className="w-full h-full flex bg-[#141414] text-neutral-200 font-sans overflow-hidden antialiased">

// //       {/* LEFT COLUMN: SUB-SIDEBAR (Concept Flow Builder) */}
// //       <div className="w-72 border-r border-neutral-900 bg-[#161616]/50 flex flex-col justify-between shrink-0">
// //         <div className="p-4 overflow-y-auto space-y-2 flex-1">
// //           <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider px-1 mb-3">
// //             Concept Structure Flow
// //           </div>

// //           {topics.length > 0 ? (
// //             topics.map((item) => {
// //               const isActive = activeId === item.id;
// //               return (
// //                 <div
// //                   key={item.id}
// //                   onClick={() => setActiveId(item.id)}
// //                   className={`group flex items-center justify-between p-3 rounded-xl transition border cursor-pointer ${
// //                     isActive 
// //                       ? 'bg-[#1c1c1c] border-yellow-600/80 text-white shadow-sm' 
// //                       : 'bg-transparent border-transparent text-neutral-400 hover:bg-neutral-900/40 hover:text-white'
// //                   }`}
// //                 >
// //                   <div className="flex items-center gap-3 min-w-0">
// //                     <GripVertical className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-400 shrink-0" />
// //                     <div className={`p-1.5 rounded-lg ${isActive ? 'bg-neutral-900 text-yellow-500' : 'bg-[#1c1c1c] text-neutral-400'}`}>
// //                       {item.type === 'topic' && <BookOpen className="w-3.5 h-3.5" />}
// //                       {item.type === 'quiz' && <HelpCircle className="w-3.5 h-3.5 text-amber-500" />}
// //                       {item.type === 'exercise' && <Award className="w-3.5 h-3.5 text-emerald-500" />}
// //                     </div>
// //                     <div className="truncate">
// //                       <p className="text-[10px] text-neutral-500 font-mono">STEP 0{item.order}</p>
// //                       <h4 className="text-xs font-semibold truncate">
// //                         {item.title || <span className="text-neutral-600 italic">Untitled Node</span>}
// //                       </h4>
// //                     </div>
// //                   </div>
// //                   <button 
// //                     onClick={(e) => handleDeleteTopic(item.id, e)}
// //                     className="p-1 text-neutral-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition rounded"
// //                   >
// //                     <Trash2 className="w-3.5 h-3.5" />
// //                   </button>
// //                 </div>
// //               );
// //             })
// //           ) : (
// //             <div className="text-center py-8 text-xs text-neutral-600 italic">No track nodes declared.</div>
// //           )}
// //         </div>

// //         {/* Builder Add Action Items Block */}
// //         <div className="p-3 border-t border-neutral-900 bg-[#121212]">
// //           <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2 px-1">Append Track Element</p>
// //           <div className="grid grid-cols-3 gap-1">
// //             <button onClick={() => handleAddTopic('topic')} className="py-1.5 text-[11px] font-semibold bg-[#1a1a1a] hover:bg-neutral-800 border border-neutral-800 rounded-lg text-neutral-300 flex items-center justify-center gap-1">
// //               <Plus className="w-3 h-3 text-yellow-500" /> Topic
// //             </button>
// //             <button onClick={() => handleAddTopic('quiz')} className="py-1.5 text-[11px] font-semibold bg-[#1a1a1a] hover:bg-neutral-800 border border-neutral-800 rounded-lg text-neutral-300 flex items-center justify-center gap-1">
// //               <Plus className="w-3 h-3 text-yellow-500" /> Quiz
// //             </button>
// //             <button onClick={() => handleAddTopic('exercise')} className="py-1.5 text-[11px] font-semibold bg-[#1a1a1a] hover:bg-neutral-800 border border-neutral-800 rounded-lg text-neutral-300 flex items-center justify-center gap-1">
// //               <Plus className="w-3 h-3 text-yellow-500" /> Exercise
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* RIGHT COLUMN: CORE EDITING FORM CANVAS */}
// //       <main className="flex-1 bg-[#141414] p-8 overflow-y-auto flex flex-col justify-between">
// //         {currentTopic ? (
// //           <div className="space-y-6 max-w-3xl">

// //             {/* Active Title & Action Bar Context */}
// //             <div className="flex justify-between items-start pb-4 border-b border-neutral-900">
// //               <div>
// //                 <span className="text-yellow-600 text-xs font-bold uppercase tracking-widest">Selected Step Configurator</span>
// //                 <h2 className="text-xl font-bold text-white mt-1">
// //                   {currentTopic.title || <span className="text-neutral-500 italic">Name your concept step...</span>}
// //                 </h2>
// //               </div>
// //               <div className="flex items-center gap-2">
// //                 <button className="px-3 py-1.5 bg-[#1c1c1c] hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-medium rounded-lg flex items-center gap-1.5 transition">
// //                   <Eye className="w-3.5 h-3.5" /> Live Preview
// //                 </button>
// //                 <button className="px-3 py-1.5 bg-yellow-600 hover:bg-yellow-500 text-black text-xs font-bold rounded-lg flex items-center gap-1.5 transition shadow-lg shadow-yellow-600/10">
// //                   <Save className="w-3.5 h-3.5" /> Sync Flow
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Title & Type Selection */}
// //             <div className="grid grid-cols-3 gap-4">
// //               <div className="col-span-2 space-y-1.5">
// //                 <label className="text-[11px] font-bold uppercase text-neutral-500 tracking-wider">Step Title</label>
// //                 <input 
// //                   type="text" 
// //                   value={currentTopic.title}
// //                   onChange={(e) => handleUpdateTopic('title', e.target.value)}
// //                   className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-yellow-600 transition font-medium"
// //                   placeholder="e.g., Working with Vectors"
// //                 />
// //               </div>
// //               <div className="space-y-1.5">
// //                 <label className="text-[11px] font-bold uppercase text-neutral-500 tracking-wider">Navigation Context Rule</label>
// //                 <select 
// //                   value={currentTopic.type}
// //                   onChange={(e) => handleUpdateTopic('type', e.target.value)}
// //                   className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-yellow-600 font-medium transition"
// //                 >
// //                   <option value="topic">Standard Topic</option>
// //                   <option value="quiz">Gated Concept Quiz (Modal Link)</option>
// //                   <option value="exercise">Practical Exercise (Modal Link)</option>
// //                 </select>
// //               </div>
// //             </div>

// //             {/* Content Space textarea */}
// //             <div className="space-y-1.5">
// //               <label className="text-[11px] font-bold uppercase text-neutral-500 tracking-wider">Instructions / Guidelines Text Data</label>
// //               <textarea 
// //                 rows="5"
// //                 value={currentTopic.content}
// //                 onChange={(e) => handleUpdateTopic('content', e.target.value)}
// //                 className="w-full bg-[#1a1a1a]/60 border border-neutral-800 rounded-xl p-4 text-xs text-neutral-300 font-sans leading-relaxed focus:outline-none focus:border-yellow-600 transition resize-none"
// //                 placeholder="Write description content or core rules for this step here..."
// //               />
// //             </div>

// //             {/* ======================================================== */}
// //             {/* CONDITIONAL COMPONENT CANVAS MANAGEMENT SECTION         */}
// //             {/* ======================================================== */}

// //             {currentTopic.type === 'topic' && (
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-900 animate-fadeIn">

// //                 {/* Video Block Configuration */}
// //                 <div className="space-y-2 bg-[#181818] p-4 rounded-xl border border-neutral-800/80 self-start">
// //                   <label className="text-[11px] font-bold uppercase text-neutral-400 tracking-wider flex items-center gap-2">
// //                     <Video className="w-3.5 h-3.5 text-yellow-600" /> Topic Video Link
// //                   </label>
// //                   <input 
// //                     type="url"
// //                     value={currentTopic.videoUrl || ''}
// //                     onChange={(e) => handleUpdateTopic('videoUrl', e.target.value)}
// //                     className="w-full bg-[#111] border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-300 focus:outline-none focus:border-yellow-600"
// //                     placeholder="https://youtube.com/embed/..."
// //                   />
// //                 </div>

// //                 {/* Resource Assets Form Panel */}
// //                 <div className="bg-[#181818] p-4 rounded-xl border border-neutral-800/80 space-y-4">
// //                   <label className="text-[11px] font-bold uppercase text-neutral-400 tracking-wider flex items-center gap-2">
// //                     <FileText className="w-3.5 h-3.5 text-yellow-600" /> Resource Assets Attachment
// //                   </label>
// //                   <form onSubmit={handleAddAsset} className="grid grid-cols-3 gap-2 bg-[#111] p-2.5 rounded-lg border border-neutral-900">
// //                     <select value={newAssetType} onChange={(e) => setNewAssetType(e.target.value)} className="bg-[#1a1a1a] border border-neutral-800 rounded text-[11px] text-white p-1 focus:outline-none">
// //                       <option value="pdf">📄 PDF</option>
// //                       <option value="link">🔗 Link</option>
// //                       <option value="image">🖼️ Image</option>
// //                     </select>
// //                     <input type="text" placeholder="Name" value={newAssetName} onChange={(e) => setNewAssetName(e.target.value)} className="bg-[#1a1a1a] border border-neutral-800 rounded text-[11px] p-1 text-white placeholder-neutral-600 focus:outline-none"/>
// //                     <button type="submit" className="bg-neutral-800 hover:bg-neutral-700 text-yellow-500 font-bold text-[10px] rounded uppercase transition">+ Attach</button>
// //                     <input type="text" placeholder="Target Resource URL" value={newAssetUrl} onChange={(e) => setNewAssetUrl(e.target.value)} className="col-span-3 mt-1 bg-[#1a1a1a] border border-neutral-800 rounded text-[11px] p-1 text-white placeholder-neutral-600 focus:outline-none"/>
// //                   </form>

// //                   <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
// //                     {currentTopic.assets && currentTopic.assets.length > 0 ? (
// //                       currentTopic.assets.map((asset) => (
// //                         <div key={asset.id} className="flex items-center justify-between bg-[#111] border border-neutral-900 rounded-lg p-2 text-xs">
// //                           <div className="flex items-center gap-2 text-neutral-300 truncate">
// //                             {asset.type === 'pdf' && <FileText className="w-3.5 h-3.5 text-red-400 shrink-0" />}
// //                             {asset.type === 'link' && <Link2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
// //                             {asset.type === 'image' && <Image className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
// //                             <span className="truncate font-medium">{asset.name}</span>
// //                           </div>
// //                           <button type="button" onClick={() => handleDeleteAsset(asset.id)} className="text-neutral-600 hover:text-red-400 transition ml-2 shrink-0"><Trash2 className="w-3.5 h-3.5" /></button>
// //                         </div>
// //                       ))
// //                     ) : (
// //                       <div className="text-center py-4 text-[11px] text-neutral-600 italic">No assets mapped yet.</div>
// //                     )}
// //                   </div>
// //                 </div>

// //               </div>
// //             )}

// //             {currentTopic.type === 'quiz' && (
// //               <div className="p-5 rounded-xl border border-neutral-800 bg-[#161616] flex justify-between items-center animate-fadeIn">
// //                 <div>
// //                   <h4 className="text-sm font-bold text-white flex items-center gap-2">
// //                     <HelpCircle className="w-4 h-4 text-amber-500" /> Integrated Concept Quiz Modal
// //                   </h4>
// //                   <p className="text-xs text-neutral-400 mt-1">This node calls the external modal quiz payload layout directly.</p>
// //                 </div>
// //                 <button 
// //                   type="button"
// //                   onClick={() => setIsQuizModalOpen(true)}
// //                   className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
// //                 >
// //                   <Maximize2 className="w-3.5 h-3.5 text-yellow-500" /> Open Quiz Context
// //                 </button>
// //               </div>
// //             )}

// //             {currentTopic.type === 'exercise' && (
// //               <div className="p-5 rounded-xl border border-neutral-800 bg-[#161616] flex justify-between items-center animate-fadeIn">
// //                 <div>
// //                   <h4 className="text-sm font-bold text-white flex items-center gap-2">
// //                     <Award className="w-4 h-4 text-emerald-500" /> Integrated Practical Exercise Modal
// //                   </h4>
// //                   <p className="text-xs text-neutral-400 mt-1">This node calls the external sandbox project module framework layout.</p>
// //                 </div>
// //                 <button 
// //                   type="button"
// //                   onClick={() => setIsExerciseModalOpen(true)}
// //                   className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
// //                 >
// //                   <Maximize2 className="w-3.5 h-3.5 text-yellow-500" /> Open Exercise Context
// //                 </button>
// //               </div>
// //             )}

// //           </div>
// //         ) : (
// //           <div className="flex-1 flex flex-col items-center justify-center text-neutral-600 text-sm italic">
// //             Select an existing step or initialize a new element from the track flow panel to begin customizing content.
// //           </div>
// //         )}

// //         <div className="text-[11px] text-neutral-600 pt-6 border-t border-neutral-900 mt-6 font-mono">
// //           Ready to ingest pipeline object array payloads via Inertia.
// //         </div>
// //       </main>

// //       {/* ======================================================== */}
// //       {/* MODAL PLACEHOLDERS FOR YOUR COMPONENT INTEGRATION        */}
// //       {/* ======================================================== */}

// //       {/* QUIZ MODAL */}
// //       {isQuizModalOpen && (
// //         <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 antialiased">
// //           <div className="bg-[#141414] border border-neutral-800 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl flex flex-col">
// //             <div className="p-4 border-b border-neutral-900 flex justify-between items-center bg-[#181818]">
// //               <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
// //                 <HelpCircle className="w-4 h-4 text-amber-500" /> Quiz Component Container Slot
// //               </span>
// //               <button type="button" onClick={() => setIsQuizModalOpen(false)} className="text-neutral-500 hover:text-white p-1 rounded-lg hover:bg-neutral-900 transition"><X className="w-4 h-4" /></button>
// //             </div>
// //             <div className="p-8 text-center text-xs text-neutral-500 space-y-2">
// //               <p className="text-neutral-300 font-semibold">Your friend's Custom Quiz component drops in here.</p>
// //               <p>Pass down the current item via reactive props: <code className="bg-black/40 text-yellow-500 px-1.5 py-0.5 rounded font-mono">topicId={'{'}{currentTopic?.id}{'}'}</code></p>
// //             </div>
// //             <div className="p-3 bg-[#121212] border-t border-neutral-900 flex justify-end">
// //               <button type="button" onClick={() => setIsQuizModalOpen(false)} className="px-4 py-1.5 bg-neutral-850 text-xs font-bold text-white rounded-lg hover:bg-neutral-800 border border-neutral-800 transition">Close Wrapper</button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* EXERCISE MODAL */}
// //       {isExerciseModalOpen && (
// //         <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 antialiased">
// //           <div className="bg-[#141414] border border-neutral-800 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl flex flex-col">
// //             <div className="p-4 border-b border-neutral-900 flex justify-between items-center bg-[#181818]">
// //               <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
// //                 <Award className="w-4 h-4 text-emerald-500" /> Exercise Component Container Slot
// //               </span>
// //               <button type="button" onClick={() => setIsExerciseModalOpen(false)} className="text-neutral-500 hover:text-white p-1 rounded-lg hover:bg-neutral-900 transition"><X className="w-4 h-4" /></button>
// //             </div>
// //             <div className="p-8 text-center text-xs text-neutral-500 space-y-2">
// //               <p className="text-neutral-300 font-semibold">Your friend's Custom Exercise component drops in here.</p>
// //               <p>Pass down the current item via reactive props: <code className="bg-black/40 text-yellow-500 px-1.5 py-0.5 rounded font-mono">topicId={'{'}{currentTopic?.id}{'}'}</code></p>
// //             </div>
// //             <div className="p-3 bg-[#121212] border-t border-neutral-900 flex justify-end">
// //               <button type="button" onClick={() => setIsExerciseModalOpen(false)} className="px-4 py-1.5 bg-neutral-850 text-xs font-bold text-white rounded-lg hover:bg-neutral-800 border border-neutral-800 transition">Close Wrapper</button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //     </div>
// //   );
// // }






























// import React, { useState } from 'react';
// import {
//     Plus,
//     Trash2,
//     GripVertical,
//     BookOpen,
//     HelpCircle,
//     Award,
//     Save,
//     Eye,
//     Video,
//     FileText,
//     Link2,
//     Image,
//     X,
//     Pencil,
//     CheckCircle2,
//     ChevronRight,
//     Paperclip,
// } from 'lucide-react';

// // ─── Modal wrapper ────────────────────────────────────────────────────────────
// function Modal({ open, onClose, children }) {
//     if (!open) return null;
//     return (
//         <div
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//             style={{ backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}
//             onClick={onClose}
//         >
//             <div
//                 className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col"
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 {children}
//             </div>
//         </div>
//     );
// }

// // ─── Step type pill ───────────────────────────────────────────────────────────
// function TypePill({ type }) {
//     const map = {
//         topic: { label: 'Topic', bg: 'bg-[#F2F1EE]', text: 'text-[#6B6B6B]', border: 'border-[#E4E4E4]' },
//         quiz: { label: 'Quiz', bg: 'bg-[#FFF8E6]', text: 'text-[#A07010]', border: 'border-[#F5C518]' },
//         exercise: { label: 'Exercise', bg: 'bg-[#EDFBF4]', text: 'text-[#1A7040]', border: 'border-[#5DCAA5]' },
//     };
//     const { label, bg, text, border } = map[type];
//     return (
//         <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border ${bg} ${text} ${border}`}>
//             {label}
//         </span>
//     );
// }

// // ─── Main component ───────────────────────────────────────────────────────────
// export default function ConceptBuilderWorkspace() {
//     const [topics, setTopics] = useState([]);
//     const [activeId, setActiveId] = useState(null);
//     const [quizModal, setQuizModal] = useState(false);
//     const [exerciseModal, setExerciseModal] = useState(false);

//     // asset form temp state
//     const [newAssetName, setNewAssetName] = useState('');
//     const [newAssetType, setNewAssetType] = useState('pdf');
//     const [newAssetUrl, setNewAssetUrl] = useState('');

//     const currentTopic = topics.find(t => t.id === activeId) || null;

//     // ── helpers ──
//     const updateTopic = (field, value) =>
//         setTopics(prev => prev.map(t => t.id === activeId ? { ...t, [field]: value } : t));

//     const addTopic = (type) => {
//         const newId = topics.length > 0 ? Math.max(...topics.map(t => t.id)) + 1 : 1;
//         setTopics(prev => [...prev, { id: newId, type, title: '', order: prev.length + 1, content: '', videoUrl: '', assets: [] }]);
//         setActiveId(newId);
//     };

//     const deleteTopic = (id, e) => {
//         e.stopPropagation();
//         const filtered = topics.filter(t => t.id !== id);
//         const reOrdered = filtered.map((t, i) => ({ ...t, order: i + 1 }));
//         setTopics(reOrdered);
//         if (activeId === id) setActiveId(reOrdered[0]?.id ?? null);
//     };

//     const addAsset = (e) => {
//         e.preventDefault();
//         if (!newAssetName || !newAssetUrl) return;
//         updateTopic('assets', [...(currentTopic.assets || []), { id: Date.now(), type: newAssetType, name: newAssetName, url: newAssetUrl }]);
//         setNewAssetName(''); setNewAssetUrl('');
//     };

//     const deleteAsset = (assetId) =>
//         updateTopic('assets', currentTopic.assets.filter(a => a.id !== assetId));

//     // ── icon helpers ──
//     const typeIcon = (type, size = 'w-4 h-4') => ({
//         topic: <BookOpen className={`${size} text-[#6B6B6B]`} />,
//         quiz: <HelpCircle className={`${size} text-[#D4A900]`} />,
//         exercise: <Award className={`${size} text-[#1D9E75]`} />,
//     }[type]);

//     const assetIcon = (type) => ({
//         pdf: <FileText className="w-3.5 h-3.5 text-red-400 shrink-0" />,
//         link: <Link2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />,
//         image: <Image className="w-3.5 h-3.5 text-emerald-500 shrink-0" />,
//     }[type]);

//     const typeIconBg = (type) => ({
//         topic: 'bg-[#F2F1EE]',
//         quiz: 'bg-[#FFF8E6]',
//         exercise: 'bg-[#EDFBF4]',
//     }[type]);

//     // ─────────────────────────────────────────────────────────────────────────────
//     return (
//         <div className="w-full h-full flex bg-[#F2F1EE] text-[#1A1A1A] font-sans overflow-hidden antialiased">

//             {/* ── SIDEBAR ── */}
//             <aside className="w-[260px] bg-white border-r border-[#E4E4E4] flex flex-col shrink-0">

//                 {/* sidebar header */}
//                 <div className="px-4 pt-5 pb-3">
//                     <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9A9A9A]">Concept Flow</p>
//                     <p className="text-sm font-semibold text-[#1A1A1A] mt-0.5">Step Builder</p>
//                 </div>

//                 {/* step list */}
//                 <div className="flex-1 overflow-y-auto px-2 pb-2">
//                     {topics.length === 0 ? (
//                         <div className="mx-2 mt-4 rounded-xl border border-dashed border-[#E4E4E4] p-5 text-center">
//                             <p className="text-xs text-[#9A9A9A]">No steps yet.</p>
//                             <p className="text-[11px] text-[#C8C8C8] mt-1">Use the buttons below to add your first step.</p>
//                         </div>
//                     ) : (
//                         topics.map((item, idx) => {
//                             const isActive = activeId === item.id;
//                             return (
//                                 <div
//                                     key={item.id}
//                                     onClick={() => setActiveId(item.id)}
//                                     className={`group flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl border mb-1 cursor-pointer transition-all ${isActive
//                                             ? 'bg-[#FDF6D8] border-[#F5C518] shadow-sm'
//                                             : 'border-transparent hover:bg-[#F8F8F7] hover:border-[#E4E4E4]'
//                                         }`}
//                                 >
//                                     <GripVertical className="w-3.5 h-3.5 text-[#C8C8C8] shrink-0 cursor-grab" />

//                                     <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${typeIconBg(item.type)} ${isActive ? 'ring-1 ring-[#F5C518]/60' : ''}`}>
//                                         {typeIcon(item.type, 'w-3.5 h-3.5')}
//                                     </div>

//                                     <div className="flex-1 min-w-0">
//                                         <p className="text-[9px] font-semibold uppercase tracking-widest text-[#C8C8C8]">Step {String(idx + 1).padStart(2, '0')}</p>
//                                         <p className={`text-xs font-medium truncate leading-tight mt-0.5 ${item.title ? 'text-[#1A1A1A]' : 'text-[#C8C8C8] italic'}`}>
//                                             {item.title || 'Untitled step'}
//                                         </p>
//                                     </div>

//                                     <div className="flex items-center gap-1 shrink-0">
//                                         {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#D4A900]" />}
//                                         <button
//                                             onClick={(e) => deleteTopic(item.id, e)}
//                                             className="p-1 rounded-md text-[#C8C8C8] hover:text-red-400 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
//                                         >
//                                             <Trash2 className="w-3 h-3" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             );
//                         })
//                     )}
//                 </div>

//                 {/* add step footer */}
//                 <div className="p-3 border-t border-[#E4E4E4] space-y-2">
//                     <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9A9A9A] px-1">Add step</p>
//                     <div className="grid grid-cols-3 gap-1.5">
//                         {[
//                             { type: 'topic', label: 'Topic' },
//                             { type: 'quiz', label: 'Quiz' },
//                             { type: 'exercise', label: 'Task' },
//                         ].map(({ type, label }) => (
//                             <button
//                                 key={type}
//                                 onClick={() => addTopic(type)}
//                                 className="py-2 text-[11px] font-semibold bg-[#F8F8F7] hover:bg-[#FDF6D8] border border-[#E4E4E4] hover:border-[#F5C518] rounded-xl text-[#6B6B6B] hover:text-[#0F0F0F] flex items-center justify-center gap-1 transition-all"
//                             >
//                                 <Plus className="w-3 h-3 text-[#D4A900]" />
//                                 {label}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </aside>

//             {/* ── MAIN CANVAS ── */}
//             <main className="flex-1 flex flex-col overflow-hidden">

//                 {/* top bar */}
//                 <header className="bg-white border-b border-[#E4E4E4] px-6 py-3.5 flex items-center justify-between shrink-0">
//                     <div className="flex items-center gap-3">
//                         {currentTopic ? (
//                             <>
//                                 <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${typeIconBg(currentTopic.type)}`}>
//                                     {typeIcon(currentTopic.type)}
//                                 </div>
//                                 <div>
//                                     <div className="flex items-center gap-2">
//                                         <h2 className={`text-sm font-semibold ${currentTopic.title ? 'text-[#1A1A1A]' : 'text-[#9A9A9A] italic'}`}>
//                                             {currentTopic.title || 'Untitled step'}
//                                         </h2>
//                                         <TypePill type={currentTopic.type} />
//                                     </div>
//                                     <p className="text-[11px] text-[#9A9A9A]">Step {currentTopic.order} of {topics.length}</p>
//                                 </div>
//                             </>
//                         ) : (
//                             <h2 className="text-sm text-[#9A9A9A]">No step selected</h2>
//                         )}
//                     </div>

//                     {currentTopic && (
//                         <div className="flex items-center gap-2">
//                             <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#6B6B6B] bg-[#F8F8F7] hover:bg-[#F2F1EE] border border-[#E4E4E4] transition-all">
//                                 <Eye className="w-3.5 h-3.5" /> Preview
//                             </button>
//                             <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#F5C518] hover:bg-[#D4A900] text-[#0F0F0F] border border-[#D4A900] transition-all shadow-sm shadow-yellow-200">
//                                 <Save className="w-3.5 h-3.5" /> Save step
//                             </button>
//                         </div>
//                     )}
//                 </header>

//                 {/* scrollable body */}
//                 <div className="flex-1 overflow-y-auto p-6">
//                     {!currentTopic ? (
//                         /* empty state */
//                         <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
//                             <div className="w-16 h-16 rounded-2xl bg-white border border-[#E4E4E4] flex items-center justify-center shadow-sm">
//                                 <Pencil className="w-7 h-7 text-[#C8C8C8]" />
//                             </div>
//                             <div>
//                                 <p className="text-sm font-semibold text-[#1A1A1A]">Nothing selected</p>
//                                 <p className="text-xs text-[#9A9A9A] mt-1">Pick a step from the sidebar or create a new one to start editing.</p>
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="max-w-2xl mx-auto space-y-5">

//                             {/* ── Title + Type row ── */}
//                             <div className="bg-white border border-[#E4E4E4] rounded-2xl p-5 space-y-4">
//                                 <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9A9A9A]">General</p>

//                                 <div className="grid grid-cols-5 gap-3">
//                                     <div className="col-span-3 space-y-1.5">
//                                         <label className="text-xs font-medium text-[#6B6B6B]">Step title</label>
//                                         <input
//                                             type="text"
//                                             value={currentTopic.title}
//                                             onChange={(e) => updateTopic('title', e.target.value)}
//                                             className="w-full bg-[#F8F8F7] border border-[#E4E4E4] focus:border-[#F5C518] focus:bg-white rounded-xl px-3 py-2 text-sm text-[#1A1A1A] placeholder-[#C8C8C8] outline-none transition"
//                                             placeholder="e.g. Working with Vectors"
//                                         />
//                                     </div>
//                                     <div className="col-span-2 space-y-1.5">
//                                         <label className="text-xs font-medium text-[#6B6B6B]">Type</label>
//                                         <select
//                                             value={currentTopic.type}
//                                             onChange={(e) => updateTopic('type', e.target.value)}
//                                             className="w-full bg-[#F8F8F7] border border-[#E4E4E4] focus:border-[#F5C518] focus:bg-white rounded-xl px-3 py-2 text-sm text-[#1A1A1A] outline-none transition"
//                                         >
//                                             <option value="topic">Standard topic</option>
//                                             <option value="quiz">Quiz (gated)</option>
//                                             <option value="exercise">Exercise</option>
//                                         </select>
//                                     </div>
//                                 </div>

//                                 <div className="space-y-1.5">
//                                     <label className="text-xs font-medium text-[#6B6B6B]">Instructions / guidelines</label>
//                                     <textarea
//                                         rows={4}
//                                         value={currentTopic.content}
//                                         onChange={(e) => updateTopic('content', e.target.value)}
//                                         className="w-full bg-[#F8F8F7] border border-[#E4E4E4] focus:border-[#F5C518] focus:bg-white rounded-xl px-3 py-2.5 text-sm text-[#1A1A1A] placeholder-[#C8C8C8] outline-none transition resize-none leading-relaxed"
//                                         placeholder="Write instructions or context for this step..."
//                                     />
//                                 </div>
//                             </div>

//                             {/* ── TOPIC: video + assets ── */}
//                             {currentTopic.type === 'topic' && (
//                                 <>
//                                     {/* Video card */}
//                                     <div className="bg-white border border-[#E4E4E4] rounded-2xl p-5 space-y-3">
//                                         <div className="flex items-center gap-2">
//                                             <div className="w-6 h-6 rounded-lg bg-[#FFF8E6] flex items-center justify-center">
//                                                 <Video className="w-3.5 h-3.5 text-[#D4A900]" />
//                                             </div>
//                                             <p className="text-xs font-semibold text-[#1A1A1A]">Video</p>
//                                         </div>
//                                         <input
//                                             type="url"
//                                             value={currentTopic.videoUrl || ''}
//                                             onChange={(e) => updateTopic('videoUrl', e.target.value)}
//                                             className="w-full bg-[#F8F8F7] border border-[#E4E4E4] focus:border-[#F5C518] focus:bg-white rounded-xl px-3 py-2 text-sm text-[#1A1A1A] placeholder-[#C8C8C8] outline-none transition"
//                                             placeholder="https://youtube.com/embed/..."
//                                         />
//                                         {currentTopic.videoUrl && (
//                                             <div className="flex items-center gap-1.5 text-[11px] text-emerald-600">
//                                                 <CheckCircle2 className="w-3.5 h-3.5" /> Video URL attached
//                                             </div>
//                                         )}
//                                     </div>

//                                     {/* Assets card */}
//                                     <div className="bg-white border border-[#E4E4E4] rounded-2xl p-5 space-y-4">
//                                         <div className="flex items-center gap-2">
//                                             <div className="w-6 h-6 rounded-lg bg-[#FFF8E6] flex items-center justify-center">
//                                                 <Paperclip className="w-3.5 h-3.5 text-[#D4A900]" />
//                                             </div>
//                                             <p className="text-xs font-semibold text-[#1A1A1A]">Resources</p>
//                                             {currentTopic.assets?.length > 0 && (
//                                                 <span className="ml-auto text-[10px] font-semibold text-[#9A9A9A] bg-[#F2F1EE] px-2 py-0.5 rounded-full">
//                                                     {currentTopic.assets.length} file{currentTopic.assets.length !== 1 ? 's' : ''}
//                                                 </span>
//                                             )}
//                                         </div>

//                                         {/* add asset form */}
//                                         <form onSubmit={addAsset} className="bg-[#F8F8F7] border border-[#E4E4E4] rounded-xl p-3 space-y-2">
//                                             <div className="flex gap-2">
//                                                 <select
//                                                     value={newAssetType}
//                                                     onChange={(e) => setNewAssetType(e.target.value)}
//                                                     className="bg-white border border-[#E4E4E4] rounded-lg text-xs text-[#1A1A1A] px-2 py-1.5 outline-none shrink-0"
//                                                 >
//                                                     <option value="pdf">📄 PDF</option>
//                                                     <option value="link">🔗 Link</option>
//                                                     <option value="image">🖼️ Image</option>
//                                                 </select>
//                                                 <input
//                                                     type="text"
//                                                     placeholder="File name"
//                                                     value={newAssetName}
//                                                     onChange={(e) => setNewAssetName(e.target.value)}
//                                                     className="flex-1 bg-white border border-[#E4E4E4] rounded-lg text-xs px-2.5 py-1.5 text-[#1A1A1A] placeholder-[#C8C8C8] outline-none focus:border-[#F5C518] transition"
//                                                 />
//                                                 <button
//                                                     type="submit"
//                                                     className="px-3 py-1.5 bg-[#F5C518] hover:bg-[#D4A900] text-[#0F0F0F] text-xs font-semibold rounded-lg transition shrink-0"
//                                                 >
//                                                     + Add
//                                                 </button>
//                                             </div>
//                                             <input
//                                                 type="url"
//                                                 placeholder="https://..."
//                                                 value={newAssetUrl}
//                                                 onChange={(e) => setNewAssetUrl(e.target.value)}
//                                                 className="w-full bg-white border border-[#E4E4E4] rounded-lg text-xs px-2.5 py-1.5 text-[#1A1A1A] placeholder-[#C8C8C8] outline-none focus:border-[#F5C518] transition"
//                                             />
//                                         </form>

//                                         {/* asset list */}
//                                         {currentTopic.assets?.length > 0 ? (
//                                             <div className="space-y-1.5">
//                                                 {currentTopic.assets.map((asset) => (
//                                                     <div key={asset.id} className="flex items-center justify-between bg-[#F8F8F7] border border-[#E4E4E4] rounded-xl px-3 py-2">
//                                                         <div className="flex items-center gap-2 text-xs text-[#1A1A1A] truncate">
//                                                             {assetIcon(asset.type)}
//                                                             <span className="font-medium truncate">{asset.name}</span>
//                                                         </div>
//                                                         <button onClick={() => deleteAsset(asset.id)} className="ml-2 p-1 rounded-lg text-[#C8C8C8] hover:text-red-400 hover:bg-red-50 transition shrink-0">
//                                                             <Trash2 className="w-3.5 h-3.5" />
//                                                         </button>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         ) : (
//                                             <p className="text-center text-xs text-[#C8C8C8] italic py-2">No resources attached yet.</p>
//                                         )}
//                                     </div>
//                                 </>
//                             )}

//                             {/* ── QUIZ slot ── */}
//                             {currentTopic.type === 'quiz' && (
//                                 <div className="bg-white border border-[#E4E4E4] rounded-2xl p-5">
//                                     <div className="flex items-start justify-between gap-4">
//                                         <div className="flex items-start gap-3">
//                                             <div className="w-10 h-10 rounded-xl bg-[#FFF8E6] flex items-center justify-center shrink-0">
//                                                 <HelpCircle className="w-5 h-5 text-[#D4A900]" />
//                                             </div>
//                                             <div>
//                                                 <p className="text-sm font-semibold text-[#1A1A1A]">Quiz</p>
//                                                 <p className="text-xs text-[#9A9A9A] mt-0.5 leading-relaxed">
//                                                     Opens your quiz component in a modal. Pass{' '}
//                                                     <code className="bg-[#F8F8F7] border border-[#E4E4E4] px-1.5 py-0.5 rounded text-[10px] font-mono text-[#D4A900]">
//                                                         topicId={currentTopic.id}
//                                                     </code>{' '}
//                                                     to your component.
//                                                 </p>
//                                             </div>
//                                         </div>
//                                         <button
//                                             onClick={() => setQuizModal(true)}
//                                             className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-[#FFF8E6] hover:bg-[#F5C518] border border-[#F5C518] text-[#A07010] hover:text-[#0F0F0F] text-xs font-semibold rounded-xl transition-all"
//                                         >
//                                             <HelpCircle className="w-3.5 h-3.5" /> Open Quiz
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* ── EXERCISE slot ── */}
//                             {currentTopic.type === 'exercise' && (
//                                 <div className="bg-white border border-[#E4E4E4] rounded-2xl p-5">
//                                     <div className="flex items-start justify-between gap-4">
//                                         <div className="flex items-start gap-3">
//                                             <div className="w-10 h-10 rounded-xl bg-[#EDFBF4] flex items-center justify-center shrink-0">
//                                                 <Award className="w-5 h-5 text-[#1D9E75]" />
//                                             </div>
//                                             <div>
//                                                 <p className="text-sm font-semibold text-[#1A1A1A]">Exercise</p>
//                                                 <p className="text-xs text-[#9A9A9A] mt-0.5 leading-relaxed">
//                                                     Opens your exercise component in a modal. Pass{' '}
//                                                     <code className="bg-[#F8F8F7] border border-[#E4E4E4] px-1.5 py-0.5 rounded text-[10px] font-mono text-[#1D9E75]">
//                                                         topicId={currentTopic.id}
//                                                     </code>{' '}
//                                                     to your component.
//                                                 </p>
//                                             </div>
//                                         </div>
//                                         <button
//                                             onClick={() => setExerciseModal(true)}
//                                             className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-[#EDFBF4] hover:bg-[#5DCAA5] border border-[#5DCAA5] text-[#1A7040] hover:text-white text-xs font-semibold rounded-xl transition-all"
//                                         >
//                                             <Award className="w-3.5 h-3.5" /> Open Exercise
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}

//                         </div>
//                     )}
//                 </div>

//                 {/* footer */}
//                 <footer className="bg-white border-t border-[#E4E4E4] px-6 py-2 shrink-0">
//                     <p className="text-[10px] text-[#C8C8C8] font-mono">Ready to sync with Inertia props.</p>
//                 </footer>
//             </main>

//             {/* ── QUIZ MODAL ── */}
//             <Modal open={quizModal} onClose={() => setQuizModal(false)}>
//                 <div className="flex items-center justify-between px-5 py-4 border-b border-[#E4E4E4]">
//                     <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 rounded-xl bg-[#FFF8E6] flex items-center justify-center">
//                             <HelpCircle className="w-4 h-4 text-[#D4A900]" />
//                         </div>
//                         <div>
//                             <p className="text-sm font-semibold text-[#1A1A1A]">Quiz</p>
//                             <p className="text-[11px] text-[#9A9A9A]">
//                                 Step {currentTopic?.order} — {currentTopic?.title || 'Untitled'}
//                             </p>
//                         </div>
//                     </div>
//                     <button
//                         onClick={() => setQuizModal(false)}
//                         className="p-2 rounded-xl text-[#9A9A9A] hover:text-[#1A1A1A] hover:bg-[#F2F1EE] transition"
//                     >
//                         <X className="w-4 h-4" />
//                     </button>
//                 </div>

//                 {/* ↓↓↓ DROP YOUR QUIZ COMPONENT HERE ↓↓↓ */}
//                 <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center gap-3 min-h-[300px] bg-[#F8F8F7]">
//                     <div className="w-12 h-12 rounded-2xl bg-[#FFF8E6] border border-[#F5C518]/40 flex items-center justify-center">
//                         <HelpCircle className="w-6 h-6 text-[#D4A900]" />
//                     </div>
//                     <p className="text-sm font-semibold text-[#1A1A1A]">Quiz component slot</p>
//                     <p className="text-xs text-[#9A9A9A] text-center max-w-xs">
//                         Replace this block with your teammate's quiz component and pass{' '}
//                         <code className="bg-white border border-[#E4E4E4] px-1.5 rounded font-mono text-[#D4A900]">
//                             topicId={currentTopic?.id}
//                         </code>
//                     </p>
//                     {/* Example: <QuizComponent topicId={currentTopic?.id} /> */}
//                 </div>
//                 {/* ↑↑↑ END QUIZ COMPONENT SLOT ↑↑↑ */}

//                 <div className="px-5 py-3 border-t border-[#E4E4E4] flex justify-end">
//                     <button
//                         onClick={() => setQuizModal(false)}
//                         className="px-4 py-1.5 text-xs font-semibold bg-[#F2F1EE] hover:bg-[#E4E4E4] text-[#1A1A1A] rounded-lg border border-[#E4E4E4] transition"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </Modal>

//             {/* ── EXERCISE MODAL ── */}
//             <Modal open={exerciseModal} onClose={() => setExerciseModal(false)}>
//                 <div className="flex items-center justify-between px-5 py-4 border-b border-[#E4E4E4]">
//                     <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 rounded-xl bg-[#EDFBF4] flex items-center justify-center">
//                             <Award className="w-4 h-4 text-[#1D9E75]" />
//                         </div>
//                         <div>
//                             <p className="text-sm font-semibold text-[#1A1A1A]">Exercise</p>
//                             <p className="text-[11px] text-[#9A9A9A]">
//                                 Step {currentTopic?.order} — {currentTopic?.title || 'Untitled'}
//                             </p>
//                         </div>
//                     </div>
//                     <button
//                         onClick={() => setExerciseModal(false)}
//                         className="p-2 rounded-xl text-[#9A9A9A] hover:text-[#1A1A1A] hover:bg-[#F2F1EE] transition"
//                     >
//                         <X className="w-4 h-4" />
//                     </button>
//                 </div>

//                 {/* ↓↓↓ DROP YOUR EXERCISE COMPONENT HERE ↓↓↓ */}
//                 <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center gap-3 min-h-[300px] bg-[#F8F8F7]">
//                     <div className="w-12 h-12 rounded-2xl bg-[#EDFBF4] border border-[#5DCAA5]/40 flex items-center justify-center">
//                         <Award className="w-6 h-6 text-[#1D9E75]" />
//                     </div>
//                     <p className="text-sm font-semibold text-[#1A1A1A]">Exercise component slot</p>
//                     <p className="text-xs text-[#9A9A9A] text-center max-w-xs">
//                         Replace this block with your teammate's exercise component and pass{' '}
//                         <code className="bg-white border border-[#E4E4E4] px-1.5 rounded font-mono text-[#1D9E75]">
//                             topicId={currentTopic?.id}
//                         </code>
//                     </p>
//                     {/* Example: <ExerciseComponent topicId={currentTopic?.id} /> */}
//                 </div>
//                 {/* ↑↑↑ END EXERCISE COMPONENT SLOT ↑↑↑ */}

//                 <div className="px-5 py-3 border-t border-[#E4E4E4] flex justify-end">
//                     <button
//                         onClick={() => setExerciseModal(false)}
//                         className="px-4 py-1.5 text-xs font-semibold bg-[#F2F1EE] hover:bg-[#E4E4E4] text-[#1A1A1A] rounded-lg border border-[#E4E4E4] transition"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </Modal>

//         </div>
//     );
// }











































import React, { useState } from 'react';
import {
    Plus,
    Trash2,
    GripVertical,
    BookOpen,
    HelpCircle,
    Award,
    Save,
    Eye,
    Video,
    FileText,
    Link2,
    Image,
    X,
    Pencil,
    CheckCircle2,
    ChevronRight,
    Paperclip,
} from 'lucide-react';

// ─── YouTube URL → embed URL ──────────────────────────────────────────────────
function getYouTubeEmbedUrl(input) {
    if (!input) return null;
    try {
        const url = new URL(input);
        if (url.hostname.includes('youtube.com') && url.searchParams.get('v')) {
            return `https://www.youtube.com/embed/${url.searchParams.get('v')}`;
        }
        if (url.hostname === 'youtu.be') {
            return `https://www.youtube.com/embed${url.pathname}`;
        }
        if (url.pathname.startsWith('/embed/')) return input;
    } catch {
        return null;
    }
    return null;
}

// ─── Modal wrapper ────────────────────────────────────────────────────────────
function Modal({ open, onClose, children }) {
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}

// ─── Step type pill ───────────────────────────────────────────────────────────
function TypePill({ type }) {
    const map = {
        topic: { label: 'Topic', bg: 'bg-[#F2F1EE]', text: 'text-[#6B6B6B]', border: 'border-[#E4E4E4]' },
        quiz: { label: 'Quiz', bg: 'bg-[#FFF8E6]', text: 'text-[#A07010]', border: 'border-[#F5C518]' },
        exercise: { label: 'Exercise', bg: 'bg-[#EDFBF4]', text: 'text-[#1A7040]', border: 'border-[#5DCAA5]' },
    };
    const { label, bg, text, border } = map[type];
    return (
        <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border ${bg} ${text} ${border}`}>
            {label}
        </span>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ConceptBuilderWorkspace() {
    const [topics, setTopics] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const [quizModal, setQuizModal] = useState(false);
    const [exerciseModal, setExerciseModal] = useState(false);

    // asset form temp state
    const [newAssetName, setNewAssetName] = useState('');
    const [newAssetType, setNewAssetType] = useState('pdf');
    const [newAssetUrl, setNewAssetUrl] = useState('');

    const currentTopic = topics.find(t => t.id === activeId) || null;

    // ── helpers ──
    const updateTopic = (field, value) =>
        setTopics(prev => prev.map(t => t.id === activeId ? { ...t, [field]: value } : t));

    const addTopic = (type) => {
        const newId = topics.length > 0 ? Math.max(...topics.map(t => t.id)) + 1 : 1;
        setTopics(prev => [...prev, { id: newId, type, title: '', order: prev.length + 1, content: '', videoUrl: '', assets: [] }]);
        setActiveId(newId);
    };

    const deleteTopic = (id, e) => {
        e.stopPropagation();
        const filtered = topics.filter(t => t.id !== id);
        const reOrdered = filtered.map((t, i) => ({ ...t, order: i + 1 }));
        setTopics(reOrdered);
        if (activeId === id) setActiveId(reOrdered[0]?.id ?? null);
    };

    const addAsset = (e) => {
        e.preventDefault();
        if (!newAssetName || !newAssetUrl) return;
        updateTopic('assets', [...(currentTopic.assets || []), { id: Date.now(), type: newAssetType, name: newAssetName, url: newAssetUrl }]);
        setNewAssetName(''); setNewAssetUrl('');
    };

    const deleteAsset = (assetId) =>
        updateTopic('assets', currentTopic.assets.filter(a => a.id !== assetId));

    // ── icon helpers ──
    const typeIcon = (type, size = 'w-4 h-4') => ({
        topic: <BookOpen className={`${size} text-[#6B6B6B]`} />,
        quiz: <HelpCircle className={`${size} text-[#D4A900]`} />,
        exercise: <Award className={`${size} text-[#1D9E75]`} />,
    }[type]);

    const assetIcon = (type) => ({
        pdf: <FileText className="w-3.5 h-3.5 text-red-400 shrink-0" />,
        link: <Link2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />,
        image: <Image className="w-3.5 h-3.5 text-emerald-500 shrink-0" />,
    }[type]);

    const typeIconBg = (type) => ({
        topic: 'bg-[#F2F1EE]',
        quiz: 'bg-[#FFF8E6]',
        exercise: 'bg-[#EDFBF4]',
    }[type]);

    // ─────────────────────────────────────────────────────────────────────────────
    return (
        <div className="w-full h-full flex bg-[#F2F1EE] text-[#1A1A1A] font-sans overflow-hidden antialiased">

            {/* ── SIDEBAR ── */}
            <aside className="w-[260px] bg-white border-r border-[#E4E4E4] flex flex-col shrink-0">

                {/* sidebar header */}
                <div className="px-4 pt-5 pb-3">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9A9A9A]">Concept Flow</p>
                    <p className="text-sm font-semibold text-[#1A1A1A] mt-0.5">Step Builder</p>
                </div>

                {/* step list */}
                <div className="flex-1 overflow-y-auto px-2 pb-2">
                    {topics.length === 0 ? (
                        <div className="mx-2 mt-4 rounded-xl border border-dashed border-[#E4E4E4] p-5 text-center">
                            <p className="text-xs text-[#9A9A9A]">No steps yet.</p>
                            <p className="text-[11px] text-[#C8C8C8] mt-1">Use the buttons below to add your first step.</p>
                        </div>
                    ) : (
                        topics.map((item, idx) => {
                            const isActive = activeId === item.id;
                            return (
                                <div
                                    key={item.id}
                                    onClick={() => setActiveId(item.id)}
                                    className={`group flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl border mb-1 cursor-pointer transition-all ${isActive
                                            ? 'bg-[#FDF6D8] border-[#F5C518] shadow-sm'
                                            : 'border-transparent hover:bg-[#F8F8F7] hover:border-[#E4E4E4]'
                                        }`}
                                >
                                    <GripVertical className="w-3.5 h-3.5 text-[#C8C8C8] shrink-0 cursor-grab" />

                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${typeIconBg(item.type)} ${isActive ? 'ring-1 ring-[#F5C518]/60' : ''}`}>
                                        {typeIcon(item.type, 'w-3.5 h-3.5')}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="text-[9px] font-semibold uppercase tracking-widest text-[#C8C8C8]">Step {String(idx + 1).padStart(2, '0')}</p>
                                        <p className={`text-xs font-medium truncate leading-tight mt-0.5 ${item.title ? 'text-[#1A1A1A]' : 'text-[#C8C8C8] italic'}`}>
                                            {item.title || 'Untitled step'}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1 shrink-0">
                                        {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#D4A900]" />}
                                        <button
                                            onClick={(e) => deleteTopic(item.id, e)}
                                            className="p-1 rounded-md text-[#C8C8C8] hover:text-red-400 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* add step footer */}
                <div className="p-3 border-t border-[#E4E4E4] space-y-2">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9A9A9A] px-1">Add step</p>
                    <div className="grid grid-cols-3 gap-1.5">
                        {[
                            { type: 'topic', label: 'Topic' },
                            { type: 'quiz', label: 'Quiz' },
                            { type: 'exercise', label: 'Task' },
                        ].map(({ type, label }) => (
                            <button
                                key={type}
                                onClick={() => addTopic(type)}
                                className="py-2 text-[11px] font-semibold bg-[#F8F8F7] hover:bg-[#FDF6D8] border border-[#E4E4E4] hover:border-[#F5C518] rounded-xl text-[#6B6B6B] hover:text-[#0F0F0F] flex items-center justify-center gap-1 transition-all"
                            >
                                <Plus className="w-3 h-3 text-[#D4A900]" />
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            {/* ── MAIN CANVAS ── */}
            <main className="flex-1 flex flex-col overflow-hidden">

                {/* top bar */}
                <header className="bg-white border-b border-[#E4E4E4] px-6 py-3.5 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        {currentTopic ? (
                            <>
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${typeIconBg(currentTopic.type)}`}>
                                    {typeIcon(currentTopic.type)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className={`text-sm font-semibold ${currentTopic.title ? 'text-[#1A1A1A]' : 'text-[#9A9A9A] italic'}`}>
                                            {currentTopic.title || 'Untitled step'}
                                        </h2>
                                        <TypePill type={currentTopic.type} />
                                    </div>
                                    <p className="text-[11px] text-[#9A9A9A]">Step {currentTopic.order} of {topics.length}</p>
                                </div>
                            </>
                        ) : (
                            <h2 className="text-sm text-[#9A9A9A]">No step selected</h2>
                        )}
                    </div>

                    {currentTopic && (
                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#6B6B6B] bg-[#F8F8F7] hover:bg-[#F2F1EE] border border-[#E4E4E4] transition-all">
                                <Eye className="w-3.5 h-3.5" /> Preview
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#F5C518] hover:bg-[#D4A900] text-[#0F0F0F] border border-[#D4A900] transition-all shadow-sm shadow-yellow-200">
                                <Save className="w-3.5 h-3.5" /> Save step
                            </button>
                        </div>
                    )}
                </header>

                {/* scrollable body */}
                <div className="flex-1 overflow-y-auto p-6">
                    {!currentTopic ? (
                        /* empty state */
                        <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-white border border-[#E4E4E4] flex items-center justify-center shadow-sm">
                                <Pencil className="w-7 h-7 text-[#C8C8C8]" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-[#1A1A1A]">Nothing selected</p>
                                <p className="text-xs text-[#9A9A9A] mt-1">Pick a step from the sidebar or create a new one to start editing.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-2xl mx-auto space-y-5">

                            {/* ── Title + Type row ── */}
                            <div className="bg-white border border-[#E4E4E4] rounded-2xl p-5 space-y-4">
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9A9A9A]">General</p>

                                <div className="grid grid-cols-5 gap-3">
                                    <div className="col-span-3 space-y-1.5">
                                        <label className="text-xs font-medium text-[#6B6B6B]">Step title</label>
                                        <input
                                            type="text"
                                            value={currentTopic.title}
                                            onChange={(e) => updateTopic('title', e.target.value)}
                                            className="w-full bg-[#F8F8F7] border border-[#E4E4E4] focus:border-[#F5C518] focus:bg-white rounded-xl px-3 py-2 text-sm text-[#1A1A1A] placeholder-[#C8C8C8] outline-none transition"
                                            placeholder="e.g. Working with Vectors"
                                        />
                                    </div>
                                    <div className="col-span-2 space-y-1.5">
                                        <label className="text-xs font-medium text-[#6B6B6B]">Type</label>
                                        <select
                                            value={currentTopic.type}
                                            onChange={(e) => updateTopic('type', e.target.value)}
                                            className="w-full bg-[#F8F8F7] border border-[#E4E4E4] focus:border-[#F5C518] focus:bg-white rounded-xl px-3 py-2 text-sm text-[#1A1A1A] outline-none transition"
                                        >
                                            <option value="topic">Standard topic</option>
                                            <option value="quiz">Quiz (gated)</option>
                                            <option value="exercise">Exercise</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-[#6B6B6B]">Instructions / guidelines</label>
                                    <textarea
                                        rows={4}
                                        value={currentTopic.content}
                                        onChange={(e) => updateTopic('content', e.target.value)}
                                        className="w-full bg-[#F8F8F7] border border-[#E4E4E4] focus:border-[#F5C518] focus:bg-white rounded-xl px-3 py-2.5 text-sm text-[#1A1A1A] placeholder-[#C8C8C8] outline-none transition resize-none leading-relaxed"
                                        placeholder="Write instructions or context for this step..."
                                    />
                                </div>
                            </div>

                            {/* ── TOPIC: video + assets ── */}
                            {currentTopic.type === 'topic' && (
                                <>
                                    {/* Video card */}
                                    <div className="bg-white border border-[#E4E4E4] rounded-2xl p-5 space-y-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-[#FFF8E6] flex items-center justify-center">
                                                <Video className="w-3.5 h-3.5 text-[#D4A900]" />
                                            </div>
                                            <p className="text-xs font-semibold text-[#1A1A1A]">Video</p>
                                            {getYouTubeEmbedUrl(currentTopic.videoUrl) && (
                                                <span className="ml-auto flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                                                </span>
                                            )}
                                        </div>

                                        <input
                                            type="url"
                                            value={currentTopic.videoUrl || ''}
                                            onChange={(e) => updateTopic('videoUrl', e.target.value)}
                                            className="w-full bg-[#F8F8F7] border border-[#E4E4E4] focus:border-[#F5C518] focus:bg-white rounded-xl px-3 py-2 text-sm text-[#1A1A1A] placeholder-[#C8C8C8] outline-none transition"
                                            placeholder="Paste any YouTube link — youtube.com/watch?v=... or youtu.be/..."
                                        />

                                        {/* inline video preview */}
                                        {(() => {
                                            const embedUrl = getYouTubeEmbedUrl(currentTopic.videoUrl);
                                            if (!embedUrl) return null;
                                            return (
                                                <div className="rounded-xl overflow-hidden border border-[#E4E4E4] bg-black" style={{ aspectRatio: '16/9' }}>
                                                    <iframe
                                                        src={embedUrl}
                                                        title="Video preview"
                                                        className="w-full h-full"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                </div>
                                            );
                                        })()}

                                        {currentTopic.videoUrl && !getYouTubeEmbedUrl(currentTopic.videoUrl) && (
                                            <p className="text-[11px] text-red-400 flex items-center gap-1">
                                                <X className="w-3 h-3" /> Couldn't parse this URL — paste a valid YouTube link.
                                            </p>
                                        )}
                                    </div>

                                    {/* Assets card */}
                                    <div className="bg-white border border-[#E4E4E4] rounded-2xl p-5 space-y-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-[#FFF8E6] flex items-center justify-center">
                                                <Paperclip className="w-3.5 h-3.5 text-[#D4A900]" />
                                            </div>
                                            <p className="text-xs font-semibold text-[#1A1A1A]">Resources</p>
                                            {currentTopic.assets?.length > 0 && (
                                                <span className="ml-auto text-[10px] font-semibold text-[#9A9A9A] bg-[#F2F1EE] px-2 py-0.5 rounded-full">
                                                    {currentTopic.assets.length} file{currentTopic.assets.length !== 1 ? 's' : ''}
                                                </span>
                                            )}
                                        </div>

                                        {/* add asset form */}
                                        <form onSubmit={addAsset} className="bg-[#F8F8F7] border border-[#E4E4E4] rounded-xl p-3 space-y-2">
                                            <div className="flex gap-2">
                                                <select
                                                    value={newAssetType}
                                                    onChange={(e) => setNewAssetType(e.target.value)}
                                                    className="bg-white border border-[#E4E4E4] rounded-lg text-xs text-[#1A1A1A] px-2 py-1.5 outline-none shrink-0"
                                                >
                                                    <option value="pdf">📄 PDF</option>
                                                    <option value="link">🔗 Link</option>
                                                    <option value="image">🖼️ Image</option>
                                                </select>
                                                <input
                                                    type="text"
                                                    placeholder="File name"
                                                    value={newAssetName}
                                                    onChange={(e) => setNewAssetName(e.target.value)}
                                                    className="flex-1 bg-white border border-[#E4E4E4] rounded-lg text-xs px-2.5 py-1.5 text-[#1A1A1A] placeholder-[#C8C8C8] outline-none focus:border-[#F5C518] transition"
                                                />
                                                <button
                                                    type="submit"
                                                    className="px-3 py-1.5 bg-[#F5C518] hover:bg-[#D4A900] text-[#0F0F0F] text-xs font-semibold rounded-lg transition shrink-0"
                                                >
                                                    + Add
                                                </button>
                                            </div>
                                            <input
                                                type="url"
                                                placeholder="https://..."
                                                value={newAssetUrl}
                                                onChange={(e) => setNewAssetUrl(e.target.value)}
                                                className="w-full bg-white border border-[#E4E4E4] rounded-lg text-xs px-2.5 py-1.5 text-[#1A1A1A] placeholder-[#C8C8C8] outline-none focus:border-[#F5C518] transition"
                                            />
                                        </form>

                                        {/* asset list */}
                                        {currentTopic.assets?.length > 0 ? (
                                            <div className="space-y-1.5">
                                                {currentTopic.assets.map((asset) => (
                                                    <div key={asset.id} className="flex items-center justify-between bg-[#F8F8F7] border border-[#E4E4E4] rounded-xl px-3 py-2">
                                                        <div className="flex items-center gap-2 text-xs text-[#1A1A1A] truncate">
                                                            {assetIcon(asset.type)}
                                                            <span className="font-medium truncate">{asset.name}</span>
                                                        </div>
                                                        <button onClick={() => deleteAsset(asset.id)} className="ml-2 p-1 rounded-lg text-[#C8C8C8] hover:text-red-400 hover:bg-red-50 transition shrink-0">
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-center text-xs text-[#C8C8C8] italic py-2">No resources attached yet.</p>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* ── QUIZ slot ── */}
                            {currentTopic.type === 'quiz' && (
                                <div className="bg-white border border-[#E4E4E4] rounded-2xl p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-[#FFF8E6] flex items-center justify-center shrink-0">
                                                <HelpCircle className="w-5 h-5 text-[#D4A900]" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-[#1A1A1A]">Quiz</p>
                                                <p className="text-xs text-[#9A9A9A] mt-0.5 leading-relaxed">
                                                    Opens your quiz component in a modal. Pass{' '}
                                                    <code className="bg-[#F8F8F7] border border-[#E4E4E4] px-1.5 py-0.5 rounded text-[10px] font-mono text-[#D4A900]">
                                                        topicId={currentTopic.id}
                                                    </code>{' '}
                                                    to your component.
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setQuizModal(true)}
                                            className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-[#FFF8E6] hover:bg-[#F5C518] border border-[#F5C518] text-[#A07010] hover:text-[#0F0F0F] text-xs font-semibold rounded-xl transition-all"
                                        >
                                            <HelpCircle className="w-3.5 h-3.5" /> Open Quiz
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* ── EXERCISE slot ── */}
                            {currentTopic.type === 'exercise' && (
                                <div className="bg-white border border-[#E4E4E4] rounded-2xl p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-[#EDFBF4] flex items-center justify-center shrink-0">
                                                <Award className="w-5 h-5 text-[#1D9E75]" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-[#1A1A1A]">Exercise</p>
                                                <p className="text-xs text-[#9A9A9A] mt-0.5 leading-relaxed">
                                                    Opens your exercise component in a modal. Pass{' '}
                                                    <code className="bg-[#F8F8F7] border border-[#E4E4E4] px-1.5 py-0.5 rounded text-[10px] font-mono text-[#1D9E75]">
                                                        topicId={currentTopic.id}
                                                    </code>{' '}
                                                    to your component.
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setExerciseModal(true)}
                                            className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-[#EDFBF4] hover:bg-[#5DCAA5] border border-[#5DCAA5] text-[#1A7040] hover:text-white text-xs font-semibold rounded-xl transition-all"
                                        >
                                            <Award className="w-3.5 h-3.5" /> Open Exercise
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    )}
                </div>

                {/* footer */}
                <footer className="bg-white border-t border-[#E4E4E4] px-6 py-2 shrink-0">
                    <p className="text-[10px] text-[#C8C8C8] font-mono"></p>
                </footer>
            </main>

            {/* ── QUIZ MODAL ── */}
            <Modal open={quizModal} onClose={() => setQuizModal(false)}>
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#E4E4E4]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#FFF8E6] flex items-center justify-center">
                            <HelpCircle className="w-4 h-4 text-[#D4A900]" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-[#1A1A1A]">Quiz</p>
                            <p className="text-[11px] text-[#9A9A9A]">
                                Step {currentTopic?.order} — {currentTopic?.title || 'Untitled'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setQuizModal(false)}
                        className="p-2 rounded-xl text-[#9A9A9A] hover:text-[#1A1A1A] hover:bg-[#F2F1EE] transition"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* ↓↓↓ DROP YOUR QUIZ COMPONENT HERE ↓↓↓ */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center gap-3 min-h-[300px] bg-[#F8F8F7]">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF8E6] border border-[#F5C518]/40 flex items-center justify-center">
                        <HelpCircle className="w-6 h-6 text-[#D4A900]" />
                    </div>
                    <p className="text-sm font-semibold text-[#1A1A1A]">Quiz component slot</p>
                    <p className="text-xs text-[#9A9A9A] text-center max-w-xs">
                        Replace this block with your teammate's quiz component and pass{' '}
                        <code className="bg-white border border-[#E4E4E4] px-1.5 rounded font-mono text-[#D4A900]">
                            topicId={currentTopic?.id}
                        </code>
                    </p>
                    {/* Example: <QuizComponent topicId={currentTopic?.id} /> */}
                </div>
                {/* ↑↑↑ END QUIZ COMPONENT SLOT ↑↑↑ */}

                <div className="px-5 py-3 border-t border-[#E4E4E4] flex justify-end">
                    <button
                        onClick={() => setQuizModal(false)}
                        className="px-4 py-1.5 text-xs font-semibold bg-[#F2F1EE] hover:bg-[#E4E4E4] text-[#1A1A1A] rounded-lg border border-[#E4E4E4] transition"
                    >
                        Close
                    </button>
                </div>
            </Modal>

            {/* ── EXERCISE MODAL ── */}
            <Modal open={exerciseModal} onClose={() => setExerciseModal(false)}>
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#E4E4E4]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#EDFBF4] flex items-center justify-center">
                            <Award className="w-4 h-4 text-[#1D9E75]" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-[#1A1A1A]">Exercise</p>
                            <p className="text-[11px] text-[#9A9A9A]">
                                Step {currentTopic?.order} — {currentTopic?.title || 'Untitled'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setExerciseModal(false)}
                        className="p-2 rounded-xl text-[#9A9A9A] hover:text-[#1A1A1A] hover:bg-[#F2F1EE] transition"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* ↓↓↓ DROP YOUR EXERCISE COMPONENT HERE ↓↓↓ */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center gap-3 min-h-[300px] bg-[#F8F8F7]">
                    <div className="w-12 h-12 rounded-2xl bg-[#EDFBF4] border border-[#5DCAA5]/40 flex items-center justify-center">
                        <Award className="w-6 h-6 text-[#1D9E75]" />
                    </div>
                    <p className="text-sm font-semibold text-[#1A1A1A]">Exercise component slot</p>
                    <p className="text-xs text-[#9A9A9A] text-center max-w-xs">
                        Replace this block with your teammate's exercise component and pass{' '}
                        <code className="bg-white border border-[#E4E4E4] px-1.5 rounded font-mono text-[#1D9E75]">
                            topicId={currentTopic?.id}
                        </code>
                    </p>
                    {/* Example: <ExerciseComponent topicId={currentTopic?.id} /> */}
                </div>
                {/* ↑↑↑ END EXERCISE COMPONENT SLOT ↑↑↑ */}

                <div className="px-5 py-3 border-t border-[#E4E4E4] flex justify-end">
                    <button
                        onClick={() => setExerciseModal(false)}
                        className="px-4 py-1.5 text-xs font-semibold bg-[#F2F1EE] hover:bg-[#E4E4E4] text-[#1A1A1A] rounded-lg border border-[#E4E4E4] transition"
                    >
                        Close
                    </button>
                </div>
            </Modal>

        </div>
    );
}