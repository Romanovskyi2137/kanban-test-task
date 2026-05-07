# ⚡️ kinda Kanban

> A full-stack Kanban board for managing tasks across boards and columns — with smooth drag-and-drop, optimistic updates, and a clean responsive UI.

---

## ✨ Features

- 📋 Create, rename, and delete boards
- 🃏 Add, edit, and delete cards within columns
- 🖱️ Drag and drop cards between columns with instant UI feedback
- 🔍 Search for existing boards by ID
- 🕓 Recently visited boards tracked in the sidebar
- ⚡️ Optimistic updates — UI responds instantly, syncs in the background

---

## 🛠️ Tech Stack

| Layer           | Technology                   |
| --------------- | ---------------------------- |
| 🖼️ Frontend     | React 19 + TypeScript + Vite |
| 🔄 Server state | TanStack React Query v5      |
| 🗂️ UI state     | Zustand                      |
| 🖱️ Drag & drop  | @hello-pangea/dnd            |
| 🌐 Routing      | React Router v7              |
| 🚀 Backend      | Express 5 + TypeScript       |
| 🗄️ Database     | PostgreSQL + Prisma ORM      |
| 🎨 Styling      | SCSS Modules                 |

---

## 🚀 Running Locally

### Prerequisites

- **Node.js** 18+
- **Docker Desktop** — used to run PostgreSQL

---

### 1. Clone and install

```bash
git clone <repo-url>
cd kanban-test-task
npm install
```

### 2. Set up environment variables

Create `server/.env`:

```env
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/kanban_db"
CLIENT_URL="http://localhost:5173"
PORT=3000
```

Create `client/.env`:

```env
VITE_API_URL="http://localhost:3000"
```

### 3. Start the database

```bash
docker-compose up -d
```

### 4. Run migrations

```bash
cd server && npx prisma migrate dev
```

### 5. Start dev servers

Open two terminals and run:

```bash
npm run dev -w server   # API on http://localhost:3000
npm run dev -w client   # App on http://localhost:5173
```

Then open [http://localhost:5173](http://localhost:5173) 🎉

---

## 🧪 Testing

```bash
npm test -w client   # Vitest (jsdom)
npm test -w server   # Vitest (unit, mocked Prisma)
```

> Backend tests cover service-layer logic only — Prisma is fully mocked. No integration tests against a real database.

---

## 🧹 Lint & Format

```bash
npm run lint:all
npm run format:all
```

---

## 📁 Project Structure

```
kanban-test-task/
├── client/               # React frontend (Vite)
│   └── src/
│       ├── features/     # Feature modules (board, cards, sidebar widgets)
│       ├── components/   # Shared UI components
│       ├── store/        # Zustand global state
│       ├── api/          # Axios client
│       └── types/        # Shared TypeScript types
├── server/               # Express backend
│   └── src/
│       ├── api/
│       │   ├── controllers/  # Route handlers
│       │   ├── routers/      # Express routers
│       │   ├── middleware/   # Error handler
│       │   └── services/     # Business logic
│       ├── lib/          # Prisma client singleton
│       └── constants.ts  # Shared constants
└── docker-compose.yml    # PostgreSQL container
```
