"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { Search, ShoppingCart, MapPin, Phone, Menu, X, ChevronLeft, Plus, Trash2, MessageCircle, Send, Store, BookOpen, FileText, Barcode, Pill, BadgeCheck, Gift, Bot, Lock } from 'lucide-react';
import { logoUrl, CATS, BRANCHES, COMING_BRANCHES, FALLBACK_PRODUCTS, DICT, ARTICLES, DEMO_ORDERS, STOCK, COUPONS, ALL_OFFERS, LEGAL, FEATURES38, SUPER_CONTROL_EMAILS, APPROVED_TEAM_EMAILS, STAFF_ROLES, SUPER_PERMISSIONS } from './bendary-data';
import type { ApiProduct } from './bendary-data';

export default function BendaryApp(){
  const [view,setView] = useState<'store'|'offers'|'branches'|'dict'|'articles'|'cart'|'staff'|'legal'>('store');
  const [cat,setCat] = useState('الكل');
  const [search,setSearch] = useState('');
  const [dictQ,setDictQ] = useState('');
  const [cart,setCart] = useState<ApiProduct[]>([]);
  const [legalKey,setLegalKey] = useState('about');
  const [articleId,setArticleId] = useState<string|null>(null);
  const [chatOpen,setChatOpen] = useState(false);
  const [chatMsg,setChatMsg] = useState('');
  const [chatList,setChatList] = useState<{from:'me'|'bot';text:string}[]>([{from:'bot',text:'أهلاً بيك في صيدليات البنداري — رعاية من القلب ♥ اسألني عن أي دواء أو عرض أو فرع.'}]);
  const [menuOpen,setMenuOpen] = useState(false);
  const [orderName,setOrderName] = useState('');
  const [orderPhone,setOrderPhone] = useState('');
  const [orderAddress,setOrderAddress] = useState('');
  const [orderDone,setOrderDone] = useState(false);

  // المنتجات من الـ API بجد
  const [apiProducts,setApiProducts] = useState<ApiProduct[]>([]);
  const [apiLoaded,setApiLoaded] = useState(false);
  useEffect(()=>{
    async function load(){
      try{
        const res = await fetch(`/api/products?q=${encodeURIComponent(search)}&limit=200`);
        const data = await res.json();
        if(data?.ok && Array.isArray(data.products)){
          setApiProducts(data.products.map((p:any)=>({
            name: p.nameAr || p.nameEn || p.name || '',
            cat: p.category || 'أدوية',
            tag: p.category || '',
            desc: p.activeIngredient ? `المادة الفعالة: ${p.activeIngredient}` : 'اسأل الصيدلي عن الجرعة المناسبة.',
            barcode: p.barcode || '',
            price: typeof p.price === 'number' ? p.price : undefined,
            stock: typeof p.stock === 'number' ? p.stock : undefined,
          })));
        }
      }catch{}
      setApiLoaded(true);
    }
    const t = setTimeout(load, 250);
    return ()=>clearTimeout(t);
  },[search]);
  const displayProducts = apiProducts.length > 0 ? apiProducts : FALLBACK_PRODUCTS;
  const filtered = useMemo(()=>{
    let list = displayProducts;
    if(cat !== 'الكل') list = list.filter(p=>p.cat===cat);
    if(search.trim()){ const q = search.trim(); list = list.filter(p=>p.name.includes(q) || p.desc.includes(q) || p.barcode.includes(q)); }
    return list;
  },[displayProducts,cat,search]);
  const dictFiltered = useMemo(()=>{
    if(!dictQ.trim()) return DICT;
    const q = dictQ.trim();
    return DICT.filter(d=>d.name.includes(q) || d.ar.includes(q) || d.use.includes(q) || d.symptoms.includes(q));
  },[dictQ]);

  // ===== الموظفين + Super Control =====
  const [isStaff,setIsStaff] = useState(false);
  const [staffEmail,setStaffEmail] = useState('');
  const [isSuper,setIsSuper] = useState(false);
  const [myRole,setMyRole] = useState<string>('صيدلي');
  const [approvedEmails,setApprovedEmails] = useState<string[]>(APPROVED_TEAM_EMAILS);
  const [staffRolesMap,setStaffRolesMap] = useState<Record<string,string>>({});
  const [newStaffEmail,setNewStaffEmail] = useState('');
  const [newStaffRole,setNewStaffRole] = useState<string>('صيدلي');
  const [roleTargetEmail,setRoleTargetEmail] = useState('');
  const [branchesList,setBranchesList] = useState(BRANCHES);
  const [newBranchName,setNewBranchName] = useState('');
  const [newBranchAddress,setNewBranchAddress] = useState('');
  const [newBranchPhone,setNewBranchPhone] = useState('01200400094');
  const [whatsappNumbers,setWhatsappNumbers] = useState<string[]>(['01200400094']);
  const [newWhatsapp,setNewWhatsapp] = useState('');
  const [whatsappEnabled,setWhatsappEnabled] = useState(true);
  function loginStaff(){
    const email = staffEmail.trim().toLowerCase();
    if(!approvedEmails.includes(email)) return;
    setIsStaff(true);
    if(SUPER_CONTROL_EMAILS.includes(email)){ setIsSuper(true); setMyRole('Super Control'); }
    else { setIsSuper(false); setMyRole(staffRolesMap[email] || 'صيدلي'); }
  }
  function logoutStaff(){ setIsStaff(false); setIsSuper(false); setStaffEmail(''); setMyRole('صيدلي'); }

  function addToCart(p:ApiProduct){ setCart(prev=>[...prev,p]); }
  function removeFromCart(i:number){ setCart(prev=>prev.filter((_,idx)=>idx!==i)); }
  function sendChat(){
    if(!chatMsg.trim()) return;
    const q = chatMsg.trim();
    setChatList(prev=>[...prev,{from:'me',text:q}]);
    setChatMsg('');
    setTimeout(()=>{
      const found = displayProducts.find(p=>p.name.includes(q) || q.includes(p.name.slice(0,4)));
      setChatList(prev=>[...prev,{from:'bot',text: found ? `${found.name} موجود — اسأل الصيدلي عن الجرعة المناسبة وهنوصلهولك خلال 30-45 دقيقة. الخط الساخن 01200400094` : 'تمام، الصيدلي هيراجع طلبك ويرد عليك. تقدر تطلب من المتجر أو تكلمنا على الخط الساخن 01200400094'}]);
    },600);
  }
  function submitOrder(){
    if(!orderName.trim() || !orderPhone.trim() || !orderAddress.trim() || cart.length===0) return;
    setOrderDone(true);
  }
  const activeArticle = ARTICLES.find(a=>a.id===articleId);

  return (
    <div dir="rtl" className="min-h-screen bg-white text-slate-900 font-sans">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3">
          <button onClick={()=>setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg bg-slate-100"><Menu size={20}/></button>
          <button onClick={()=>setView('store')} className="flex items-center gap-2 shrink-0">
            <img src={logoUrl} alt="El-Bendary" className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-full bg-white" />
            <span className="text-right leading-tight"><span className="block font-black text-[#C8102E] text-base sm:text-xl">صيدليات البنداري</span><span className="block text- sm:text-xs text-slate-500">رعاية من القلب ♥</span></span>
          </button>
          <div className="hidden md:flex flex-1 max-w-xl mx-2 items-center gap-2 bg-slate-100 rounded-full px-3 py-2"><Search size={18} className="text-slate-400 shrink-0" /><input value={search} onChange={e=>{setSearch(e.target.value); setView('store');}} placeholder="ابحث بالاسم أو المادة الفعالة أو الباركود..." className="flex-1 bg-transparent outline-none text-sm" /></div>
          <a href="tel:01200400094" className="hidden sm:flex items-center gap-1.5 bg-[#C8102E] text-white px-3 py-2 rounded-full text-sm font-bold shrink-0"><Phone size={16}/> 01200400094</a>
          <button onClick={()=>setView('cart')} className="relative p-2.5 bg-slate-900 text-white rounded-full shrink-0"><ShoppingCart size={19}/>{cart.length>0 && <span className="absolute -top-1 -left-1 bg-[#C8102E] text-white text- w-5 h-5 rounded-full flex items-center justify-center font-bold">{cart.length}</span>}</button>
        </div>
        <div className="md:hidden px-3 pb-2 flex items-center gap-2 bg-slate-100 rounded-full mx-3 mb-2"><Search size={17} className="text-slate-400" /><input value={search} onChange={e=>{setSearch(e.target.value); setView('store');}} placeholder="ابحث..." className="flex-1 bg-transparent outline-none text-sm py-2" /></div>
        <nav className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-wrap gap-1 px-3 sm:px-4 pb-2 max-w-7xl mx-auto`}>
          {[{k:'store',label:'المتجر',icon:Store},{k:'offers',label:'العروض',icon:Gift},{k:'branches',label:'الفروع',icon:MapPin},{k:'dict',label:'قاموس الدواء',icon:BookOpen},{k:'articles',label:'المقالات',icon:FileText},{k:'staff',label:'الموظفين',icon:Lock}].map((n:any)=>(<button key={n.k} onClick={()=>{setView(n.k); setMenuOpen(false);}} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold ${view===n.k ? 'bg-[#C8102E] text-white' : 'bg-slate-100 text-slate-700'}`}><n.icon size={15}/>{n.label}</button>))}
        </nav>
      </header>

      {view==='store' && (
        <section className="max-w-7xl mx-auto px-3 sm:px-4 pt-4">
          <div className="rounded-2xl overflow-hidden bg-gradient-to-l from-[#C8102E] to-[#7A0A1D] text-white p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div><h1 className="text-xl sm:text-3xl font-black leading-snug">رعاية من القلب ♥<br/>توصيل خلال 30-45 دقيقة</h1><p className="text-white/85 text-sm mt-1">12 فرع — 3 فروع قريباً — صيدلي بيراجع طلبك قبل التوصيل</p><div className="flex gap-2 mt-3"><button onClick={()=>setView('offers')} className="bg-white text-[#C8102E] px-4 py-2 rounded-full font-bold text-sm">شوف العروض</button><a href="tel:01200400094" className="bg-white/15 border border-white/30 px-4 py-2 rounded-full font-bold text-sm">اتصل بالصيدلي</a></div></div>
            <div className="bg-white/10 rounded-xl px-4 py-3 text-center shrink-0"><div className="text-2xl font-black">22,258 صنف</div><div className="text-xs text-white/80">61 فئة — قاموس دواء +80,000</div><div className="text- mt-1 bg-white text-[#C8102E] px-2 py-0.5 rounded-full font-bold">{apiLoaded ? (apiProducts.length>0 ? `متصل بـ Neon — ${apiProducts.length} معروض الآن` : 'وضع احتياطي') : 'جاري التحميل...'}</div></div>
          </div>
        </section>
      )}

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 pb-24">
        {view==='store' && (
          <>
            <div className="flex flex-wrap gap-1.5 mb-3">{CATS.map(c=>(<button key={c.name} onClick={()=>setCat(c.name)} className={`px-3 py-1.5 rounded-full text-sm font-bold ${cat===c.name ? 'bg-slate-900 text-white' : 'bg-slate-100'}`}>{c.name}</button>))}</div>
            <div className="flex items-center justify-between mb-3"><h2 className="font-black text-lg">{filtered.length} منتج {cat!=='الكل' ? `— ${cat}` : ''}</h2></div>
            {filtered.length===0 && <div className="bg-slate-50 rounded-2xl p-6 text-center text-slate-500">لا توجد نتائج — جرّب اسم تاني أو المادة الفعالة أو الباركود، أو كلمنا على 01200400094</div>}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map((p,idx)=>(
                <article key={`${p.barcode}-${idx}`} className="border border-slate-100 rounded-2xl p-3 bg-white shadow-sm flex flex-col">
                  <div className="flex items-center justify-between"><span className="text- bg-red-50 text-[#C8102E] px-2 py-0.5 rounded-full font-bold">{p.cat}</span><span className="text- text-slate-400 flex items-center gap-1"><Barcode size={12}/>{p.barcode}</span></div>
                  <h3 className="font-bold mt-2 leading-snug text-">{p.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1 flex-1">{p.desc}</p>
                  <div className="flex items-center gap-1 text- text-slate-400 mt-2"><Pill size={12}/>{p.tag}</div>
                  {isStaff && typeof p.price==='number' && <div className="text-sm font-black mt-1">السعر للموظفين: {p.price} ج.م {typeof p.stock==='number' ? `— مخزون: ${p.stock}` : ''}</div>}
                  <button onClick={()=>addToCart(p)} className="mt-3 w-full bg-[#C8102E] text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-1"><Plus size={16}/> أضف للسلة</button>
                </article>
              ))}
            </div>
          </>
        )}

        {view==='offers' && (
          <>
            <h2 className="font-black text-xl mb-1">عروض البنداري</h2>
            <p className="text-sm text-slate-500 mb-4">العروض السارية تُأكَّد من الفرع — اسأل الصيدلي عن التفاصيل.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ALL_OFFERS.map(o=>(
                <article key={o.id} className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-white">
                  <img src={o.image} alt={o.title} className="w-full h-56 object-cover" />
                  <div className="p-3"><div className="flex items-center justify-between"><h3 className="font-black">{o.title}</h3><span className="text-xs bg-red-50 text-[#C8102E] px-2 py-0.5 rounded-full font-bold">{o.tag}</span></div><p className="text-sm text-slate-600 mt-1 leading-relaxed">{o.desc}</p><button onClick={()=>{setView('store'); setSearch(o.brand);}} className="mt-3 w-full bg-slate-900 text-white py-2.5 rounded-xl font-bold text-sm">اطلب العرض</button></div>
                </article>
              ))}
            </div>
            <h3 className="font-black mt-6 mb-2">كوبونات</h3>
            <div className="grid sm:grid-cols-3 gap-3">{COUPONS.map(c=>(<div key={c.code} className="border border-dashed border-[#C8102E]/40 rounded-2xl p-3 bg-red-50/40"><div className="font-black">{c.title}</div><div className="text-xs text-slate-600 mt-1">{c.desc}</div><div className="mt-2 font-black text-[#C8102E] tracking-widest">{c.code}</div></div>))}</div>
          </>
        )}

        {view==='branches' && (
          <>
            <h2 className="font-black text-xl mb-3">فروعنا — {branchesList.length} فرع</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {branchesList.map(b=>(
                <div key={b.code} className="border rounded-2xl p-4 bg-white shadow-sm"><div className="flex items-center justify-between"><h3 className="font-black">{b.name}</h3><span className="text- bg-slate-100 px-2 py-0.5 rounded-full font-bold">{b.code}</span></div><p className="text-sm text-slate-600 mt-2 flex gap-1.5"><MapPin size={15} className="shrink-0 mt-0.5 text-[#C8102E]"/>{b.address}</p><a href={`tel:${b.phone}`} className="mt-3 inline-flex items-center gap-1.5 bg-[#C8102E] text-white px-3 py-2 rounded-full text-sm font-bold"><Phone size={14}/>{b.phone}</a></div>
              ))}
            </div>
            <h3 className="font-black mt-6 mb-2">قريباً — Loading</h3>
            <div className="grid sm:grid-cols-3 gap-3">{COMING_BRANCHES.map(b=>(<div key={b.name} className="border border-dashed rounded-2xl p-4 bg-slate-50"><h4 className="font-bold">{b.name}</h4><p className="text-sm text-slate-500 mt-1">{b.address}</p><span className="inline-block mt-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">قريباً - Loading</span></div>))}</div>
          </>
        )}

        {view==='dict' && (
          <>
            <h2 className="font-black text-xl mb-1">قاموس الدواء</h2>
            <p className="text-sm text-slate-500 mb-3">ابحث بالاسم أو العرض أو المادة الفعالة — المعلومات تعليمية والجرعة يحددها الطبيب أو الصيدلي.</p>
            <div className="flex items-center gap-2 bg-slate-100 rounded-full px-3 py-2.5 mb-3"><Search size={17} className="text-slate-400"/><input value={dictQ} onChange={e=>setDictQ(e.target.value)} placeholder="ابحث في القاموس..." className="flex-1 bg-transparent outline-none text-sm"/></div>
            <div className="grid sm:grid-cols-2 gap-3">{dictFiltered.map((d,i)=>(<div key={i} className="border rounded-2xl p-3 bg-white"><div className="flex justify-between"><h3 className="font-black">{d.ar} <span className="text-slate-400 font-normal text-sm">({d.name})</span></h3><span className="text- bg-slate-100 px-2 py-0.5 rounded-full">{d.source}</span></div><p className="text-sm text-slate-600 mt-1">{d.use}</p><p className="text-xs text-slate-400 mt-1">الأعراض: {d.symptoms}</p></div>))}</div>
          </>
        )}

        {view==='articles' && (
          <>
            {!activeArticle ? (
              <>
                <h2 className="font-black text-xl mb-3">المقالات والنصائح</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{ARTICLES.map(a=>(<button key={a.id} onClick={()=>setArticleId(a.id)} className="text-right border rounded-2xl p-4 bg-white shadow-sm"><span className="text- bg-red-50 text-[#C8102E] px-2 py-0.5 rounded-full font-bold">{a.cat} — {a.read}</span><h3 className="font-black mt-2 leading-snug">{a.title}</h3><p className="text-sm text-slate-600 mt-1 leading-relaxed line-clamp-3">{a.body}</p><span className="text-sm font-bold text-[#C8102E] mt-2 inline-block">اقرأ المزيد ←</span></button>))}</div>
              </>
            ) : (
              <article className="max-w-3xl mx-auto bg-white border rounded-2xl p-4 sm:p-6"><button onClick={()=>setArticleId(null)} className="text-sm font-bold text-[#C8102E] mb-2 flex items-center gap-1"><ChevronLeft size={16}/> كل المقالات</button><h2 className="font-black text-2xl leading-snug">{activeArticle.title}</h2><p className="text-xs text-slate-400 mt-1">{activeArticle.cat} — {activeArticle.read}</p>{activeArticle.paras.map((p,i)=><p key={i} className="text-slate-700 leading-loose mt-3">{p}</p>)}</article>
            )}
          </>
        )}

        {view==='cart' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="font-black text-xl mb-3">سلة الطلب — {cart.length} صنف</h2>
            {cart.length===0 && <div className="bg-slate-50 rounded-2xl p-6 text-center text-slate-500">سلتك فاضية — اختار من المتجر واضغط أضف للسلة</div>}
            <div className="space-y-2">{cart.map((p,i)=>(<div key={i} className="flex items-center justify-between border rounded-2xl p-3 bg-white"><div><div className="font-bold">{p.name}</div><div className="text-xs text-slate-500">{p.cat} — {p.barcode}</div></div><button onClick={()=>removeFromCart(i)} className="p-2 bg-red-50 text-[#C8102E] rounded-full"><Trash2 size={16}/></button></div>))}</div>
            {cart.length>0 && (
              <div className="mt-4 border rounded-2xl p-4 bg-white space-y-2">
                <input value={orderName} onChange={e=>setOrderName(e.target.value)} placeholder="الاسم" className="w-full border rounded-xl px-3 py-2.5 text-sm outline-none" />
                <input value={orderPhone} onChange={e=>setOrderPhone(e.target.value)} placeholder="رقم الهاتف" className="w-full border rounded-xl px-3 py-2.5 text-sm outline-none" />
                <input value={orderAddress} onChange={e=>setOrderAddress(e.target.value)} placeholder="العنوان" className="w-full border rounded-xl px-3 py-2.5 text-sm outline-none" />
                {!orderDone ? <button onClick={submitOrder} className="w-full bg-[#C8102E] text-white py-3 rounded-xl font-bold">إرسال الطلب للصيدلي</button> : <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-center"><div className="font-black text-green-800">تم استلام طلبك ♥</div><div className="text-sm text-green-700 mt-1">الصيدلي هيراجع طلبك ويكلمك على {orderPhone} — التوصيل 30-45 دقيقة</div></div>}
                <p className="text- text-slate-400 text-center">الاستبدال خلال 14 يوم — الثلاجة / الاسبراي وغيرها لا تستبدل</p>
              </div>
            )}
          </div>
        )}

        {view==='staff' && (
          <div className="max-w-3xl mx-auto">
            <h2 className="font-black text-xl mb-1">منطقة الموظفين</h2>
            <p className="text-sm text-slate-500 mb-3">للأدوار: مدير / صيدلي / توصيل / محاسب — دخول بإيميل معتمد فقط. إجمالي المعتمدين: {approvedEmails.length} إيميل.</p>
            {!isStaff ? (
              <div className="border rounded-2xl p-4 bg-white space-y-2">
                <label className="text-sm font-bold">إيميل العمل المعتمد</label>
                <input value={staffEmail} onChange={e=>setStaffEmail(e.target.value)} placeholder="name@bendaryph.com" className="w-full border rounded-xl px-3 py-2.5 text-sm outline-none" />
                <button onClick={loginStaff} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold">دخول الموظفين</button>
                {!approvedEmails.includes(staffEmail.trim().toLowerCase()) && staffEmail.trim() !== '' && <p className="text-xs text-red-600 font-bold">الإيميل ده مش معتمد — اطلب من Super Control يوافق عليه.</p>}
                <p className="text- text-slate-400">الإيميلات المعتمدة: admin@bendaryph.com حتى admin_200@bendaryph.com + 2 إيميل Super Control.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between bg-green-50 border border-green-100 rounded-2xl p-3 mb-3"><span className="font-bold text-green-800">تم الدخول — {staffEmail} — دورك: {myRole} {isSuper ? '— Super Control (تحكم كامل)' : ''}</span><button onClick={logoutStaff} className="text-sm font-bold text-[#C8102E]">خروج</button></div>
                {isSuper && (
                  <div className="border-2 border-[#C8102E] rounded-2xl p-4 bg-white mb-4">
                    <h3 className="font-black text-lg text-[#C8102E]">لوحة Super Control</h3>
                    <p className="text-xs text-slate-500 mt-1">صلاحياتك: {SUPER_PERMISSIONS.join(' • ')}</p>
                    <h4 className="font-bold mt-4 mb-2">1) اعتماد الإيميلات — {approvedEmails.length} معتمد</h4>
                    <div className="flex gap-2"><input value={newStaffEmail} onChange={e=>setNewStaffEmail(e.target.value)} placeholder="إيميل جديد للاعتماد" className="flex-1 border rounded-xl px-3 py-2 text-sm outline-none" /><select value={newStaffRole} onChange={e=>setNewStaffRole(e.target.value)} className="border rounded-xl px-2 text-sm">{STAFF_ROLES.map(r=><option key={r} value={r}>{r}</option>)}</select><button onClick={()=>{const em=newStaffEmail.trim().toLowerCase(); if(em && !approvedEmails.includes(em)){ setApprovedEmails(p=>[...p,em]); setStaffRolesMap(p=>({...p,[em]:newStaffRole})); setNewStaffEmail(''); }}} className="bg-[#C8102E] text-white px-3 py-2 rounded-xl text-sm font-bold shrink-0">اعتماد + إضافة</button></div>
                    <div className="max-h-40 overflow-y-auto mt-2 space-y-1">{approvedEmails.map(em=>(<div key={em} className="flex justify-between items-center bg-slate-50 rounded-xl px-3 py-1.5 text-sm"><span>{em} — {SUPER_CONTROL_EMAILS.includes(em) ? 'Super Control' : (staffRolesMap[em] || 'صيدلي')}</span>{!SUPER_CONTROL_EMAILS.includes(em) && <button onClick={()=>setApprovedEmails(p=>p.filter(x=>x!==em))} className="text-red-600 font-bold text-xs">حذف</button>}</div>))}</div>
                    <h4 className="font-bold mt-4 mb-2">2) تحديد صلاحيات / دور إيميل</h4>
                    <div className="flex gap-2"><input value={roleTargetEmail} onChange={e=>setRoleTargetEmail(e.target.value)} placeholder="إيميل الموظف" className="flex-1 border rounded-xl px-3 py-2 text-sm outline-none" /><select onChange={e=>{const em=roleTargetEmail.trim().toLowerCase(); if(em) setStaffRolesMap(p=>({...p,[em]:e.target.value}));}} className="border rounded-xl px-2 text-sm" defaultValue=""><option value="" disabled>اختر الدور</option>{STAFF_ROLES.map(r=><option key={r} value={r}>{r}</option>)}</select></div>
                    <h4 className="font-bold mt-4 mb-2">3) إضافة فرع جديد</h4>
                    <div className="space-y-2"><input value={newBranchName} onChange={e=>setNewBranchName(e.target.value)} placeholder="اسم الفرع" className="w-full border rounded-xl px-3 py-2 text-sm outline-none" /><input value={newBranchAddress} onChange={e=>setNewBranchAddress(e.target.value)} placeholder="عنوان الفرع" className="w-full border rounded-xl px-3 py-2 text-sm outline-none" /><input value={newBranchPhone} onChange={e=>setNewBranchPhone(e.target.value)} placeholder="هاتف الفرع" className="w-full border rounded-xl px-3 py-2 text-sm outline-none" /><button onClick={()=>{if(!newBranchName.trim() || !newBranchAddress.trim()) return; setBranchesList(p=>[...p,{name:newBranchName,code:`BEN-${p.length+1}`,address:newBranchAddress,phone:newBranchPhone}]); setNewBranchName(''); setNewBranchAddress('');}} className="w-full bg-slate-900 text-white py-2.5 rounded-xl font-bold text-sm">إضافة الفرع</button></div>
                    <h4 className="font-bold mt-4 mb-2">4) أرقام واتساب / هاتف + إيقاف القناة</h4>
                    <div className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2 text-sm font-bold"><span>قناة واتساب: {whatsappEnabled ? 'شغالة' : 'متوقفة'}</span><button onClick={()=>setWhatsappEnabled(v=>!v)} className={`px-3 py-1.5 rounded-full text-white text-xs ${whatsappEnabled ? 'bg-red-600' : 'bg-green-600'}`}>{whatsappEnabled ? 'إيقاف القناة' : 'تشغيل القناة'}</button></div>
                    <div className="flex gap-2 mt-2"><input value={newWhatsapp} onChange={e=>setNewWhatsapp(e.target.value)} placeholder="رقم واتساب / هاتف جديد" className="flex-1 border rounded-xl px-3 py-2 text-sm outline-none" /><button onClick={()=>{if(newWhatsapp.trim() && !whatsappNumbers.includes(newWhatsapp.trim())) setWhatsappNumbers(p=>[...p,newWhatsapp.trim()]); setNewWhatsapp('');}} className="bg-[#C8102E] text-white px-3 py-2 rounded-xl text-sm font-bold">إضافة رقم</button></div>
                    <div className="mt-2 space-y-1">{whatsappNumbers.map(n=><div key={n} className="flex justify-between bg-slate-50 rounded-xl px-3 py-1.5 text-sm"><span>{n}</span><button onClick={()=>setWhatsappNumbers(p=>p.filter(x=>x!==n))} className="text-red-600 font-bold text-xs">حذف</button></div>)}</div>
                  </div>
                )}
                <h3 className="font-black mb-2">الطلبات</h3>
                <div className="space-y-2 mb-4">{DEMO_ORDERS.map(o=><div key={o.no} className="border rounded-2xl p-3 bg-white"><div className="flex justify-between"><b>{o.no} — {o.customer}</b><span className="text-xs bg-amber-100 px-2 py-0.5 rounded-full font-bold">{o.status}</span></div><div className="text-sm text-slate-600 mt-1">{o.items} — {o.branch} — {o.channel}</div><div className="text-xs text-slate-400">{o.created} — {o.phone} — {o.address}</div></div>)}</div>
                <h3 className="font-black mb-2">المخزون</h3>
                <div className="space-y-2 mb-4">{STOCK.map((s,i)=><div key={i} className="flex justify-between border rounded-2xl p-3 bg-white"><span><b>{s.p}</b><span className="text-xs text-slate-500 block">{s.branch}</span></span><span className="text-sm font-bold">{s.stock} — {s.status}</span></div>)}</div>
                <h3 className="font-black mb-2">38 ميزة للموظفين</h3>
                <div className="grid sm:grid-cols-2 gap-2">{FEATURES38.map(f=>(<details key={f.id} className="border rounded-2xl p-3 bg-white"><summary className="font-bold cursor-pointer">{f.ar} <span className="text-slate-400 font-normal text-xs">({f.en})</span></summary><p className="text-sm text-slate-600 mt-1">{f.desc}</p></details>))}</div>
              </>
            )}
          </div>
        )}

        {view==='legal' && (
          <div className="max-w-2xl mx-auto bg-white border rounded-2xl p-4"><h2 className="font-black text-xl mb-2">{LEGAL[legalKey].title}</h2>{LEGAL[legalKey].paras.map((p,i)=><p key={i} className="text-slate-700 leading-loose mt-2">{p}</p>)}</div>
        )}
      </main>

      <footer className="border-t bg-slate-50 mt-6">
        <div className="max-w-7xl mx-auto px-4 py-5 grid sm:grid-cols-3 gap-4 text-sm">
          <div><div className="font-black text-[#C8102E]">صيدليات البنداري — رعاية من القلب ♥</div><p className="text-slate-500 mt-1">الخط الساخن: 01200400094 — 24 ساعة</p><p className="text-slate-500">info@bendaryph.com — www.bendaryph.com</p></div>
          <div className="flex gap-2 flex-wrap items-start">{Object.keys(LEGAL).map(k=><button key={k} onClick={()=>{setLegalKey(k); setView('legal');}} className="bg-white border px-3 py-1.5 rounded-full font-bold">{LEGAL[k].title}</button>)}</div>
          <div className="text-slate-500"><p>DevOps By (MoSTa® | Let's Live The Future Now)</p><p className="flex items-center gap-1 mt-1"><BadgeCheck size={15} className="text-green-600"/> Verified By 【entity-Meta¦canonical_name=Meta】</p></div>
        </div>
      </footer>

      {!chatOpen && <button onClick={()=>setChatOpen(true)} className="fixed bottom-4 left-4 z-50 bg-[#C8102E] text-white px-4 py-3 rounded-full shadow-xl font-bold flex items-center gap-2"><MessageCircle size={19}/> BenDa ChaT</button>}
      {chatOpen && (
        <div className="fixed bottom-4 left-4 z-50 w- max-w-sm bg-white border rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-[#C8102E] text-white px-3 py-2.5 flex items-center justify-between"><span className="font-bold flex items-center gap-2"><Bot size={18}/> BenDa ChaT</span><button onClick={()=>setChatOpen(false)}><X size={18}/></button></div>
          <div className="h-64 overflow-y-auto p-3 space-y-2 bg-slate-50">{chatList.map((m,i)=><div key={i} className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${m.from==='me' ? 'bg-[#C8102E] text-white mr-auto' : 'bg-white border'}`}>{m.text}</div>)}</div>
          <div className="flex gap-2 p-2 border-t"><input value={chatMsg} onChange={e=>setChatMsg(e.target.value)} onKeyDown={e=>{if(e.key==='Enter') sendChat();}} placeholder="اسأل عن دواء أو عرض..." className="flex-1 border rounded-full px-3 py-2 text-sm outline-none"/><button onClick={sendChat} className="bg-[#C8102E] text-white p-2.5 rounded-full"><Send size={16}/></button></div>
        </div>
      )}
    </div>
  );
}
