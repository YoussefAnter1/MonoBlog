<div align="center">

# ✍️ MonoBlog

### A Full-Stack Blogging Platform Built with Next.js 16

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

**A modern, responsive blogging platform — featuring article management, user authentication, an admin dashboard, and a commenting system.**

[Getting Started](#-getting-started) •
[Features](#-features) •
[Tech Stack](#-tech-stack) •
[Project Structure](#-project-structure) •
[API Reference](#-api-reference) •
[Database Schema](#-database-schema)

</div>

---

## ✨ Features

<table>
<tr>
<td>

### 🔐 Authentication & Authorization

- User registration & login with JWT
- Password hashing with bcrypt
- Role-based access control (User / Admin)
- Secure HTTP-only cookie sessions

</td>
<td>

### 📝 Article Management

- Create, read, update & delete articles
- Paginated article listings
- Full-text search functionality
- Server-side rendered article pages

</td>
</tr>
<tr>
<td>

### 💬 Commenting System

- Add comments on articles
- Edit & delete own comments
- Cascading deletes for data integrity
- Real-time toast notifications

</td>
<td>

### 🛡️ Admin Dashboard

- Sidebar navigation (Articles / Comments)
- Manage all articles from a central table
- Moderate all user comments
- Add new articles via a dedicated form

</td>
</tr>
<tr>
<td>

### 👤 User Profiles

- View & update profile information
- Change username, email, or password
- Delete account functionality

</td>
<td>

### 🎨 Modern UI/UX

- Fully responsive design (mobile ↔ desktop)
- CSS Modules for scoped styling
- Tailwind CSS utility classes
- Smooth loading states & error handling

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

| Layer             | Technology                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Framework**     | [Next.js 16](https://nextjs.org/) (App Router)                                                                      |
| **Language**      | [TypeScript 5](https://www.typescriptlang.org/)                                                                     |
| **UI Library**    | [React 19](https://reactjs.org/)                                                                                    |
| **Styling**       | [Tailwind CSS 4](https://tailwindcss.com/) + CSS Modules                                                            |
| **Database**      | [PostgreSQL](https://www.postgresql.org/)                                                                           |
| **ORM**           | [Prisma 7](https://www.prisma.io/)                                                                                  |
| **Auth**          | JWT ([jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)) + [bcryptjs](https://github.com/dcodeIO/bcrypt.js) |
| **Validation**    | [Zod 4](https://zod.dev/)                                                                                           |
| **HTTP Client**   | [Axios](https://axios-http.com/)                                                                                    |
| **Notifications** | [React Toastify](https://fkhadra.github.io/react-toastify/)                                                         |
| **Icons**         | [React Icons](https://react-icons.github.io/react-icons/)                                                           |

---

## 📁 Project Structure

```
monoblog/
├── prisma/
│   ├── schema.prisma          # Database models (User, Article, Comment)
│   ├── client.ts              # Prisma client instance
│   └── migrations/            # Database migrations
├── public/
│   └── cloud-hosting.png      # Hero section image
├── src/
│   ├── apiCalls/
│   │   └── articlesApiCall.ts # Server-side article data fetching
│   ├── app/
│   │   ├── (user)/
│   │   │   ├── login/         # Login page
│   │   │   └── register/     # Registration page
│   │   ├── about/             # About page
│   │   ├── admin/
│   │   │   ├── articles-table/# Admin articles management
│   │   │   ├── comments-table/# Admin comments management
│   │   │   ├── AddArticlesForm.tsx
│   │   │   └── AdminSidebar.tsx
│   │   ├── api/
│   │   │   ├── articles/      # Articles CRUD endpoints
│   │   │   ├── comments/      # Comments CRUD endpoints
│   │   │   └── users/         # Auth & profile endpoints
│   │   ├── articles/
│   │   │   ├── [id]/          # Dynamic article detail page
│   │   │   └── search/        # Article search page
│   │   ├── layout.tsx         # Root layout (Header + Footer)
│   │   ├── page.tsx           # Home page (Hero + Features)
│   │   ├── loading.tsx        # Global loading state
│   │   ├── error.tsx          # Global error boundary
│   │   └── not-found.tsx      # 404 page
│   ├── components/
│   │   ├── articles/          # ArticleItem, Pagination, SearchInput
│   │   ├── Comments/          # Comment-related components
│   │   ├── footer/            # Footer component
│   │   ├── header/            # Header, Navbar, LogoutButton
│   │   └── Home/              # Hero section, feature cards
│   ├── utils/
│   │   ├── constants.ts       # App constants (ARTICLE_PER_PAGE, etc.)
│   │   ├── dtos.ts            # Data Transfer Objects
│   │   ├── generateToken.ts   # JWT token generation
│   │   ├── verifyToken.ts     # JWT token verification middleware
│   │   ├── validationShemas.ts# Zod validation schemas
│   │   ├── types.ts           # TypeScript type definitions
│   │   └── prisma.ts          # Prisma client singleton
│   └── proxy.ts               # API proxy configuration
├── .env                       # Environment variables
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 🗄️ Database Schema

```mermaid
erDiagram
    USER ||--o{ COMMENT : writes
    ARTICLE ||--o{ COMMENT : has

    USER {
        int id PK
        string email UK
        string username
        string password
        boolean isAdmin
        datetime createdAt
        datetime updatedAt
    }

    ARTICLE {
        int id PK
        string title
        string description
        datetime createdAt
        datetime updatedAt
    }

    COMMENT {
        int id PK
        string text
        int articleId FK
        int userId FK
        datetime createdAt
        datetime updatedAt
    }
```

---

## 🔌 API Reference

### 📰 Articles

| Method   | Endpoint                           | Description                  | Auth   |
| -------- | ---------------------------------- | ---------------------------- | ------ |
| `GET`    | `/api/articles`                    | Get all articles (paginated) | Public |
| `POST`   | `/api/articles`                    | Create a new article         | Admin  |
| `GET`    | `/api/articles/count`              | Get total article count      | Public |
| `GET`    | `/api/articles/search?searchText=` | Search articles              | Public |
| `GET`    | `/api/articles/:id`                | Get single article           | Public |
| `PUT`    | `/api/articles/:id`                | Update an article            | Admin  |
| `DELETE` | `/api/articles/:id`                | Delete an article            | Admin  |

### 💬 Comments

| Method   | Endpoint            | Description      | Auth        |
| -------- | ------------------- | ---------------- | ----------- |
| `GET`    | `/api/comments`     | Get all comments | Admin       |
| `POST`   | `/api/comments`     | Create a comment | User        |
| `PUT`    | `/api/comments/:id` | Update a comment | Owner       |
| `DELETE` | `/api/comments/:id` | Delete a comment | Owner/Admin |

### 👤 Users

| Method   | Endpoint                 | Description           | Auth        |
| -------- | ------------------------ | --------------------- | ----------- |
| `POST`   | `/api/users/register`    | Register a new user   | Public      |
| `POST`   | `/api/users/login`       | Login & get JWT token | Public      |
| `GET`    | `/api/users/logout`      | Logout (clear cookie) | User        |
| `GET`    | `/api/users/profile/:id` | Get user profile      | User        |
| `PUT`    | `/api/users/profile/:id` | Update user profile   | Owner       |
| `DELETE` | `/api/users/profile/:id` | Delete user account   | Owner/Admin |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **PostgreSQL** database
- **npm**, **yarn**, **pnpm**, or **bun**

### 1. Clone the Repository

```bash
git clone https://github.com/YoussefAnter1/MonoBlog.git
cd MonoBlog
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your-super-secret-jwt-key"
```

### 4. Set Up the Database

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [https://mono-blog-ochre.vercel.app](https://mono-blog-ochre.vercel.app) to view the app in your browser.

### 6. Build for Production

```bash
npm run build
npm start
```

---

## 📸 Pages Overview

| Page               | Route                          | Description                        |
| ------------------ | ------------------------------ | ---------------------------------- |
| 🏠 Home            | `/`                            | Hero section + platform highlights |
| 📰 Articles        | `/articles?pageNumber=1`       | Paginated list of all articles     |
| 🔍 Search          | `/articles/search?searchText=` | Search results for articles        |
| 📖 Article Detail  | `/articles/:id`                | Full article with comments section |
| ℹ️ About           | `/about`                       | About the platform                 |
| 🔐 Login           | `/login`                       | User login form                    |
| 📝 Register        | `/register`                    | User registration form             |
| 🛡️ Admin Dashboard | `/admin`                       | Add new articles (admin only)      |
| 📋 Articles Table  | `/admin/articles-table`        | Manage all articles (admin only)   |
| 💬 Comments Table  | `/admin/comments-table`        | Manage all comments (admin only)   |

---

## 📜 Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm start`     | Start production server  |
| `npm run lint`  | Run ESLint               |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ using Next.js & TypeScript**

⭐ Star this repo if you find it helpful!

</div>
