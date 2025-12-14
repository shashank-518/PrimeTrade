# 📝 Task Manager Application

A **full-stack Task Manager application** built using **React (Vite) + Tailwind CSS** on the frontend and **Node.js, Express, MongoDB, JWT authentication** on the backend. This app allows users to securely manage their daily tasks with authentication, authorization, and task status tracking.

---

## 🚀 Features

### 🔐 Authentication

* User **Signup & Login**
* **JWT-based authentication**
* Protected routes using middleware
* Logout functionality

### ✅ Task Management

* Create new tasks
* Update task title
* Mark task as **Completed / Pending**
* Delete tasks
* View only **logged-in user’s tasks**

### 🎨 UI / UX

* Sidebar-based dashboard layout
* Clean & responsive UI using **Tailwind CSS**
* Empty-state UI when no tasks exist
* Visual task status indicators

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Router DOM
* Fetch API

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (Access Token)
* bcrypt.js

---

## 📂 Project Structure

```bash
Frontend/
 ├─ src/
 │  ├─ components/
 │  │  ├─ Sidebar.jsx
 │  │  ├─ ProtectedRoute.jsx
 │  │  ├─ AuthRedirect.jsx
 │  ├─ pages/
 │  │  ├─ Login.jsx
 │  │  ├─ Signup.jsx
 │  │  ├─ Dashboard.jsx
 │  │  ├─ Tasks.jsx
 │  ├─ App.jsx
 │  └─ main.jsx
```

---

## 📸 Screenshots

### 🔐 Signup Page

![Login Page](https://res.cloudinary.com/dgifxppyp/image/upload/v1765742884/Screenshot_2025-12-15_013706_lgh0h0.png)

### 📝 Tasks Dashboard

![Tasks Dashboard](https://res.cloudinary.com/dgifxppyp/image/upload/v1765743097/Screenshot_2025-12-15_013549_fwc7dr.png)

### ✏️ Update & Complete Task

![Update Task](https://res.cloudinary.com/dgifxppyp/image/upload/v1765742929/Screenshot_2025-12-15_013651_j5etg6.png)

> 

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <your-github-repo-url>
cd task-manager
```

### 2️⃣ Backend Setup

```bash
cd Backend
npm install
npm run dev
```

Create `.env` file:

```env
PORT=4000
MONGODB_URI=your_mongodb_uri
JWT_ACCESS_SECRET=your_secret
```

---

### 3️⃣ Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:4000
```

---

## 🔐 API Endpoints

| Method | Endpoint              | Description    |
| ------ | --------------------- | -------------- |
| POST   | /api/auth/register    | Register user  |
| POST   | /api/auth/login       | Login user     |
| GET    | /api/tasks            | Get user tasks |
| POST   | /api/tasks/create     | Create task    |
| PUT    | /api/tasks/update/:id | Update task    |
| DELETE | /api/tasks/:id        | Delete task    |

---

## 🧠 Key Learnings

* JWT authentication & protected routes
* Role of middleware in Express
* Secure API consumption using Fetch API
* Clean UI design with Tailwind CSS
* Full-stack integration

---

## 👨‍💻 Author

**Shashank**
Full-Stack Developer

---

## ⭐ Future Improvements

* Refresh token implementation
* Task filters (All / Completed / Pending)
* Drag & drop task ordering
* Dark mode

---

## 📌 License

This project is for learning and demonstration purposes.
