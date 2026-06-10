# 📋 Report Management System

A full-stack web application for managing reports with end-to-end authentication. Built with a **React** frontend and **Express + Prisma** backend, secured using **JWT**.

---

## 🚀 Tech Stack

### Frontend (`apps/web`)
| Tech | Description |
|---|---|
| React 19 | UI Library |
| TypeScript | Type Safety |
| Vite | Build Tool & Dev Server |
| React Router v7 | Client-side Routing |
| Axios | HTTP Client |
| Tailwind CSS v4 | Styling |
| Sonner | Toast Notifications |
| shadcn/ui | UI Components |

### Backend (`apps/api`)
| Tech | Description |
|---|---|
| Express 5 | Web Framework |
| TypeScript | Type Safety |
| Prisma ORM | Database Access |
| PostgreSQL (Neon) | Database |
| JSON Web Token (JWT) | Authentication |
| bcrypt | Password Hashing |
| dotenv | Environment Variables |

---

## 📁 Project Structure

```
report-management-system/
├── apps/
│   ├── api/                        # Backend (Express + Prisma)
│   │   ├── prisma/
│   │   │   ├── schema.prisma       # Database schema
│   │   │   └── migrations/         # Prisma migrations
│   │   └── src/
│   │       ├── auth/
│   │       │   ├── controllers/    # Register & Login logic
│   │       │   ├── middlewares/    # verifyToken JWT middleware
│   │       │   └── routes/         # Auth routes
│   │       ├── Report/
│   │       │   ├── controllers/    # Create & fetch reports
│   │       │   └── routes/         # Report routes
│   │       ├── dashboard/
│   │       │   ├── controllers/    # Dashboard data
│   │       │   └── routes/         # Dashboard routes
│   │       ├── lib/
│   │       │   └── db.ts           # Prisma client instance
│   │       ├── types/
│   │       │   └── express.d.ts    # Extended Express Request type
│   │       └── server.ts           # Entry point
│   │
│   └── web/                        # Frontend (React + Vite)
│       └── src/
│           ├── pages/
│           │   ├── auth/
│           │   │   ├── LoginPage.tsx
│           │   │   └── RegisterPage.tsx
│           │   └── DashboardPage.tsx
│           ├── routes/
│           │   ├── ProtectedRoute.tsx  # Redirect to /login if no token
│           │   └── AutoRoute.tsx       # Redirect to /dashboard if logged in
│           ├── lib/
│           │   └── axios.ts            # Axios instance with base URL
│           ├── types/
│           │   └── auth.ts             # Auth type definitions
│           └── App.tsx                 # Route definitions
```

---

## 🔐 Authentication Flow

```
User → Register (/api/register)
     → Login    (/api/login)  → JWT Token (1 hour expiry)
     → Store token in localStorage
     → Access protected routes with Bearer token header
     → verifyToken middleware validates JWT on every protected request
```

### Route Guards
- **`ProtectedRoute`** — Redirects to `/login` if user is not authenticated
- **`AutoRoute`** — Redirects to `/dashboard` if user is already logged in

---

## 🛣️ API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/register` | ❌ | Register new user |
| `POST` | `/api/login` | ❌ | Login & get JWT token |

### Dashboard
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/dashboard` | ✅ | Get dashboard + user data |

### Reports
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/reports` | ✅ | Create a new report |
| `GET` | `/api/reports/my` | ✅ | Get all reports by logged-in user |
| `GET` | `/api/reports/my/:id` | ✅ | Get a specific report by ID |
| `GET` | `/api/profile` | ✅ | Get logged-in user profile |

---

## 🗄️ Database Schema

### User
| Field | Type | Description |
|---|---|---|
| `id` | String (cuid) | Primary key |
| `email` | String (unique) | User email |
| `name` | String | Display name |
| `password` | String | Hashed password |
| `createdAt` | DateTime | Creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

### Report
| Field | Type | Description |
|---|---|---|
| `id` | String (cuid) | Primary key |
| `title` | String | Report title |
| `description` | String | Report detail |
| `status` | Enum | `PENDING` \| `APPROVED` \| `REJECTED` |
| `category` | Enum | `BUG` \| `FEATURE` \| `COMPLAINT` \| `MAINTENANCE` |
| `userId` | String | Foreign key to User |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js >= 18
- npm
- PostgreSQL database (or [Neon](https://neon.tech) serverless PostgreSQL)

### 1. Clone the repository

```bash
git clone https://github.com/kemalfikri-dev/report-management-system.git
cd report-management-system
```

### 2. Setup Backend

```bash
cd apps/api
npm install
```

Create a `.env` file in `apps/api/`:

```env
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_jwt_secret_key"
CLIENT_URL="http://localhost:5173"
PORT=3000
NODE_ENV="development"
```

Run database migration:

```bash
npx prisma migrate dev
```

Start the backend:

```bash
npm run dev
```

Backend will run on → `http://localhost:3000`

### 3. Setup Frontend

```bash
cd apps/web
npm install
npm run dev
```

Frontend will run on → `http://localhost:5173`

---

## 🧪 Testing Auth Flow

```bash
# Register
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"Password123!"}'

# Login
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Password123!"}'

# Access protected route (use token from login response)
curl http://localhost:3000/api/dashboard \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

---

## 🌿 Branch Structure

| Branch | Description |
|---|---|
| `master` | Production-ready code |
| `dev` | Main development branch |
| `feat/` | Used During Development (not all preserved) |


---

## 📄 License

This project is built for learning and portfolio purposes.
