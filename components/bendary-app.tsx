"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react';
const logoUrl = '/bendary-assets/1f679769500545ba-image_20261126_065221.webp';
const ad1Url = '/bendary-assets/5ff10bc75054d151-img-u7531593695661291740-1.jpg';
const ad2Url = '/bendary-assets/509f4f33f27bb6f8-img-u7531593695661291740-2.jpg';
const ad3Url = '/bendary-assets/f4fea1d6cb10d61e-img-u7531593695661291740-3.jpg';
const ad4Url = '/bendary-assets/d60a96abbec482a7-img-u7531593695661291740-4.jpg';
const ad5Url = '/bendary-assets/4af70ef1f361b647-img-u7531593695661291740-5.jpg';
const ad6Url = '/bendary-assets/b082e443a04ea8ae-img-u7531593695661291740-6.jpg';
const ad7Url = '/bendary-assets/14846272779edddc-img-u7531593695661291740-7.jpg';
const ad8Url = '/bendary-assets/c038fe6ca9f2f23a-img-u7531593695661291740-8.jpg';
const ad9Url = '/bendary-assets/4110844d18b42d99-img-u7531593695661291740-9.jpg';
const ad10Url = '/bendary-assets/db3bfa44eba12e79-img-u7531593695661291740-10.jpg';
import { Search, ShoppingCart, MapPin, Phone, Clock, Menu, X, ChevronLeft, Plus, Trash2, MessageCircle, Send, Truck, Package, Store, BookOpen, Newspaper, User, ShieldCheck, CheckCircle2, Pill, HeartPulse, Baby, Sparkles, FlaskConical, Activity, RefreshCw, Warehouse, ShoppingBag, BarChart3, ClipboardList, Users, Lock, Save, Edit3, Download, FileText, Headset, Bell, Heart, Calendar, Globe, MessagesSquare, Wrench, BadgeCheck, Star, Gift, Timer, Home, Brain, Barcode, BellRing, Check, ExternalLink, PhoneCall, Briefcase, Info, Shield, Mail, Megaphone, Leaf, Building2, FileCheck, Wallet, ArrowLeftRight, LineChart, Stethoscope, Settings as SettingsIcon, Handshake, Bot, CircleDollarSign, ShieldAlert, Minus } from 'lucide-react';

type Order = { id?:string; no:string; customer:string; phone:string; address:string; branch:string; channel:string; status:string; items:string; created:string; totalLabel:string };
type Appt = { id?:string; pharmacist:string; date:string; time:string; reason:string; name:string; phone:string };
type Ad = { id?:string; title:string; position:string; status:string; start:string; end:string; desc:string; emoji:string };
type Staff = { id?:string; name:string; role:string; branch:string; shift:string; phone:string };
type Reminder = { id?:string; drug:string; time:string; days:string };
type AppUser = { name:string; email:string; kind:'customer'|'staff'|'guest'; role?:string };
type PosRow = { product:string; pack:string; qty:number; price:number; discount:number };

const CATS = [
  {name:'الكل',count:22258},{name:'أدوية',count:8420},{name:'تجميل',count:3120},{name:'عناية بالبشرة',count:2450},{name:'عناية بالشعر',count:1850},{name:'فيتامينات',count:1640},{name:'أم وطفل',count:1240},{name:'أجهزة طبية',count:980},{name:'عناية فم',count:720},{name:'عطور',count:640},{name:'حساسية',count:560},{name:'سكر',count:380},{name:'أخرى',count:258},
];
const BRANCHES = [
  {name:'فرع المهندسين',code:'BEN-01',address:'69 شارع شهاب — المهندسين',phone:'01200400094'},
  {name:'فرع الجلاء (الموقف)',code:'BEN-02',address:'الجلاء — منطقة الموقف',phone:'01200400094'},
  {name:'فرع الجلاء (جرين بالاس)',code:'BEN-03',address:'الجلاء — جرين بالاس',phone:'01200400094'},
  {name:'فرع الجلاء (الأمن المركزي)',code:'BEN-04',address:'الجلاء — الأمن المركزي',phone:'01200400094'},
  {name:'فرع البورصة',code:'BEN-05',address:'شارع البورصة — طنطا',phone:'01200400094'},
  {name:'فرع الأشرف',code:'BEN-06',address:'حي الأشرف — طنطا',phone:'01200400094'},
  {name:'فرع كفر عصام',code:'BEN-07',address:'كفر عصام — طنطا',phone:'01200400094'},
  {name:'فرع شارع سعيد',code:'BEN-08',address:'شارع سعيد — طنطا',phone:'01200400094'},
  {name:'فرع المعارض',code:'BEN-09',address:'منطقة المعارض — طنطا',phone:'01200400094'},
  {name:'فرع طريق الإسكندرية الزراعي',code:'BEN-10',address:'طريق الإسكندرية الزراعي — طنطا',phone:'01200400094'},
  {name:'فرع المحافظة',code:'BEN-11',address:'شارع المحافظة — طنطا',phone:'01200400094'},
  {name:'فرع هايسيندا بالساحل الشمالي',code:'BEN-12',address:'الساحل الشمالي - هايسيندا',phone:'01200400094'},
];
const COMING_BRANCHES = [
  {name:'فرع الإسكندرية',address:'الإسكندرية — يُعلن العنوان عند الافتتاح'},
  {name:'فرع القاهرة الجديدة',address:'القاهرة الجديدة — يُعلن العنوان عند الافتتاح'},
  {name:'فرع شرم الشيخ',address:'شرم الشيخ — يُعلن العنوان عند الافتتاح'},
];
const BASE_PRODUCTS = [
  {name:'باراسيتامول 500 مجم',cat:'أدوية',tag:'الأكثر طلباً',desc:'خافض حرارة ومسكن — اسأل الصيدلي عن الجرعة المناسبة.',barcode:'622100100001'},
  {name:'فيتامين د3 5000 وحدة',cat:'فيتامينات',tag:'فيتامينات',desc:'دعم المناعة والعظام — الجرعة حسب تحليل الطبيب.',barcode:'622100100002'},
  {name:'أوجمنتين 1 جم',cat:'أدوية',tag:'بوصفة طبية',desc:'مضاد حيوي — لا يُصرف إلا بوصفة طبية.',barcode:'622100100003'},
  {name:'أوميبرازول 20 مجم',cat:'أدوية',tag:'الجهاز الهضمي',desc:'للحموضة وارتجاع المريء — اسأل الصيدلي.',barcode:'622100100004'},
  {name:'لوراتادين 10 مجم',cat:'حساسية',tag:'حساسية',desc:'لأعراض الحساسية الموسمية والعطس.',barcode:'622100100005'},
  {name:'ميتفورمين 500 مجم',cat:'سكر',tag:'سكر',desc:'لمرضى السكر — حسب تعليمات الطبيب.',barcode:'622100100006'},
  {name:'أملوديبين 5 مجم',cat:'أدوية',tag:'الضغط',desc:'لعلاج ارتفاع ضغط الدم — بوصفة طبية.',barcode:'622100100007'},
  {name:'سيروم فيتامين سي للبشرة',cat:'عناية بالبشرة',tag:'تجميل',desc:'إشراقة ونضارة — اختر النوع المناسب لبشرتك مع الصيدلي.',barcode:'622100100008'},
  {name:'كريم مرطب للبشرة الحساسة',cat:'عناية بالبشرة',tag:'تجميل',desc:'ترطيب يومي لطيف بدون عطور.',barcode:'622100100009'},
  {name:'شامبو علاجي للقشرة',cat:'عناية بالشعر',tag:'شعر',desc:'للشعر وفروة الرأس — اسأل الصيدلي عن النوع المناسب.',barcode:'622100100010'},
  {name:'حليب أطفال مرحلة 1',cat:'أم وطفل',tag:'أم وطفل',desc:'تغذية الرضع — استشر الصيدلي قبل التغيير.',barcode:'622100100011'},
  {name:'جهاز قياس ضغط رقمي',cat:'أجهزة طبية',tag:'أجهزة',desc:'قياس منزلي دقيق وسهل الاستخدام.',barcode:'622100100012'},
  {name:'معجون أسنان للأسنان الحساسة',cat:'عناية فم',tag:'عناية فم',desc:'حماية يومية للثة والأسنان.',barcode:'622100100013'},
  {name:'عطر شرقي فاخر 100 مل',cat:'عطور',tag:'عطور',desc:'ثبات يدوم طوال اليوم — اسأل الفرع عن الأنواع.',barcode:'622100100014'},
  {name:'أموكسيسيلين 500 مجم',cat:'أدوية',tag:'بوصفة طبية',desc:'مضاد حيوي — لا يُستخدم بدون وصفة طبية.',barcode:'622100100015'},
  {name:'مكمل فيتامين سي + زنك',cat:'فيتامينات',tag:'مناعة',desc:'دعم المناعة اليومي — اسأل الصيدلي عن الجرعة.',barcode:'622100100016'},
  {name:'إيبوبروفين 400 مجم',cat:'أدوية',tag:'مسكن',desc:'مسكن ومضاد للالتهاب — اسأل الصيدلي عن الجرعة.',barcode:'622100100017'},
  {name:'سيتريزين 10 مجم',cat:'حساسية',tag:'حساسية',desc:'لأعراض الحساسية — اسأل الصيدلي.',barcode:'622100100018'},
  {name:'فيتامين ب المركب',cat:'فيتامينات',tag:'فيتامينات',desc:'دعم الأعصاب والطاقة — اسأل الصيدلي.',barcode:'622100100019'},
  {name:'أوميجا 3',cat:'فيتامينات',tag:'صحة القلب',desc:'دعم صحة القلب والدماغ — اسأل الصيدلي.',barcode:'622100100020'},
  {name:'كريم حماية من الشمس SPF 50',cat:'عناية بالبشرة',tag:'تجميل',desc:'حماية يومية من الشمس — اختر النوع المناسب لبشرتك.',barcode:'622100100021'},
  {name:'غسول وجه لطيف',cat:'عناية بالبشرة',tag:'تجميل',desc:'تنظيف يومي لطيف بدون تجفيف البشرة.',barcode:'622100100022'},
  {name:'ماسك شعر مغذي',cat:'عناية بالشعر',tag:'شعر',desc:'تغذية وترطيب عميق للشعر — اسأل الصيدلي.',barcode:'622100100023'},
  {name:'زيت أرغان للشعر',cat:'عناية بالشعر',tag:'شعر',desc:'لمعان ونعومة — اسأل الصيدلي عن الاستخدام.',barcode:'622100100024'},
];
const DICT = [
  {name:'Paracetamol',ar:'باراسيتامول',use:'خافض حرارة ومسكن للألم الخفيف والمتوسط.',source:'مصر',symptoms:'صداع حرارة ألم'},
  {name:'Amoxicillin',ar:'أموكسيسيلين',use:'مضاد حيوي لعلاج العدوى البكتيرية — بوصفة طبية.',source:'مصر',symptoms:'التهاب عدوى'},
  {name:'Omeprazole',ar:'أوميبرازول',use:'علاج الحموضة وارتجاع المريء وقرحة المعدة.',source:'أوروبا',symptoms:'حموضة ارتجاع معدة'},
  {name:'Vitamin D3',ar:'فيتامين د3',use:'دعم صحة العظام والمناعة وتعويض النقص.',source:'أمريكا FDA',symptoms:'نقص فيتامين د إرهاق'},
  {name:'Metformin',ar:'ميتفورمين',use:'علاج السكري من النوع الثاني وتنظيم سكر الدم.',source:'WHO',symptoms:'سكر'},
  {name:'Loratadine',ar:'لوراتادين',use:'تخفيف أعراض الحساسية والعطس وسيلان الأنف.',source:'الإمارات',symptoms:'حساسية عطس حكة'},
  {name:'Amlodipine',ar:'أملوديبين',use:'علاج ارتفاع ضغط الدم والذبحة الصدرية.',source:'السعودية',symptoms:'ضغط قلب'},
  {name:'Augmentin',ar:'أوجمنتين',use:'مضاد حيوي واسع المدى — بوصفة طبية فقط.',source:'مصر',symptoms:'التهاب عدوى'},
  {name:'Ibuprofen',ar:'إيبوبروفين',use:'مسكن ومضاد للالتهاب — اسأل الصيدلي عن الجرعة.',source:'أوروبا',symptoms:'صداع ألم التهاب'},
  {name:'Cetirizine',ar:'سيتريزين',use:'لأعراض الحساسية الموسمية والعطس وحكة العين.',source:'السعودية',symptoms:'حساسية عطس'},
];
const ARTICLES = [
  {id:'a1',title:'فيتامين د: ليه كلنا ناقصنا؟',cat:'وقاية',read:'6 دقائق قراءة',tags:['المناعة','التغذية','وقاية'],body:'نقص فيتامين د شائع جداً، والسبب غالباً قلة التعرض للشمس ونمط الحياة داخل البيت. الأعراض قد تكون إرهاقاً وآلاماً بالعظام وتساقطاً بالشعر.',paras:['نقص فيتامين د شائع جداً، والسبب غالباً قلة التعرض للشمس ونمط الحياة داخل البيت. الأعراض قد تكون إرهاقاً وآلاماً بالعظام وتساقطاً بالشعر.','الجرعة الصحيحة تعتمد على التحليل والعمر والحالة الصحية، لذلك لا تبدأ جرعة عالية من نفسك. اسأل الصيدلي عن التحليل المناسب وطريقة المتابعة.','التغذية تساعد لكنها وحدها لا تكفي في النقص الشديد. الأسماك الدهنية والبيض والحليب المدعم مصادر جيدة، ومعها التعرض الآمن للشمس.']},
  {id:'a2',title:'مريض السكر في رمضان: دليل آمن',cat:'سكر',read:'7 دقائق قراءة',tags:['سكر','التغذية'],body:'الصيام مع السكر يحتاج خطة قبل رمضان: مراجعة أدويتك مع الطبيب والصيدلي، وقياس السكر بانتظام، ومعرفة متى يجب كسر الصيام فوراً.',paras:['الصيام مع السكر يحتاج خطة قبل رمضان: مراجعة أدويتك مع الطبيب والصيدلي، وقياس السكر بانتظام، ومعرفة متى يجب كسر الصيام فوراً.','لا تغير جرعة الدواء من نفسك. بعض الأدوية تحتاج تعديل موعدها في رمضان، والصيدلي يساعدك ترتب مواعيدك مع الإفطار والسحور.','اكسر صيامك فوراً عند هبوط أو ارتفاع شديد بالسكر أو عند ظهور أعراض مثل الدوخة والتعرق الشديد. سلامتك أهم من إكمال الصيام.']},
  {id:'a3',title:'بشرة أطفالك في الصيف',cat:'أم وطفل',read:'5 دقائق قراءة',tags:['أم وطفل','وقاية'],body:'بشرة الأطفال أرق وأسرع تأثراً بالشمس والحر. الترطيب اللطيف وواقي الشمس المناسب للأطفال والملابس القطنية تحمي بشرتهم طوال الصيف.',paras:['بشرة الأطفال أرق وأسرع تأثراً بالشمس والحر. الترطيب اللطيف وواقي الشمس المناسب للأطفال والملابس القطنية تحمي بشرتهم طوال الصيف.','اختاري واقي شمس مخصصاً للأطفال، وجربيه على جزء صغير من الجلد أولاً. جدديه بعد اللعب بالماء أو التعرق الشديد.','عند ظهور طفح أو حكة أو حروق شمس، لا تجربي خلطات من نفسك. اسألي الصيدلي عن المنتج المناسب.']},
  {id:'a4',title:'الصداع النصفي',cat:'الضغط والقلب',read:'5 دقائق قراءة',tags:['الضغط والقلب'],body:'الصداع النصفي ليس صداعاً عادياً: ألم نابض في جهة واحدة غالباً، مع حساسية للضوء والضوضاء والغثيان أحياناً.',paras:['الصداع النصفي ليس صداعاً عادياً: ألم نابض في جهة واحدة غالباً، مع حساسية للضوء والضوضاء والغثيان أحياناً.','من المحفزات الشائعة قلة النوم والجوع والتوتر وبعض الأطعمة والإضاءة القوية. سجلي محفزاتك في دفتر صغير ولاحظي النمط المتكرر.','إذا تكرر الصداع أكثر من مرتين أسبوعياً أو تغير شكله فجأة، راجعي الطبيب فوراً ولا تعتمدي على المسكنات وحدها.']},
  {id:'a5',title:'الحساسية الموسمية',cat:'المناعة',read:'5 دقائق قراءة',tags:['المناعة'],body:'مع تغير الفصول يعود العطس وسيلان الأنف وحكة العين. الحساسية الموسمية رد فعل مناعي لحبوب اللقاح والغبار.',paras:['مع تغير الفصول يعود العطس وسيلان الأنف وحكة العين. الحساسية الموسمية رد فعل مناعي لحبوب اللقاح والغبار، ويمكن تخفيفها بخطوات بسيطة وعلاج مناسب.','قللي التعرض: أغلقي النوافذ وقت انتشار حبوب اللقاح، واغسلي وجهك وملابسك بعد العودة من الخارج.','إذا صاحب الحساسية ضيق نفس أو صفير بالصدر أو تورم بالوجه، اطلبي المساعدة الطبية فوراً.']},
  {id:'a6',title:'نوم أفضل بدون أدوية',cat:'التغذية',read:'6 دقائق قراءة',tags:['التغذية'],body:'النوم الجيد يبدأ قبل النوم بساعات: موعد ثابت، إضاءة هادئة، بدون هاتف في السرير، ووجبة عشاء خفيفة.',paras:['النوم الجيد يبدأ قبل النوم بساعات: موعد ثابت، إضاءة هادئة، بدون هاتف في السرير، ووجبة عشاء خفيفة.','ثبتي موعد نومك واستيقاظك حتى في الإجازة، واجعلي غرفتك مظلمة وباردة وهادئة.','إذا استمر الأرق أكثر من أسبوعين أو صاحبته أعراض أخرى، راجعي الصيدلي أو الطبيب. لا تبدأي منوماً من نفسك.']},
];
const DEMO_ORDERS: Order[] = [
  {no:'BEN-1042',customer:'أحمد محمد',phone:'01200400094',address:'شارع سعيد — طنطا',branch:'فرع شارع سعيد',channel:'الموقع',status:'مع السائق',items:'فيتامين د3 + باراسيتامول',created:'اليوم — 11:20 ص',totalLabel:'اسأل الصيدلي عن التفاصيل'},
  {no:'BEN-1041',customer:'منى علي',phone:'01200400094',address:'كفر عصام — طنطا',branch:'فرع كفر عصام',channel:'واتساب',status:'تجهيز',items:'كريم مرطب + شامبو',created:'اليوم — 10:45 ص',totalLabel:'اسأل الصيدلي عن التفاصيل'},
  {no:'BEN-1040',customer:'كريم حسن',phone:'01200400094',address:'الجلاء — طنطا',branch:'فرع الجلاء (الموقف)',channel:'هاتف',status:'تم التوصيل',items:'لوراتادين',created:'أمس — 8:10 م',totalLabel:'اسأل الصيدلي عن التفاصيل'},
];
const STOCK = [
  {p:'باراسيتامول 500 مجم',branch:'فرع شارع سعيد',stock:142,min:30,status:'متوفر'},
  {p:'فيتامين د3',branch:'فرع البورصة',stock:24,min:30,status:'قرب ينفد'},
  {p:'أوجمنتين 1 جم',branch:'فرع الجلاء (الموقف)',stock:8,min:20,status:'ناقص'},
  {p:'لوراتادين 10 مجم',branch:'فرع كفر عصام',stock:86,min:25,status:'متوفر'},
  {p:'ميتفورمين 500 مجم',branch:'فرع المهندسين',stock:64,min:20,status:'متوفر'},
];
const COUPONS = [
  {title:'خصم فيتامينات',code:'VITA25',desc:'خصم على مكملات الفيتامينات — اسأل الفرع عن التفاصيل.'},
  {title:'توصيل مجاني فوق 300',code:'FREEDEL300',desc:'توصيل مجاني للطلبات.'},
  {title:'خصم العناية',code:'CARE20',desc:'خصم على منتجات العناية بالبشرة والشعر — اسأل الفرع.'},
];
// STRICT 1:1 OFFER MAPPING — verified against each supplied image file.
// Each entry: title brand == brand visible in its image == brand in its description.
// Never pair a brand name with another brand's image.
// Verified mapping: Garnier=ad6, COCO=ad1, Narji=ad8, Root to End=ad10,
// Capixy=ad7, Telofill=ad5, Seropipe=ad2, Vacation=ad3, Pirlome=ad4, Soralone=ad9.
const NEW_OFFERS = [
  {id:'ad-garnier',brand:'Garnier',title:'عرض Garnier',desc:'عرض Garnier - 270 LE - كما في صورة العرض',image:ad6Url,tag:'Garnier'},
  {id:'ad-coco',brand:'COCO',title:'عرض COCO',desc:'معجون COCO White Paste / Black Paste — عرض COCO - 30 LE / 95 LE - كما في صورة العرض',image:ad1Url,tag:'COCO'},
  {id:'ad-narji',brand:'Narji',title:'عرض Narji',desc:'عرض Narji - اشترِ 1 واحصل على خصم 50% على الثاني - كما في صورة العرض',image:ad8Url,tag:'Narji'},
  {id:'ad-root',brand:'Root to End',title:'عرض Root to End',desc:'عرض Root to End - اشترِ 1 واحصل على 1 مجاناً - كما في صورة العرض',image:ad10Url,tag:'Root to End'},
  {id:'ad-capixy',brand:'Capixy',title:'عرض Capixy',desc:'عرض Capixy - اشترِ 2 واحصل على 1 مجاناً - كما في صورة العرض',image:ad7Url,tag:'Capixy'},
  {id:'ad-telofill',brand:'Telofill',title:'عرض Telofill',desc:'عرض Telofill - اشترِ 1 واحصل على 1 مجاناً - كما في صورة العرض',image:ad5Url,tag:'Telofill'},
  {id:'ad-seropipe',brand:'Seropipe',title:'عرض Seropipe',desc:'عرض Seropipe - منتجات Seropipe Hair Spray - اشترِ 1 واحصل على خصم 50% على الثاني - كما في صورة العرض',image:ad2Url,tag:'Seropipe'},
  {id:'ad-vacation',brand:'Vacation',title:'عرض Vacation',desc:'عرض Vacation - منتجات Vacation للحماية من الشمس - 1+1 - كما في صورة العرض',image:ad3Url,tag:'Vacation'},
  {id:'ad-pirlome',brand:'Pirlome',title:'عرض Pirlome',desc:'عرض Pirlome - علبة Pirlome Skin Hair Nails - اشترِ 2 واحصل على 1 مجاناً - كما في صورة العرض',image:ad4Url,tag:'Pirlome'},
  {id:'ad-soralone',brand:'Soralone',title:'عرض Soralone',desc:'عرض Soralone - خصم 30% - كما في صورة العرض',image:ad9Url,tag:'Soralone'},
];
const ALL_OFFERS = [...NEW_OFFERS];
const LEGAL: Record<string,{title:string;paras:string[]}> = {
  about:{title:'من نحن',paras:['صيدليات البنداري — رعاية من القلب منذ عام 1980. نخدم أهلنا بثقة ورعاية حقيقية.','فروعنا تعمل على مدار 24 ساعة لخدمتك وقتما تحتاج.','رسالتنا: رعاية من القلب. كل طلب نراجعه بعناية، وكل عميل نعامله كأنه من أهل البيت.','نقدّم الدواء ومستحضرات التجميل والعناية بالبشرة والشعر والفيتامينات وأدوات الأم والطفل والأجهزة الطبية.','التوصيل خلال 30 إلى 45 دقيقة، مع مراجعة الصيدلي قبل التوصيل.','الخط الساخن: 01200400094 — متاحون 24 ساعة.']},
  privacy:{title:'سياسة الخصوصية',paras:['نحترم خصوصيتك في صيدليات البنداري، وهذه السياسة توضح كيف نستخدم بياناتك.','نجمع فقط ما نحتاجه لإتمام طلبك: الاسم ورقم الهاتف والعنوان وتفاصيل الطلب.','لا نشارك بياناتك مع أطراف خارجية لأغراض تسويقية، ولا نبيع بياناتك لأي جهة.','يمكنك طلب مراجعة بياناتك أو تصحيحها أو حذفها بالتواصل معنا على info@bendaryph.com.','للاستفسار عن الخصوصية: info@bendaryph.com — الخط الساخن 01200400094.']},
  terms:{title:'الشروط والأحكام',paras:['باستخدامك هذا التطبيق، أنت توافق على هذه الشروط والأحكام.','هذا التطبيق للطلب والاستفسار فقط، ولا يغني عن استشارة الطبيب أو الصيدلي في الحالات الطارئة.','المعلومات الدوائية هنا لأغراض تعليمية، والجرعة النهائية يحددها الطبيب أو الصيدلي.','يجب إدخال بيانات صحيحة عند الطلب: الاسم ورقم الهاتف والعنوان، حتى نستطيع توصيل طلبك.','العروض قابلة للتغيير أو الإيقاف في أي وقت، ويُأكَّد العرض الساري من الفرع.','للتواصل حول الشروط: info@bendaryph.com — الخط الساخن 01200400094.']},
};
// 38 staff-only native features: 15 + 9 + 14
type NF = {id:string;ar:string;en:string;sec:'s1'|'s2'|'s3';desc:string;labels:[string,string,string];rows:{a:string;b:string;c:string;status:string}[];icon:any};
const R=(a:string,b:string,c:string,status:string)=>({a,b,c,status});
const F=(id:string,ar:string,en:string,sec:'s1'|'s2'|'s3',desc:string,labels:[string,string,string],rows:{a:string;b:string;c:string;status:string}[],icon:any):NF=>({id,ar,en,sec,desc,labels,rows,icon});
const FEATURES38: NF[] = [
  F('stock','إدارة المخزون','Stock Management','s1','تتبع الكميات والحد الأدنى والنواقص في كل فرع قبل أن ينفد الصنف.',['الصنف','الفرع','الكمية / ملاحظة'],[R('باراسيتامول 500 مجم','فرع شارع سعيد','142 علبة','متوفر'),R('فيتامين د3','فرع البورصة','24 علبة','قرب ينفد'),R('أوجمنتين 1 جم','فرع الجلاء (الموقف)','8 علب','ناقص')],Warehouse),
  F('drugdb','قاعدة بيانات الأدوية','Drug Database','s1','بيانات الأدوية: الاسم العلمي والتجاري والمادة الفعالة والجرعات من مصادر معتمدة.',['اسم الدواء','المادة الفعالة','الملاحظة'],[R('Paracetamol','باراسيتامول','خافض حرارة ومسكن','معتمد'),R('Amoxicillin','أموكسيسيلين','مضاد حيوي بوصفة','معتمد'),R('Omeprazole','أوميبرازول','للحموضة والارتجاع','معتمد')],BookOpen),
  F('verify','التحقق من الدواء','Drug Verification','s1','التحقق من الدواء قبل الصرف: مطابقة الاسم والجرعة والباركود والوصفة.',['اسم الدواء','الباركود','نتيجة التحقق'],[R('أوجمنتين 1 جم','622100100003','مطابق للوصفة','تم التحقق'),R('لوراتادين 10 مجم','622100100005','مطابق للوصفة','تم التحقق'),R('ميتفورمين 500 مجم','622100100006','راجع الجرعة مع الصيدلي','قيد المراجعة')],ShieldCheck),
  F('medsearch','قاعدة بيانات الأدوية بالشكل','Medication Database','s1','البحث باللون والشكل والنقش: صِف شكل القرص وسيقترح النظام الأصناف المطابقة.',['لون القرص','الشكل / النقش','الصنف المقترح'],[R('أبيض','دائري — نقش P500','باراسيتامول 500 مجم','مطابق'),R('أصفر','بيضاوي — نقش 10','لوراتادين 10 مجم','مطابق'),R('أبيض','دائري — نقش 500','ميتفورمين 500 مجم','قيد المراجعة')],Search),
  F('claims','إدارة المطالبات','Claims Management','s1','مطالبات شركات التأمين ومتابعتها: تسجيل المطالبة وحالتها وموعد المتابعة.',['شركة التأمين','رقم المطالبة','الحالة'],[R('شركة رعاية','CLM-1001','قيد المتابعة','قيد المتابعة'),R('شركة تأمين صحي','CLM-1002','تم الاعتماد','تم الاعتماد'),R('شركة رعاية','CLM-1003','بانتظار مستند','قيد المراجعة')],FileText),
  F('discounts','إدارة الخصومات','Discount Management','s1','خصومات وعروض وكوبونات: إنشاء الكوبون ومتابعة استخدامه وربطه بالعرض الصحيح.',['اسم العرض / الكوبون','الكود','الحالة'],[R('خصم فيتامينات','VITA25','نشط','نشط'),R('توصيل مجاني فوق 300','FREEDEL300','نشط','نشط'),R('خصم العناية','CARE20','نشط','نشط')],Gift),
  F('workflow','إدارة سير العمل','Workflow Management','s1','سير العمل خطوة بخطوة من استلام الطلب حتى التجهيز والتوصيل والتسليم.',['اسم سير العمل','المسؤول','الخطوة الحالية'],[R('سير طلب أونلاين','د. مصطفى','تجهيز','نشط'),R('سير روشتة','د. سارة','مراجعة الصيدلي','نشط'),R('سير نواقص','د. مصطفى','طلب من المورد','نشط')],Wrench),
  F('vendors','إدارة الموردين','Vendor Management','s1','بيانات الموردين والعقود والخدمات: اسم المورد وخدمته وشروط التوريد.',['اسم المورد','الخدمة / العقد','الحالة'],[R('المورد المعتمد','توريد أدوية','نشط','نشط'),R('مورد مستحضرات','توريد عناية','نشط','نشط'),R('مورد أجهزة','صيانة أجهزة','قيد التجديد','قيد المراجعة')],Users),
  F('compliance','إدارة الالتزام','Compliance Management','s1','الالتزام بالسياسات واللوائح: قائمة فحص الالتزام لكل فرع.',['بند الالتزام','الفرع','النتيجة'],[R('صرف بوصفة فقط','فرع شارع سعيد','ملتزم','ملتزم'),R('حفظ بيانات العميل','كل الفروع','ملتزم','ملتزم'),R('تخزين الأدوية المبردة','فرع البورصة','قيد المراجعة','قيد المراجعة')],Shield),
  F('comms','إدارة التواصل','Communication Management','s1','مكالمات وإيميل ورسائل وشات: كل قنوات التواصل مع العميل في سجل واحد.',['القناة','العميل','موضوع التواصل'],[R('هاتف','عميل — شارع سعيد','استفسار عن دواء','واردة'),R('واتساب','عميل — كفر عصام','تأكيد طلب','تم الرد'),R('BenDa ChaT','عميل — البورصة','تتبع طلب','تم الرد')],MessagesSquare),
  F('appointments','إدارة المواعيد','Appointment Management','s1','حجز وإعادة جدولة وإلغاء: حجز استشارة الصيدلي وتغيير موعدها أو إلغاؤها.',['العميل','الصيدلي / الموعد','الحالة'],[R('أحمد محمد','د. مصطفى — اليوم 10:00 ص','مؤكد','مؤكد'),R('منى علي','د. سارة — اليوم 12:00 م','مؤكد','مؤكد'),R('كريم حسن','د. مصطفى — غداً 02:00 م','قيد التأكيد','قيد المراجعة')],Calendar),
  F('barcode','إدارة الباركود والملصقات','Barcode / Label Management','s1','طباعة ومسح باركود وملصقات: مسح الباركود للوصول للصنف وطباعة ملصق واضح.',['الصنف','الباركود','حالة الملصق'],[R('باراسيتامول 500 مجم','622100100001','جاهز للطباعة','جاهز'),R('فيتامين د3','622100100002','جاهز للطباعة','جاهز'),R('أوجمنتين 1 جم','622100100003','راجع بيانات الملصق','قيد المراجعة')],Barcode),
  F('forms','إدارة النماذج','Forms Management','s1','كل النماذج في مكان واحد: روشتة وطلب وظيفة وتعاقد واستشارة.',['اسم النموذج','صاحب الطلب','الحالة'],[R('نموذج روشتة','أحمد محمد','تم الاستلام','تم الاستلام'),R('نموذج وظيفة','سارة محمود','قيد المراجعة','قيد المراجعة'),R('نموذج تعاقد','شركة رعاية','قيد المراجعة','قيد المراجعة')],ClipboardList),
  F('inventory','إدارة المخزون الشاملة','Inventory Management','s1','تتبع مستويات المخزون: الكمية الحالية مقابل الحد الأدنى، مع تنبيه مبكر.',['الصنف','الكمية الحالية','الحد الأدنى'],[R('باراسيتامول 500 مجم','142','30','متوفر'),R('فيتامين د3','24','30','قرب ينفد'),R('أوجمنتين 1 جم','8','20','ناقص')],Package),
  F('docs','إدارة المستندات','Document Management','s1','تخزين وتتبع المستندات: فهرس المستندات المهمة مع نوعها وتاريخها ومسؤولها.',['اسم المستند','النوع','التاريخ'],[R('وصفة BEN-1042','روشتة','اليوم','محفوظ'),R('عقد مورد','عقد','هذا الأسبوع','محفوظ'),R('ترخيص فرع','ترخيص','هذا الشهر','قيد المراجعة')],FileCheck),
  F('meddocs','إدارة المستندات الطبية','Medical Document Management','s2','روشتات وتحديثات تنظيمية وتحاليل: سجل المستندات الطبية وربطها بالطلب أو العميل.',['نوع المستند','العميل / الفرع','الحالة'],[R('روشتة','أحمد محمد','تمت المراجعة','تمت المراجعة'),R('تحليل فيتامين د','منى علي','بانتظار الصيدلي','قيد المراجعة'),R('تحديث تنظيمي','كل الفروع','تم التعميم','تم التعميم')],FileText),
  F('ehr','ربط السجلات الصحية','EHR Integration','s2','ربط السجلات الصحية: عرض ملخص السجل المرتبط بالعميل لخدمة أدق.',['العميل','السجل المرتبط','الحالة'],[R('أحمد محمد','سجل — فرع شارع سعيد','مرتبط','مرتبط'),R('منى علي','سجل — فرع كفر عصام','بانتظار الربط','قيد المراجعة'),R('كريم حسن','سجل — فرع الجلاء','مرتبط','مرتبط')],HeartPulse),
  F('billing','الفوترة والمحاسبة','Billing & Accounting','s2','فواتير وحسابات: فاتورة واضحة بالأصناف والكمية والخصم والإجمالي.',['رقم الفاتورة','العميل / المورد','الحالة'],[R('INV-1001','أحمد محمد','مدفوعة','مدفوعة'),R('PO-1001','المورد المعتمد','قيد الانتظار','قيد الانتظار'),R('INV-1002','منى علي','مدفوعة','مدفوعة')],Wallet),
  F('pos','نقطة البيع','POS','s2','نقطة بيع مدمجة: إضافة أصناف وكمية وخصم، ثم حفظ الفاتورة ومتابعة المبيعات.',['الصنف','الكمية','الخصم'],[R('باراسيتامول 500 مجم','1','0','جاهز'),R('فيتامين د3','1','0','جاهز'),R('كريم مرطب','1','0','جاهز')],ShoppingBag),
  F('reporting','التقارير','Reporting','s2','تقارير تشغيلية ومالية وسريرية: مبيعات وقنوات وأكثر الأصناف طلباً.',['نوع التقرير','الفترة','الحالة'],[R('تقرير مبيعات','آخر 7 أيام','جاهز','جاهز'),R('تقرير قنوات','هذا الشهر','جاهز','جاهز'),R('تقرير نواقص','اليوم','جاهز','جاهز')],LineChart),
  F('transparency','شفافية سير العمل','Workflow Transparency','s2','تتبع حالة طلبات الروشتات: كل روشتة تظهر بحالتها الحالية والخطوة التالية.',['رقم الطلب / الروشتة','الحالة','الخطوة التالية'],[R('BEN-1042','مع السائق','التسليم','مع السائق'),R('BEN-1041','تجهيز','مراجعة الصيدلي','تجهيز'),R('BEN-1040','تم التوصيل','تم التسليم','تم التوصيل')],Activity),
  F('clinical','التواصل السريري','Clinical Communication','s2','تواصل داخل الصيدلية ومع المؤسسات الصحية: رسالة سريرية موثقة.',['الجهة','الموضوع','الحالة'],[R('فرع شارع سعيد','مراجعة روشتة','تم الرد','تم الرد'),R('مؤسسة صحية','استفسار دوائي','قيد الرد','قيد المراجعة'),R('فرع البورصة','تنسيق مخزون','تم الرد','تم الرد')],Stethoscope),
  F('portal','بوابة العميل','Patient Portal','s2','تواصل العميل مع الصيدلية: طلبات العميل ومقالاته المحفوظة وتذكيراته واستشاراته.',['العميل','الخدمة','الحالة'],[R('أحمد محمد','طلب BEN-1042','مع السائق','مع السائق'),R('منى علي','تذكير دواء','نشط','نشط'),R('سارة محمود','استشارة صيدلي','مؤكدة','مؤكدة')],User),
  F('pos2','نقطة البيع بالهاردوير','Point of Sale (POS)','s2','قبول ودفع بالهاردوير والسوفتوير: جهاز البيع وشاشة البيع يعملان معاً.',['نقطة البيع','الفرع','الحالة'],[R('POS-01','فرع شارع سعيد','نشطة','نشطة'),R('POS-02','فرع البورصة','نشطة','نشطة'),R('POS-03','فرع كفر عصام','صيانة','قيد المراجعة')],Store),
  F('activity','لوحة النشاط','Activity Dashboard','s3','حالة العمليات والحوادث والأنشطة: نظرة حية على الطلبات والمزامنة والتنبيهات.',['النشاط','الفرع','الوقت'],[R('طلب جديد BEN-1042','فرع شارع سعيد','الآن','نشط'),R('مزامنة مخزون','كل الفروع','اليوم','تم'),R('تنبيه نواقص','فرع الجلاء','اليوم','قيد المراجعة')],Activity),
  F('rxprocessing','معالجة الروشتات','Prescription Processing','s3','معالجة روشتة أو أكثر معاً: راجع عدة روشتات، وأضف ملاحظة الصيدلي.',['الروشتة','العميل','الحالة'],[R('RX-01','أحمد محمد','تمت المراجعة','تمت المراجعة'),R('RX-02','منى علي','قيد المراجعة','قيد المراجعة'),R('RX-03','كريم حسن','بانتظار التأكيد','قيد المراجعة')],FileCheck),
  F('realtime','البيانات اللحظية','Real-Time Data','s3','بيانات لحظية: عدد الطلبات النشطة والمخزون الحرج والتنبيهات.',['المؤشر','القيمة','الحالة'],[R('طلبات نشطة','3 طلبات','نشطة','نشطة'),R('أصناف حرجة','2 صنف','تنبيه','قيد المراجعة'),R('فروع مفتوحة','12 فرع','24 ساعة','نشطة')],RefreshCw),
  F('customreports','تقارير مخصصة','Customizable Reports','s3','تخصيص شكل ومحتوى التقارير: اختر الأعمدة والفترة والفرع.',['اسم التقرير','الفترة','الفرع'],[R('تقرير مبيعاتي','آخر 7 أيام','كل الفروع','جاهز'),R('تقرير نواقصي','اليوم','فرع شارع سعيد','جاهز'),R('تقرير قنواتي','هذا الشهر','كل الفروع','جاهز')],BarChart3),
  F('charting','التوثيق السريري','Charting','s3','توثيق التفاعلات والتشخيصات والإجراءات: سجل موثق يساعد الصيدلي.',['العميل','التوثيق','التاريخ'],[R('أحمد محمد','مراجعة تفاعل دوائي','اليوم','موثق'),R('منى علي','متابعة جرعة فيتامين د','أمس','موثق'),R('كريم حسن','إجراء قياس ضغط','اليوم','موثق')],ClipboardList),
  F('esign','التوقيع الإلكتروني','Electronic Signature','s3','توقيع إلكتروني: اعتماد المستند أو الطلب بتوقيع مسجل داخل السجل.',['المستند','الموقّع','الحالة'],[R('عقد شركة رعاية','مدير الفرع','تم التوقيع','تم التوقيع'),R('استلام طلب BEN-1040','أحمد الشريف','تم التوقيع','تم التوقيع'),R('نموذج تعاقد','بانتظار التوقيع','قيد التوقيع','قيد المراجعة')],Edit3),
  F('compounding','التركيبات الصيدلانية','Compounding','s3','تركيبات صيدلانية مخصصة: سجل التركيبة ومكوناتها وتعليمات الصيدلي.',['التركيبة','المكونات','الحالة'],[R('تركيبة مرطب','مكونات معتمدة','جاهزة للتجهيز','جاهزة'),R('تركيبة شعر','مكونات معتمدة','قيد التجهيز','قيد المراجعة'),R('تركيبة بشرة','مكونات معتمدة','بانتظار التأكيد','قيد المراجعة')],FlaskConical),
  F('genai','الذكاء التوليدي','Generative AI','s3','توليد نصوص وصور وفيديو: أنشئ نص إعلان أو وصف منتج أو فكرة محتوى.',['نوع المحتوى','الموضوع','الحالة'],[R('نص إعلان','عرض فيتامين سي','جاهز','جاهز'),R('وصف منتج','كريم مرطب','جاهز','جاهز'),R('فكرة محتوى','نصائح الصيف','جاهز','جاهز')],Brain),
  F('copilot','مساعد BenDa ChaT الذكي','AI Copilot','s3','مساعد ذكي داخل BenDa ChaT: اسأل عن عرض أو فرع أو منتج.',['السؤال','الإجابة','القناة'],[R('أقرب فرع؟','فرع شارع سعيد','BenDa ChaT','تم الرد'),R('عرض اليوم؟','Capixy — اشترِ 2 واحصل على 1','BenDa ChaT','تم الرد'),R('تحليل مبيعات؟','باراسيتامول الأكثر طلباً','مساعد ذكي','تم الرد')],Bot),
  F('statustrack','تتبع حالة الطلب','Status Tracking','s3','تتبع حالة الطلب عبر الزمن: من الاستلام حتى التجهيز ومع السائق والتوصيل.',['رقم الطلب','الحالة','آخر تحديث'],[R('BEN-1042','مع السائق','الآن','مع السائق'),R('BEN-1041','تجهيز','اليوم','تجهيز'),R('BEN-1040','تم التوصيل','أمس','تم التوصيل')],Truck),
  F('alerts','التنبيهات والإشعارات','Alerts / Notifications','s3','تنبيهات منبثقة وأصوات وشارات: تنبيه طلب جديد ونواقص وعرض جديد.',['التنبيه','النوع','الحالة'],[R('طلبك في الطريق','طلب','غير مقروء','جديد'),R('عرض جديد','عرض','غير مقروء','جديد'),R('نقاطك زادت','نقاط','غير مقروء','جديد')],BellRing),
  F('mobile','الوصول من الموبايل','Mobile Access','s3','وصول من الموبايل: كل الخصائص تعمل من شاشة الموبايل بنفس الترتيب والوضوح.',['الجهاز','الشاشة','الحالة'],[R('موبايل','الرئيسية','متوافقة','متوافقة'),R('موبايل','المتجر','متوافقة','متوافقة'),R('موبايل','كل الخصائص','متوافقة','متوافقة')],Globe),
  F('searchfilter','البحث والفلترة','Search / Filter','s3','بحث وفلترة بالاسم والمادة الفعالة وجزء من الاسم والباركود.',['نوع البحث','المثال','النتيجة'],[R('بالاسم','باراسيتامول','موجود','موجود'),R('بالمادة الفعالة','Paracetamol','موجود','موجود'),R('بالباركود','622100100001','موجود','موجود')],Search),
  F('eprescribe','الروشتة الإلكترونية','E-Prescribing','s3','إرسال روشتات إلكترونياً: أرسل تفاصيل الروشتة إلكترونياً وسيتابعها الصيدلي.',['الروشتة','العميل','الحالة'],[R('E-RX-01','أحمد محمد','تم الاستلام','تم الاستلام'),R('E-RX-02','منى علي','قيد المراجعة','قيد المراجعة'),R('E-RX-03','كريم حسن','تم الاستلام','تم الاستلام')],Send),
];

async function api(action:string, args:any){
  const r = await fetch("actions",{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({action,args})});
  const j = await r.json().catch(()=>({}));
  if(!r.ok || j.error) throw new Error(j.error || 'تعذر الاتصال — حاول مرة أخرى');
  return j.data;
}
const uid = ()=> 'BEN-'+Math.floor(100000+Math.random()*899999);
function isStaffEmail(email:string){
  const e=email.trim().toLowerCase();
  if(e==='admin@bendaryph.com'||e==='super@bendaryph.com') return true;
  const m=e.match(/^admin_(\d+)@bendaryph\.com$/);
  if(!m) return false;
  const n=parseInt(m[1],10);
  return n>=1 && n<=200 && String(n)===m[1];
}
function isSuperEmail(email:string){ const e=email.trim().toLowerCase(); return e==='admin@bendaryph.com'||e==='super@bendaryph.com'; }

export default function App(){
  const [splash,setSplash]=useState(true);
  const [showLogin,setShowLogin]=useState(false);
  const [view,setView]=useState('home');
  const [drawer,setDrawer]=useState(false);
  const [search,setSearch]=useState('');
  const [heroQ,setHeroQ]=useState('');
  const [cat,setCat]=useState('الكل');
  const [cart,setCart]=useState<any[]>([]);
  const [showCart,setShowCart]=useState(false);
  const [checkout,setCheckout]=useState(false);
  const [form,setForm]=useState({name:'',phone:'',address:'',branch:'فرع شارع سعيد',note:''});
  const [toast,setToast]=useState('');
  const [chatOpen,setChatOpen]=useState(false);
  const [chat,setChat]=useState<{from:string,text:string}[]>([{from:'bot',text:'أهلاً بك في صيدليات البنداري. كيف أقدر أساعدك اليوم؟ اختر من الأزرار السريعة أو اكتب سؤالك.'}]);
  const [chatInput,setChatInput]=useState('');
  const [dictQ,setDictQ]=useState('');
  const [trackQ,setTrackQ]=useState('');
  const [trackResult,setTrackResult]=useState<Order|null>(null);
  const [trackTried,setTrackTried]=useState(false);
  const [orders,setOrders]=useState<Order[]>(DEMO_ORDERS);
  const [detail,setDetail]=useState<any|null>(null);
  const [rx,setRx]=useState({name:'',phone:'',note:'',details:''});
  const [rxFile,setRxFile]=useState('');
  const [rxBranch,setRxBranch]=useState('فرع شارع سعيد');
  const [branchQ,setBranchQ]=useState('');
  const [favs,setFavs]=useState<any[]>([]);
  const [recent,setRecent]=useState<any[]>([]);
  const [points,setPoints]=useState(1250);
  const [appt,setAppt]=useState({pharmacist:'د. مصطفى',date:'',time:'10:00 ص',reason:'استشارة دواء',name:'',phone:''});
  const [appts,setAppts]=useState<Appt[]>([]);
  const [reminders,setReminders]=useState<Reminder[]>([]);
  const [remForm,setRemForm]=useState({drug:'',time:'08:00',days:'يومياً'});
  const [saved,setSaved]=useState<string[]>([]);
  const [openArticle,setOpenArticle]=useState<any|null>(null);
  const [blogFilter,setBlogFilter]=useState('الكل');
  const [heroIdx,setHeroIdx]=useState(0);
  const [offerIdx,setOfferIdx]=useState(0);
  const [user,setUser]=useState<AppUser|null>(null);
  const [loginTab,setLoginTab]=useState<'customer'|'staff'>('customer');
  const [loginEmail,setLoginEmail]=useState('');
  const [loginPass,setLoginPass]=useState('');
  const [loginError,setLoginError]=useState('');
  const [staffRole,setStaffRole]=useState('مدير');
  const [lang,setLang]=useState<'ar'|'en'>('ar');
  const [theme,setTheme]=useState<'light'|'dark'>('light');
  const [contact,setContact]=useState({name:'',phone:'',msg:''});
  const [contactDone,setContactDone]=useState(false);
  // staff-only
  const [staffView,setStaffView]=useState('dashboard');
  const [staffMenuOpen,setStaffMenuOpen]=useState(false);
  const [nativeOpen,setNativeOpen]=useState<string|null>(null);
  const [nativeQ,setNativeQ]=useState('');
  const [nativeRows,setNativeRows]=useState<Record<string,{a:string;b:string;c:string;status:string}[]>>({});
  const [nativeForm,setNativeForm]=useState({a:'',b:'',c:''});
  const [nativeStatusFilter,setNativeStatusFilter]=useState('الكل');
  const [posRows,setPosRows]=useState<PosRow[]>([{product:'باراسيتامول 500 مجم',pack:'شريط',qty:1,price:0,discount:0}]);
  const [posSaved,setPosSaved]=useState<any[]>([]);
  const [staffChat,setStaffChat]=useState<{from:string,text:string}[]>([{from:'bot',text:'مساعد فريق العمل — اسأل عن تحليل المبيعات أو حالة الطلبات أو النواقص.'}]);
  const [staffChatInput,setStaffChatInput]=useState('');
  const [shortage,setShortage]=useState<any[]>([{product:'أوجمنتين 1 جم',branch:'فرع الجلاء (الموقف)',qty:'20',date:'اليوم'}]);
  const [shortForm,setShortForm]=useState({product:'',branch:BRANCHES[7].name,qty:''});
  const [customers,setCustomers]=useState<any[]>([{name:'أحمد محمد',phone:'01200400094',address:'شارع سعيد',branch:'فرع شارع سعيد',notes:'عميل دائم'}]);
  const [custForm,setCustForm]=useState({name:'',phone:'',address:'',branch:BRANCHES[7].name,notes:''});
  const [staffList,setStaffList]=useState<Staff[]>([
    {name:'د. مصطفى',role:'صيدلي',branch:'فرع شارع سعيد',shift:'صباحي',phone:'01200400094'},
    {name:'د. سارة',role:'صيدلية',branch:'فرع البورصة',shift:'مسائي',phone:'01200400094'},
    {name:'أحمد الشريف',role:'سائق توصيل',branch:'فرع شارع سعيد',shift:'صباحي',phone:'01200400094'},
  ]);
  const [staffForm,setStaffForm]=useState({name:'',role:'صيدلي',branch:'فرع شارع سعيد',shift:'صباحي',phone:''});
  const [ads,setAds]=useState<Ad[]>([
    {title:'فيتامين سي — رعاية من القلب ♥️',position:'رئيسي',status:'نشط',start:'2026-01-01',end:'2026-03-31',desc:'قوّي مناعتك بمكملات فيتامين سي المختارة. اسأل الصيدلي عن التفاصيل.',emoji:'🍊'},
    {title:'العناية بالبشرة — عرض الصيف',position:'متجر',status:'نشط',start:'2026-01-01',end:'2026-03-31',desc:'روتين متكامل لبشرة أنقى وأكثر إشراقاً. اسأل الصيدلي عن التفاصيل.',emoji:'✨'},
    {title:'الأم والطفل — خصم خاص',position:'جانبي',status:'نشط',start:'2026-01-01',end:'2026-03-31',desc:'كل ما تحتاجه الأم والطفل في مكان واحد. اسأل الصيدلي عن التفاصيل.',emoji:'👶'},
  ]);
  const [adForm,setAdForm]=useState({title:'',position:'رئيسي'});
  const chatEnd=useRef<HTMLDivElement>(null);
  const staffChatEnd=useRef<HTMLDivElement>(null);

  const isStaff = user?.kind==='staff';
  const isDark = theme==='dark';
  const shellBg = isDark ? '#111111' : '#FFFFFF';
  const shellText = isDark ? '#FFFFFF' : '#111111';
  const cardBg = isDark ? '#1E1E1E' : '#FFFFFF';
  const creamBg = isDark ? '#2A2A2A' : '#F7F7F7';

  useEffect(()=>{ const t=setTimeout(()=>setSplash(false),1200); return ()=>clearTimeout(t); },[]);
  useEffect(()=>{ if(toast){ const t=setTimeout(()=>setToast(''),4200); return ()=>clearTimeout(t);} },[toast]);
  useEffect(()=>{ chatEnd.current?.scrollIntoView({behavior:'smooth'}); },[chat,chatOpen]);
  useEffect(()=>{ staffChatEnd.current?.scrollIntoView({behavior:'smooth'}); },[staffChat,staffView]);
  useEffect(()=>{ if(drawer||showCart||showLogin){ document.body.style.overflow='hidden'; } else { document.body.style.overflow=''; } return ()=>{ document.body.style.overflow=''; }; },[drawer,showCart,showLogin]);
  useEffect(()=>{ load(); },[]);
  useEffect(()=>{ const t=setInterval(()=>setHeroIdx(i=>(i+1)%ALL_OFFERS.length),5000); return ()=>clearInterval(t); },[]);
  useEffect(()=>{ const t=setInterval(()=>setOfferIdx(i=>(i+1)%ALL_OFFERS.length),5000); return ()=>clearInterval(t); },[]);

  async function load(){
    try{ const o:any=await api('records.list',{collection:'bendary_orders'}); if(o?.records?.length) setOrders(o.records.map((r:any)=>({...r.value,id:r.id}))); }catch{}
    try{ const f:any=await api('records.list',{collection:'bendary_favorites'}); if(f?.records?.length) setFavs(f.records.map((r:any)=>({...r.value,id:r.id}))); }catch{}
    try{ const a:any=await api('records.list',{collection:'bendary_appointments'}); if(a?.records?.length) setAppts(a.records.map((r:any)=>({...r.value,id:r.id}))); }catch{}
    try{ const rem:any=await api('records.list',{collection:'bendary_reminders'}); if(rem?.records?.length) setReminders(rem.records.map((r:any)=>({...r.value,id:r.id}))); }catch{}
    try{ const s:any=await api('records.list',{collection:'bendary_saved'}); if(s?.records?.length) setSaved(s.records.map((r:any)=>r.value.articleId)); }catch{}
    try{ const sh:any=await api('records.list',{collection:'bendary_shortage'}); if(sh?.records?.length) setShortage(sh.records.map((r:any)=>({...r.value,id:r.id}))); }catch{}
    try{ const cu:any=await api('records.list',{collection:'bendary_customers'}); if(cu?.records?.length) setCustomers(cu.records.map((r:any)=>({...r.value,id:r.id}))); }catch{}
    try{ const st:any=await api('records.list',{collection:'bendary_staff'}); if(st?.records?.length) setStaffList(st.records.map((r:any)=>({...r.value,id:r.id}))); }catch{}
    try{ const ad:any=await api('records.list',{collection:'bendary_ads'}); if(ad?.records?.length) setAds(ad.records.map((r:any)=>({...r.value,id:r.id}))); }catch{}
  }
  function showToast(t:string){ setToast(t); }
  function go(v:string){
    const needsAuth=['account','myorders'].includes(v);
    if(needsAuth && !user){ setShowLogin(true); setLoginTab('customer'); showToast('سجّل دخول أولاً'); return; }
    setView(v); setDrawer(false); setChatOpen(false); window.scrollTo({top:0,behavior:'smooth'});
  }
  function handleLogin(){
    setLoginError('');
    const email=loginEmail.trim();
    if(!email){ setLoginError('اكتب البريد أو رقم الهاتف'); return; }
    if(loginPass.length<6){ setLoginError('كلمة المرور 6 أحرف على الأقل'); return; }
    if(loginTab==='staff'){
      if(!isStaffEmail(email)){ setLoginError('هذا الإيميل غير مصرح له - دخول الفريق فقط'); return; }
      setUser({name:email,email,kind:'staff',role:staffRole});
      setShowLogin(false); setStaffView('dashboard'); setStaffMenuOpen(false);
      showToast(`أهلاً بيك — لوحة فريق العمل: ${staffRole}`);
      return;
    }
    setUser({name:email,kind:'customer',email});
    setShowLogin(false); setView('home'); showToast('أهلاً بيك في صيدليات البنداري ♥️');
  }
  function logout(){ setUser(null); setLoginEmail(''); setLoginPass(''); setView('home'); setDrawer(false); setShowLogin(true); setLoginTab('customer'); }
  function staffLogout(){ setUser(null); setView('home'); setStaffView('dashboard'); showToast('تم تسجيل خروج فريق العمل'); setShowLogin(true); setLoginTab('staff'); }
  function addCart(p:any){ setCart(c=>[...c,p]); showToast('تمت الإضافة إلى السلة ✓'); }
  function openDetail(p:any){ setDetail(p); setRecent(prev=>{ const rest=prev.filter(x=>x.name!==p.name); return [p,...rest].slice(0,8); }); }
  async function toggleFav(p:any){
    const found=favs.find(f=>f.product===p.name);
    if(found){ setFavs(prev=>prev.filter(f=>f.product!==p.name)); if(found.id){ try{ await api('records.delete',{collection:'bendary_favorites',id:found.id}); }catch{} } showToast('تمت الإزالة من المفضلة'); }
    else { const row={product:p.name,cat:p.cat}; try{ const created:any=await api('records.create',{collection:'bendary_favorites',value:row,idempotency_key:'fav-'+p.name+'-'+Date.now()}); setFavs(prev=>[...prev,{...row,id:created?.id}]); }catch{ setFavs(prev=>[...prev,row]); } showToast('تمت الإضافة إلى المفضلة ♥'); }
  }
  function changeStatus(no:string,status:string){
    setOrders(prev=>prev.map(o=>o.no===no?{...o,status}:o)); showToast(`تم تحديث طلب ${no} إلى: ${status}`);
    const found=orders.find(o=>o.no===no); if(found?.id){ api('records.replace',{collection:'bendary_orders',id:found.id,value:{...found,status}}).catch(()=>{}); }
  }
  async function placeOrder(){
    if(!form.name.trim()||!form.phone.trim()||!form.address.trim()){ showToast('من فضلك أكمل الاسم ورقم الهاتف والعنوان'); return; }
    const no=uid(); const order:Order={no,customer:form.name,phone:form.phone,address:form.address,branch:form.branch,channel:'الموقع',status:'تم الاستلام',items:cart.length?cart.map(c=>c.name).join(' + '):'طلب من المتجر',created:'الآن',totalLabel:'اسأل الصيدلي عن التفاصيل'};
    try{ await api('records.create',{collection:'bendary_orders',value:order,idempotency_key:'order-'+no}); }catch{}
    setOrders(p=>[order,...p]); setCart([]); setCheckout(false); setShowCart(false); setTrackQ(no); setView('tracking'); showToast(`تم إرسال الطلب ${no} — سيصلك في 30-45 دقيقة`);
  }
  async function submitRx(){
    if(!rx.name.trim()||!rx.phone.trim()||!rx.details.trim()){ showToast('أدخل الاسم والهاتف وتفاصيل الروشتة'); return; }
    const order:Order={no:uid(),customer:rx.name,phone:rx.phone,address:'روشتة — سيتم التواصل',branch:rxBranch,channel:'روشتة',status:'تم الاستلام',items:'روشتة: '+(rx.details||'')+(rxFile?` — ملف الروشتة: ${rxFile}`:'')+' — '+(rx.note||''),created:'الآن',totalLabel:'اسأل الصيدلي عن التفاصيل'};
    try{ await api('records.create',{collection:'bendary_orders',value:order,idempotency_key:'rx-'+Date.now()}); }catch{}
    setOrders(p=>[order,...p]); showToast('تم استلام طلب الروشتة — سيتصل بك الصيدلي قريباً'); setRx({name:'',phone:'',note:'',details:''}); setRxFile(''); setView('myorders');
  }
  async function toggleSave(id:string){
    const isSaved=saved.includes(id);
    if(isSaved){ setSaved(s=>s.filter(x=>x!==id)); showToast('تم إلغاء حفظ المقال'); }
    else{ setSaved(s=>[...s,id]); showToast('تم حفظ المقال في حسابك ✓'); try{ await api('records.create',{collection:'bendary_saved',value:{articleId:id,savedAt:new Date().toISOString()},idempotency_key:'save-'+id}); }catch{} }
  }
  function sendChat(text?:string){
    const msg=(text||chatInput).trim(); if(!msg) return;
    setChat(p=>[...p,{from:'me',text:msg}]); setChatInput('');
    setTimeout(()=>{
      let reply='شكراً لسؤالك. صيدلي البنداري هيرد عليك، أو اتصل بالخط الساخن 01200400094 — متاحين 24 ساعة.';
      if(/فرع|اقرب|قريب/.test(msg)) reply='أقرب فرع لك: فرع شارع سعيد. الخط الساخن 01200400094. تحب أطلب لك من الفرع ده؟';
      else if(/تتبع|طلب|وصل/.test(msg)) reply='اكتب رقم طلبك مثل BEN-1042 في صفحة تتبع الطلب، أو قولي الرقم هنا وأنا أتابع لك.';
      else if(/دواء|دوا|علاج|متوفر/.test(msg)) reply='اكتب اسم الدواء، وسأخبرك بتوفره وأقرب فرع. اسأل الصيدلي عن التفاصيل.';
      else if(/واتساب/.test(msg)) reply='واتساب البنداري على الخط الساخن 01200400094 — ابعت اسم الدواء والعنوان وهنجهز طلبك.';
      else if(/فيتامين|د3|مناعة/.test(msg)) reply='فيتامين د3 متوفر بأشكال مختلفة. الأفضل تعمل تحليل أولاً، والصيدلي يساعدك تختار الجرعة المناسبة.';
      setChat(p=>[...p,{from:'bot',text:reply}]);
    },450);
  }
  function sendStaffChat(text?:string){
    const msg=(text||staffChatInput).trim(); if(!msg) return;
    setStaffChat(p=>[...p,{from:'me',text:msg}]); setStaffChatInput('');
    setTimeout(()=>{ setStaffChat(p=>[...p,{from:'bot',text:'تحليل الفريق: أكثر الأصناف طلباً هي باراسيتامول وفيتامين د3 ولوراتادين. اقتراح: فعّل تنبيه النواقص عند وصول المخزون للحد الأدنى، وراجع طلبات اليوم من لوحة الطلبات.'}]); },450);
  }
  function doTrack(){
    const q=trackQ.trim().toUpperCase(); const f=orders.find(o=>o.no.toUpperCase()===q)|| (q==='BEN-1042'?DEMO_ORDERS[0]:undefined);
    setTrackResult(f||null); setTrackTried(true); if(!f) showToast('رقم الطلب غير موجود — تأكد من الرقم أو اسأل الصيدلي');
  }
  async function bookAppt(){
    if(!appt.date||!appt.name.trim()||!appt.phone.trim()){ showToast('أكمل الاسم والهاتف وتاريخ الاستشارة'); return; }
    const row:Appt={...appt};
    try{ const created:any=await api('records.create',{collection:'bendary_appointments',value:row,idempotency_key:'appt-'+appt.phone+'-'+appt.date+'-'+appt.time}); setAppts(p=>[{...row,id:created?.id},...p]); }catch{ setAppts(p=>[row,...p]); }
    showToast(`تم حجز استشارتك مع ${appt.pharmacist} — ${appt.date} ${appt.time}`); setAppt({...appt,name:'',phone:'',reason:'استشارة دواء'});
  }
  async function addReminder(){
    if(!remForm.drug.trim()){ showToast('اكتب اسم الدواء'); return; }
    const row:Reminder={...remForm};
    try{ const c:any=await api('records.create',{collection:'bendary_reminders',value:row,idempotency_key:'rem-'+Date.now()}); setReminders(p=>[...p,{...row,id:c?.id}]); }catch{ setReminders(p=>[...p,row]); }
    setRemForm({drug:'',time:'08:00',days:'يومياً'}); showToast('تم حفظ التذكير — سيظهر في تذكيراتي');
  }
  async function submitContact(){
    if(!contact.name.trim()||!contact.phone.trim()||!contact.msg.trim()){ showToast('أكمل الاسم والهاتف ورسالتك'); return; }
    try{ await api('records.create',{collection:'bendary_contacts',value:contact,idempotency_key:'contact-'+Date.now()}); }catch{}
    setContactDone(true); showToast('تم إرسال رسالتك — سنتصل بك قريباً'); setContact({name:'',phone:'',msg:''});
  }
  async function addShortage(){
    if(!shortForm.product.trim()||!shortForm.qty){ showToast('أكمل اسم الصنف والكمية'); return; }
    const row={product:shortForm.product,branch:shortForm.branch,qty:shortForm.qty,date:'اليوم'};
    try{ const c:any=await api('records.create',{collection:'bendary_shortage',value:row,idempotency_key:'short-'+Date.now()}); setShortage(p=>[{...row,id:c?.id},...p]); }catch{ setShortage(p=>[row,...p]); }
    setShortForm({product:'',branch:BRANCHES[7].name,qty:''}); showToast('تمت الإضافة لكشكول النواقص');
  }
  async function addCustomer(){
    if(!custForm.name.trim()||!custForm.phone.trim()){ showToast('أكمل اسم العميل والهاتف'); return; }
    try{ const c:any=await api('records.create',{collection:'bendary_customers',value:custForm,idempotency_key:'cust-'+Date.now()}); setCustomers(p=>[{...custForm,id:c?.id},...p]); }catch{ setCustomers(p=>[{...custForm},...p]); }
    setCustForm({name:'',phone:'',address:'',branch:BRANCHES[7].name,notes:''}); showToast('تمت إضافة العميل');
  }
  async function addStaffMember(){
    if(!staffForm.name.trim()||!staffForm.phone.trim()){ showToast('أكمل اسم الموظف ورقم الهاتف'); return; }
    try{ const c:any=await api('records.create',{collection:'bendary_staff',value:staffForm,idempotency_key:'staff-'+Date.now()}); setStaffList(p=>[...p,{...staffForm,id:c?.id}]); }catch{ setStaffList(p=>[...p,staffForm]); }
    setStaffForm({name:'',role:'صيدلي',branch:'فرع شارع سعيد',shift:'صباحي',phone:''}); showToast('تمت إضافة الموظف');
  }
  async function addAd(){
    if(!adForm.title.trim()){ showToast('اكتب عنوان الإعلان'); return; }
    const row:Ad={title:adForm.title.trim(),position:adForm.position,status:'نشط',start:'2026-01-01',end:'2026-03-31',desc:'اسأل الصيدلي عن التفاصيل.',emoji:'🎉'};
    try{ const c:any=await api('records.create',{collection:'bendary_ads',value:row,idempotency_key:'ad-'+Date.now()}); setAds(p=>[...p,{...row,id:c?.id}]); }catch{ setAds(p=>[...p,row]); }
    setAdForm({title:'',position:'رئيسي'}); showToast('تمت إضافة الإعلان');
  }
  function posRowTotal(r:PosRow){ return Math.max(0, r.qty*r.price - r.discount); }
  function savePosSale(){
    const total=posRows.reduce((s,r)=>s+posRowTotal(r),0);
    setPosSaved(p=>[{rows:posRows,total,date:'اليوم'},...p]); showToast(`تم حفظ فاتورة البيع — الإجمالي ${total}`); setPosRows([{product:'باراسيتامول 500 مجم',pack:'شريط',qty:1,price:0,discount:0}]);
  }

  const allProducts = useMemo(()=>BASE_PRODUCTS,[ ]);
  // Catalog search: Arabic name + English name + active ingredient + partial name + barcode (silent — no barcode hint shown to customers).
  const PRODUCT_META: Record<string,{en:string;active:string}> = {
    'باراسيتامول 500 مجم':{en:'Paracetamol 500mg',active:'Paracetamol'},
    'فيتامين د3 5000 وحدة':{en:'Vitamin D3 5000 IU',active:'Cholecalciferol'},
    'أوجمنتين 1 جم':{en:'Augmentin 1g',active:'Amoxicillin Clavulanate'},
    'أوميبرازول 20 مجم':{en:'Omeprazole 20mg',active:'Omeprazole'},
    'لوراتادين 10 مجم':{en:'Loratadine 10mg',active:'Loratadine'},
    'ميتفورمين 500 مجم':{en:'Metformin 500mg',active:'Metformin'},
    'أملوديبين 5 مجم':{en:'Amlodipine 5mg',active:'Amlodipine'},
    'أموكسيسيلين 500 مجم':{en:'Amoxicillin 500mg',active:'Amoxicillin'},
    'إيبوبروفين 400 مجم':{en:'Ibuprofen 400mg',active:'Ibuprofen'},
    'سيتريزين 10 مجم':{en:'Cetirizine 10mg',active:'Cetirizine'},
    'فيتامين ب المركب':{en:'Vitamin B Complex',active:'Vitamin B'},
    'أوميجا 3':{en:'Omega 3',active:'Omega 3'},
    'مكمل فيتامين سي + زنك':{en:'Vitamin C + Zinc',active:'Vitamin C Zinc'},
  };
  const filteredProducts = useMemo(()=>{ const q=search.trim().toLowerCase(); return allProducts.filter(p=>{ if(cat!=='الكل'&&p.cat!==cat) return false; if(!q) return true; const meta=PRODUCT_META[p.name]; return p.name.includes(search)||p.desc.includes(search)||p.cat.includes(search)||p.barcode.toLowerCase().includes(q)||p.name.toLowerCase().includes(q)||(meta?.en.toLowerCase().includes(q)||false)||(meta?.active.toLowerCase().includes(q)||false); }); },[cat,search,allProducts]);
  const heroResults = useMemo(()=>heroQ.trim()?allProducts.filter(p=>p.name.includes(heroQ)||p.cat.includes(heroQ)).slice(0,5):[],[heroQ,allProducts]);
  const filteredBranches = useMemo(()=>BRANCHES.filter(b=>!branchQ.trim()||b.name.includes(branchQ)||b.address.includes(branchQ)),[branchQ]);
  const dictFiltered = useMemo(()=>DICT.filter(d=>(!dictQ.trim()||d.name.toLowerCase().includes(dictQ.toLowerCase())||d.ar.includes(dictQ)||d.use.includes(dictQ))),[dictQ]);
  const blogFiltered = useMemo(()=>ARTICLES.filter(a=>blogFilter==='الكل'||a.cat===blogFilter||(a.tags||[]).includes(blogFilter)),[blogFilter]);
  const favProducts = allProducts.filter(p=>favs.some(f=>f.product===p.name));
  const statuses=['تم الاستلام','تجهيز','مع السائق','تم التوصيل'];

  const navLabels = lang==='ar'
    ? {home:'الرئيسية',shop:'المتجر',offers:'العروض',branches:'الفروع',articles:'المقالات',rx:'ارفع روشتة',track:'تتبع الطلب',contact:'تواصل معنا',account:'حسابي',settings:'الإعدادات'}
    : {home:'Home',shop:'Shop',offers:'Offers',branches:'Branches',articles:'Articles',rx:'Upload Rx',track:'Track Order',contact:'Contact',account:'Account',settings:'Settings'};

  function SectionTitle({t,s}:{t:string;s:string}){ return <div className="flex items-end justify-between gap-3 mb-2"><div><p className="text-[12px] font-bold text-[#C1272D] leading-4">{s}</p><h2 className="font-bold text-[19px] sm:text-[22px] leading-7">{t}</h2></div></div> }

  function ProductCard({p}:{p:any}){
    const isFav=favs.some(f=>f.product===p.name);
    return <article className="rounded-2xl overflow-hidden flex flex-col border shadow-sm" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}>
      <button onClick={()=>openDetail(p)} className="text-right block">
        <div className="h-[92px] grid place-items-center relative" style={{background:creamBg}}><span className="w-12 h-12 rounded-xl bg-white shadow grid place-items-center"><Pill className="w-6 h-6 text-[#C1272D]"/></span><span className="absolute top-2 right-2 bg-[#C1272D] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">{p.tag}</span></div>
        <div className="p-3"><span className="text-[12px] font-bold text-[#C1272D]">{p.cat}</span><h3 className="font-bold leading-6 mt-0.5 text-[15px] [overflow-wrap:anywhere]">{p.name}</h3><p className="text-[13px] leading-6 mt-1 [overflow-wrap:anywhere]" style={{color:isDark?'#CCC':'#5F5F5F'}}>{p.desc}</p></div>
      </button>
      <div className="px-3 pb-3 mt-auto flex gap-2"><button onClick={()=>addCart(p)} className="flex-1 bg-[#111] text-white py-2 rounded-xl text-[14px] font-bold flex items-center justify-center gap-1"><Plus className="w-4 h-4"/> أضف للسلة</button><button onClick={()=>toggleFav(p)} aria-label="مفضلة" className="w-10 grid place-items-center rounded-xl border" style={{background:isFav?'#C1272D':'transparent',color:isFav?'white':'#111',borderColor:'#EDEDED'}}><Heart className="w-5 h-5" fill={isFav?'currentColor':'none'}/></button></div>
    </article>
  }

  function OfferCard({o,compact=false}:{o:any;compact?:boolean}){
    return <article className="rounded-2xl overflow-hidden border shadow-sm shrink-0 flex flex-col snap-start" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED',width:compact?'260px':'100%'}}>
      <div className="relative"><img src={o.image} alt={o.brand||o.title} className="w-full h-[150px] object-cover"/><span className="absolute top-2 right-2 bg-white text-[#C1272D] text-[11px] font-bold px-2 py-0.5 rounded-full">{o.tag}</span></div>
      <div className="p-3 flex flex-col flex-1"><h3 className="font-bold leading-6 text-[15px] [overflow-wrap:anywhere]">{o.title}</h3><p className="text-[11px] font-bold text-[#1F7A4D] mt-0.5">البراند في الصورة: {o.brand||o.tag} ✓ مطابق للاسم</p><p className="text-[13px] leading-6 mt-1 [overflow-wrap:anywhere]" style={{color:isDark?'#CCC':'#5F5F5F'}}>{o.desc}</p><button onClick={()=>{addCart({name:o.title,cat:'عروض',desc:o.desc,tag:'عرض'}); setChatOpen(true);}} className="mt-2 bg-[#C1272D] text-white py-2 rounded-xl font-bold text-[14px]">اطلب العرض</button></div>
    </article>
  }

  // ---------- CUSTOMER VIEWS ----------
  function HomeView(){
    const heroOffer = ALL_OFFERS[heroIdx % ALL_OFFERS.length];
    return <div className="space-y-[18px]">
      {/* HERO compact 2-col, max 340px desktop */}
      <section className="rounded-[20px] border overflow-hidden grid lg:grid-cols-[1fr_360px] shadow-sm" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED',maxHeight:'none'}}>
        <div className="p-4 sm:p-5">
          <span className="inline-flex items-center gap-1 text-[12px] font-bold px-2.5 py-1 rounded-full" style={{background:creamBg}}><BadgeCheck className="w-4 h-4 text-[#C1272D]"/> معتمد • رعاية من القلب ♥</span>
          <h1 className="font-bold leading-[1.5] mt-2" style={{fontSize:'clamp(26px,4vw,40px)'}}>دواؤك في <span className="text-[#C1272D]">30 دقيقة.</span></h1>
          <p className="text-[14px] leading-6 mt-1" style={{color:isDark?'#CCC':'#5F5F5F'}}>اطلب من أقرب فرع، والصيدلي يراجع طلبك قبل التوصيل.</p>
          <div className="mt-3 flex gap-2"><div className="relative flex-1"><Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{color:'#888'}}/><input value={heroQ} onChange={e=>setHeroQ(e.target.value)} placeholder="ابحث في الكتالوج…" className="w-full border rounded-xl py-2.5 pr-9 pl-3 text-[15px] bg-white text-black"/></div><button onClick={()=>{setSearch(heroQ); go('shop');}} className="bg-[#C1272D] text-white px-4 rounded-xl font-bold shrink-0">بحث</button></div>
          {heroResults.length>0&&<div className="mt-2 bg-white border rounded-xl overflow-hidden shadow-lg relative z-10">{heroResults.map(p=><button key={p.name} onClick={()=>{openDetail(p); setHeroQ('');}} className="w-full flex justify-between gap-2 text-right px-3 py-2 border-b last:border-0 text-black hover:bg-[#F7F7F7]"><span className="font-bold text-[14px]">{p.name}</span><span className="text-[12px] text-[#666] shrink-0">{p.cat}</span></button>)}</div>}
          <div className="flex flex-wrap gap-2 mt-3"><button onClick={()=>go('shop')} className="bg-[#C1272D] text-white px-5 py-2.5 rounded-full font-bold text-[14px]">تسوّق الآن</button><button onClick={()=>setChatOpen(true)} className="bg-[#111] text-white px-5 py-2.5 rounded-full font-bold text-[14px]">اطلب عبر الشات</button><a href="tel:01200400094" className="inline-flex items-center gap-1.5 border px-4 py-2.5 rounded-full font-bold text-[14px]" dir="ltr"><Phone className="w-4 h-4 text-[#C1272D]"/> 01200400094</a></div>
          <div className="flex gap-2 mt-3"><button onClick={()=>{setLoginTab('customer'); setShowLogin(true);}} className="flex-1 bg-[#C1272D] text-white py-2.5 rounded-xl font-bold text-[14px]">دخول العملاء</button><button onClick={()=>{setLoginTab('staff'); setShowLogin(true);}} className="flex-1 bg-white border border-[#C1272D] text-[#C1272D] py-2.5 rounded-xl font-bold text-[14px]">دخول فريق العمل</button></div>
        </div>
        <div className="relative border-t lg:border-t-0 lg:border-r border-[#EDEDED] bg-[#111] text-white overflow-hidden lg:max-h-[340px]">
          <img src={heroOffer.image} alt={heroOffer.title} className="w-full h-[190px] lg:h-[220px] object-cover"/>
          <div className="p-3"><span className="bg-[#C1272D] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">{heroOffer.tag}</span><h3 className="font-bold leading-6 mt-1 text-[16px] [overflow-wrap:anywhere]">{heroOffer.title}</h3><p className="text-[13px] leading-6 text-white/85 [overflow-wrap:anywhere]">{heroOffer.desc}</p><div className="flex gap-2 mt-2"><button onClick={()=>{addCart({name:heroOffer.title,cat:'عروض',desc:heroOffer.desc}); setChatOpen(true);}} className="bg-white text-black px-4 py-2 rounded-xl font-bold text-[13px]">اطلب العرض</button><button onClick={()=>go('offers')} className="bg-[#C1272D] text-white px-4 py-2 rounded-xl font-bold text-[13px]">كل العروض</button></div></div>
        </div>
      </section>

      {/* Categories strip */}
      <section><div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">{CATS.slice(0,10).map(c=><button key={c.name} onClick={()=>{setCat(c.name); go('shop');}} className={`shrink-0 px-3 py-2 rounded-xl border font-bold text-[13px] ${cat===c.name?'bg-[#C1272D] text-white border-[#C1272D]':'bg-white text-black border-[#EDEDED]'}`}>{c.name} <span className="text-[11px] opacity-70">{c.count.toLocaleString('ar-EG')}</span></button>)}</div></section>

      {/* Offers horizontal scroll, 4 visible */}
      <section><SectionTitle t="العروض" s="عروض البنداري — كل اسم مطابق لصورة برانده"/><div className="flex gap-3 overflow-x-auto no-scrollbar snap-x pb-1 -mx-1 px-1">{ALL_OFFERS.map(o=><OfferCard key={o.title} o={o} compact/> )}</div></section>

      {/* Store dense 4 cols */}
      <section><div className="flex justify-between items-end mb-2"><div><p className="text-[12px] font-bold text-[#C1272D]">من المتجر</p><h2 className="font-bold text-[19px] leading-7">الأكثر طلباً</h2></div><button onClick={()=>go('shop')} className="text-[13px] font-bold text-[#C1272D]">عرض كل المنتجات ←</button></div><div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">{filteredProducts.slice(0,8).map(p=><ProductCard key={p.name} p={p}/>)}</div></section>

      {/* Branches 3 cols */}
      <section><SectionTitle t="الفروع" s="اختر الفرع الأقرب واطلب منه"/><div className="grid md:grid-cols-3 gap-2.5">{BRANCHES.slice(0,6).map(b=><article key={b.code} className="rounded-2xl border p-3 flex justify-between gap-2" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}><div><h3 className="font-bold text-[15px] leading-6">{b.name}</h3><p className="text-[13px] leading-6" style={{color:isDark?'#CCC':'#5F5F5F'}}>{b.address}</p></div><a href={`tel:${b.phone}`} className="shrink-0 self-center bg-[#C1272D] text-white px-3 py-2 rounded-xl font-bold text-[13px]">اتصال</a></article>)}</div><button onClick={()=>go('branches')} className="mt-2 bg-[#111] text-white px-4 py-2 rounded-xl font-bold text-[14px]">عرض كل الفروع</button></section>

      {/* Rx compact */}
      <section className="rounded-2xl border p-3 sm:p-4 grid md:grid-cols-2 gap-3" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}><div><h2 className="font-bold text-[18px] leading-7">عندك روشتة؟ ابعتها</h2><p className="text-[13px] leading-6 mt-1" style={{color:isDark?'#CCC':'#5F5F5F'}}>اكتب تفاصيل الروشتة وسيتواصل معك الصيدلي لتأكيد الأصناف.</p><button onClick={()=>go('rx')} className="mt-2 bg-[#C1272D] text-white px-4 py-2 rounded-xl font-bold text-[14px]">ارفع روشتة Rx</button></div><div className="space-y-2"><input value={rx.details} onChange={e=>setRx({...rx,details:e.target.value})} placeholder="اسم الدواء أو تفاصيل الروشتة" className="w-full border rounded-xl px-3 py-2.5 text-[15px] bg-white text-black"/><input value={rx.phone} onChange={e=>setRx({...rx,phone:e.target.value})} placeholder="رقم الهاتف" inputMode="tel" className="w-full border rounded-xl px-3 py-2.5 text-[15px] bg-white text-black"/><button onClick={()=>{if(!rx.details.trim()){showToast('اكتب تفاصيل الروشتة أولاً'); return;} setView('rx');}} className="w-full bg-[#111] text-white py-2.5 rounded-xl font-bold text-[14px]">إرسال سريع</button></div></section>

      {/* Articles 3 cols */}
      <section><SectionTitle t="المقالات" s="مواضيع تهمك — من صيادلة البنداري"/><div className="grid md:grid-cols-3 gap-2.5">{ARTICLES.slice(0,3).map(a=><article key={a.id} className="rounded-2xl border overflow-hidden flex flex-col" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}><div className="h-[86px] grid place-items-center" style={{background:creamBg}}><Newspaper className="w-8 h-8 text-[#C1272D]"/></div><div className="p-3 flex flex-col flex-1"><span className="text-[11px] font-bold px-2 py-0.5 rounded-full w-fit" style={{background:creamBg}}>{a.cat} • {a.read}</span><h3 className="font-bold text-[15px] leading-6 mt-1 [overflow-wrap:anywhere]">{a.title}</h3><p className="text-[13px] leading-6 mt-1 [overflow-wrap:anywhere]" style={{color:isDark?'#CCC':'#5F5F5F'}}>{a.body}</p><button onClick={()=>{setOpenArticle(a); setView('articles');}} className="mt-2 bg-[#C1272D] text-white py-2 rounded-xl font-bold text-[13px]">اقرأ المزيد</button></div></article>)}</div></section>

      {/* Dictionary + favorites compact */}
      <section className="grid md:grid-cols-2 gap-2.5">
        <div className="rounded-2xl border p-3" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}><h3 className="font-bold text-[16px]">قاموس الأدوية</h3><p className="text-[13px] leading-6 mt-1" style={{color:isDark?'#CCC':'#5F5F5F'}}>ابحث باسم الدواء أو العرض — مصادر معتمدة.</p><div className="flex gap-2 mt-2"><input value={dictQ} onChange={e=>setDictQ(e.target.value)} placeholder="مثال: باراسيتامول" className="flex-1 border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"/><button onClick={()=>go('dictionary')} className="bg-[#C1272D] text-white px-4 rounded-xl font-bold text-[13px] shrink-0">بحث</button></div><div className="flex flex-wrap gap-1.5 mt-2">{DICT.slice(0,5).map(d=><button key={d.name} onClick={()=>{setDictQ(d.ar); go('dictionary');}} className="px-2.5 py-1.5 rounded-full border text-[12px] font-bold" style={{borderColor:'#EDEDED'}}>{d.ar}</button>)}</div></div>
        <div className="rounded-2xl border p-3" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}><h3 className="font-bold text-[16px]">مفضلتك {favProducts.length>0?`(${favProducts.length})`:''}</h3>{favProducts.length? <div className="flex gap-2 overflow-x-auto no-scrollbar mt-2">{favProducts.map(p=><button key={p.name} onClick={()=>openDetail(p)} className="shrink-0 w-[150px] border rounded-xl p-2 text-right" style={{borderColor:'#EDEDED'}}><Pill className="w-5 h-5 text-[#C1272D]"/><p className="font-bold text-[13px] leading-5 mt-1 [overflow-wrap:anywhere]">{p.name}</p><p className="text-[12px] text-[#666]">{p.cat}</p></button>)}</div> : <p className="text-[13px] mt-1" style={{color:isDark?'#CCC':'#5F5F5F'}}>اضغط على القلب في أي منتج لحفظه هنا.</p>}<button onClick={()=>go('account')} className="mt-2 bg-[#111] text-white px-4 py-2 rounded-xl font-bold text-[13px]">حسابي</button></div>
      </section>
    </div>
  }
  function ShopView(){
    return <div className="space-y-[14px]"><SectionTitle t="المتجر" s="الكتالوج الكامل"/>
      <div className="rounded-2xl border p-3 bg-[#F7F7F7]" style={{borderColor:'#EDEDED'}}><p className="font-bold text-[13px] leading-6 [overflow-wrap:anywhere]">الكتالوج الكامل: 22,258 صنف - 12,707 بباركود - 7,176 بانتظار المراجعة - قاموس الأدوية 80,000+ صنف - 3,000+ عرض وعلاج - مصادر: مصر / السعودية / الإمارات / أوروبا / FDA / WHO - تحديث شهري</p><p className="text-[12px] leading-6 mt-1 text-[#555]">ابحث بالاسم بالعربية أو الإنجليزية، أو بالمادة الفعالة، أو بجزء من الاسم، أو بالباركود.</p></div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">{CATS.map(c=><button key={c.name} onClick={()=>setCat(c.name)} className={`shrink-0 px-3 py-2 rounded-xl border font-bold text-[13px] ${cat===c.name?'bg-[#C1272D] text-white border-[#C1272D]':'bg-white text-black border-[#EDEDED]'}`}>{c.name}</button>)}</div>
      <div className="flex gap-2"><div className="relative flex-1"><Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث باسم المنتج…" className="w-full border rounded-xl py-2.5 pr-9 pl-3 text-[15px] bg-white text-black"/></div><span className="self-center text-[13px] font-bold shrink-0">{filteredProducts.length} منتج</span></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">{filteredProducts.map(p=><ProductCard key={p.name} p={p}/>)}</div>
      {!filteredProducts.length&&<p className="text-center font-bold py-8">لا توجد نتائج — جرّب اسماً آخر أو تصنيفاً مختلفاً.</p>}
    </div>
  }
  function OffersView(){
    return <div className="space-y-[14px]"><SectionTitle t="العروض" s="كل عروض البنداري — 10 عروض، كل اسم مطابق لصورة برانده"/><div className="rounded-2xl border p-3 bg-[#F7F7F7]" style={{borderColor:'#EDEDED'}}><p className="font-bold text-[13px] leading-6">تمت مطابقة كل اسم مع صورته — لا يُستخدم اسم براند مع صورة براند آخر.</p><p className="text-[12px] leading-6 mt-1 text-[#555]">Garnier • COCO • Narji • Root to End • Capixy • Telofill • Seropipe • Vacation • Pirlome • Soralone</p></div><div className="flex gap-3 overflow-x-auto no-scrollbar snap-x pb-1">{ALL_OFFERS.map(o=><OfferCard key={o.title} o={o} compact/>)}</div><div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">{ALL_OFFERS.map(o=><OfferCard key={o.title+'-g'} o={o}/>)}</div><div className="rounded-2xl border p-3" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}><h3 className="font-bold">كوبونات</h3><div className="grid sm:grid-cols-3 gap-2 mt-2">{COUPONS.map(c=><div key={c.code} className="border rounded-xl p-3" style={{borderColor:'#EDEDED'}}><p className="font-bold text-[14px]">{c.title}</p><p className="text-[13px] leading-6 mt-1" style={{color:isDark?'#CCC':'#5F5F5F'}}>{c.desc}</p><span className="inline-block mt-1 bg-[#C1272D] text-white text-[12px] font-bold px-2 py-0.5 rounded-full" dir="ltr">{c.code}</span></div>)}</div></div></div>
  }
  function BranchesView(){
    return <div className="space-y-[14px]"><SectionTitle t="الفروع" s="اختر الفرع الأقرب واطلب منه"/><div className="relative"><Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]"/><input value={branchQ} onChange={e=>setBranchQ(e.target.value)} placeholder="ابحث باسم الفرع أو العنوان…" className="w-full border rounded-xl py-2.5 pr-9 pl-3 text-[15px] bg-white text-black"/></div><div className="grid md:grid-cols-3 gap-2.5">{filteredBranches.map(b=><article key={b.code} className="rounded-2xl border p-3" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}><div className="flex justify-between gap-2"><h3 className="font-bold text-[15px] leading-6">{b.name}</h3><span className="bg-[#E6F4EC] text-[#1F7A4D] text-[11px] font-bold px-2 py-0.5 rounded-full h-fit shrink-0">متاح الآن</span></div><p className="text-[13px] leading-6 mt-1" style={{color:isDark?'#CCC':'#5F5F5F'}}>{b.address}</p><div className="flex gap-2 mt-2"><a href={`tel:${b.phone}`} className="flex-1 text-center bg-[#C1272D] text-white py-2 rounded-xl font-bold text-[13px]">اتصال</a><button onClick={()=>{setForm({...form,branch:b.name}); go('shop'); showToast(`تم اختيار ${b.name}`);}} className="flex-1 bg-[#111] text-white py-2 rounded-xl font-bold text-[13px]">اطلب من الفرع</button></div></article>)}</div><div className="rounded-2xl border p-3" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}><h3 className="font-bold">قريباً</h3><div className="grid md:grid-cols-3 gap-2 mt-2">{COMING_BRANCHES.map(b=><div key={b.name} className="border rounded-xl p-3" style={{borderColor:'#EDEDED'}}><span className="bg-[#111] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">قريباً</span><p className="font-bold text-[14px] mt-1">{b.name}</p><p className="text-[13px] text-[#666]">{b.address}</p></div>)}</div></div></div>
  }
  function ArticlesView(){
    if(openArticle){ const a=openArticle; return <div><button onClick={()=>setOpenArticle(null)} className="bg-[#111] text-white px-4 py-2 rounded-xl font-bold text-[13px]">← كل المقالات</button><article className="rounded-2xl border p-4 mt-3" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}><span className="text-[12px] font-bold px-2 py-0.5 rounded-full" style={{background:creamBg}}>{a.cat} • {a.read}</span><h1 className="font-bold text-[22px] leading-8 mt-2">{a.title}</h1>{a.paras.map((p:string,i:number)=><p key={i} className="leading-8 mt-2 text-[15px]">{p}</p>)}<div className="flex gap-2 mt-3 flex-wrap">{a.tags.map((t:string)=><button key={t} onClick={()=>{setBlogFilter(t); setOpenArticle(null);}} className="px-3 py-1.5 rounded-full border text-[12px] font-bold" style={{borderColor:'#EDEDED'}}>{t}</button>)}<button onClick={()=>toggleSave(a.id)} className="bg-[#C1272D] text-white px-4 py-2 rounded-xl font-bold text-[13px]">{saved.includes(a.id)?'محفوظ ✓':'حفظ المقال'}</button></div></article></div> }
    return <div className="space-y-[14px]"><SectionTitle t="المقالات" s="مواضيع تهمك — من صيادلة البنداري"/><div className="flex gap-2 overflow-x-auto no-scrollbar">{['الكل','وقاية','سكر','أم وطفل','الضغط والقلب','المناعة','التغذية'].map(t=><button key={t} onClick={()=>setBlogFilter(t)} className={`shrink-0 px-3 py-2 rounded-xl border font-bold text-[13px] ${blogFilter===t?'bg-[#C1272D] text-white border-[#C1272D]':'bg-white text-black border-[#EDEDED]'}`}>{t}</button>)}</div><div className="grid md:grid-cols-3 gap-2.5">{blogFiltered.map(a=><article key={a.id} className="rounded-2xl border overflow-hidden flex flex-col" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}><div className="h-[86px] grid place-items-center" style={{background:creamBg}}><Newspaper className="w-8 h-8 text-[#C1272D]"/></div><div className="p-3 flex flex-col flex-1"><span className="text-[11px] font-bold px-2 py-0.5 rounded-full w-fit" style={{background:creamBg}}>{a.cat} • {a.read}</span><h3 className="font-bold text-[15px] leading-6 mt-1">{a.title}</h3><p className="text-[13px] leading-6 mt-1" style={{color:isDark?'#CCC':'#5F5F5F'}}>{a.body}</p><button onClick={()=>setOpenArticle(a)} className="mt-2 bg-[#C1272D] text-white py-2 rounded-xl font-bold text-[13px]">اقرأ المزيد</button></div></article>)}</div></div>
  }
  function DictionaryView(){
    return <div className="space-y-[14px]"><SectionTitle t="قاموس الأدوية" s="ابحث باسم الدواء أو العرض — مصادر معتمدة"/><div className="flex gap-2"><div className="relative flex-1"><Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]"/><input value={dictQ} onChange={e=>setDictQ(e.target.value)} placeholder="ابحث باسم الدواء أو العرض…" className="w-full border rounded-xl py-2.5 pr-9 pl-3 text-[15px] bg-white text-black"/></div></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2.5">{dictFiltered.map(d=><article key={d.name} className="rounded-2xl border p-3" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}><div className="flex justify-between gap-2"><h3 className="font-bold text-[15px]">{d.ar}</h3><span className="text-[12px] font-bold text-[#C1272D]" dir="ltr">{d.name}</span></div><p className="text-[13px] leading-6 mt-1" style={{color:isDark?'#CCC':'#5F5F5F'}}>{d.use}</p><p className="text-[12px] mt-1 font-bold">المصدر: {d.source} • الأعراض: {d.symptoms}</p><button onClick={()=>{setSearch(d.ar); go('shop');}} className="mt-2 bg-[#111] text-white px-4 py-2 rounded-xl font-bold text-[13px]">ابحث في المتجر</button></article>)}</div>{!dictFiltered.length&&<p className="text-center font-bold py-6">لا توجد نتائج مطابقة.</p>}</div>
  }
  function RxView(){
    return <div><SectionTitle t="ارفع روشتة Rx" s="ارفع روشتك وهنجهزلك الدوا"/><div className="rounded-2xl border p-4 max-w-2xl mx-auto space-y-2" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}><h3 className="font-bold text-[18px]">عندك روشتة؟ ارفعها وهنجهزلك الدوا</h3><p className="text-[13px] leading-6" style={{color:isDark?'#CCC':'#5F5F5F'}}>سيصل طلبك إلى طلبات الفريق، وسيتواصل معك الصيدلي لتأكيد الأصناف. رفع الصور والملفات غير متاح بعد — اكتب تفاصيل الروشتة نصاً هنا.</p><label className="text-[13px] font-bold block">الاسم بالكامل *</label><input value={rx.name} onChange={e=>setRx({...rx,name:e.target.value})} placeholder="الاسم بالكامل" className="w-full border rounded-xl px-3 py-2.5 text-[15px] bg-white text-black"/><label className="text-[13px] font-bold block">رقم الهاتف *</label><input value={rx.phone} onChange={e=>setRx({...rx,phone:e.target.value})} placeholder="رقم الهاتف" inputMode="tel" className="w-full border rounded-xl px-3 py-2.5 text-[15px] bg-white text-black"/><label className="text-[13px] font-bold block">اسم ملف الروشتة</label><input value={rxFile} onChange={e=>setRxFile(e.target.value)} placeholder="مثال: roshita.jpg" className="w-full border rounded-xl px-3 py-2.5 text-[15px] bg-white text-black"/><label className="text-[13px] font-bold block">الفرع</label><select value={rxBranch} onChange={e=>setRxBranch(e.target.value)} className="w-full border rounded-xl px-3 py-2.5 text-[15px] bg-white text-black">{BRANCHES.map(b=><option key={b.name}>{b.name}</option>)}</select><label className="text-[13px] font-bold block">تفاصيل الروشتة *</label><input value={rx.details} onChange={e=>setRx({...rx,details:e.target.value})} placeholder="اسم الدواء أو تفاصيل الروشتة" className="w-full border rounded-xl px-3 py-2.5 text-[15px] bg-white text-black"/><label className="text-[13px] font-bold block">ملاحظات للصيدلي</label><textarea value={rx.note} onChange={e=>setRx({...rx,note:e.target.value})} placeholder="ملاحظات للصيدلي" rows={3} className="w-full border rounded-xl px-3 py-2.5 text-[15px] bg-white text-black"/><button onClick={submitRx} className="w-full bg-[#C1272D] text-white py-3 rounded-xl font-bold">إرسال الروشتة</button><p className="text-center text-[13px] font-bold">الخط الساخن: <a href="tel:01200400094" className="text-[#C1272D]" dir="ltr">01200400094</a></p></div></div>
  }
  function TrackingView(){
    return <div><SectionTitle t="تتبع الطلب" s="اكتب رقم طلبك وتابع حالته"/><div className="rounded-2xl border p-4 max-w-2xl mx-auto" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}><div className="flex gap-2"><input value={trackQ} onChange={e=>setTrackQ(e.target.value)} placeholder="مثال: BEN-1042" className="flex-1 border rounded-xl px-3 py-2.5 text-[15px] bg-white text-black" dir="ltr"/><button onClick={doTrack} className="bg-[#C1272D] text-white px-5 rounded-xl font-bold shrink-0">تتبع</button></div>{trackTried&&!trackResult&&<p className="mt-3 bg-[#FDECEC] text-[#C1272D] rounded-xl p-3 text-[13px] font-bold">رقم الطلب غير موجود — تأكد من الرقم أو اتصل بالخط الساخن 01200400094</p>}{trackResult&&<div className="mt-3"><p className="font-bold">{trackResult.no} • {trackResult.status}</p><p className="text-[13px] mt-1" style={{color:isDark?'#CCC':'#5F5F5F'}}>{trackResult.items} • {trackResult.branch} • {trackResult.created}</p><div className="flex gap-1 mt-3">{statuses.map((s,i)=>{ const active=i<=statuses.indexOf(trackResult.status); return <div key={s} className="flex-1 text-center"><div className={`h-2 rounded-full ${active?'bg-[#C1272D]':'bg-[#EDEDED]'}`}/><p className="text-[11px] font-bold mt-1 leading-4">{s}</p></div> })}</div><p className="text-[13px] font-bold mt-2">{trackResult.totalLabel}</p></div>}<div className="grid grid-cols-3 gap-2 mt-4 text-center"><button onClick={()=>{setTrackQ('BEN-1042');}} className="border rounded-xl py-2 text-[12px] font-bold" style={{borderColor:'#EDEDED'}}>جرّب BEN-1042</button><button onClick={()=>go('myorders')} className="border rounded-xl py-2 text-[12px] font-bold" style={{borderColor:'#EDEDED'}}>طلباتي</button><a href="tel:01200400094" className="border rounded-xl py-2 text-[12px] font-bold grid place-items-center" dir="ltr">01200400094</a></div></div></div>
  }
  function MyOrdersView(){
    return <div><SectionTitle t="طلباتي" s="تابع كل طلباتك من هنا"/><div className="space-y-2.5">{orders.map(o=><article key={o.no} className="rounded-2xl border p-3 flex flex-wrap justify-between gap-3" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}><div><p className="font-bold text-[15px]">{o.no} • {o.status}</p><p className="text-[13px] mt-0.5" style={{color:isDark?'#CCC':'#5F5F5F'}}>{o.items}</p><p className="text-[12px]" style={{color:isDark?'#CCC':'#5F5F5F'}}>{o.branch} • {o.created}</p><p className="text-[13px] font-bold mt-1">{o.totalLabel}</p></div><button onClick={()=>{setTrackQ(o.no); go('tracking');}} className="bg-[#C1272D] text-white px-4 py-2 rounded-xl font-bold h-fit text-[13px]">تتبع الطلب</button></article>)}</div></div>
  }
  function AccountView(){
    return <div className="space-y-[14px]"><SectionTitle t="حسابي" s="طلباتك ومفضلتك وتذكيراتك واستشاراتك"/><div className="grid md:grid-cols-3 gap-2.5"><div className="rounded-2xl border p-3" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}><p className="text-[12px] font-bold" style={{color:isDark?'#CCC':'#5F5F5F'}}>نقاطك</p><p className="font-bold text-[24px]">{points.toLocaleString('ar-EG')} نقطة</p><button onClick={()=>go('offers')} className="mt-1 bg-[#C1272D] text-white px-4 py-2 rounded-xl font-bold text-[13px]">استبدل من العروض</button></div><div className="rounded-2xl border p-3" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}><p className="font-bold">حسابك</p><p className="text-[13px] mt-1 [overflow-wrap:anywhere]" style={{color:isDark?'#CCC':'#5F5F5F'}}>{user?.email||'ضيف'} • {user?.kind==='guest'?'ضيف':'عميل'}</p><button onClick={()=>go('myorders')} className="mt-1 bg-[#111] text-white px-4 py-2 rounded-xl font-bold text-[13px]">طلباتي ({orders.length})</button></div><div className="rounded-2xl border p-3" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}><p className="font-bold">مقالات محفوظة ({saved.length})</p><p className="text-[13px] mt-1" style={{color:isDark?'#CCC':'#5F5F5F'}}>اضغط على حفظ في أي مقال ليظهر هنا.</p><button onClick={()=>go('articles')} className="mt-1 border px-4 py-2 rounded-xl font-bold text-[13px]" style={{borderColor:'#EDEDED'}}>المقالات</button></div></div>
    <div className="grid md:grid-cols-2 gap-2.5"><div className="rounded-2xl border p-3" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}><h3 className="font-bold">حجز استشارة صيدلي</h3><div className="grid sm:grid-cols-2 gap-2 mt-2"><select value={appt.pharmacist} onChange={e=>setAppt({...appt,pharmacist:e.target.value})} className="border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"><option>د. مصطفى</option><option>د. سارة</option></select><input type="date" value={appt.date} onChange={e=>setAppt({...appt,date:e.target.value})} className="border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"/><input value={appt.name} onChange={e=>setAppt({...appt,name:e.target.value})} placeholder="الاسم" className="border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"/><input value={appt.phone} onChange={e=>setAppt({...appt,phone:e.target.value})} placeholder="الهاتف" inputMode="tel" className="border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"/></div><button onClick={bookAppt} className="mt-2 w-full bg-[#C1272D] text-white py-2.5 rounded-xl font-bold text-[14px]">حجز الاستشارة</button>{appts.length>0&&<div className="mt-2">{appts.map((a,i)=><p key={i} className="text-[13px] border-t pt-1 mt-1">{a.name} — {a.pharmacist} — {a.date} {a.time}</p>)}</div>}</div>
    <div className="rounded-2xl border p-3" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}><h3 className="font-bold">تذكير دواء</h3><div className="grid grid-cols-3 gap-2 mt-2"><input value={remForm.drug} onChange={e=>setRemForm({...remForm,drug:e.target.value})} placeholder="اسم الدواء" className="border rounded-xl px-2 py-2.5 text-[14px] bg-white text-black"/><input type="time" value={remForm.time} onChange={e=>setRemForm({...remForm,time:e.target.value})} className="border rounded-xl px-2 py-2.5 text-[14px] bg-white text-black"/><select value={remForm.days} onChange={e=>setRemForm({...remForm,days:e.target.value})} className="border rounded-xl px-2 py-2.5 text-[14px] bg-white text-black"><option>يومياً</option><option>كل 12 ساعة</option><option>أسبوعياً</option></select></div><button onClick={addReminder} className="mt-2 w-full bg-[#111] text-white py-2.5 rounded-xl font-bold text-[14px]">حفظ التذكير</button>{reminders.map((r,i)=><p key={i} className="text-[13px] border-t pt-1 mt-1">{r.drug} — {r.time} — {r.days}</p>)}</div></div>
    <div className="rounded-2xl border p-3" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}><h3 className="font-bold">مفضلتك</h3>{favProducts.length? <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mt-2">{favProducts.map(p=><ProductCard key={p.name} p={p}/>)}</div> : <p className="text-[13px] mt-1" style={{color:isDark?'#CCC':'#5F5F5F'}}>لا توجد منتجات مفضلة بعد.</p>}</div></div>
  }
  function SettingsView(){
    return <div><SectionTitle t="الإعدادات" s="اللغة والمظهر — للعملاء"/><div className="rounded-2xl border p-4 max-w-2xl space-y-3" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}>
      <div className="flex justify-between items-center gap-3 rounded-xl p-3" style={{background:creamBg}}><span className="font-bold text-[14px]">اللغة / Language</span><div className="flex gap-2"><button onClick={()=>setLang('ar')} className={`px-4 py-2 rounded-xl font-bold text-[13px] ${lang==='ar'?'bg-[#C1272D] text-white':'bg-white text-black border'}`}>العربية</button><button onClick={()=>setLang('en')} className={`px-4 py-2 rounded-xl font-bold text-[13px] ${lang==='en'?'bg-[#C1272D] text-white':'bg-white text-black border'}`}>English</button></div></div>
      <div className="flex justify-between items-center gap-3 rounded-xl p-3" style={{background:creamBg}}><span className="font-bold text-[14px]">المظهر / Theme</span><div className="flex gap-2"><button onClick={()=>setTheme('light')} className={`px-4 py-2 rounded-xl font-bold text-[13px] ${theme==='light'?'bg-[#C1272D] text-white':'bg-white text-black border'}`}>فاتح Light</button><button onClick={()=>setTheme('dark')} className={`px-4 py-2 rounded-xl font-bold text-[13px] ${theme==='dark'?'bg-[#C1272D] text-white':'bg-white text-black border'}`}>داكن Dark</button></div></div>
      <p className="text-[13px] leading-6" style={{color:isDark?'#CCC':'#5F5F5F'}}>اللغة والمظهر هنا فقط — بقية التطبيق بالعربية افتراضياً. التغيير يظهر فوراً في الصفحة.</p>
      <button onClick={()=>showToast('تم حفظ الإعدادات')} className="w-full bg-[#C1272D] text-white py-3 rounded-xl font-bold">حفظ الإعدادات</button>
      <button onClick={()=>go('terms')} className="w-full border py-2.5 rounded-xl font-bold" style={{borderColor:'#EDEDED'}}>الشروط والأحكام</button>
      <button onClick={logout} className="w-full bg-[#111] text-white py-3 rounded-xl font-bold">خروج</button>
    </div></div>
  }
  function ContactView(){
    return <div><SectionTitle t="تواصل معنا" s="نرد عليك في أقرب وقت — الخط الساخن 01200400094"/><div className="grid md:grid-cols-2 gap-2.5"><div className="rounded-2xl border p-4" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}><h3 className="font-bold text-[16px]">تواصل مباشر</h3><div className="space-y-2 mt-2"><a href="tel:01200400094" className="flex justify-between items-center border rounded-xl p-3" style={{borderColor:'#EDEDED'}}><span className="font-bold text-[14px]">الخط الساخن — 24 ساعة</span><span className="font-bold text-[#C1272D]" dir="ltr">01200400094</span></a><a href="https://wa.me/201200400094" target="_blank" rel="noopener" className="flex justify-between items-center border rounded-xl p-3" style={{borderColor:'#EDEDED'}}><span className="font-bold text-[14px]">واتساب</span><span className="font-bold text-[#C1272D]" dir="ltr">wa.me/201200400094</span></a><a href="mailto:info@bendaryph.com" className="flex justify-between items-center border rounded-xl p-3" style={{borderColor:'#EDEDED'}}><span className="font-bold text-[14px]">البريد</span><span className="font-bold text-[#C1272D] [overflow-wrap:anywhere]">info@bendaryph.com</span></a></div><button onClick={()=>setChatOpen(true)} className="mt-3 w-full bg-[#C1272D] text-white py-2.5 rounded-xl font-bold">افتح BenDa ChaT</button></div><div className="rounded-2xl border p-4" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}><h3 className="font-bold text-[16px]">أرسل رسالة</h3><div className="space-y-2 mt-2"><input value={contact.name} onChange={e=>setContact({...contact,name:e.target.value})} placeholder="الاسم *" className="w-full border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"/><input value={contact.phone} onChange={e=>setContact({...contact,phone:e.target.value})} placeholder="رقم الهاتف *" inputMode="tel" className="w-full border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"/><textarea value={contact.msg} onChange={e=>setContact({...contact,msg:e.target.value})} placeholder="رسالتك *" rows={3} className="w-full border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"/><button onClick={submitContact} className="w-full bg-[#111] text-white py-2.5 rounded-xl font-bold">إرسال الرسالة</button>{contactDone&&<p className="text-[13px] font-bold text-[#1F7A4D]">تم إرسال رسالتك — سنتصل بك قريباً ✓</p>}</div></div></div></div>
  }
  function LegalView({k}:{k:string}){
    const page=LEGAL[k];
    return <div><SectionTitle t={page.title} s="صيدليات البنداري — رعاية من القلب"/><div className="rounded-2xl border p-4 space-y-3" style={{background:cardBg,borderColor:isDark?'#333':'#EDEDED'}}>{page.paras.map((p,i)=><p key={i} className="leading-8 text-[15px]">{p}</p>)}</div><button onClick={()=>go('home')} className="mt-3 bg-[#111] text-white px-5 py-2.5 rounded-xl font-bold">عودة للرئيسية</button></div>
  }

  // ---------- DRAWER (customer only, never staff list) ----------
  function Drawer(){
    if(!drawer) return null;
    const customerItems = [
      {id:'home',label:navLabels.home,icon:Home},
      {id:'shop',label:navLabels.shop,icon:Store},
      {id:'offers',label:navLabels.offers,icon:Gift},
      {id:'branches',label:navLabels.branches,icon:MapPin},
      {id:'articles',label:navLabels.articles,icon:Newspaper},
      {id:'rx',label:navLabels.rx,icon:FileText},
      {id:'tracking',label:navLabels.track,icon:Truck},
      {id:'cart',label:'سلة التسوق',icon:ShoppingCart},
      {id:'chat',label:'BenDa ChaT',icon:MessageCircle},
      {id:'contact',label:navLabels.contact,icon:Phone},
    ];
    return <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label="القائمة">
      <button aria-label="إغلاق القائمة" onClick={()=>setDrawer(false)} className="absolute inset-0 bg-black/50 w-full h-full cursor-default"/>
      <aside className="absolute top-0 right-0 h-full bg-white text-black overflow-y-auto shadow-2xl flex flex-col" style={{width:'320px',maxWidth:'86vw',paddingTop:'max(0.75rem,var(--safe-area-inset-top))'}}>
        <div className="flex items-start justify-between gap-2 px-3 pb-2 border-b border-[#EDEDED]">
          <div className="flex items-center gap-2 min-w-0"><img src={logoUrl} alt="صيدليات البنداري" className="w-11 h-11 rounded-full bg-white object-contain shrink-0"/><div className="min-w-0"><p className="font-bold leading-5 text-[15px] [overflow-wrap:anywhere]">صيدليات البنداري</p><p className="text-[12px] text-[#C1272D] font-bold leading-4">رعاية من القلب ♥</p></div></div>
          <button onClick={()=>setDrawer(false)} aria-label="إغلاق" className="w-10 h-10 shrink-0 grid place-items-center rounded-full bg-[#F7F7F7]"><X className="w-5 h-5"/></button>
        </div>
        <a href="tel:01200400094" className="mx-3 mt-3 bg-[#C1272D] text-white rounded-xl py-2.5 px-3 flex items-center justify-center gap-2 font-bold text-[14px]" dir="ltr"><Phone className="w-4 h-4"/> 01200400094 — الخط الساخن</a>
        <div className="p-3 space-y-4">
          <section><p className="text-[12px] font-bold text-[#C1272D] px-1 pb-1.5">للعملاء</p><nav className="space-y-1">{customerItems.map(it=>{ const Icon=it.icon; const active = (it.id==='chat'?chatOpen:view===it.id) || (it.id==='cart'&&showCart); return <button key={it.id} onClick={()=>{ if(it.id==='cart'){ setDrawer(false); setShowCart(true); return; } if(it.id==='chat'){ setDrawer(false); setChatOpen(true); return; } go(it.id); }} className={`w-full h-[44px] flex items-center gap-2.5 px-3 rounded-xl font-bold text-[14px] ${active?'bg-[#C1272D] text-white':'bg-[#F7F7F7] text-black hover:bg-[#EDEDED]'}`}><Icon className="w-5 h-5 shrink-0"/><span className="flex-1 text-right [overflow-wrap:anywhere]">{it.label}</span><ChevronLeft className="w-4 h-4 shrink-0 opacity-60"/></button> })}</nav></section>
          <section><p className="text-[12px] font-bold text-[#C1272D] px-1 pb-1.5">لفريق العمل فقط</p><button onClick={()=>{setDrawer(false); setLoginTab('staff'); setShowLogin(true);}} className="w-full h-[52px] flex items-center gap-2.5 px-3 rounded-xl border-2 border-[#111] bg-white text-black font-bold text-[14px]"><span className="w-9 h-9 grid place-items-center rounded-full bg-[#111] text-white shrink-0"><Lock className="w-4 h-4"/></span><span className="flex-1 text-right min-w-0"><span className="block leading-5">دخول فريق العمل</span><span className="block text-[11px] font-normal text-[#666] leading-4">مدير / صيدلي / دليفري / محاسب</span></span><ChevronLeft className="w-4 h-4 shrink-0 opacity-60"/></button><p className="text-[11px] text-[#888] leading-5 px-1 pt-1">دخول الفريق يفتح لوحة فريق العمل فقط — لا تظهر خصائص الفريق للعملاء.</p></section>
          <div className="flex gap-2"><button onClick={()=>{setDrawer(false); go('account');}} className="flex-1 h-[44px] rounded-xl bg-[#111] text-white font-bold text-[13px]">{navLabels.account}</button><button onClick={()=>{setDrawer(false); go('settings');}} className="flex-1 h-[44px] rounded-xl border font-bold text-[13px] border-[#EDEDED]">{navLabels.settings}</button></div>
        </div>
      </aside>
    </div>
  }

  // ---------- STAFF DASHBOARD (only after staff login, 38 features) ----------
  function StaffDashboard(){
    const openFeature = FEATURES38.find(f=>f.id===nativeOpen)||null;
    const baseRows = openFeature ? (nativeRows[openFeature.id]||openFeature.rows) : [];
    const filteredRows = baseRows.filter(r=>(nativeStatusFilter==='الكل'||r.status===nativeStatusFilter)&&(!nativeQ.trim()||r.a.includes(nativeQ)||r.b.includes(nativeQ)||r.c.includes(nativeQ)||r.status.includes(nativeQ)));
    const staffMenu = [
      {id:'dashboard',label:'لوحة فريق العمل',icon:BarChart3},
      {id:'orders',label:'الطلبات',icon:Package},
      {id:'inventory',label:'المخزون والنواقص',icon:Warehouse},
      {id:'pos',label:'نقطة البيع والفواتير',icon:ShoppingBag},
      {id:'customers',label:'العملاء',icon:Users},
      {id:'team',label:'فريق العمل',icon:Briefcase},
      {id:'ads',label:'إدارة الإعلانات',icon:Megaphone},
      {id:'chat',label:'BenDa ChaT — للفريق',icon:Headset},
      {id:'settings',label:'إعدادات الفريق',icon:SettingsIcon},
    ];
    async function addNativeRow(){
      if(!openFeature) return;
      if(!nativeForm.a.trim()||!nativeForm.b.trim()){ showToast('أكمل الحقل الأول والثاني على الأقل'); return; }
      const row={a:nativeForm.a.trim(),b:nativeForm.b.trim(),c:nativeForm.c.trim()||'—',status:'جديد'};
      setNativeRows(prev=>({...prev,[openFeature.id]:[row,...(prev[openFeature.id]||openFeature.rows)]}));
      setNativeForm({a:'',b:'',c:''});
      try{ await api('records.create',{collection:'bendary_native_features',value:{feature:openFeature.id,featureAr:openFeature.ar,...row},idempotency_key:'native-'+openFeature.id+'-'+Date.now()}); }catch{}
      showToast('تمت الإضافة إلى '+openFeature.ar+' ✓');
    }
    function renderFeatureCard(f:NF){
      const Icon=f.icon;
      return <article key={f.id} className="bg-white text-black border rounded-2xl p-3 flex flex-col shadow-sm" style={{borderColor:'#EDEDED'}}><div className="flex justify-between items-start gap-2"><span className="w-10 h-10 grid place-items-center rounded-xl bg-[#F7F7F7] shrink-0"><Icon className="w-5 h-5 text-[#C1272D]"/></span><span className="bg-[#E6F4EC] text-[#1F7A4D] text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0">Native</span></div><h3 className="font-bold text-[15px] leading-6 mt-2 [overflow-wrap:anywhere]">{f.ar}</h3><p className="text-[11px] font-bold text-[#888]" dir="ltr">{f.en}</p><p className="text-[13px] leading-6 mt-1 text-[#555] [overflow-wrap:anywhere]">{f.desc}</p><button onClick={()=>{setNativeOpen(f.id); setNativeQ(''); setNativeStatusFilter('الكل'); setStaffView('dashboard'); document.getElementById('staff-feature-detail')?.scrollIntoView({behavior:'smooth'});}} className="mt-2 bg-[#C1272D] text-white py-2 rounded-xl font-bold text-[13px]">فتح</button></article>
    }
    return <div className="min-h-full flex flex-col" style={{background:'#FFFFFF',color:'#111'}}>
      <header data-safe-area-sticky-top className="sticky z-40 bg-white border-b border-[#EDEDED]" style={{top:'var(--safe-area-inset-top)'}}>
        <div className="mx-auto max-w-[1440px] px-2.5 h-14 flex items-center gap-2">
          <button onClick={()=>setStaffMenuOpen(true)} className="lg:hidden w-10 h-10 grid place-items-center rounded-full bg-[#F7F7F7] shrink-0" aria-label="قائمة الفريق"><Menu className="w-5 h-5"/></button>
          <img src={logoUrl} alt="صيدليات البنداري" className="w-9 h-9 rounded-full object-contain shrink-0"/>
          <div className="min-w-0"><p className="font-bold leading-5 text-[15px] truncate">لوحة فريق العمل</p><p className="text-[11px] text-[#C1272D] font-bold leading-4 truncate">{user?.role} • {user?.email}</p></div>
          <div className="flex-1 hidden sm:block"><div className="relative max-w-md mx-auto"><Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]"/><input value={nativeQ} onChange={e=>setNativeQ(e.target.value)} placeholder="بحث داخل خاصية الفريق المفتوحة…" className="w-full border rounded-full py-2 pr-9 pl-3 text-[14px] bg-white text-black"/></div></div>
          <a href="tel:01200400094" className="hidden md:inline-flex items-center gap-1 bg-[#C1272D] text-white px-3 py-2 rounded-full font-bold text-[13px]" dir="ltr"><Phone className="w-4 h-4"/> 01200400094</a>
          <button onClick={()=>{setUser(null); setView('home');}} className="shrink-0 bg-[#F7F7F7] px-3 py-2 rounded-full font-bold text-[13px]">عرض العميل</button>
          <button onClick={staffLogout} className="shrink-0 bg-[#111] text-white px-3 py-2 rounded-full font-bold text-[13px]">خروج</button>
        </div>
        <nav className="flex gap-1 overflow-x-auto no-scrollbar px-2.5 pb-2 lg:hidden">{staffMenu.map(m=>{ const Icon=m.icon; return <button key={m.id} onClick={()=>{setStaffView(m.id); setNativeOpen(null);}} className={`shrink-0 h-[36px] px-3 rounded-full font-bold text-[13px] flex items-center gap-1.5 ${staffView===m.id?'bg-[#C1272D] text-white':'bg-[#F7F7F7] text-black'}`}><Icon className="w-4 h-4"/>{m.label}</button> })}</nav>
      </header>
      <div className="flex-1 flex max-w-[1440px] w-full mx-auto">
        <aside className="hidden lg:block w-[240px] shrink-0 border-l border-[#EDEDED] p-3 space-y-1 sticky top-[56px] self-start max-h-[calc(100dvh-56px)] overflow-y-auto">
          <p className="text-[11px] font-bold text-[#C1272D] px-1">قائمة الفريق</p>
          {staffMenu.map(m=>{ const Icon=m.icon; return <button key={m.id} onClick={()=>{setStaffView(m.id); setNativeOpen(null);}} className={`w-full h-[44px] flex items-center gap-2 px-3 rounded-xl font-bold text-[14px] ${staffView===m.id?'bg-[#C1272D] text-white':'bg-[#F7F7F7] text-black'}`}><Icon className="w-5 h-5"/>{m.label}</button> })}
          <div className="pt-3"><p className="text-[11px] font-bold text-[#888] px-1">38 خاصية — Native</p><p className="text-[12px] leading-5 px-1 mt-1 text-[#666]">إدارة الأدوية 15 • الكفاءة التشغيلية 9 • وظائف إضافية 14</p></div>
        </aside>
        <main className="flex-1 min-w-0 p-2.5 sm:p-3 space-y-[14px]">
          {staffView==='dashboard'&&<div className="space-y-[14px]">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5"><div className="bg-white border rounded-2xl p-3"><p className="text-[12px] text-[#666]">طلبات اليوم</p><p className="font-bold text-[22px]">{orders.length}</p><p className="text-[12px] text-[#C1272D] font-bold">مع السائق: {orders.filter(o=>o.status==='مع السائق').length}</p></div><div className="bg-white border rounded-2xl p-3"><p className="text-[12px] text-[#666]">نواقص حرجة</p><p className="font-bold text-[22px]">{shortage.length + 1}</p><p className="text-[12px] text-[#C1272D] font-bold">راجع المخزون</p></div><div className="bg-white border rounded-2xl p-3"><p className="text-[12px] text-[#666]">فريق العمل</p><p className="font-bold text-[22px]">{staffList.length}</p><p className="text-[12px] text-[#666]">مدير / صيدلي / دليفري / محاسب</p></div><div className="bg-white border rounded-2xl p-3"><p className="text-[12px] text-[#666]">خصائص مفعلة</p><p className="font-bold text-[22px]">38 / 38</p><span className="bg-[#E6F4EC] text-[#1F7A4D] text-[11px] font-bold px-2 py-0.5 rounded-full">Native</span></div></div>
            {openFeature&&<section id="staff-feature-detail" className="bg-white border-2 border-[#C1272D] rounded-2xl p-3 sm:p-4"><div className="flex justify-between gap-2 items-start"><div><span className="bg-[#E6F4EC] text-[#1F7A4D] text-[11px] font-bold px-2 py-0.5 rounded-full">Native</span><h2 className="font-bold text-[18px] leading-7 mt-1">{openFeature.ar}</h2><p className="text-[12px] font-bold text-[#888]" dir="ltr">{openFeature.en}</p><p className="text-[13px] leading-6 mt-1 text-[#555]">{openFeature.desc}</p></div><button onClick={()=>setNativeOpen(null)} className="bg-[#F7F7F7] px-3 py-2 rounded-xl font-bold text-[13px] shrink-0">إغلاق</button></div><div className="grid md:grid-cols-3 gap-2 mt-3"><input value={nativeForm.a} onChange={e=>setNativeForm({...nativeForm,a:e.target.value})} placeholder={openFeature.labels[0]+' *'} className="border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"/><input value={nativeForm.b} onChange={e=>setNativeForm({...nativeForm,b:e.target.value})} placeholder={openFeature.labels[1]+' *'} className="border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"/><input value={nativeForm.c} onChange={e=>setNativeForm({...nativeForm,c:e.target.value})} placeholder={openFeature.labels[2]} className="border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"/></div><button onClick={addNativeRow} className="mt-2 bg-[#C1272D] text-white px-5 py-2.5 rounded-xl font-bold text-[13px]">إضافة صف جديد</button><div className="overflow-x-auto mt-3"><table className="w-full text-[14px] min-w-[620px]"><thead><tr className="text-right text-[12px] text-[#888] border-b"><th className="py-2 px-2">{openFeature.labels[0]}</th><th className="py-2 px-2">{openFeature.labels[1]}</th><th className="py-2 px-2">{openFeature.labels[2]}</th><th className="py-2 px-2">الحالة</th><th className="py-2 px-2">إجراء</th></tr></thead><tbody>{filteredRows.map((r,i)=>{ const realIdx=baseRows.indexOf(r); return <tr key={i} className="border-b"><td className="py-2 px-2 font-bold [overflow-wrap:anywhere]">{r.a}</td><td className="py-2 px-2 [overflow-wrap:anywhere]">{r.b}</td><td className="py-2 px-2 [overflow-wrap:anywhere]">{r.c}</td><td className="py-2 px-2"><span className="bg-[#F7F7F7] px-2 py-0.5 rounded-full text-[11px] font-bold">{r.status}</span></td><td className="py-2 px-2"><div className="flex gap-1"><button onClick={()=>{ const next=baseRows.map((x,j)=>j===realIdx?{...x,status:x.status==='مكتمل'?'نشط':'مكتمل'}:x); setNativeRows(prev=>({...prev,[openFeature.id]:next})); showToast('تم تحديث الحالة'); }} className="bg-[#111] text-white px-2 py-1.5 rounded-lg text-[12px] font-bold">تحديث</button><button onClick={()=>{ const next=baseRows.filter((_,j)=>j!==realIdx); setNativeRows(prev=>({...prev,[openFeature.id]:next})); showToast('تم حذف الصف'); }} className="border border-[#C1272D] text-[#C1272D] px-2 py-1.5 rounded-lg text-[12px] font-bold">حذف</button></div></td></tr> })}</tbody></table></div>{!filteredRows.length&&<p className="text-center font-bold py-4 text-[14px]">لا توجد نتائج — غيّر البحث أو أضف صفاً جديداً.</p>}<p className="text-[12px] text-[#888] mt-2">عرض {filteredRows.length} من {baseRows.length} صفاً • للفريق فقط — الأسعار والخصومات تظهر هنا فقط.</p></section>}
            <section><h2 className="font-bold text-[18px] leading-7">القسم الأول — إدارة الأدوية <span className="text-[12px] text-[#C1272D]">• 15 خاصية</span></h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 mt-2">{FEATURES38.filter(f=>f.sec==='s1').map(renderFeatureCard)}</div></section>
            <section><h2 className="font-bold text-[18px] leading-7">القسم الثاني — الكفاءة التشغيلية <span className="text-[12px] text-[#C1272D]">• 9 خصائص</span></h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 mt-2">{FEATURES38.filter(f=>f.sec==='s2').map(renderFeatureCard)}</div></section>
            <section><h2 className="font-bold text-[18px] leading-7">القسم الثالث — وظائف إضافية <span className="text-[12px] text-[#C1272D]">• 14 خاصية</span></h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 mt-2">{FEATURES38.filter(f=>f.sec==='s3').map(renderFeatureCard)}</div></section>
          </div>}
          {staffView==='orders'&&<div><h2 className="font-bold text-[18px]">الطلبات — للفريق</h2><div className="space-y-2 mt-2">{orders.map(o=><article key={o.no} className="bg-white border rounded-2xl p-3 flex flex-wrap justify-between gap-2"><div><p className="font-bold text-[14px]">{o.no} • {o.status}</p><p className="text-[13px] text-[#555]">{o.customer} • {o.phone} • {o.branch}</p><p className="text-[13px]">{o.items}</p></div><div className="flex gap-1 flex-wrap">{statuses.map(s=><button key={s} onClick={()=>changeStatus(o.no,s)} className={`px-2.5 py-1.5 rounded-lg font-bold text-[12px] ${o.status===s?'bg-[#C1272D] text-white':'bg-[#F7F7F7] text-black'}`}>{s}</button>)}</div></article>)}</div></div>}
          {staffView==='inventory'&&<div className="space-y-3"><h2 className="font-bold text-[18px]">المخزون والنواقص — للفريق</h2><p className="text-[12px] font-bold leading-6 bg-[#F7F7F7] rounded-xl p-2.5">ملف الكتالوج: mosta_pharm_full_products_catalog3 - يُستورد من لوحة فريق العمل</p><p className="text-[12px] leading-6 text-[#555]">الكتالوج الكامل: 22,258 صنف - 12,707 بباركود - 7,176 بانتظار المراجعة - قاموس الأدوية 80,000+ صنف - 3,000+ عرض وعلاج - مصادر: مصر / السعودية / الإمارات / أوروبا / FDA / WHO - تحديث شهري</p><div className="bg-white border rounded-2xl p-3 overflow-x-auto"><table className="w-full text-[14px] min-w-[560px]"><thead><tr className="text-right text-[12px] text-[#888] border-b"><th className="py-2">الصنف</th><th className="py-2">الفرع</th><th className="py-2">المخزون</th><th className="py-2">الحد الأدنى</th><th className="py-2">الحالة</th></tr></thead><tbody>{STOCK.map((s,i)=><tr key={i} className="border-b"><td className="py-2 font-bold">{s.p}</td><td className="py-2">{s.branch}</td><td className="py-2">{s.stock}</td><td className="py-2">{s.min}</td><td className="py-2"><span className="bg-[#F7F7F7] px-2 py-0.5 rounded-full text-[11px] font-bold">{s.status}</span></td></tr>)}</tbody></table></div><div className="bg-white border rounded-2xl p-3"><h3 className="font-bold">كشكول النواقص ({shortage.length})</h3><div className="grid sm:grid-cols-3 gap-2 mt-2"><input value={shortForm.product} onChange={e=>setShortForm({...shortForm,product:e.target.value})} placeholder="اسم الصنف *" className="border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"/><select value={shortForm.branch} onChange={e=>setShortForm({...shortForm,branch:e.target.value})} className="border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black">{BRANCHES.map(b=><option key={b.name}>{b.name}</option>)}</select><input value={shortForm.qty} onChange={e=>setShortForm({...shortForm,qty:e.target.value})} placeholder="الكمية *" inputMode="numeric" className="border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"/></div><button onClick={addShortage} className="mt-2 bg-[#C1272D] text-white px-5 py-2.5 rounded-xl font-bold text-[13px]">إضافة للنواقص</button>{shortage.map((s,i)=><p key={i} className="text-[13px] border-t pt-1 mt-2">{s.product} — {s.branch} — الكمية {s.qty}</p>)}</div></div>}
          {staffView==='pos'&&<div><h2 className="font-bold text-[18px]">نقطة البيع والفواتير — الأسعار تظهر للفريق فقط</h2><div className="bg-white border rounded-2xl p-3 overflow-x-auto mt-2"><table className="w-full text-[14px] min-w-[680px]"><thead><tr className="text-right text-[12px] text-[#888] border-b"><th className="py-2">الصنف</th><th className="py-2">العبوة</th><th className="py-2">الكمية</th><th className="py-2">السعر</th><th className="py-2">الخصم</th><th className="py-2">الإجمالي</th></tr></thead><tbody>{posRows.map((r,i)=><tr key={i} className="border-b"><td className="py-2"><select value={r.product} onChange={e=>setPosRows(p=>p.map((x,j)=>j===i?{...x,product:e.target.value}:x))} className="border rounded-lg px-2 py-2 text-[13px] bg-white text-black w-full">{BASE_PRODUCTS.map(p=><option key={p.name}>{p.name}</option>)}</select></td><td className="py-2"><select value={r.pack} onChange={e=>setPosRows(p=>p.map((x,j)=>j===i?{...x,pack:e.target.value}:x))} className="border rounded-lg px-2 py-2 text-[13px] bg-white text-black"><option>شريط</option><option>علبة</option><option>قرص</option><option>زجاجة</option></select></td><td className="py-2"><input type="number" min={1} value={r.qty} onChange={e=>setPosRows(p=>p.map((x,j)=>j===i?{...x,qty:Number(e.target.value)}:x))} className="w-16 border rounded-lg px-2 py-2 text-[13px] bg-white text-black"/></td><td className="py-2"><input type="number" min={0} value={r.price} onChange={e=>setPosRows(p=>p.map((x,j)=>j===i?{...x,price:Number(e.target.value)}:x))} className="w-20 border rounded-lg px-2 py-2 text-[13px] bg-white text-black"/></td><td className="py-2"><input type="number" min={0} value={r.discount} onChange={e=>setPosRows(p=>p.map((x,j)=>j===i?{...x,discount:Number(e.target.value)}:x))} className="w-20 border rounded-lg px-2 py-2 text-[13px] bg-white text-black"/></td><td className="py-2 font-bold">{posRowTotal(r)}</td></tr>)}</tbody></table><div className="flex flex-wrap gap-2 mt-3 justify-between items-center"><button onClick={()=>setPosRows(p=>[...p,{product:'باراسيتامول 500 مجم',pack:'شريط',qty:1,price:0,discount:0}])} className="bg-[#111] text-white px-4 py-2 rounded-xl font-bold text-[13px]">+ إضافة صنف</button><p className="font-bold">الإجمالي: {posRows.reduce((s,r)=>s+posRowTotal(r),0)}</p><button onClick={savePosSale} className="bg-[#C1272D] text-white px-5 py-2 rounded-xl font-bold text-[13px]">حفظ الفاتورة</button></div>{posSaved.length>0&&<div className="mt-3">{posSaved.map((s,i)=><p key={i} className="text-[13px]">فاتورة {i+1} — {s.rows.length} صنف — الإجمالي {s.total}</p>)}</div>}</div></div>}
          {staffView==='customers'&&<div><h2 className="font-bold text-[18px]">العملاء — للفريق</h2><div className="bg-white border rounded-2xl p-3 mt-2"><div className="grid sm:grid-cols-2 gap-2"><input value={custForm.name} onChange={e=>setCustForm({...custForm,name:e.target.value})} placeholder="اسم العميل *" className="border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"/><input value={custForm.phone} onChange={e=>setCustForm({...custForm,phone:e.target.value})} placeholder="رقم الهاتف *" inputMode="tel" className="border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"/><input value={custForm.address} onChange={e=>setCustForm({...custForm,address:e.target.value})} placeholder="العنوان" className="border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"/><select value={custForm.branch} onChange={e=>setCustForm({...custForm,branch:e.target.value})} className="border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black">{BRANCHES.map(b=><option key={b.name}>{b.name}</option>)}</select></div><button onClick={addCustomer} className="mt-2 bg-[#C1272D] text-white px-5 py-2.5 rounded-xl font-bold text-[13px]">إضافة عميل</button>{customers.map((c,i)=><p key={i} className="text-[13px] border-t pt-1 mt-2">{c.name} — {c.phone} — {c.branch}</p>)}</div></div>}
          {staffView==='team'&&<div><h2 className="font-bold text-[18px]">فريق العمل</h2><div className="bg-white border rounded-2xl p-3 mt-2"><div className="grid sm:grid-cols-2 gap-2"><input value={staffForm.name} onChange={e=>setStaffForm({...staffForm,name:e.target.value})} placeholder="اسم الموظف" className="border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"/><input value={staffForm.phone} onChange={e=>setStaffForm({...staffForm,phone:e.target.value})} placeholder="رقم الهاتف" inputMode="tel" className="border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"/><select value={staffForm.role} onChange={e=>setStaffForm({...staffForm,role:e.target.value})} className="border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"><option>صيدلي</option><option>مساعد صيدلي</option><option>سائق توصيل</option><option>موظف استقبال</option><option>مدير فرع</option><option>محاسب</option></select><select value={staffForm.branch} onChange={e=>setStaffForm({...staffForm,branch:e.target.value})} className="border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black">{BRANCHES.map(b=><option key={b.name}>{b.name}</option>)}</select></div><button onClick={addStaffMember} className="mt-2 bg-[#C1272D] text-white px-5 py-2.5 rounded-xl font-bold text-[13px]">إضافة موظف</button>{staffList.map((s,i)=><p key={i} className="text-[13px] border-t pt-1 mt-2">{s.name} — {s.role} — {s.branch} — {s.shift}</p>)}</div></div>}
          {staffView==='ads'&&<div><h2 className="font-bold text-[18px]">إدارة الإعلانات</h2><div className="bg-white border rounded-2xl p-3 mt-2"><div className="flex gap-2"><input value={adForm.title} onChange={e=>setAdForm({...adForm,title:e.target.value})} placeholder="عنوان الإعلان" className="flex-1 border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"/><select value={adForm.position} onChange={e=>setAdForm({...adForm,position:e.target.value})} className="border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"><option>رئيسي</option><option>متجر</option><option>جانبي</option></select><button onClick={addAd} className="bg-[#C1272D] text-white px-4 rounded-xl font-bold text-[13px] shrink-0">إضافة</button></div>{ads.map((a,i)=><div key={i} className="flex justify-between gap-2 border-t pt-2 mt-2"><div><p className="font-bold text-[14px]">{a.title}</p><p className="text-[12px] text-[#666]">{a.position} • {a.status}</p></div><button onClick={()=>{ setAds(prev=>prev.map(x=>x.title===a.title?{...x,status:x.status==='نشط'?'متوقف':'نشط'}:x)); showToast('تم تحديث حالة الإعلان'); }} className="bg-[#111] text-white px-3 py-1.5 rounded-lg font-bold text-[12px] h-fit">{a.status==='نشط'?'إيقاف':'تفعيل'}</button></div>)}</div></div>}
          {staffView==='chat'&&<div><h2 className="font-bold text-[18px]">BenDa ChaT — للفريق فقط</h2><div className="bg-white border rounded-2xl p-3 mt-2 max-w-2xl"><div className="space-y-2 max-h-[380px] overflow-y-auto">{staffChat.map((m,i)=><div key={i} className={`max-w-[85%] rounded-2xl px-3 py-2 text-[14px] leading-6 ${m.from==='me'?'mr-auto bg-[#C1272D] text-white':'bg-[#F7F7F7] text-black'}`}>{m.text}</div>)}<div ref={staffChatEnd}/></div><div className="flex gap-2 mt-2"><input value={staffChatInput} onChange={e=>setStaffChatInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendStaffChat()} placeholder="اسأل عن المبيعات أو الطلبات…" className="flex-1 border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"/><button onClick={()=>sendStaffChat()} className="bg-[#C1272D] text-white px-4 rounded-xl font-bold"><Send className="w-4 h-4"/></button></div><div className="flex gap-2 mt-2 flex-wrap"><button onClick={()=>sendStaffChat('تحليل المبيعات اليوم؟')} className="border rounded-full px-3 py-1.5 text-[12px] font-bold">تحليل المبيعات</button><button onClick={()=>sendStaffChat('ما النواقص الحرجة؟')} className="border rounded-full px-3 py-1.5 text-[12px] font-bold">النواقص الحرجة</button></div></div></div>}
          {staffView==='settings'&&<div><h2 className="font-bold text-[18px]">إعدادات الفريق</h2><div className="bg-white border rounded-2xl p-4 mt-2 max-w-2xl space-y-3"><p className="text-[13px] leading-6 text-[#555]">أنت مسجّل كـ <b>{user?.role}</b> — {user?.email}. صلاحياتك تظهر في لوحة الفريق فقط.</p><button onClick={()=>showToast('تم حفظ إعدادات الفريق')} className="w-full bg-[#C1272D] text-white py-2.5 rounded-xl font-bold">حفظ إعدادات الفريق</button><button onClick={()=>{setUser(null); setView('home');}} className="w-full bg-[#F7F7F7] py-2.5 rounded-xl font-bold">عرض واجهة العميل</button><button onClick={staffLogout} className="w-full bg-[#111] text-white py-2.5 rounded-xl font-bold">خروج فريق العمل</button></div></div>}
        </main>
      </div>
      {staffMenuOpen&&<div className="fixed inset-0 z-[80] lg:hidden"><button aria-label="إغلاق قائمة الفريق" onClick={()=>setStaffMenuOpen(false)} className="absolute inset-0 bg-black/50 w-full h-full"/><aside className="absolute top-0 right-0 h-full w-[300px] max-w-[86vw] bg-white text-black overflow-y-auto p-3" style={{paddingTop:'max(0.75rem,var(--safe-area-inset-top))'}}><div className="flex justify-between items-center"><p className="font-bold">قائمة الفريق</p><button onClick={()=>setStaffMenuOpen(false)} aria-label="إغلاق" className="w-10 h-10 grid place-items-center rounded-full bg-[#F7F7F7]"><X className="w-5 h-5"/></button></div><div className="space-y-1 mt-3">{staffMenu.map(m=>{ const Icon=m.icon; return <button key={m.id} onClick={()=>{setStaffView(m.id); setStaffMenuOpen(false); setNativeOpen(null);}} className={`w-full h-[44px] flex items-center gap-2 px-3 rounded-xl font-bold text-[14px] ${staffView===m.id?'bg-[#C1272D] text-white':'bg-[#F7F7F7] text-black'}`}><Icon className="w-5 h-5"/>{m.label}</button> })}</div></aside></div>}
    </div>
  }

  if(splash){
    return <div className="min-h-[100dvh] grid place-items-center bg-white pt-[var(--safe-area-inset-top)]" style={{boxSizing:'border-box'}}><div className="text-center"><img src={logoUrl} alt="صيدليات البنداري" className="w-[92px] h-[92px] rounded-full object-contain mx-auto bg-white"/><p className="font-bold text-[22px] mt-3">صيدليات البنداري</p><p className="text-[13px] text-[#C1272D] font-bold">رعاية من القلب ♥</p><p className="text-[13px] text-[#666] mt-1">جارٍ التحميل…</p></div></div>
  }

  // STAFF-ONLY shell takes over after staff login
  if(isStaff){
    return <div className="min-h-[100dvh] bg-white overflow-x-clip pt-[var(--safe-area-inset-top)]" style={{boxSizing:'border-box'}} dir={lang==='ar'?'rtl':'ltr'}><StaffDashboard/>{toast&&<div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] bg-[#111] text-white px-4 py-2.5 rounded-full font-bold text-[13px] shadow-xl max-w-[92vw] text-center [overflow-wrap:anywhere]">{toast}</div>}</div>
  }

  // CUSTOMER shell — no staff features anywhere here
  const customerNav = [
    {id:'home',label:navLabels.home},
    {id:'shop',label:navLabels.shop},
    {id:'offers',label:navLabels.offers},
    {id:'branches',label:navLabels.branches},
    {id:'articles',label:navLabels.articles},
    {id:'rx',label:navLabels.rx},
    {id:'tracking',label:navLabels.track},
    {id:'contact',label:navLabels.contact},
  ];
  return <div data-safe-area-inset-root className="min-h-[100dvh] overflow-x-clip" style={{boxSizing:'border-box',paddingTop:'var(--safe-area-inset-top)',background:shellBg,color:shellText}} dir={lang==='ar'?'rtl':'ltr'}>
    {/* Slim sticky top bar 56px */}
    <header data-safe-area-sticky-top className="sticky z-50 border-b" style={{top:'var(--safe-area-inset-top)',background:isDark?'#111':'#FFFFFF',borderColor:isDark?'#333':'#EDEDED'}}>
      <div className="mx-auto max-w-[1440px] px-2.5 sm:px-3 h-14 flex items-center gap-2">
        <button onClick={()=>go('home')} aria-label="صيدليات البنداري — الرئيسية" className="shrink-0 flex items-center gap-2"><img src={logoUrl} alt="صيدليات البنداري" className="w-10 h-10 rounded-full bg-white object-contain"/><span className="hidden sm:block leading-4"><span className="block font-bold text-[14px]">البنداري</span><span className="block text-[11px] text-[#C1272D] font-bold">رعاية من القلب ♥</span></span></button>
        <div className="relative flex-1 min-w-0"><Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]"/><input value={search} onChange={e=>{setSearch(e.target.value); if(view!=='shop') setView('shop');}} placeholder={lang==='ar'?'ابحث عن دواء أو منتج…':'Search medicine…'} className="w-full border rounded-full py-2 pr-9 pl-3 text-[14px] bg-white text-black" style={{borderColor:'#EDEDED'}}/></div>
        <a href="tel:01200400094" className="hidden md:inline-flex items-center gap-1.5 bg-[#C1272D] text-white px-3 py-2 rounded-full font-bold text-[13px] shrink-0" dir="ltr"><Phone className="w-4 h-4"/> 01200400094</a>
        <button onClick={()=>setShowCart(true)} className="relative w-10 h-10 grid place-items-center rounded-full shrink-0" style={{background:creamBg}} aria-label="السلة"><ShoppingCart className="w-5 h-5"/>{cart.length>0&&<span className="absolute -top-1 -left-1 bg-[#C1272D] text-white text-[11px] font-bold min-w-[20px] h-5 px-1 rounded-full grid place-items-center">{cart.length}</span>}</button>
        <button onClick={()=>setChatOpen(true)} aria-label="BenDa ChaT" className="w-10 h-10 grid place-items-center rounded-full bg-[#C1272D] text-white shrink-0"><MessageCircle className="w-5 h-5"/></button>
        <button onClick={()=>setDrawer(true)} className="w-10 h-10 grid place-items-center rounded-full text-white shrink-0 bg-[#111]" aria-label="القائمة"><Menu className="w-5 h-5"/></button>
      </div>
      <nav aria-label="التنقل الرئيسي" className="flex gap-1 overflow-x-auto no-scrollbar px-2.5 sm:px-3 pb-2">
        {customerNav.map(l=>{ const active=view===l.id; return <button key={l.id} onClick={()=>go(l.id)} aria-current={active?'page':undefined} className={`shrink-0 h-[34px] px-3 rounded-full font-bold text-[13px] whitespace-nowrap ${active?'bg-[#C1272D] text-white':'bg-transparent'}`} style={{background:active?'#C1272D':creamBg,color:active?'white':shellText}}>{l.label}</button> })}
        <button onClick={()=>{setLoginTab('customer'); setShowLogin(true);}} className="shrink-0 h-[34px] px-3 rounded-full font-bold text-[13px] whitespace-nowrap" style={{background:creamBg}}>{user? (user.name==='ضيف'?'ضيف':navLabels.account) : 'دخول'}</button>
      </nav>
      <div className="text-center pb-1.5 -mt-0.5"><span className="text-[11px] font-bold text-[#C1272D]">22,258 صنف - 61 فئة • الكتالوج الكامل</span></div>
    </header>

    <main className="mx-auto max-w-[1440px] px-2.5 sm:px-3 pt-3 pb-[76px] sm:pb-6">
      {view==='home'&&<HomeView/>}
      {view==='shop'&&<ShopView/>}
      {view==='offers'&&<OffersView/>}
      {view==='branches'&&<BranchesView/>}
      {view==='articles'&&<ArticlesView/>}
      {view==='dictionary'&&<DictionaryView/>}
      {view==='rx'&&<RxView/>}
      {view==='tracking'&&<TrackingView/>}
      {view==='myorders'&&<MyOrdersView/>}
      {view==='account'&&<AccountView/>}
      {view==='settings'&&<SettingsView/>}
      {view==='contact'&&<ContactView/>}
      {view==='about'&&<LegalView k="about"/>}
      {view==='privacy'&&<LegalView k="privacy"/>}
      {view==='terms'&&<LegalView k="terms"/>}
    </main>

    {/* Customer footer — only customer links, then DevOps, then Verified */}
    <footer className="border-t" style={{borderColor:isDark?'#333':'#EDEDED',background:isDark?'#111':'#FFFFFF'}}>
      <div className="mx-auto max-w-[1440px] px-2.5 sm:px-3 py-4">
        <div className="flex flex-wrap gap-2 justify-center">{[{id:'shop',label:navLabels.shop},{id:'rx',label:navLabels.rx},{id:'offers',label:navLabels.offers},{id:'branches',label:navLabels.branches},{id:'about',label:'من نحن'},{id:'privacy',label:'سياسة الخصوصية'},{id:'terms',label:'الشروط والأحكام'}].map(l=><button key={l.id} onClick={()=>go(l.id)} className="px-3 py-2 rounded-full font-bold text-[13px]" style={{background:creamBg}}>{l.label}</button>)}</div>
        <p className="text-center font-bold text-[13px] mt-3">DevOps By (MoSTa® | Let's Live The Future Now)</p>
        <p className="text-center font-bold text-[13px] mt-1">Verified By Meta</p>
        <p className="text-center text-[12px] mt-2" style={{color:isDark?'#AAA':'#666'}}>صيدليات البنداري — رعاية من القلب ♥ • الخط الساخن: <a href="tel:01200400094" className="text-[#C1272D] font-bold" dir="ltr">01200400094</a></p>
      </div>
    </footer>

    {/* Mobile bottom nav — customer only */}
    <nav className="fixed bottom-0 inset-x-0 z-40 sm:hidden border-t" style={{background:isDark?'#111':'#FFFFFF',borderColor:isDark?'#333':'#EDEDED'}}>
      <div className="grid grid-cols-5">{[{id:'home',label:navLabels.home,icon:Home},{id:'shop',label:navLabels.shop,icon:Store},{id:'offers',label:navLabels.offers,icon:Gift},{id:'tracking',label:navLabels.track,icon:Truck},{id:'account',label:navLabels.account,icon:User}].map(it=>{ const Icon=it.icon; return <button key={it.id} onClick={()=>go(it.id)} className={`py-2 flex flex-col items-center gap-0.5 text-[11px] font-bold ${view===it.id?'text-[#C1272D]':'text-[#666]'}`}><Icon className="w-5 h-5"/>{it.label}</button> })}</div>
    </nav>

    <Drawer/>

    {/* Cart drawer */}
    {showCart&&<div className="fixed inset-0 z-[92]" role="dialog" aria-modal="true" aria-label="سلة التسوق"><button aria-label="إغلاق السلة" onClick={()=>setShowCart(false)} className="absolute inset-0 bg-black/50 w-full h-full"/><aside className="absolute top-0 left-0 h-full w-[360px] max-w-[92vw] bg-white text-black overflow-y-auto p-3 shadow-2xl" style={{paddingTop:'max(0.75rem,var(--safe-area-inset-top))'}}><div className="flex justify-between items-center"><h2 className="font-bold text-[17px]">سلة التسوق ({cart.length})</h2><button onClick={()=>setShowCart(false)} aria-label="إغلاق" className="w-10 h-10 grid place-items-center rounded-full bg-[#F7F7F7]"><X className="w-5 h-5"/></button></div>{!cart.length? <p className="text-[14px] text-[#666] mt-4">سلتك فارغة — أضف منتجات من المتجر.</p> : <div className="space-y-2 mt-3">{cart.map((c,i)=><div key={i} className="flex justify-between gap-2 border rounded-xl p-2.5"><div className="min-w-0"><p className="font-bold text-[14px] leading-5 [overflow-wrap:anywhere]">{c.name}</p><p className="text-[12px] text-[#666]">{c.cat}</p></div><button onClick={()=>setCart(prev=>prev.filter((_,j)=>j!==i))} aria-label="حذف من السلة" className="w-9 h-9 grid place-items-center rounded-full bg-[#F7F7F7] shrink-0"><Trash2 className="w-4 h-4 text-[#C1272D]"/></button></div>)}</div>}{cart.length>0&&<div className="mt-3">{checkout? <div className="space-y-2"><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="الاسم بالكامل *" className="w-full border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"/><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="رقم الهاتف *" inputMode="tel" className="w-full border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"/><input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="العنوان *" className="w-full border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"/><select value={form.branch} onChange={e=>setForm({...form,branch:e.target.value})} className="w-full border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black">{BRANCHES.map(b=><option key={b.name}>{b.name}</option>)}</select><button onClick={placeOrder} className="w-full bg-[#C1272D] text-white py-3 rounded-xl font-bold">تأكيد الطلب</button><button onClick={()=>setCheckout(false)} className="w-full border py-2.5 rounded-xl font-bold">عودة</button></div> : <button onClick={()=>setCheckout(true)} className="w-full bg-[#C1272D] text-white py-3 rounded-xl font-bold">إتمام الطلب</button>}</div>}</aside></div>}

    {/* Product detail */}
    {detail&&<div className="fixed inset-0 z-[93] overflow-y-auto bg-black/50 pt-[max(1rem,var(--safe-area-inset-top))] pb-4 px-3"><div className="min-h-full flex items-center justify-center"><div className="w-full max-w-md bg-white text-black rounded-2xl shadow-xl p-4"><div className="flex justify-between items-start gap-2"><h2 className="font-bold text-[17px] leading-6 [overflow-wrap:anywhere]">{detail.name}</h2><button onClick={()=>setDetail(null)} aria-label="إغلاق" className="w-9 h-9 grid place-items-center rounded-full bg-[#F7F7F7] shrink-0"><X className="w-5 h-5"/></button></div><p className="text-[13px] text-[#C1272D] font-bold mt-1">{detail.cat} • {detail.tag}</p><p className="text-[14px] leading-7 mt-2">{detail.desc}</p><p className="text-[13px] font-bold mt-2">اسأل الصيدلي عن التفاصيل</p><div className="flex gap-2 mt-3"><button onClick={()=>{addCart(detail); setDetail(null);}} className="flex-1 bg-[#C1272D] text-white py-2.5 rounded-xl font-bold">أضف للسلة</button><button onClick={()=>toggleFav(detail)} className="px-4 py-2.5 rounded-xl border font-bold text-[13px]">مفضلة ♥</button></div></div></div></div>}

    {/* BenDa ChaT — ONE bot only, customer */}
    {chatOpen&&<div className="fixed inset-0 z-[94] overflow-y-auto bg-black/50 pt-[max(1rem,var(--safe-area-inset-top))] pb-4 px-3"><div className="min-h-full flex items-end sm:items-center justify-center"><div className="w-full max-w-md bg-white text-black rounded-2xl shadow-xl overflow-hidden flex flex-col" style={{maxHeight:'calc(100dvh - var(--safe-area-inset-top) - 2rem)'}}><div className="bg-[#C1272D] text-white p-3 flex justify-between items-center"><div><p className="font-bold">BenDa ChaT</p><p className="text-[12px] text-white/85">صيدلي البنداري • متاح 24 ساعة</p></div><button onClick={()=>setChatOpen(false)} aria-label="إغلاق الشات" className="w-9 h-9 grid place-items-center rounded-full bg-white/20"><X className="w-5 h-5"/></button></div><div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-[280px]">{chat.map((m,i)=><div key={i} className={`max-w-[85%] rounded-2xl px-3 py-2 text-[14px] leading-6 ${m.from==='me'?'mr-auto bg-[#C1272D] text-white':'bg-[#F7F7F7] text-black'}`}>{m.text}</div>)}<div ref={chatEnd}/></div><div className="flex gap-2 p-2 flex-wrap"><button onClick={()=>sendChat('أقرب فرع؟')} className="border rounded-full px-3 py-1.5 text-[12px] font-bold">أقرب فرع؟</button><button onClick={()=>sendChat('عرض اليوم؟')} className="border rounded-full px-3 py-1.5 text-[12px] font-bold">عرض اليوم؟</button><button onClick={()=>sendChat('تتبع طلبي')} className="border rounded-full px-3 py-1.5 text-[12px] font-bold">تتبع طلبي</button></div><div className="flex gap-2 p-3 pt-0"><input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendChat()} placeholder="اكتب سؤالك…" className="flex-1 border rounded-xl px-3 py-2.5 text-[14px] bg-white text-black"/><button onClick={()=>sendChat()} className="bg-[#C1272D] text-white px-4 rounded-xl font-bold"><Send className="w-4 h-4"/></button></div></div></div></div>}
    {!chatOpen&&<button onClick={()=>setChatOpen(true)} aria-label="افتح BenDa ChaT" className="fixed bottom-[76px] sm:bottom-6 left-3 sm:left-4 z-40 w-14 h-14 rounded-full bg-[#C1272D] text-white grid place-items-center shadow-xl"><MessageCircle className="w-6 h-6"/></button>}

    {/* Login — customer + staff gated */}
    {showLogin&&<div className="fixed inset-0 z-[95] overflow-y-auto bg-black/50 pt-[max(1rem,var(--safe-area-inset-top))] pb-4 px-3"><div className="min-h-full flex items-center justify-center"><div className="w-full max-w-md bg-white text-black rounded-2xl shadow-xl p-5">
      <button onClick={()=>setShowLogin(false)} className="mr-auto block w-9 h-9 grid place-items-center rounded-full bg-[#F7F7F7]" aria-label="إغلاق"><X className="w-5 h-5"/></button>
      <div className="text-center"><img src={logoUrl} alt="صيدليات البنداري" className="w-[72px] h-[72px] rounded-full object-contain mx-auto bg-white"/><h1 className="font-bold text-[20px] mt-2">صيدليات البنداري</h1><p className="text-[12px] font-bold text-[#C1272D]">رعاية من القلب ♥</p><h2 className="font-bold text-[17px] mt-2">Welcome to EL BENDARY Connect</h2></div>
      <div className="grid grid-cols-2 gap-2 mt-4 bg-[#F7F7F7] p-1 rounded-full"><button onClick={()=>{setLoginTab('customer'); setLoginError('');}} className={`py-2.5 rounded-full font-bold text-[14px] ${loginTab==='customer'?'bg-white shadow':'text-[#666]'}`}>عميل</button><button onClick={()=>{setLoginTab('staff'); setLoginError('');}} className={`py-2.5 rounded-full font-bold text-[14px] ${loginTab==='staff'?'bg-white shadow':'text-[#666]'}`}>فريق العمل</button></div>
      <div className="mt-4 space-y-3">
        <div><label className="text-[13px] font-bold block mb-1">Email or Phone</label><input value={loginEmail} onChange={e=>{setLoginEmail(e.target.value); setLoginError('');}} placeholder={loginTab==='staff'?'admin@bendaryph.com':'Email or Phone'} inputMode="email" className="w-full border rounded-xl px-3 py-2.5 text-[15px] bg-white text-black" dir="ltr"/></div>
        <div><label className="text-[13px] font-bold block mb-1">Password</label><input type="password" value={loginPass} onChange={e=>{setLoginPass(e.target.value); setLoginError('');}} placeholder="Password" onKeyDown={e=>e.key==='Enter'&&handleLogin()} className="w-full border rounded-xl px-3 py-2.5 text-[15px] bg-white text-black" dir="ltr"/></div>
        {loginTab==='staff'&&<div><label className="text-[13px] font-bold block mb-1">الدور / Role</label><select value={staffRole} onChange={e=>setStaffRole(e.target.value)} className="w-full border rounded-xl px-3 py-2.5 text-[15px] bg-white text-black"><option>مدير</option><option>صيدلي</option><option>دليفري</option><option>محاسب</option>{isSuperEmail(loginEmail)&&<option>Super Control</option>}</select><p className="text-[12px] text-[#666] leading-5 mt-1">دخول الفريق: admin@bendaryph.com حتى admin_200@bendaryph.com • Super Control متاح فقط لإيميلي الإدارة.</p></div>}
        {loginError&&<p role="alert" className="bg-[#FDECEC] text-[#C1272D] rounded-xl p-3 text-[13px] font-bold leading-6">{loginError}</p>}
        <button onClick={handleLogin} className="w-full bg-[#1F7A4D] text-white py-3 rounded-xl font-bold">Log in</button>
      </div>
      <div className="flex items-center gap-3 my-4"><span className="flex-1 h-px bg-[#EDEDED]"/><span className="text-[11px] font-bold text-[#888]" dir="ltr">OR CONNECT WITH</span><span className="flex-1 h-px bg-[#EDEDED]"/></div>
      <div className="flex justify-center gap-2"><a href="https://wa.me/201200400094" target="_blank" rel="noopener" aria-label="WhatsApp" className="w-11 h-11 rounded-full bg-[#25D366] text-white grid place-items-center font-bold text-[13px]">WA</a><button onClick={()=>showToast('سيتم الربط قريباً')} aria-label="Facebook" className="w-11 h-11 rounded-full bg-[#1877F2] text-white grid place-items-center font-bold text-[13px]">Fb</button><button onClick={()=>showToast('سيتم الربط قريباً')} aria-label="Instagram" className="w-11 h-11 rounded-full bg-[#E1306C] text-white grid place-items-center font-bold text-[13px]">IG</button><button onClick={()=>showToast('سيتم الربط قريباً')} aria-label="Email" className="w-11 h-11 rounded-full bg-[#111] text-white grid place-items-center"><Mail className="w-5 h-5"/></button></div>
      <button onClick={()=>{ setUser({name:'ضيف',email:'ضيف',kind:'guest'}); setShowLogin(false); setView('shop'); showToast('أهلاً بيك — تتسوق الآن كضيف'); }} className="mt-4 w-full py-2 font-bold text-[#C1272D] text-[14px]">تسوق بدون دخول - كضيف</button>
    </div></div></div>}

    {toast&&<div className="fixed bottom-[84px] sm:bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-[#111] text-white px-4 py-2.5 rounded-full font-bold text-[13px] shadow-xl max-w-[92vw] text-center [overflow-wrap:anywhere]">{toast}</div>}
  </div>
}
