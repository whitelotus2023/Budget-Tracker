# Budget Tracker
A Budget Tracker web application that helps users manage their finances by tracking income and expenses, categorizing transactions, and viewing simple reports. Built as a hands-on learning project to demonstrate React, Node.js/Express, PostgreSQL, and JWT authentication.

## 🚀 Features
- User Authentication: Register and login with JWT authentication

- Dashboard: View current balance and recent transactions

- Transactions Management: Add, edit, and delete income/expenses

- Category Management: Organize transactions by category (food, rent, salary, etc.)

- Reports: See summaries for the last 30 days and totals per category

- Responsive UI: Built with Tailwind CSS

## 📂 Project Structure
```
/ (root)
├── client/        # React frontend (Vite + Tailwind)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Pages (Login, Dashboard, Reports)
│   │   ├── services/    # API requests & auth logic
│   │   └── styles/      # Tailwind config & global CSS
│   └── vite.config.js
├── server/        # Node.js + Express backend
│   ├── controllers/    # Route handlers
│   ├── routes/         # Express routes
│   ├── middleware/     # Auth, error handling, etc.
│   ├── db/             # PostgreSQL connection / migrations
│   └── index.js        # Entry point
└── README.md
```

## 🛠️ Tech Stack
- Frontend: React, Tailwind CSS, Vite

- Backend: Node.js, Express.js

- Database: PostgreSQL

- Authentication: JWT (access + refresh tokens)

- API: RESTful endpoints

## ⚙️ Installation & Setup
### 1. Clone the repository
``` git clone https://github.com/<your-username>/budget-tracker.git
cd budget-tracker1
```
### 2. Install backend dependencies
``` 
cd server
npm install 
```
### 3. Install frontend dependencies
```
cd ../client
npm install
```
### 4. Setup environment variables
Create .env files in both server and client folders (example for backend):
```
PORT=4000
DATABASE_URL=postgres://user:password@localhost:5432/budget_db
ACCESS_TOKEN_SECRET=<your_access_token_secret>
REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
```
### 5. Run the backend
```
cd server
npm run dev   # with nodemon
```
### 6. Run the frontend
```
cd client
npm run dev
```
### 7. Open your browser
```
http://localhost:5173
```

## 📈 Usage

- Register a new user

- Add income or expense transactions

- Assign transactions to categories

- View your balance and reports

## 📄 License
MIT License
Copyright (c) 2025 Whitelotus2023
Permission is hereby granted, free of charge, to any person obtaining a copy.