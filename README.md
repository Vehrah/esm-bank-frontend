# 🏦 ESM Bank

ESM Bank is a modern full-stack digital banking application built with the MERN stack. It provides secure user authentication, account management, money transfers, transaction history, and a comprehensive admin dashboard for monitoring users, accounts, analytics, reports, and banking activities.

---

## ✨ Features

### 👤 User Features

- Secure User Registration & Login
- JWT Authentication
- Email Verification
- Forgot & Reset Password
- Dashboard Overview
- Account Details
- Deposit Funds
- Withdraw Funds
- Transfer Money
- Account Name Enquiry
- Transaction History
- Dark & Light Mode

### 👨‍💼 Admin Features

- Admin Authentication
- Dashboard Overview
- User Management
- Account Management
- Transaction Management
- Banking Analytics
- Reports
- Audit Logs
- Settings Page
- Real-time Statistics

---

## 🔒 Security

ESM Bank implements several security measures:

- JWT Authentication
- Password Hashing using bcrypt
- Protected API Routes
- Role-based Authorization (User & Admin)
- User Data Isolation
- Email Verification
- Secure Password Reset Tokens

Each user can only access:

- Their own account
- Their own balance
- Their own transaction history

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hot Toast
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Nodemailer
- Axios

---

## 📁 Project Structure

```text
esm-bank/

├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Vehrah/esme-bank.git
cd esme-bank
```

### Backend

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email

EMAIL_PASS=your_email_password

API_KEY=your_api_key

API_SECRET=your_api_secret
```

Start the backend:

```bash
npm run dev
```

---

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 📡 API Endpoints

### Authentication

- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/admin/login`
- GET `/api/auth/verify-email/:token`
- POST `/api/auth/forgot-password`
- POST `/api/auth/reset-password/:token`

---

### Account

- GET `/api/account`
- POST `/api/account/create`

---

### Transactions

- POST `/api/transaction/deposit`
- POST `/api/transaction/withdraw`
- POST `/api/transaction/transfer`
- GET `/api/transaction/history`
- GET `/api/transaction/name-enquiry/:accountNumber`

---

### Admin

- GET `/api/admin/dashboard`
- GET `/api/admin/users`
- GET `/api/admin/accounts`
- GET `/api/admin/transactions`
- GET `/api/admin/analytics`
- GET `/api/admin/reports`
- GET `/api/admin/logs`

---

## 🚀 Core Banking Features

- User Registration
- Secure Authentication
- Email Verification
- Deposit Funds
- Withdraw Funds
- Money Transfer
- Account Number Generation
- Transaction History
- Account Name Enquiry
- Admin Monitoring
- Reports & Analytics

---

## 💻 Responsive Design

The application is optimized for:

- 📱 Mobile Devices
- 📲 Tablets
- 💻 Laptops
- 🖥 Desktop Screens

---

## 🧪 Testing

The application can be tested using:

- Postman
- Thunder Client
- Browser Interface

---

## 📌 Notes

- MongoDB Atlas is used for data storage.
- JWT secures protected routes.
- Passwords are encrypted using bcrypt.
- Email verification is required before login.
- The application supports both Light and Dark Mode.

---

## 👨‍💻 Author

**Esme Vera**

- GitHub: https://github.com/Vehrah

---

## 📄 License

This project is licensed under the MIT License.