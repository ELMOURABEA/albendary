"use client";
import React, { useEffect, useMemo, useState } from 'react';
import {
  Search,
  ShoppingCart,
  MapPin,
  Phone,
  Menu,
  X,
  ChevronLeft,
  Plus,
  Trash2,
  MessageCircle,
  Send,
  Truck,
  Store,
  BookOpen,
  ShieldCheck,
  Pill,
  Warehouse,
  ShoppingBag,
  BarChart3,
  ClipboardList,
  Lock,
  FileText,
  Bell,
  Calendar,
  Globe,
  BadgeCheck,
  Gift,
  Brain,
  Barcode,
  Check,
  Shield,
  Wallet,
  Stethoscope,
  Bot,
  FlaskConical,
  FileCheck,
  Users,
} from 'lucide-react';

// ============================================================
// El-Bendary — bendary-app.tsx — FINAL LOOK — 530+ lines
// One single file. White background. Red #C8102E.
// ============================================================

const logoUrl =
  '/bendary-assets/1f679769500545ba-image_20261126_065221.webp';
const ad1Url =
  '/bendary-assets/5ff10bc75054d151-img-u7531593695661291740-1.jpg';
const ad2Url =
  '/bendary-assets/509f4f33f27bb6f8-img-u7531593695661291740-2.jpg';
const ad3Url =
  '/bendary-assets/f4fea1d6cb10d61e-img-u7531593695661291740-3.jpg';
const ad4Url =
  '/bendary-assets/d60a96abbec482a7-img-u7531593695661291740-4.jpg';
const ad5Url =
  '/bendary-assets/4af70ef1f361b647-img-u7531593695661291740-5.jpg';
const ad6Url =
  '/bendary-assets/b082e443a04ea8ae-img-u7531593695661291740-6.jpg';
const ad7Url =
  '/bendary-assets/14846272779edddc-img-u7531593695661291740-7.jpg';
const ad8Url =
  '/bendary-assets/c038fe6ca9f2f23a-img-u7531593695661291740-8.jpg';
const ad9Url =
  '/bendary-assets/4110844d18b42d99-img-u7531593695661291740-9.jpg';
const ad10Url =
  '/bendary-assets/db3bfa44eba12e79-img-u7531593695661291740-10.jpg';

type ApiProduct = {
  name: string;
  cat: string;
  tag: string;
  desc: string;
  barcode: string;
  price?: number;
  stock?: number;
};

type Drug = {
  en: string;
  ar: string;
  active: string;
  cat: string;
  letter: string;
  use: string;
  how: string;
  side: string;
  warn: string;
  source: string;
};

// ---------------- Categories ----------------
const CATS = [
  { name: 'الكل', count: 22258 },
  { name: 'أدوية', count: 8420 },
  { name: 'تجميل', count: 3120 },
  { name: 'عناية بالبشرة', count: 2450 },
  { name: 'عناية بالشعر', count: 1850 },
  { name: 'فيتامينات', count: 1640 },
  { name: 'أم وطفل', count: 1240 },
  { name: 'أجهزة طبية', count: 980 },
  { name: 'عناية فم', count: 720 },
  { name: 'عطور', count: 640 },
  { name: 'حساسية', count: 560 },
  { name: 'سكر', count: 380 },
  { name: 'أخرى', count: 258 },
];

// ---------------- Branches — 12 real ----------------
const BRANCHES_INIT = [
  {
    name: 'فرع المهندسين',
    code: 'BEN-01',
    address: '69 شارع شهاب — المهندسين',
    phone: '01200400094',
  },
  {
    name: 'فرع الجلاء (الموقف)',
    code: 'BEN-02',
    address: 'الجلاء — منطقة الموقف',
    phone: '01200400094',
  },
  {
    name: 'فرع الجلاء (جرين بالاس)',
    code: 'BEN-03',
    address: 'الجلاء — جرين بالاس',
    phone: '01200400094',
  },
  {
    name: 'فرع الجلاء (الأمن المركزي)',
    code: 'BEN-04',
    address: 'الجلاء — الأمن المركزي',
    phone: '01200400094',
  },
  {
    name: 'فرع البورصة',
    code: 'BEN-05',
    address: 'شارع البورصة — طنطا',
    phone: '01200400094',
  },
  {
    name: 'فرع الأشرف',
    code: 'BEN-06',
    address: 'حي الأشرف — طنطا',
    phone: '01200400094',
  },
  {
    name: 'فرع كفر عصام',
    code: 'BEN-07',
    address: 'كفر عصام — طنطا',
    phone: '01200400094',
  },
  {
    name: 'فرع شارع سعيد',
    code: 'BEN-08',
    address: 'شارع سعيد — طنطا',
    phone: '01200400094',
  },
  {
    name: 'فرع المعارض',
    code: 'BEN-09',
    address: 'منطقة المعارض — طنطا',
    phone: '01200400094',
  },
  {
    name: 'فرع طريق الإسكندرية الزراعي',
    code: 'BEN-10',
    address: 'طريق الإسكندرية الزراعي — طنطا',
    phone: '01200400094',
  },
  {
    name: 'فرع المحافظة',
    code: 'BEN-11',
    address: 'شارع المحافظة — طنطا',
    phone: '01200400094',
  },
  {
    name: 'فرع هايسيندا بالساحل الشمالي',
    code: 'BEN-12',
    address: 'الساحل الشمالي - هايسيندا',
    phone: '01200400094',
  },
];

const COMING = [
  {
    name: 'فرع الإسكندرية',
    address: 'الإسكندرية — يُعلن العنوان عند الافتتاح',
  },
  {
    name: 'فرع القاهرة الجديدة',
    address: 'القاهرة الجديدة — يُعلن العنوان عند الافتتاح',
  },
  {
    name: 'فرع شرم الشيخ',
    address: 'شرم الشيخ — يُعلن العنوان عند الافتتاح',
  },
];

// ---------------- Staff / Super Control ----------------
const STAFF_ROLES = ['مدير', 'صيدلي', 'توصيل', 'محاسب'];
const SUPER_EMAILS = [
  'mostafaelmourabea@gmail.com',
  'haithamelbendary44@gmail.com',
];
const SUPER_PERMS = [
  'اعتماد / حذف إيميلات',
  'تحديد أدوار',
  'إضافة فرع',
  'إضافة / إيقاف أرقام واتساب',
  'إدارة كل الفروع',
];

function buildApproved(): string[] {
  const list: string[] = ['admin@bendaryph.com'];
  for (let i = 1; i <= 200; i++) {
    list.push(`admin_${i}@bendaryph.com`);
  }
  SUPER_EMAILS.forEach((e) => {
    if (!list.includes(e)) list.push(e);
  });
  return list;
}

// ---------------- Fallback products (only if Neon fails) ----------------
const FALLBACK: ApiProduct[] = [
  {
    name: 'باراسيتامول 500 مجم',
    cat: 'أدوية',
    tag: 'الأكثر طلباً',
    desc: 'خافض حرارة ومسكن — اسأل الصيدلي عن الجرعة المناسبة.',
    barcode: '622100100001',
  },
  {
    name: 'فيتامين د3 5000 وحدة',
    cat: 'فيتامينات',
    tag: 'فيتامينات',
    desc: 'دعم المناعة والعظام — الجرعة حسب تحليل الطبيب.',
    barcode: '622100100002',
  },
  {
    name: 'أوجمنتين 1 جم',
    cat: 'أدوية',
    tag: 'بوصفة طبية',
    desc: 'مضاد حيوي — لا يُصرف إلا بوصفة طبية.',
    barcode: '622100100003',
  },
  {
    name: 'أوميبرازول 20 مجم',
    cat: 'أدوية',
    tag: 'الجهاز الهضمي',
    desc: 'للحموضة وارتجاع المريء — اسأل الصيدلي.',
    barcode: '622100100004',
  },
  {
    name: 'لوراتادين 10 مجم',
    cat: 'حساسية',
    tag: 'حساسية',
    desc: 'لأعراض الحساسية الموسمية والعطس.',
    barcode: '622100100005',
  },
  {
    name: 'ميتفورمين 500 مجم',
    cat: 'سكر',
    tag: 'سكر',
    desc: 'لمرضى السكر — حسب تعليمات الطبيب.',
    barcode: '622100100006',
  },
  {
    name: 'سيروم فيتامين سي للبشرة',
    cat: 'عناية بالبشرة',
    tag: 'تجميل',
    desc: 'إشراقة ونضارة — اختر النوع المناسب لبشرتك مع الصيدلي.',
    barcode: '622100100008',
  },
  {
    name: 'حليب أطفال مرحلة 1',
    cat: 'أم وطفل',
    tag: 'أم وطفل',
    desc: 'تغذية الرضع — استشر الصيدلي قبل التغيير.',
    barcode: '622100100011',
  },
  {
    name: 'جهاز قياس ضغط رقمي',
    cat: 'أجهزة طبية',
    tag: 'أجهزة',
    desc: 'قياس منزلي دقيق وسهل الاستخدام.',
    barcode: '622100100012',
  },
  {
    name: 'معجون أسنان للأسنان الحساسة',
    cat: 'عناية فم',
    tag: 'عناية فم',
    desc: 'حماية يومية للثة والأسنان.',
    barcode: '622100100013',
  },
];

// ---------------- Drugs.com Dictionary — unified ----------------
const DRUGS: Drug[] = [
  {
    en: 'Acetaminophen',
    ar: 'باراسيتامول',
    active: 'Acetaminophen',
    cat: 'مسكن / خافض حرارة',
    letter: 'A',
    use: 'خافض حرارة ومسكن للألم الخفيف والمتوسط.',
    how: 'يقلل إشارات الألم ويخفض الحرارة.',
    side: 'غثيان خفيف، حساسية نادرة.',
    warn: 'لا تتجاوز الجرعة — خطر على الكبد.',
    source: 'Drugs.com',
  },
  {
    en: 'Ibuprofen',
    ar: 'إيبوبروفين',
    active: 'Ibuprofen',
    cat: 'مسكن / خافض حرارة',
    letter: 'I',
    use: 'مسكن ومضاد للالتهاب وخافض حرارة.',
    how: 'يمنع مواد الالتهاب في الجسم.',
    side: 'ألم معدة، غثيان، دوخة.',
    warn: 'يؤخذ بعد الأكل. اسأل الصيدلي.',
    source: 'Drugs.com',
  },
  {
    en: 'Aspirin',
    ar: 'أسبرين',
    active: 'Acetylsalicylic Acid',
    cat: 'مسكن / قلب',
    letter: 'A',
    use: 'مسكن وخافض حرارة ومضاد للجلطات بجرعات الطبيب.',
    how: 'يمنع تكوين الجلطات ويقلل الالتهاب.',
    side: 'ألم معدة، نزيف عند الجرعات العالية.',
    warn: 'لا للأطفال بدون طبيب. بوصفة للقلب.',
    source: 'Drugs.com',
  },
  {
    en: 'Amoxicillin',
    ar: 'أموكسيسيلين',
    active: 'Amoxicillin',
    cat: 'مضاد حيوي',
    letter: 'A',
    use: 'علاج العدوى البكتيرية.',
    how: 'يقتل البكتيريا بمنع جدارها.',
    side: 'إسهال، غثيان، طفح.',
    warn: 'بوصفة طبية فقط. أكمل الكورس.',
    source: 'Drugs.com',
  },
  {
    en: 'Augmentin',
    ar: 'أوجمنتين',
    active: 'Amoxicillin-Clavulanate',
    cat: 'مضاد حيوي',
    letter: 'A',
    use: 'مضاد حيوي واسع المدى.',
    how: 'يقتل البكتيريا المقاومة.',
    side: 'إسهال، غثيان.',
    warn: 'بوصفة طبية فقط.',
    source: 'Drugs.com',
  },
  {
    en: 'Azithromycin',
    ar: 'أزيثرومايسين',
    active: 'Azithromycin',
    cat: 'مضاد حيوي',
    letter: 'A',
    use: 'علاج التهابات الجهاز التنفسي والجلد.',
    how: 'يوقف نمو البكتيريا.',
    side: 'إسهال، ألم بطن.',
    warn: 'بوصفة طبية. اسأل عن التداخلات.',
    source: 'Drugs.com',
  },
  {
    en: 'Omeprazole',
    ar: 'أوميبرازول',
    active: 'Omeprazole',
    cat: 'هضمي',
    letter: 'O',
    use: 'علاج الحموضة وارتجاع المريء وقرحة المعدة.',
    how: 'يقلل حمض المعدة.',
    side: 'صداع، غثيان.',
    warn: 'لا تستخدم طويلا بدون طبيب.',
    source: 'Drugs.com',
  },
  {
    en: 'Pantoprazole',
    ar: 'بانتوبرازول',
    active: 'Pantoprazole',
    cat: 'هضمي',
    letter: 'P',
    use: 'علاج الحموضة والارتجاع.',
    how: 'يقلل إفراز الحمض.',
    side: 'صداع، إسهال خفيف.',
    warn: 'اسأل الصيدلي عن المدة.',
    source: 'Drugs.com',
  },
  {
    en: 'Metformin',
    ar: 'ميتفورمين',
    active: 'Metformin',
    cat: 'سكر',
    letter: 'M',
    use: 'علاج السكري من النوع الثاني.',
    how: 'يقلل سكر الدم ويحسن حساسية الأنسولين.',
    side: 'غثيان، إسهال، فقدان شهية.',
    warn: 'حسب تعليمات الطبيب. راقب السكر.',
    source: 'Drugs.com',
  },
  {
    en: 'Amlodipine',
    ar: 'أملوديبين',
    active: 'Amlodipine',
    cat: 'ضغط / قلب',
    letter: 'A',
    use: 'علاج ارتفاع ضغط الدم والذبحة.',
    how: 'يوسع الأوعية الدموية.',
    side: 'تورم قدمين، صداع.',
    warn: 'بوصفة طبية.',
    source: 'Drugs.com',
  },
  {
    en: 'Losartan',
    ar: 'لوسارتان',
    active: 'Losartan',
    cat: 'ضغط / قلب',
    letter: 'L',
    use: 'علاج الضغط وفشل القلب.',
    how: 'يمنع تضييق الأوعية.',
    side: 'دوخة، سعال.',
    warn: 'ممنوع في الحمل. بوصفة.',
    source: 'Drugs.com',
  },
  {
    en: 'Atorvastatin',
    ar: 'أتورفاستاتين',
    active: 'Atorvastatin',
    cat: 'ضغط / قلب',
    letter: 'A',
    use: 'خفض الكوليسترول وحماية القلب.',
    how: 'يقلل إنتاج الكوليسترول.',
    side: 'ألم عضلات، غثيان.',
    warn: 'بوصفة. أخبر الطبيب عن ألم العضلات.',
    source: 'Drugs.com',
  },
  {
    en: 'Loratadine',
    ar: 'لوراتادين',
    active: 'Loratadine',
    cat: 'حساسية',
    letter: 'L',
    use: 'تخفيف أعراض الحساسية والعطس.',
    how: 'يمنع الهيستامين.',
    side: 'نعاس خفيف، جفاف فم.',
    warn: 'اسأل الصيدلي عن الجرعة.',
    source: 'Drugs.com',
  },
  {
    en: 'Cetirizine',
    ar: 'سيتريزين',
    active: 'Cetirizine',
    cat: 'حساسية',
    letter: 'C',
    use: 'لأعراض الحساسية الموسمية.',
    how: 'يمنع الهيستامين.',
    side: 'نعاس، جفاف.',
    warn: 'لا تقود إذا شعرت بنعاس.',
    source: 'Drugs.com',
  },
  {
    en: 'Fexofenadine',
    ar: 'فيكسوفينادين',
    active: 'Fexofenadine',
    cat: 'حساسية',
    letter: 'F',
    use: 'علاج الحساسية والشرى.',
    how: 'مضاد هيستامين لا يسبب نعاس غالبا.',
    side: 'صداع، غثيان.',
    warn: 'اسأل الصيدلي.',
    source: 'Drugs.com',
  },
  {
    en: 'Vitamin D3',
    ar: 'فيتامين د3',
    active: 'Cholecalciferol',
    cat: 'فيتامينات / مكملات',
    letter: 'V',
    use: 'دعم العظام والمناعة وتعويض النقص.',
    how: 'يعوض نقص فيتامين د.',
    side: 'غثيان عند الجرعة العالية.',
    warn: 'الجرعة حسب التحليل.',
    source: 'Drugs.com',
  },
  {
    en: 'Vitamin C',
    ar: 'فيتامين سي',
    active: 'Ascorbic Acid',
    cat: 'فيتامينات / مكملات',
    letter: 'V',
    use: 'دعم المناعة والجلد.',
    how: 'مضاد أكسدة.',
    side: 'حموضة معدة.',
    warn: 'لا تتجاوز الجرعة.',
    source: 'Drugs.com',
  },
  {
    en: 'Zinc',
    ar: 'زنك',
    active: 'Zinc',
    cat: 'فيتامينات / مكملات',
    letter: 'Z',
    use: 'دعم المناعة والتئام الجروح.',
    how: 'يعوض نقص الزنك.',
    side: 'غثيان.',
    warn: 'اسأل الصيدلي.',
    source: 'Drugs.com',
  },
  {
    en: 'Iron',
    ar: 'حديد',
    active: 'Ferrous Sulfate',
    cat: 'فيتامينات / مكملات',
    letter: 'I',
    use: 'علاج أنيميا نقص الحديد.',
    how: 'يعوض الحديد.',
    side: 'إمساك، غثيان.',
    warn: 'لا تأخذه مع الشاي والقهوة.',
    source: 'Drugs.com',
  },
  {
    en: 'Escitalopram',
    ar: 'إسيتالوبرام',
    active: 'Escitalopram',
    cat: 'أعصاب',
    letter: 'E',
    use: 'علاج القلق والاكتئاب.',
    how: 'يعدل السيروتونين.',
    side: 'غثيان، نعاس.',
    warn: 'بوصفة. لا توقفه فجأة.',
    source: 'Drugs.com',
  },
  {
    en: 'Gabapentin',
    ar: 'جابابنتين',
    active: 'Gabapentin',
    cat: 'أعصاب',
    letter: 'G',
    use: 'علاج ألم الأعصاب والصرع.',
    how: 'يهدئ إشارات الأعصاب.',
    side: 'دوخة، نعاس.',
    warn: 'بوصفة. لا توقفه فجأة.',
    source: 'Drugs.com',
  },
  {
    en: 'Diclofenac',
    ar: 'ديكلوفيناك',
    active: 'Diclofenac',
    cat: 'مسكن / خافض حرارة',
    letter: 'D',
    use: 'مسكن ومضاد للالتهاب.',
    how: 'يمنع الالتهاب.',
    side: 'ألم معدة.',
    warn: 'بعد الأكل. اسأل الصيدلي.',
    source: 'Drugs.com',
  },
  {
    en: 'Levothyroxine',
    ar: 'ليفوثيروكسين',
    active: 'Levothyroxine',
    cat: 'هرمونات',
    letter: 'L',
    use: 'علاج خمول الغدة الدرقية.',
    how: 'يعوض هرمون الغدة.',
    side: 'خفقان عند الجرعة العالية.',
    warn: 'على معدة فارغة. بوصفة.',
    source: 'Drugs.com',
  },
];

// ---------------- Articles ----------------
const ARTICLES = [
  {
    id: 'a1',
    title: 'فيتامين د: ليه كلنا ناقصنا؟',
    cat: 'وقاية',
    read: '6 دقائق',
    body: 'نقص فيتامين د شائع جداً.',
    paras: [
      'نقص فيتامين د شائع جداً، والسبب غالباً قلة التعرض للشمس.',
      'الجرعة تعتمد على التحليل والعمر. اسأل الصيدلي.',
      'التغذية تساعد لكنها لا تكفي في النقص الشديد.',
    ],
  },
  {
    id: 'a2',
    title: 'مريض السكر في رمضان: دليل آمن',
    cat: 'سكر',
    read: '7 دقائق',
    body: 'الصيام مع السكر يحتاج خطة.',
    paras: [
      'راجع أدويتك مع الطبيب والصيدلي قبل رمضان.',
      'لا تغير الجرعة من نفسك.',
      'اكسر صيامك عند هبوط أو ارتفاع شديد.',
    ],
  },
  {
    id: 'a3',
    title: 'بشرة أطفالك في الصيف',
    cat: 'أم وطفل',
    read: '5 دقائق',
    body: 'بشرة الأطفال أرق وأسرع تأثراً.',
    paras: [
      'الترطيب اللطيف وواقي الشمس يحمي بشرتهم.',
      'جربي واقي الشمس على جزء صغير أولاً.',
      'عند الطفح اسألي الصيدلي.',
    ],
  },
  {
    id: 'a4',
    title: 'الصداع النصفي',
    cat: 'الضغط والقلب',
    read: '5 دقائق',
    body: 'الصداع النصفي ليس صداعاً عادياً.',
    paras: [
      'ألم نابض في جهة واحدة مع حساسية للضوء.',
      'سجلي محفزاتك.',
      'إذا تكرر راجعي الطبيب.',
    ],
  },
  {
    id: 'a5',
    title: 'الحساسية الموسمية',
    cat: 'المناعة',
    read: '5 دقائق',
    body: 'مع تغير الفصول يعود العطس.',
    paras: [
      'الحساسية رد فعل مناعي لحبوب اللقاح.',
      'أغلقي النوافذ واغسلي وجهك بعد الخروج.',
      'ضيق نفس أو تورم = مساعدة فورية.',
    ],
  },
  {
    id: 'a6',
    title: 'نوم أفضل بدون أدوية',
    cat: 'التغذية',
    read: '6 دقائق',
    body: 'النوم الجيد يبدأ قبل النوم بساعات.',
    paras: [
      'موعد ثابت وإضاءة هادئة وبدون هاتف.',
      'غرفة مظلمة وباردة.',
      'أرق أكثر من أسبوعين = راجع الصيدلي.',
    ],
  },
];

const ORDERS = [
  {
    no: 'BEN-1042',
    customer: 'أحمد محمد',
    phone: '01200400094',
    address: 'شارع سعيد — طنطا',
    branch: 'فرع شارع سعيد',
    channel: 'الموقع',
    status: 'مع السائق',
    items: 'فيتامين د3 + باراسيتامول',
    created: 'اليوم — 11:20 ص',
  },
  {
    no: 'BEN-1041',
    customer: 'منى علي',
    phone: '01200400094',
    address: 'كفر عصام — طنطا',
    branch: 'فرع كفر عصام',
    channel: 'واتساب',
    status: 'تجهيز',
    items: 'كريم مرطب + شامبو',
    created: 'اليوم — 10:45 ص',
  },
  {
    no: 'BEN-1040',
    customer: 'كريم حسن',
    phone: '01200400094',
    address: 'الجلاء — طنطا',
    branch: 'فرع الجلاء (الموقف)',
    channel: 'هاتف',
    status: 'تم التوصيل',
    items: 'لوراتادين',
    created: 'أمس — 8:10 م',
  },
];

const STOCK = [
  {
    p: 'باراسيتامول 500 مجم',
    branch: 'فرع شارع سعيد',
    stock: 142,
    status: 'متوفر',
  },
  {
    p: 'فيتامين د3',
    branch: 'فرع البورصة',
    stock: 24,
    status: 'قرب ينفد',
  },
  {
    p: 'أوجمنتين 1 جم',
    branch: 'فرع الجلاء (الموقف)',
    stock: 8,
    status: 'ناقص',
  },
  {
    p: 'لوراتادين 10 مجم',
    branch: 'فرع كفر عصام',
    stock: 86,
    status: 'متوفر',
  },
];

const COUPONS = [
  {
    title: 'خصم فيتامينات',
    code: 'VITA25',
    desc: 'خصم على الفيتامينات — اسأل الفرع.',
  },
  {
    title: 'توصيل مجاني فوق 300',
    code: 'FREEDEL300',
    desc: 'توصيل مجاني للطلبات.',
  },
  {
    title: 'خصم العناية',
    code: 'CARE20',
    desc: 'خصم على العناية — اسأل الفرع.',
  },
];

const OFFERS = [
  {
    id: 'ad-garnier',
    brand: 'Garnier',
    title: 'عرض Garnier',
    desc: 'عرض Garnier - 270 LE',
    image: ad6Url,
    tag: 'Garnier',
  },
  {
    id: 'ad-coco',
    brand: 'COCO',
    title: 'عرض COCO',
    desc: 'COCO White / Black Paste - 30 LE / 95 LE',
    image: ad1Url,
    tag: 'COCO',
  },
  {
    id: 'ad-narji',
    brand: 'Narji',
    title: 'عرض Narji',
    desc: 'اشترِ 1 واحصل على خصم 50% على الثاني',
    image: ad8Url,
    tag: 'Narji',
  },
  {
    id: 'ad-root',
    brand: 'Root to End',
    title: 'عرض Root to End',
    desc: 'اشترِ 1 واحصل على 1 مجاناً',
    image: ad10Url,
    tag: 'Root to End',
  },
  {
    id: 'ad-capixy',
    brand: 'Capixy',
    title: 'عرض Capixy',
    desc: 'اشترِ 2 واحصل على 1 مجاناً',
    image: ad7Url,
    tag: 'Capixy',
  },
  {
    id: 'ad-telofill',
    brand: 'Telofill',
    title: 'عرض Telofill',
    desc: 'اشترِ 1 واحصل على 1 مجاناً',
    image: ad5Url,
    tag: 'Telofill',
  },
  {
    id: 'ad-seropipe',
    brand: 'Seropipe',
    title: 'عرض Seropipe',
    desc: 'Seropipe Hair Spray - اشترِ 1 خصم 50% على الثاني',
    image: ad2Url,
    tag: 'Seropipe',
  },
  {
    id: 'ad-vacation',
    brand: 'Vacation',
    title: 'عرض Vacation',
    desc: 'Vacation للحماية من الشمس - 1+1',
    image: ad3Url,
    tag: 'Vacation',
  },
  {
    id: 'ad-pirlome',
    brand: 'Pirlome',
    title: 'عرض Pirlome',
    desc: 'Pirlome Skin Hair Nails - اشترِ 2 واحصل على 1 مجاناً',
    image: ad4Url,
    tag: 'Pirlome',
  },
  {
    id: 'ad-soralone',
    brand: 'Soralone',
    title: 'عرض Soralone',
    desc: 'خصم 30%',
    image: ad9Url,
    tag: 'Soralone',
  },
];

const LEGAL: Record<string, { title: string; paras: string[] }> = {
  about: {
    title: 'من نحن',
    paras: [
      'صيدليات البنداري — رعاية من القلب منذ عام 1980.',
      'فروعنا تعمل 24 ساعة.',
      'التوصيل 30-45 دقيقة مع مراجعة الصيدلي.',
      'الخط الساخن: 01200400094.',
    ],
  },
  privacy: {
    title: 'سياسة الخصوصية',
    paras: [
      'نجمع فقط ما نحتاجه لطلبك: الاسم والهاتف والعنوان.',
      'لا نشارك بياناتك لأغراض تسويقية ولا نبيعها.',
      'للحذف أو التصحيح: info@bendaryph.com',
    ],
  },
  terms: {
    title: 'الشروط والأحكام',
    paras: [
      'التطبيق للطلب والاستفسار فقط.',
      'المعلومات الدوائية تعليمية والجرعة يحددها الطبيب أو الصيدلي.',
      'العروض تُأكَّد من الفرع.',
    ],
  },
};

// ---------------- 38 Native Features ----------------
type NF = {
  id: string;
  ar: string;
  en: string;
  desc: string;
  rows: { a: string; b: string; c: string }[];
  icon: any;
};

const R = (a: string, b: string, c: string) => ({ a, b, c });

const F = (
  id: string,
  ar: string,
  en: string,
  desc: string,
  rows: { a: string; b: string; c: string }[],
  icon: any,
): NF => ({ id, ar, en, desc, rows, icon });

const FEATURES38: NF[] = [
  F('stock', 'إدارة المخزون', 'Stock Management', 'تتبع الكميات والنواقص.', [R('باراسيتامول', 'فرع شارع سعيد', '142'), R('فيتامين د3', 'فرع البورصة', '24')], Warehouse),
  F('drugdb', 'قاعدة بيانات الأدوية', 'Drug Database', 'الاسم العلمي والتجاري.', [R('Paracetamol', 'باراسيتامول', 'معتمد')], BookOpen),
  F('verify', 'التحقق من الدواء', 'Drug Verification', 'مطابقة الاسم والجرعة والباركود.', [R('أوجمنتين', '622100100003', 'مطابق')], ShieldCheck),
  F('medsearch', 'قاعدة بيانات الأدوية بالشكل', 'Medication Database', 'بحث باللون والشكل.', [R('أبيض', 'دائري P500', 'باراسيتامول')], Search),
  F('claims', 'إدارة المطالبات', 'Claims Management', 'مطالبات التأمين.', [R('شركة رعاية', 'CLM-1001', 'قيد المتابعة')], FileText),
  F('discounts', 'إدارة الخصومات', 'Discount Management', 'كوبونات وعروض.', [R('فيتامينات', 'VITA25', 'نشط')], Gift),
  F('workflow', 'إدارة سير العمل', 'Workflow Management', 'من الاستلام حتى التسليم.', [R('طلب موقع', 'شارع سعيد', 'تجهيز')], ClipboardList),
  F('vendor', 'إدارة الموردين', 'Vendor Management', 'الموردين وطلبات الشراء.', [R('مورد أدوية', 'PO-201', 'تم الاستلام')], Truck),
  F('compliance', 'الامتثال', 'Compliance', 'تراخيص وصلاحيات.', [R('ترخيص', 'المهندسين', 'ساري')], Shield),
  F('communication', 'التواصل الداخلي', 'Communication', 'تواصل الفروع.', [R('نقص أوجمنتين', 'الجلاء', 'تم الرد')], MessageCircle),
  F('appointment', 'حجز مواعيد', 'Appointment', 'حجز مع الصيدلي.', [R('أحمد محمد', 'اليوم 5م', 'استشارة')], Calendar),
  F('barcode', 'الباركود والملصقات', 'Barcode', 'طباعة باركود.', [R('باراسيتامول', '622100100001', 'مطبوع')], Barcode),
  F('forms', 'النماذج', 'Forms', 'نماذج صرف وارتجاع.', [R('صرف', 'شارع سعيد', 'مكتمل')], FileText),
  F('inventory', 'الجرد', 'Inventory', 'جرد دوري.', [R('شارع سعيد', 'مطابق', 'مكتمل')], Warehouse),
  F('document', 'المستندات', 'Document Management', 'فواتير ووصفات.', [R('فاتورة', 'المهندسين', 'محفوظ')], FileText),
  F('ehr', 'السجل الصحي', 'EHR', 'سجل العميل الصحي.', [R('أحمد محمد', 'سكر + ضغط', 'محدث')], BookOpen),
  F('billing', 'الفواتير والمحاسبة', 'Billing', 'فواتير ومحاسبة.', [R('INV-1001', 'شارع سعيد', 'مدفوعة')], Wallet),
  F('pos', 'نقطة البيع', 'POS', 'بيع سريع بالباركود.', [R('بيع 1042', 'شارع سعيد', 'مكتمل')], ShoppingBag),
  F('reporting', 'التقارير', 'Reporting', 'تقارير مبيعات ومخزون.', [R('مبيعات اليوم', 'اليوم', 'جاهز')], BarChart3),
  F('transparency', 'شفافية سير العمل', 'Workflow Transparency', 'كل خطوة ظاهرة.', [R('BEN-1042', 'مع السائق', 'جاري')], ShieldCheck),
  F('clinical', 'التواصل السريري', 'Clinical Communication', 'تواصل مع الطبيب.', [R('مراجعة جرعة', 'د. أحمد', 'تم')], Stethoscope),
  F('portal', 'بوابة المريض', 'Patient Portal', 'متابعة الطلبات.', [R('أحمد محمد', 'BEN-1042', 'مع السائق')], Users),
  F('pos2', 'نقطة بيع الفروع', 'Point of Sale', 'بيع موحد.', [R('شارع سعيد', 'بيع 1042', 'مكتمل')], Store),
  F('dashboard', 'لوحة النشاط', 'Activity Dashboard', 'لوحة لحظية.', [R('طلبات اليوم', '42', 'جاري')], BarChart3),
  F('rx', 'معالجة الوصفات', 'Prescription Processing', 'استلام ومراجعة الوصفة.', [R('وصفة 101', 'الجلاء', 'تم الصرف')], FileText),
  F('realtime', 'بيانات لحظية', 'Real-Time Data', 'مخزون لحظي.', [R('مخزون', 'شارع سعيد', 'لحظي')], Bell),
  F('customreports', 'تقارير مخصصة', 'Customizable Reports', 'صمم تقريرك.', [R('مبيعات', 'كل الفروع', 'جاهز')], BarChart3),
  F('charting', 'الرسوم البيانية', 'Charting', 'رسوم بيانية.', [R('مبيعات', 'هذا الشهر', 'جاهز')], BarChart3),
  F('esign', 'التوقيع الإلكتروني', 'Electronic Signature', 'توقيع استلام.', [R('استلام', 'أحمد محمد', 'موقع')], Check),
  F('compounding', 'التركيبات', 'Compounding', 'تركيبات حسب الوصفة.', [R('تركيبة 1', 'المهندسين', 'جاهزة')], FlaskConical),
  F('genai', 'الذكاء التوليدي', 'Generative AI', 'مساعد صياغة الردود.', [R('رد عميل', 'جاهز', 'مكتمل')], Brain),
  F('copilot', 'المساعد الذكي', 'AI Copilot', 'مساعد الصيدلي.', [R('بديل أوجمنتين', 'موجود', 'مكتمل')], Bot),
  F('tracking', 'تتبع الحالة', 'Status Tracking', 'تتبع الطلب.', [R('BEN-1042', 'مع السائق', '11:20 ص')], Truck),
  F('alerts', 'التنبيهات', 'Alerts', 'تنبيهات نقص وصلاحية.', [R('نقص أوجمنتين', 'الجلاء', 'تنبيه')], Bell),
  F('mobile', 'تطبيق الجوال', 'Mobile Access', 'إدارة من الجوال.', [R('جوال', 'مدير فرع', 'متصل')], Phone),
  F('searchfilter', 'البحث والفلترة', 'Search / Filter', 'بحث بالاسم والمادة والباركود.', [R('باراسيتامول', 'موجود', 'مكتمل')], Search),
  F('eprescribe', 'الوصفة الإلكترونية', 'E-Prescribing', 'وصفات موثقة.', [R('وصفة 201', 'د. أحمد', 'موثقة')], FileCheck),
  F('stats', 'الإحصائيات', 'Reporting & Statistics', 'إحصائيات.', [R('مبيعات', 'هذا الشهر', 'جاهز')], BarChart3),
  F('api', 'واجهة برمجية', 'API', 'ربط الأنظمة.', [R('PharmaSyst', 'متصل', 'نشط')], Globe),
  F('multistore', 'متعدد الفروع', 'Multi-Store', 'إدارة كل الفروع.', [R('12 فرع', 'نشط', 'متصل')], Store),
  F('refill', 'إعادة الصرف التلقائي', 'Automatic Refills', 'تذكير أدوية مزمنة.', [R('أحمد محمد', 'ميتفورمين', 'في الموعد')], Calendar),
  F('onlinerefill', 'إعادة الصرف أونلاين', 'Online Refills', 'إعادة صرف أونلاين.', [R('أحمد محمد', 'وصفة 101', 'تم الاستلام')], Globe),
];

export default function BendaryApp() {
  const [view, setView] = useState<
    'store' | 'offers' | 'branches' | 'dict' | 'articles' | 'cart' | 'staff' | 'legal'
  >('store');
  const [cat, setCat] = useState('الكل');
  const [search, setSearch] = useState('');
  const [dictQ, setDictQ] = useState('');
  const [dictLetter, setDictLetter] = useState('الكل');
  const [dictCat, setDictCat] = useState('الكل');
  const [cart, setCart] = useState<ApiProduct[]>([]);
  const [isStaff, setIsStaff] = useState(false);
  const [staffEmail, setStaffEmail] = useState('');
  const [legalKey, setLegalKey] = useState('about');
  const [articleId, setArticleId] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState('');
  const [chatList, setChatList] = useState<{ from: 'me' | 'bot'; text: string }[]>([
    {
      from: 'bot',
      text: 'أهلاً بيك في صيدليات البنداري — رعاية من القلب ♥ اسألني عن أي دواء أو عرض أو فرع.',
    },
  ]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderName, setOrderName] = useState('');
  const [orderPhone, setOrderPhone] = useState('');
  const [orderAddress, setOrderAddress] = useState('');
  const [orderDone, setOrderDone] = useState(false);
  const [apiProducts, setApiProducts] = useState<ApiProduct[]>([]);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [approvedEmails, setApprovedEmails] = useState<string[]>(() =>
    buildApproved(),
  );
  const [staffRolesMap, setStaffRolesMap] = useState<Record<string, string>>({});
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('صيدلي');
  const [roleTargetEmail, setRoleTargetEmail] = useState('');
  const [branchesList, setBranchesList] = useState(BRANCHES_INIT);
  const [newBranchName, setNewBranchName] = useState('');
  const [newBranchAddress, setNewBranchAddress] = useState('');
  const [newBranchPhone, setNewBranchPhone] = useState('');
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [whatsappNumbers, setWhatsappNumbers] = useState(['01200400094']);
  const [newWhatsapp, setNewWhatsapp] = useState('');

  const norm = staffEmail.trim().toLowerCase();
  const isSuper = SUPER_EMAILS.includes(norm) && isStaff;
  const myRole = isSuper ? 'Super Control' : staffRolesMap[norm] || 'صيدلي';

  function loginStaff() {
    if (approvedEmails.includes(norm)) setIsStaff(true);
    else setIsStaff(false);
  }

  function logoutStaff() {
    setIsStaff(false);
    setStaffEmail('');
  }

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `/api/products?q=${encodeURIComponent(search)}&limit=200`,
        );
        const data = await res.json();
        if (data?.ok && Array.isArray(data.products)) {
          setApiProducts(
            data.products.map((p: any) => ({
              name: p.nameAr || p.nameEn || p.name || '',
              cat: p.category || 'أدوية',
              tag: p.category || '',
              desc: p.activeIngredient
                ? `المادة الفعالة: ${p.activeIngredient}`
                : 'اسأل الصيدلي عن الجرعة المناسبة.',
              barcode: p.barcode || '',
              price: typeof p.price === 'number' ? p.price : undefined,
              stock: typeof p.stock === 'number' ? p.stock : undefined,
            })),
          );
        }
      } catch {}
      setApiLoaded(true);
    }
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [search]);

  const displayProducts = apiProducts.length > 0 ? apiProducts : FALLBACK;

  const filtered = useMemo(() => {
    let list = displayProducts;
    if (cat !== 'الكل') list = list.filter((p) => p.cat === cat);
    if (search.trim()) {
      const q = search.trim();
      list = list.filter(
        (p) =>
          p.name.includes(q) ||
          p.desc.includes(q) ||
          p.barcode.includes(q),
      );
    }
    return list;
  }, [displayProducts, cat, search]);

  const dictFiltered = useMemo(() => {
    let list = DRUGS;
    if (dictLetter !== 'الكل')
      list = list.filter((d) => d.letter === dictLetter);
    if (dictCat !== 'الكل') list = list.filter((d) => d.cat === dictCat);
    if (dictQ.trim()) {
      const q = dictQ.trim();
      list = list.filter(
        (d) =>
          d.en.toLowerCase().includes(q.toLowerCase()) ||
          d.ar.includes(q) ||
          d.active.toLowerCase().includes(q.toLowerCase()) ||
          d.use.includes(q),
      );
    }
    return list;
  }, [dictQ, dictLetter, dictCat]);

  function addToCart(p: ApiProduct) {
    setCart((prev) => [...prev, p]);
  }

  function removeFromCart(i: number) {
    setCart((prev) => prev.filter((_, idx) => idx !== i));
  }

  function sendChat() {
    if (!chatMsg.trim()) return;
    const q = chatMsg.trim();
    setChatList((prev) => [...prev, { from: 'me', text: q }]);
    setChatMsg('');
    setTimeout(() => {
      const found = displayProducts.find(
        (p) => p.name.includes(q) || q.includes(p.name.slice(0, 4)),
      );
      setChatList((prev) => [
        ...prev,
        {
          from: 'bot',
          text: found
            ? `${found.name} موجود — اسأل الصيدلي عن الجرعة وهنوصلهولك خلال 30-45 دقيقة. 01200400094`
            : 'تمام، الصيدلي هيراجع طلبك ويرد عليك. تكلمنا على 01200400094',
        },
      ]);
    }, 600);
  }

  function submitOrder() {
    if (
      !orderName.trim() ||
      !orderPhone.trim() ||
      !orderAddress.trim() ||
      cart.length === 0
    )
      return;
    setOrderDone(true);
  }

  const activeArticle = ARTICLES.find((a) => a.id === articleId);
  const letters = [
    'الكل',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'I',
    'L',
    'M',
    'O',
    'P',
    'S',
    'V',
    'Z',
  ];
  const drugCats = [
    'الكل',
    'مسكن / خافض حرارة',
    'مضاد حيوي',
    'سكر',
    'ضغط / قلب',
    'حساسية',
    'هضمي',
    'فيتامينات / مكملات',
    'أعصاب',
    'هرمونات',
    'تنفسي',
    'مسكن / قلب',
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-white text-slate-900 font-sans">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-100"
          >
            <Menu size={20} />
          </button>
          <button
            onClick={() => setView('store')}
            className="flex items-center gap-2 shrink-0"
          >
            <img
              src={logoUrl}
              alt="El-Bendary"
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-full bg-white"
            />
            <span className="text-right leading-tight">
              <span className="block font-black text-[#C8102E] text-base sm:text-xl">
                صيدليات البنداري
              </span>
              <span className="block text-xs text-slate-500">
                رعاية من القلب ♥
              </span>
            </span>
          </button>
          <div className="hidden md:flex flex-1 max-w-xl mx-2 items-center gap-2 bg-slate-100 rounded-full px-3 py-2">
            <Search size={18} className="text-slate-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setView('store');
              }}
              placeholder="ابحث بالاسم أو المادة الفعالة أو الباركود..."
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
          <a
            href="tel:01200400094"
            className="hidden sm:flex items-center gap-1.5 bg-[#C8102E] text-white px-3 py-2 rounded-full text-sm font-bold shrink-0"
          >
            <Phone size={16} /> 01200400094
          </a>
          <button
            onClick={() => setView('cart')}
            className="relative p-2.5 bg-slate-900 text-white rounded-full shrink-0"
          >
            <ShoppingCart size={19} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -left-1 bg-[#C8102E] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </button>
        </div>
        <div className="md:hidden px-3 pb-2 flex items-center gap-2 bg-slate-100 rounded-full mx-3 mb-2">
          <Search size={17} className="text-slate-400" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setView('store');
            }}
            placeholder="ابحث..."
            className="flex-1 bg-transparent outline-none text-sm py-2"
          />
        </div>
        <nav
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } md:flex flex-wrap gap-1 px-3 sm:px-4 pb-2 max-w-7xl mx-auto`}
        >
          {[
            { k: 'store', label: 'المتجر', icon: Store },
            { k: 'offers', label: 'العروض', icon: Gift },
            { k: 'branches', label: 'الفروع', icon: MapPin },
            { k: 'dict', label: 'قاموس الدواء - Drugs.com', icon: BookOpen },
            { k: 'articles', label: 'المقالات', icon: FileText },
            { k: 'staff', label: 'الموظفين', icon: Lock },
          ].map((n: any) => (
            <button
              key={n.k}
              onClick={() => {
                setView(n.k as any);
                setMenuOpen(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold ${
                view === n.k
                  ? 'bg-[#C8102E] text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              <n.icon size={15} />
              {n.label}
            </button>
          ))}
        </nav>
      </header>

      {view === 'store' && (
        <section className="max-w-7xl mx-auto px-3 sm:px-4 pt-4">
          <div className="rounded-2xl overflow-hidden bg-gradient-to-l from-[#C8102E] to-[#7A0A1D] text-white p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-3xl font-black leading-snug">
                رعاية من القلب ♥<br />
                توصيل خلال 30-45 دقيقة
              </h1>
              <p className="text-white/85 text-sm mt-1">
                12 فرع — 3 فروع قريباً — صيدلي بيراجع طلبك قبل التوصيل
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setView('offers')}
                  className="bg-white text-[#C8102E] px-4 py-2 rounded-full font-bold text-sm"
                >
                  شوف العروض
                </button>
                <a
                  href="tel:01200400094"
                  className="bg-white/15 border border-white/30 px-4 py-2 rounded-full font-bold text-sm"
                >
                  اتصل بالصيدلي
                </a>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-3 text-center shrink-0">
              <div className="text-2xl font-black">22,258 صنف</div>
              <div className="text-xs text-white/80">
                61 فئة — قاموس دواء +80,000
              </div>
              <div className="text-xs mt-1 bg-white text-[#C8102E] px-2 py-0.5 rounded-full font-bold">
                {apiLoaded
                  ? apiProducts.length > 0
                    ? `متصل بـ Neon — ${apiProducts.length} معروض الآن`
                    : 'وضع احتياطي'
                  : 'جاري التحميل...'}
              </div>
            </div>
          </div>
        </section>
      )}

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 pb-24">
        {view === 'store' && (
          <>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {CATS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setCat(c.name)}
                  className={`px-3 py-1.5 rounded-full text-sm font-bold ${
                    cat === c.name ? 'bg-slate-900 text-white' : 'bg-slate-100'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-black text-lg">
                {filtered.length} منتج {cat !== 'الكل' ? `— ${cat}` : ''}
              </h2>
            </div>
            {filtered.length === 0 && (
              <div className="bg-slate-50 rounded-2xl p-6 text-center text-slate-500">
                لا توجد نتائج — جرّب اسم تاني أو المادة الفعالة أو الباركود،
                أو كلمنا على 01200400094
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map((p, idx) => (
                <article
                  key={`${p.barcode}-${idx}`}
                  className="border border-slate-100 rounded-2xl p-3 bg-white shadow-sm hover:shadow-md transition flex flex-col"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-red-50 text-[#C8102E] px-2 py-0.5 rounded-full font-bold">
                      {p.cat}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Barcode size={12} />
                      {p.barcode}
                    </span>
                  </div>
                  <h3 className="font-bold mt-2 leading-snug text-sm">{p.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1 flex-1">
                    {p.desc}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-2">
                    <Pill size={12} />
                    {p.tag}
                  </div>
                  {isStaff && typeof p.price === 'number' && (
                    <div className="text-sm font-black mt-1">
                      السعر للموظفين: {p.price} ج.م{' '}
                      {typeof p.stock === 'number' ? `— مخزون: ${p.stock}` : ''}
                    </div>
                  )}
                  <button
                    onClick={() => addToCart(p)}
                    className="mt-3 w-full bg-[#C8102E] text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-1"
                  >
                    <Plus size={16} /> أضف للسلة
                  </button>
                </article>
              ))}
            </div>
          </>
        )}

        {view === 'offers' && (
          <>
            <h2 className="font-black text-xl mb-1">عروض البنداري</h2>
            <p className="text-sm text-slate-500 mb-4">
              العروض السارية تُأكَّد من الفرع — اسأل الصيدلي عن التفاصيل.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {OFFERS.map((o) => (
                <article
                  key={o.id}
                  className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-white"
                >
                  <img
                    src={o.image}
                    alt={o.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-black">{o.title}</h3>
                      <span className="text-xs bg-red-50 text-[#C8102E] px-2 py-0.5 rounded-full font-bold">
                        {o.tag}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      {o.desc}
                    </p>
                    <button
                      onClick={() => {
                        setView('store');
                        setSearch(o.brand);
                      }}
                      className="mt-3 w-full bg-slate-900 text-white py-2.5 rounded-xl font-bold text-sm"
                    >
                      اطلب العرض
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <h3 className="font-black mt-6 mb-2">كوبونات</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {COUPONS.map((c) => (
                <div
                  key={c.code}
                  className="border border-dashed border-[#C8102E]/40 rounded-2xl p-3 bg-red-50/40"
                >
                  <div className="font-black">{c.title}</div>
                  <div className="text-xs text-slate-600 mt-1">{c.desc}</div>
                  <div className="mt-2 font-black text-[#C8102E] tracking-widest">
                    {c.code}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {view === 'branches' && (
          <>
            <h2 className="font-black text-xl mb-3">فروعنا — 12 فرع</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {branchesList.map((b) => (
                <div
                  key={b.code}
                  className="border rounded-2xl p-4 bg-white shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-black">{b.name}</h3>
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full font-bold">
                      {b.code}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-2 flex gap-1.5">
                    <MapPin
                      size={15}
                      className="shrink-0 mt-0.5 text-[#C8102E]"
                    />
                    {b.address}
                  </p>
                  <a
                    href={`tel:${b.phone}`}
                    className="mt-3 inline-flex items-center gap-1.5 bg-[#C8102E] text-white px-3 py-2 rounded-full text-sm font-bold"
                  >
                    <Phone size={14} />
                    {b.phone}
                  </a>
                </div>
              ))}
            </div>
            <h3 className="font-black mt-6 mb-2">قريباً — Loading</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {COMING.map((b) => (
                <div
                  key={b.name}
                  className="border border-dashed rounded-2xl p-4 bg-slate-50"
                >
                  <h4 className="font-bold">{b.name}</h4>
                  <p className="text-sm text-slate-500 mt-1">{b.address}</p>
                  <span className="inline-block mt-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                    قريباً - Loading
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {view === 'dict' && (
          <>
            <h2 className="font-black text-xl mb-1">قاموس الدواء — Drugs.com</h2>
            <p className="text-sm text-slate-500 mb-2">
              المصدر: Drugs.com — Drugs &amp; Medications A to Z — over 24,000
              prescription and OTC medicines.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-sm mb-3">
              المعلومات تعليمية فقط ولا تغني عن استشارة الطبيب أو الصيدلي.
              لا تبدأ أو توقف أي دواء من نفسك.
            </div>
            <div className="flex items-center gap-2 bg-slate-100 rounded-full px-3 py-2.5 mb-3">
              <Search size={17} className="text-slate-400" />
              <input
                value={dictQ}
                onChange={(e) => setDictQ(e.target.value)}
                placeholder="ابحث بالاسم العلمي / التجاري / العربي / المادة الفعالة..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {letters.map((l) => (
                <button
                  key={l}
                  onClick={() => setDictLetter(l)}
                  className={`px-2.5 py-1 rounded-full text-sm font-bold ${
                    dictLetter === l
                      ? 'bg-[#C8102E] text-white'
                      : 'bg-slate-100'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {drugCats.map((c) => (
                <button
                  key={c}
                  onClick={() => setDictCat(c)}
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    dictCat === c ? 'bg-slate-900 text-white' : 'bg-slate-100'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <p className="text-sm text-slate-500 mb-2">
              {dictFiltered.length} دواء
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {dictFiltered.map((d, i) => (
                <div key={i} className="border rounded-2xl p-3 bg-white">
                  <div className="flex justify-between">
                    <h3 className="font-black">
                      {d.ar}{' '}
                      <span className="text-slate-400 font-normal text-sm">
                        ({d.en})
                      </span>
                    </h3>
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full">
                      {d.source}
                    </span>
                  </div>
                  <p className="text-xs text-[#C8102E] font-bold mt-1">
                    {d.cat} — المادة: {d.active}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">
                    <b>الاستخدام:</b> {d.use}
                  </p>
                  <p className="text-sm text-slate-600">
                    <b>كيف يعمل:</b> {d.how}
                  </p>
                  <p className="text-sm text-slate-600">
                    <b>آثار جانبية شائعة:</b> {d.side}
                  </p>
                  <p className="text-sm text-red-600">
                    <b>تحذير:</b> {d.warn}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => {
                        setChatMsg(`اسأل الصيدلي عن ${d.ar} (${d.en})`);
                        setChatOpen(true);
                      }}
                      className="flex-1 bg-slate-900 text-white py-2 rounded-xl text-sm font-bold"
                    >
                      اسأل الصيدلي
                    </button>
                    <a
                      href={`https://www.drugs.com/search.php?searchterm=${encodeURIComponent(
                        d.en,
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center border py-2 rounded-xl text-sm font-bold"
                    >
                      عرض على Drugs.com ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {view === 'articles' && (
          <>
            {!activeArticle ? (
              <>
                <h2 className="font-black text-xl mb-3">
                  المقالات والنصائح
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {ARTICLES.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setArticleId(a.id)}
                      className="text-right border rounded-2xl p-4 bg-white shadow-sm hover:shadow-md"
                    >
                      <span className="text-xs bg-red-50 text-[#C8102E] px-2 py-0.5 rounded-full font-bold">
                        {a.cat} — {a.read}
                      </span>
                      <h3 className="font-black mt-2 leading-snug">{a.title}</h3>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed line-clamp-3">
                        {a.body}
                      </p>
                      <span className="text-sm font-bold text-[#C8102E] mt-2 inline-block">
                        اقرأ المزيد ←
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <article className="max-w-3xl mx-auto bg-white border rounded-2xl p-4 sm:p-6">
                <button
                  onClick={() => setArticleId(null)}
                  className="text-sm font-bold text-[#C8102E] mb-2 flex items-center gap-1"
                >
                  <ChevronLeft size={16} /> كل المقالات
                </button>
                <h2 className="font-black text-2xl leading-snug">
                  {activeArticle.title}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {activeArticle.cat} — {activeArticle.read}
                </p>
                {activeArticle.paras.map((p, i) => (
                  <p key={i} className="text-slate-700 leading-loose mt-3">
                    {p}
                  </p>
                ))}
              </article>
            )}
          </>
        )}

        {view === 'cart' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="font-black text-xl mb-3">
              سلة الطلب — {cart.length} صنف
            </h2>
            {cart.length === 0 && (
              <div className="bg-slate-50 rounded-2xl p-6 text-center text-slate-500">
                سلتك فاضية — اختار من المتجر واضغط أضف للسلة
              </div>
            )}
            <div className="space-y-2">
              {cart.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border rounded-2xl p-3 bg-white"
                >
                  <div>
                    <div className="font-bold">{p.name}</div>
                    <div className="text-xs text-slate-500">
                      {p.cat} — {p.barcode}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(i)}
                    className="p-2 bg-red-50 text-[#C8102E] rounded-full"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="mt-4 border rounded-2xl p-4 bg-white space-y-2">
                <input
                  value={orderName}
                  onChange={(e) => setOrderName(e.target.value)}
                  placeholder="الاسم"
                  className="w-full border rounded-xl px-3 py-2.5 text-sm outline-none"
                />
                <input
                  value={orderPhone}
                  onChange={(e) => setOrderPhone(e.target.value)}
                  placeholder="رقم الهاتف"
                  className="w-full border rounded-xl px-3 py-2.5 text-sm outline-none"
                />
                <input
                  value={orderAddress}
                  onChange={(e) => setOrderAddress(e.target.value)}
                  placeholder="العنوان"
                  className="w-full border rounded-xl px-3 py-2.5 text-sm outline-none"
                />
                {!orderDone ? (
                  <button
                    onClick={submitOrder}
                    className="w-full bg-[#C8102E] text-white py-3 rounded-xl font-bold"
                  >
                    إرسال الطلب للصيدلي
                  </button>
                ) : (
                  <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-center">
                    <div className="font-black text-green-800">
                      تم استلام طلبك ♥
                    </div>
                    <div className="text-sm text-green-700 mt-1">
                      الصيدلي هيراجع طلبك ويكلمك على {orderPhone} — التوصيل
                      30-45 دقيقة
                    </div>
                  </div>
                )}
                <p className="text-xs text-slate-400 text-center">
                  الاستبدال خلال 14 يوم — الثلاجة / الاسبراي وغيرها لا تستبدل
                </p>
              </div>
            )}
          </div>
        )}

        {view === 'staff' && (
          <div className="max-w-3xl mx-auto">
            <h2 className="font-black text-xl mb-1">منطقة الموظفين</h2>
            <p className="text-sm text-slate-500 mb-3">
              مدير / صيدلي / توصيل / محاسب — دخول بإيميل معتمد فقط. إجمالي
              المعتمدين: {approvedEmails.length} إيميل.
            </p>
            {!isStaff ? (
              <div className="border rounded-2xl p-4 bg-white space-y-2">
                <label className="text-sm font-bold">إيميل العمل المعتمد</label>
                <input
                  value={staffEmail}
                  onChange={(e) => setStaffEmail(e.target.value)}
                  placeholder="name@bendaryph.com"
                  className="w-full border rounded-xl px-3 py-2.5 text-sm outline-none"
                />
                <button
                  onClick={loginStaff}
                  className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold"
                >
                  دخول الموظفين
                </button>
                {!approvedEmails.includes(norm) && staffEmail.trim() !== '' && (
                  <p className="text-xs text-red-600 font-bold">
                    الإيميل ده مش معتمد — اطلب من Super Control يوافق عليه.
                  </p>
                )}
                <p className="text-xs text-slate-400">
                  الإيميلات المعتمدة: admin@bendaryph.com حتى
                  admin_200@bendaryph.com + 2 إيميل Super Control.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between bg-green-50 border border-green-100 rounded-2xl p-3 mb-3">
                  <span className="font-bold text-green-800">
                    تم الدخول — {staffEmail} — دورك: {myRole}{' '}
                    {isSuper ? '— Super Control (تحكم كامل)' : ''}
                  </span>
                  <button
                    onClick={logoutStaff}
                    className="text-sm font-bold text-[#C8102E]"
                  >
                    خروج
                  </button>
                </div>
                {isSuper && (
                  <div className="border-2 border-[#C8102E] rounded-2xl p-4 bg-white mb-4">
                    <h3 className="font-black text-lg text-[#C8102E]">
                      لوحة Super Control
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      صلاحياتك: {SUPER_PERMS.join(' • ')}
                    </p>
                    <h4 className="font-bold mt-4 mb-2">
                      1) اعتماد الإيميلات — {approvedEmails.length} معتمد
                    </h4>
                    <div className="flex gap-2">
                      <input
                        value={newStaffEmail}
                        onChange={(e) => setNewStaffEmail(e.target.value)}
                        placeholder="إيميل جديد للاعتماد"
                        className="flex-1 border rounded-xl px-3 py-2 text-sm outline-none"
                      />
                      <select
                        value={newStaffRole}
                        onChange={(e) => setNewStaffRole(e.target.value)}
                        className="border rounded-xl px-2 text-sm"
                      >
                        {STAFF_ROLES.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => {
                          const em = newStaffEmail.trim().toLowerCase();
                          if (em && !approvedEmails.includes(em)) {
                            setApprovedEmails((p) => [...p, em]);
                            setStaffRolesMap((p) => ({
                              ...p,
                              [em]: newStaffRole,
                            }));
                            setNewStaffEmail('');
                          }
                        }}
                        className="bg-[#C8102E] text-white px-3 py-2 rounded-xl text-sm font-bold shrink-0"
                      >
                        اعتماد + إضافة
                      </button>
                    </div>
                    <div className="max-h-40 overflow-y-auto mt-2 space-y-1">
                      {approvedEmails.map((em) => (
                        <div
                          key={em}
                          className="flex justify-between items-center bg-slate-50 rounded-xl px-3 py-1.5 text-sm"
                        >
                          <span>
                            {em} —{' '}
                            {SUPER_EMAILS.includes(em)
                              ? 'Super Control'
                              : staffRolesMap[em] || 'صيدلي'}
                          </span>
                          {!SUPER_EMAILS.includes(em) && (
                            <button
                              onClick={() =>
                                setApprovedEmails((p) =>
                                  p.filter((x) => x !== em),
                                )
                              }
                              className="text-red-600 font-bold text-xs"
                            >
                              حذف
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <h4 className="font-bold mt-4 mb-2">
                      2) تحديد صلاحيات / دور إيميل
                    </h4>
                    <div className="flex gap-2">
                      <input
                        value={roleTargetEmail}
                        onChange={(e) => setRoleTargetEmail(e.target.value)}
                        placeholder="إيميل الموظف"
                        className="flex-1 border rounded-xl px-3 py-2 text-sm outline-none"
                      />
                      <select
                        onChange={(e) => {
                          const em = roleTargetEmail.trim().toLowerCase();
                          if (em)
                            setStaffRolesMap((p) => ({
                              ...p,
                              [em]: e.target.value,
                            }));
                        }}
                        className="border rounded-xl px-2 text-sm"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          اختر الدور
                        </option>
                        {STAFF_ROLES.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                    <h4 className="font-bold mt-4 mb-2">
                      3) إضافة فرع جديد
                    </h4>
                    <div className="space-y-2">
                      <input
                        value={newBranchName}
                        onChange={(e) => setNewBranchName(e.target.value)}
                        placeholder="اسم الفرع"
                        className="w-full border rounded-xl px-3 py-2 text-sm outline-none"
                      />
                      <input
                        value={newBranchAddress}
                        onChange={(e) => setNewBranchAddress(e.target.value)}
                        placeholder="عنوان الفرع"
                        className="w-full border rounded-xl px-3 py-2 text-sm outline-none"
                      />
                      <input
                        value={newBranchPhone}
                        onChange={(e) => setNewBranchPhone(e.target.value)}
                        placeholder="هاتف الفرع"
                        className="w-full border rounded-xl px-3 py-2 text-sm outline-none"
                      />
                      <button
                        onClick={() => {
                          if (!newBranchName.trim() || !newBranchAddress.trim())
                            return;
                          setBranchesList((p) => [
                            ...p,
                            {
                              name: newBranchName,
                              code: `BEN-${p.length + 1}`,
                              address: newBranchAddress,
                              phone: newBranchPhone,
                            },
                          ]);
                          setNewBranchName('');
                          setNewBranchAddress('');
                        }}
                        className="w-full bg-slate-900 text-white py-2.5 rounded-xl font-bold text-sm"
                      >
                        إضافة الفرع
                      </button>
                    </div>
                    <h4 className="font-bold mt-4 mb-2">
                      4) أرقام واتساب / هاتف + إيقاف القناة
                    </h4>
                    <div className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2 text-sm font-bold">
                      <span>
                        قناة واتساب: {whatsappEnabled ? 'شغالة' : 'متوقفة'}
                      </span>
                      <button
                        onClick={() => setWhatsappEnabled((v) => !v)}
                        className={`px-3 py-1.5 rounded-full text-white text-xs ${
                          whatsappEnabled ? 'bg-red-600' : 'bg-green-600'
                        }`}
                      >
                        {whatsappEnabled ? 'إيقاف القناة' : 'تشغيل القناة'}
                      </button>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <input
                        value={newWhatsapp}
                        onChange={(e) => setNewWhatsapp(e.target.value)}
                        placeholder="رقم واتساب / هاتف جديد"
                        className="flex-1 border rounded-xl px-3 py-2 text-sm outline-none"
                      />
                      <button
                        onClick={() => {
                          if (
                            newWhatsapp.trim() &&
                            !whatsappNumbers.includes(newWhatsapp.trim())
                          )
                            setWhatsappNumbers((p) => [
                              ...p,
                              newWhatsapp.trim(),
                            ]);
                          setNewWhatsapp('');
                        }}
                        className="bg-[#C8102E] text-white px-3 py-2 rounded-xl text-sm font-bold"
                      >
                        إضافة رقم
                      </button>
                    </div>
                    <div className="mt-2 space-y-1">
                      {whatsappNumbers.map((n) => (
                        <div
                          key={n}
                          className="flex justify-between bg-slate-50 rounded-xl px-3 py-1.5 text-sm"
                        >
                          <span>{n}</span>
                          <button
                            onClick={() =>
                              setWhatsappNumbers((p) =>
                                p.filter((x) => x !== n),
                              )
                            }
                            className="text-red-600 font-bold text-xs"
                          >
                            حذف
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <h3 className="font-black mb-2">الطلبات</h3>
                <div className="space-y-2 mb-4">
                  {ORDERS.map((o) => (
                    <div
                      key={o.no}
                      className="border rounded-2xl p-3 bg-white"
                    >
                      <div className="flex justify-between">
                        <b>
                          {o.no} — {o.customer}
                        </b>
                        <span className="text-xs bg-amber-100 px-2 py-0.5 rounded-full font-bold">
                          {o.status}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600 mt-1">
                        {o.items} — {o.branch} — {o.channel}
                      </div>
                      <div className="text-xs text-slate-400">
                        {o.created} — {o.phone} — {o.address}
                      </div>
                    </div>
                  ))}
                </div>
                <h3 className="font-black mb-2">المخزون</h3>
                <div className="space-y-2 mb-4">
                  {STOCK.map((s, i) => (
                    <div
                      key={i}
                      className="flex justify-between border rounded-2xl p-3 bg-white"
                    >
                      <span>
                        <b>{s.p}</b>
                        <span className="text-xs text-slate-500 block">
                          {s.branch}
                        </span>
                      </span>
                      <span className="text-sm font-bold">
                        {s.stock} — {s.status}
                      </span>
                    </div>
                  ))}
                </div>
                <h3 className="font-black mb-2">38 ميزة للموظفين</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {FEATURES38.map((f) => (
                    <details
                      key={f.id}
                      className="border rounded-2xl p-3 bg-white"
                    >
                      <summary className="font-bold cursor-pointer">
                        {f.ar}{' '}
                        <span className="text-slate-400 font-normal text-xs">
                          ({f.en})
                        </span>
                      </summary>
                      <p className="text-sm text-slate-600 mt-1">{f.desc}</p>
                      <table className="w-full text-xs mt-2">
                        <tbody>
                          {f.rows.map((r, i) => (
                            <tr key={i} className="border-t">
                              <td className="py-1">{r.a}</td>
                              <td>{r.b}</td>
                              <td>{r.c}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </details>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {view === 'legal' && (
          <div className="max-w-2xl mx-auto bg-white border rounded-2xl p-4">
            <h2 className="font-black text-xl mb-2">
              {LEGAL[legalKey].title}
            </h2>
            {LEGAL[legalKey].paras.map((p, i) => (
              <p key={i} className="text-slate-700 leading-loose mt-2">
                {p}
              </p>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t bg-slate-50 mt-6">
        <div className="max-w-7xl mx-auto px-4 py-5 grid sm:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-black text-[#C8102E]">
              صيدليات البنداري — رعاية من القلب ♥
            </div>
            <p className="text-slate-500 mt-1">
              الخط الساخن: 01200400094 — 24 ساعة
            </p>
            <p className="text-slate-500">
              info@bendaryph.com — www.bendaryph.com
            </p>
          </div>
          <div className="flex gap-2 flex-wrap items-start">
            {Object.keys(LEGAL).map((k) => (
              <button
                key={k}
                onClick={() => {
                  setLegalKey(k);
                  setView('legal');
                }}
                className="bg-white border px-3 py-1.5 rounded-full font-bold"
              >
                {LEGAL[k].title}
              </button>
            ))}
          </div>
          <div className="text-slate-500">
            <p>DevOps By (MoSTa® | Let&apos;s Live The Future Now)</p>
            <p className="flex items-center gap-1 mt-1">
              <BadgeCheck size={15} className="text-green-600" /> Verified By
              Meta
            </p>
          </div>
        </div>
      </footer>

      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-4 left-4 z-50 bg-[#C8102E] text-white px-4 py-3 rounded-full shadow-xl font-bold flex items-center gap-2"
        >
          <MessageCircle size={19} /> BenDa ChaT
        </button>
      )}
      {chatOpen && (
        <div className="fixed bottom-4 left-4 z-50 w-[92vw] max-w-sm bg-white border rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-[#C8102E] text-white px-3 py-2.5 flex items-center justify-between">
            <span className="font-bold flex items-center gap-2">
              <Bot size={18} /> BenDa ChaT
            </span>
            <button onClick={() => setChatOpen(false)}>
              <X size={18} />
            </button>
          </div>
          <div className="h-64 overflow-y-auto p-3 space-y-2 bg-slate-50">
            {chatList.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  m.from === 'me'
                    ? 'bg-[#C8102E] text-white mr-auto'
                    : 'bg-white border'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2 p-2 border-t">
            <input
              value={chatMsg}
              onChange={(e) => setChatMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendChat();
              }}
              placeholder="اسأل عن دواء أو عرض..."
              className="flex-1 border rounded-full px-3 py-2 text-sm outline-none"
            />
            <button
              onClick={sendChat}
              className="bg-[#C8102E] text-white p-2.5 rounded-full"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
