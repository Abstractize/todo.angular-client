# 📝 TodoApp Frontend (Angular)

This is the frontend for the **TodoApp** project, built with [Angular 19](https://angular.io/). It connects to a backend API through a YARP Gateway and handles user authentication, task management, and more.

---

## 🚀 Tech Stack

- **Angular 19**
- **Bootstrap 5 + Bootstrap Icons**
- **RxJS**
- **SCSS**
- **JWT Authentication**
- **YARP Gateway Integration**

---

## 📁 Project Structure

```bash
src/
├── app/
│   ├── admin/         # Admin-specific UI
│   ├── auth/          # Login, register, auth services
│   ├── client/        # Core user features like todo lists
│   ├── core/          # Global services, guards, resolvers
│   ├── interceptors/  # HTTP interceptors (e.g., auth)
│   ├── public/        # Public-facing modules
│   └── shared/        # Shared components, pipes, models
├── main.ts
└── styles.scss
```

---

## 📦 Setup

### ✅ Prerequisites

- [Node.js 18+](https://nodejs.org/)
- [Angular CLI 19+](https://angular.io/cli)

---

### 📥 Installation

```bash
npm install
```

---

### ▶️ Development Server

```bash
npm start
```

- Runs on: `http://localhost:4200`
- Make sure your YARP API Gateway is running on `http://localhost:8000` or adjust `environment.ts` accordingly.

---

## 🔐 Authentication

- Login/Register handled via Auth microservice
- JWT stored in `localStorage`
- AuthInterceptor injects access token into HTTP requests
- Refresh token logic managed automatically in the backend

---

## 🧪 Testing

```bash
npm test
```

- Uses Karma and Jasmine

---

## 🛠️ Build for Production

```bash
npm run build
```

- Output in: `dist/todo.angular-client/`

---

## 📜 License

[MIT](./LICENSE)

---

## 🤝 Contributing

Pull requests welcome. For major changes, please open an issue first to discuss.