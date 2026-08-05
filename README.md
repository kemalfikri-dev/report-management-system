# Report Management System

A full-stack web application for managing reports with end-to-end authentication and Role-Based Access Control (RBAC). Built with a **React** frontend and **Express + Prisma** backend, secured using **HTTP-Only JWT Cookies**.

---

## 🚀 Tech Stack

### Frontend (`apps/web`)
| Tech | Description |
|---|---|
| React 19 | UI Library |
| TypeScript | Type Safety |
| Vite | Build Tool & Dev Server |
| React Router v7 | Client-side Routing & Guards |
| Axios | HTTP Client (with `withCredentials`) |
| Tailwind CSS v4 | Utility-first Styling |
| shadcn/ui | Accessible UI Components |
| Zod & RHF | Form validation |
| Sonner | Toast Notifications |

### Backend (`apps/api`)
| Tech | Description |
|---|---|
| Express 5 | Web Framework |
| TypeScript | Type Safety |
| Prisma ORM | Database Access |
| PostgreSQL | Relational Database |
| JWT via Cookies | Secure Authentication |
| bcrypt | Password Hashing |
| Zod | Request Validation |

---

## 🌟 Key Features

1. **Role-Based Access Control (RBAC)**
   - **USER**: Can create, view, edit, and delete their own reports.
   - **ADMIN**: Can view all reports system-wide, approve, or reject them with reasons.
2. **Secure Authentication**
   - JWT tokens are stored securely in `HTTP-Only` cookies to prevent XSS attacks.
3. **Interactive Dashboard**
   - Real-time statistics (Total, Pending, Approved, Rejected).
   - Recent activity logs for quick insights.
4. **Minimalist & Clean UI**
   - Professional, emoji-free, and sleek interface built with Shadcn UI.
   - Fully responsive design for mobile and desktop.

---

## 📁 Project Structure

```text
report-management-system/
├── apps/
│   ├── api/                        # Backend (Express + Prisma)
│   │   ├── prisma/
│   │   │   └── schema.prisma       # Database schema (Models: User, Report)
│   │   └── src/
│   │       ├── auth/               # Auth controllers & JWT middleware
│   │       ├── report/             # Report CRUD & Admin approval logic
│   │       ├── dashboard/          # Statistics & recent activity logic
│   │       ├── validators/         # Zod schemas for request validation
│   │       ├── lib/                # Database and util functions
│   │       └── server.ts           # Express entry point
│   │
│   └── web/                        # Frontend (React + Vite)
│       └── src/
│           ├── components/         # Global components (Navbar, Layouts)
│           ├── pages/
│           │   ├── auth/           # Login & Register views
│           │   ├── reports/        # Report Lists, Cards, and Dialogs
│           │   └── DashboardPage.tsx
│           ├── routes/             # ProtectedRoute & ProtectedAdminRoute
│           ├── hooks/              # Custom data-fetching hooks
│           ├── context/            # AuthContext
│           └── lib/                # Axios instance configuration
```

---

## 🔐 Authentication Flow

1. User registers or logs in via `/api/register` or `/api/login`.
2. Backend validates credentials, generates a JWT, and attaches it as an `HTTP-Only` cookie (`access_token`).
3. Frontend uses Axios with `withCredentials: true` to automatically send the cookie on subsequent requests.
4. `verifyToken` middleware validates the cookie. If the route requires admin privileges, `verifyAdmin` middleware further checks the user's role.

---

## 🛣️ API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/register` | ❌ | Register new user |
| `POST` | `/api/login` | ❌ | Login & set HTTP-Only cookie |
| `POST` | `/api/logout` | ✅ | Clear HTTP-Only cookie |
| `GET`  | `/api/me` | ✅ | Get current user session & role |

### Dashboard
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/dashboard` | ✅ | Get stats and 5 recent reports |

### Reports (User)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/reports` | ✅ | Create a new report |
| `GET` | `/api/reports` | ✅ | Get paginated reports for logged-in user |
| `PUT` | `/api/reports/:id` | ✅ | Update an existing report |
| `DELETE` | `/api/reports/:id` | ✅ | Delete a report |

### Reports (Admin)
| Method | Endpoint | Auth (Role) | Description |
|---|---|---|---|
| `GET` | `/api/admin/reports` | ✅ (ADMIN) | Get all reports across the system |
| `PATCH`| `/api/admin/reports/:id/status`| ✅ (ADMIN) | Approve/Reject report with reason |

---

## 🗄️ Database Schema

### User
| Field | Type | Description |
|---|---|---|
| `id` | String (cuid) | Primary key |
| `email` | String (unique) | User email |
| `name` | String | Display name |
| `password` | String | Hashed password |
| `role` | Enum (`Role`) | `USER` \| `ADMIN` |

### Report
| Field | Type | Description |
|---|---|---|
| `id` | String (cuid) | Primary key |
| `title` | String | Report title |
| `description` | String | Report detail |
| `status` | Enum (`Status`)| `PENDING` \| `APPROVED` \| `REJECTED` |
| `category` | Enum (`Category`)| `BUG` \| `FEATURE` \| `COMPLAINT` \| `MAINTENANCE` |
| `rejectReason` | String? | Optional reason if rejected |
| `userId` | String | Foreign key to `User` |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js >= 18
- npm
- PostgreSQL database (Local or Cloud like Neon/Supabase)

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

Run database migrations to sync the schema:
```bash
npx prisma migrate dev
```

Start the backend server (uses `ts-node-dev` for hot-reloading):
```bash
npm run dev
```

### 3. Setup Frontend

Open a new terminal window:
```bash
cd apps/web
npm install
npm run dev
```

Frontend will run on → `http://localhost:5173`
Backend runs on → `http://localhost:3000`

---

## 📄 License

This project is built for learning and portfolio purposes.
