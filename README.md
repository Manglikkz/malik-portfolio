# Malik Ibrahim Portfolio

Personal portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Neon PostgreSQL.

## 🚀 Features

- ✅ Modern, responsive design
- ✅ Admin dashboard for content management
- ✅ Neon PostgreSQL database
- ✅ Deployed on Vercel
- ✅ Custom domain support

## 📦 Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Neon PostgreSQL (serverless)
- **Deployment**: Vercel
- **Animations**: Framer Motion

## 🛠️ Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/your-username/malik-portfolio.git
cd malik-portfolio
npm install
```

### 2. Setup Neon Database

1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project named `portfolio-db`
3. Copy the connection string
4. Create `.env.local` file:

```env
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/portfolio-db?sslmode=require"
ADMIN_PASSWORD="your-admin-password"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Initialize Database

The database will auto-initialize on first run. Or run manually:

```bash
npm run db:init
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🚢 Deploy to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set environment variables:
   - `DATABASE_URL`: Your Neon connection string
   - `ADMIN_PASSWORD`: Your admin password
4. Deploy!

### 3. Connect Custom Domain

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records:
   - **A Record**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com`

## 📁 Project Structure

```
malik-portfolio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── projects/route.ts
│   │   │   ├── achievements/route.ts
│   │   │   ├── skills/route.ts
│   │   │   ├── journey/route.ts
│   │   │   ├── about/route.ts
│   │   │   ├── settings/route.ts
│   │   │   └── health/route.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── lib/
│   │   ├── db.ts
│   │   └── schema.ts
│   └── types/
│       └── index.ts
├── .env.local
├── package.json
└── next.config.js
```

## 🔐 Admin Access

Access admin dashboard at `/admin` to manage:
- Projects
- Achievements
- Skills
- Journey entries
- Site settings

## 📝 License

MIT
