#El-Bendary Pharmacies — albendary

رعاية من القلب ♥

Official website + store + pharmacy system for El-Bendary Pharmacies.
Built on MoSTa® — Let's Live The Future Now

Live: https://www.bendaryph.com
Hotline: 01200400094
Catalog live: 22,254 products in Neon
Branches: 12 branches — 11 + Hacienda North Coast active
Coming soon: Alexandria / New Cairo / Sharm El Sheikh — قريباً - Loading

DevOps By (MoSTa® | Let's Live The Future Now)
Verified By 【entity-Meta¦canonical_name=Meta】

---

What this repo is

Customer app + Staff app in one repo, fully separated:

Customer sees:
Store + Search by name / active ingredient / barcode
Offers — real Bendary offer images only
Branches + Hotline + 【entity-WhatsApp¦canonical_name=WhatsApp】
Prescription upload + Track order
BenDa ChaT — one floating button only
Blog / Articles + Drug Dictionary 80,000+ / 3,000+ symptoms & treatments
NO prices — only "أضف للسلة"
NO SKU, NO AD, NO system words, NO Supabase, NO install popup

Staff sees (hidden from customers):
POS + Invoices + Paymob (Card / Wallet) + Cash
Full price / discount / total / pack / stock
Inventory + Shortage + Expiry + Vendors + Purchase Orders
CRM + Campaigns + Loyalty
Reports + Real-Time Data
Roles: Manager / Pharmacist / Delivery / Accountant — NO Admin role
Super Control: 2 emails only, full permissions

---

Tech Stack

Frontend: Next.js 16.4.6 + React 19 + Tailwind CSS 4 + shadcn
Backend: Next.js API Routes app/api/.../route.ts
Database: Neon Postgres + 【entity-Prisma¦canonical_name=Prisma】 5.22
Hosting: Vercel — www.bendaryph.com
Channels: 【entity-Meta¦canonical_name=Meta】 — 【entity-WhatsApp¦canonical_name=WhatsApp】 / 【entity-Facebook¦canonical_name=Facebook】 / 【entity-Instagram¦canonical_name=Instagram】 Webhooks
Payments: Paymob
Old system: PharmaSyst — bindary.pharmasyst.net

Project Structure
/
├── app/
│   ├── api/
│   │   ├── health/route.ts
│   │   ├── products/route.ts
│   │   ├── whatsapp-webhook/route.ts
│   │   └── meta-webhook/route.ts
│   ├── page.tsx
│   └── layout.tsx
├── prisma/
│   └── schema.prisma
├── lib/
│   └── prisma.ts
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── .env.example
├── package.json
└── vercel.json
Quick Start

`bash
git clone https://github.com/ELMOURABEA/albendary.git
cd albendary
pnpm install
cp .env.example .env.local
npx prisma db push
npx prisma generate
pnpm dev
Environment Variables

Set in Vercel > Settings > Environment Variables. Never commit real tokens.
DATABASE_URL=
DIRECT_URL=
SITE_URL=https://www.bendaryph.com
MOSTA_TENANT_ID=bendaryph
META_APP_ID=
META_APP_SECRET=
META_VERIFY_TOKEN=bendary_verify_2026
META_META_VERIFY_TOKEN=bendary_meta_verify_2026
[STRIPPED 204 bytes]https://bindary.pharmasyst.net/
PHARMASYST_API_KEY=
API
| Endpoint | What it does |
| --- | --- |
| GET /api/health | { ok:true, neon:'connected', products: 22254 } |
| GET /api/products?q= | Search by Arabic / English name, active ingredient, barcode |
| GET/POST /api/ -webhook | Meta WhatsApp verify + events |
| GET/POST /api/ -webhook | Meta Facebook /  verify + events |
Test:
curl https://www.bendaryph.com/api/health
curl "https://www.bendaryph.com/api/products?q=paracetamol"
Database — Neon

Product — id, nameAr, nameEn, activeIngredient, barcode UNIQUE, category, pack, price, stock, branchId, expiry, needsReview
Branch — id, name, address, phone, status
Order — id, customerName, customerPhone, branchId, total, status
Message — id, channel, sender, text, branchId

Catalog: mosta_pharm_full_products_catalog (staging) → Product (live). Live count: 22,254.

Deployment — Vercel

Push to main — Vercel auto-deploys
Vercel > Domains > Add www.bendaryph.com + bendaryph.com
DNS: A @ → Vercel IP + CNAME www → cname.vercel-dns.com
Vercel > Env Vars > Add all above > Redeploy

SEO

public/robots.txt + public/sitemap.xml live
Google Search Console > Add https://www.bendaryph.com > Submit sitemap

Invoice Format (Fixed)

Pharmacy name + Date/Time + Branch + Invoice No. + Customer No./Name + Return note:
Exchange within 14 days — Fridge / Spray and others not exchangeable
## License

Private — © 2026 MoSTa® / El-Bendary Pharmacies. All rights reserved.
---

2. If repo needs additional things — add these 4 files too:

A. .gitignore
`gitignore
node_modules/
.pnpm-store/
.next/
out/
build/
.env
.env.local
.env*.local
.vercel
.DS_Store
*.log
B. .env.example — names only, no real values
DATABASE_URL=
DIRECT_URL=
SITE_URL=https://www.bendaryph.com
MOSTA_TENANT_ID=bendaryph
META_APP_ID=
META_APP_SECRET=
META_VERIFY_TOKEN=bendary_verify_2026
META_META_VERIFY_TOKEN=bendary_meta_verify_2026
[STRIPPED 204 bytes]https://bindary.pharmasyst.net/
PHARMASYST_API_KEY=
C. vercel.json
{
  "framework": "nextjs",
  "headers": [
    { "source": "/sitemap.xml", "headers": [{ "key": "Content-Type", "value": "application/xml" }] },
    { "source": "/robots.txt", "headers": [{ "key": "Content-Type", "value": "text/plain" }] }
  ]
}
D. LICENSE
Copyright (c) 2026 MoSTa® / El-Bendary Pharmacies
All rights reserved. Private project - no redistribution without permission.
---

3. Checklist for albendary — check in GitHub app:

package.json fix:
[ ] package.json — ONE valid JSON, Next.js 16 + @neondatabase/serverless — not the broken 2-object version
[ ] app/api/health/route.ts — edited version
[ ] app/api/products/route.ts — edited version
[ ] README.md — paste above
[ ] .gitignore + .env.example + vercel.json + LICENSE
[ ] prisma/schema.prisma
[ ] public/robots.txt + public/sitemap.xml

MoSTa® | Let's Live The Future Now 