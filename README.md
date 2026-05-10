<div align="center">
  <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=200&h=200&auto=format&fit=crop" width="120" height="120" style="border-radius: 30px; margin-bottom: 20px;" />
  
  # 🌍 TRAVELOOP
  ### *Your Journey, Orchestrated to Perfection*
  
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io/)
  [![Turbo](https://img.shields.io/badge/Turbo-Monorepo-EF4444?style=for-the-badge&logo=turborepo)](https://turbo.build/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org/)

  **Traveloop** is a premium, high-fidelity travel planning platform designed for the modern explorer. From collaborative itinerary building to intelligent packing lists, we turn travel chaos into a seamless narrative.

  [Explore Demo](http://localhost:3000) • [View API](http://localhost:4000/health) • [Report Bug](https://github.com/Mihir-Rabari/traveloop/issues)
</div>

---

## ✨ Key Features

- **📍 Dynamic Itineraries**: Build your journey day-by-day with a beautiful timeline interface. Drag, drop, and discover activities.
- **🧳 Smart Packing**: Never forget the essentials with our trip-specific packing checklists.
- **👥 Collaborative Planning**: Invite friends and family to sketch out adventures together in real-time.
- **🗺️ Destination Discovery**: Explore trending cities and handpicked activities powered by our discovery engine.
- **📝 Journey Notes**: Capture thoughts, links, and memories directly within your trip dashboard.
- **📊 Budget Tracking**: Keep your finances in check with integrated expense management (Coming Soon).

## 🚀 Tech Stack

Traveloop is built on a modern, high-performance monorepo architecture:

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router), [Framer Motion](https://framer.com/motion) for premium animations, [TanStack Query](https://tanstack.com/query) for state management.
- **Backend**: [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/), [Zod](https://zod.dev/) for type-safe validation.
- **Database**: [Prisma ORM](https://prisma.io/) with PostgreSQL.
- **Tooling**: [Turbo](https://turbo.build/) for build orchestration, [pnpm](https://pnpm.io/) for efficient dependency management.
- **UI/UX**: Custom design system built with [Tailwind CSS](https://tailwindcss.com/) and [Radix UI](https://www.radix-ui.com/).

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+
- pnpm 9+
- PostgreSQL instance

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mihir-Rabari/traveloop.git
   cd traveloop
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/traveloop"
   JWT_SECRET="your-super-secret-key"
   ```

4. **Initialize Database**
   ```bash
   pnpm db:push
   pnpm db:seed
   ```

5. **Run Development Servers**
   ```bash
   pnpm dev
   ```

## 📂 Project Structure

```text
traveloop/
├── apps/
│   ├── web/          # Next.js 15 Frontend
│   └── api/          # Express.js Backend
├── packages/
│   ├── config/       # Shared TS/ESLint/Prettier config
│   ├── types/        # Shared TypeScript interfaces
│   ├── ui/           # Shared React components
│   └── utils/        # Shared helper functions
└── prisma/           # Database schema and seeds
```

---

<div align="center">
  <p>Built with ❤️ by the Traveloop Team</p>
  <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&h=100&auto=format&fit=crop" style="border-radius: 20px; width: 100%; object-fit: cover;" />
</div>
