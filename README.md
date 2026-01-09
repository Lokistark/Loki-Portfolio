# MERN Portfolio

This is my personal portfolio built with the MERN Stack. I wanted something that felt more like a modern SaaS landing page than a traditional developer portfolio. No boring white backgrounds or generic grids here.

## 🛠 Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **Auth**: JWT with custom middleware
- **Icons**: Lucide React

## 🚀 Key Features
- **Admin Dashboard**: Full CRUD for projects and experience sections. No need to touch the code to update my latest work.
- **Glassmorphic UI**: High-end aesthetics with custom blur effects and micro-interactions.
- **Parallax Hero**: Subtle mouse-tracking effects on background elements for that "premium" feel.
- **Form Handling**: Integrated contact form with validation and success states.
- **Project CMS**: Dynamic project loading from MongoDB with an integrated editor in the dashboard.

## 🔑 Admin Access
You can manage your projects and messages via the secure dashboard:
- **URL**: `http://localhost:5173/admin/login` (Also linked in the website footer)
- **Username**
- **Password**

## 📝 Development Notes (Self-reminder)
- Had some issues with the JWT expiration in development, changed it to 30d for now but need to shorten it for production.
- Tailwind v4 (experimental) was causing some at-rule warnings in the editor, but the build works fine.
- Using `framer-motion` for the progress bar instead of raw CSS because it's just easier to handle the spring physics.

## ⚙️ How to run locally
1. Clone the repo
2. Backend:
   - `cd server`
   - `npm install`
   - Create `.env` with `MONGO_URI` and `JWT_SECRET`
   - `npm run dev`
3. Frontend:
   - `cd client`
   - `npm install`
   - `npm run dev`

---
*Built with ❤️ and a lot of caffeine.*
