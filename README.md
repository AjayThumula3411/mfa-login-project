# 📦 MFA Login System (TypeScript + Docker)

A full-stack authentication system with Multi-Factor Authentication (OTP) built using Node.js, TypeScript, PostgreSQL, and Docker.

---

##  Features

*  User Registration & Login
*  Password Hashing using bcrypt
*  OTP-based Multi-Factor Authentication (MFA)
*  PostgreSQL Database Integration
*  Dockerized Database Setup
*  Simple frontend + backend integration

---

## 🏗️ Project Structure

```
mfs-login-project/
│
├── backend/
│   ├── src/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── index.html
│   ├── app.ts
│   └── app.js
│
├── docker-compose.yml
└── README.md
```

---

##  Prerequisites

Make sure you have installed:

* Node.js
* Docker
* Docker Compose

---

##  Docker Setup

###  Start Database

```
docker-compose up -d
```

This will:

* Start PostgreSQL container
* Create database automatically
* Configure user and password

---

###  Stop Database

```
docker-compose down
```

---

##  Services

###  PostgreSQL Database

* Port: 5432
* Database: testdb
* User: user
* Password: pass
* Runs inside Docker container

---

###  Backend (Node.js + TypeScript)

* URL: http://localhost:5000
* Handles authentication & OTP logic

Run backend:

```
cd backend
npm install
npx ts-node src/server.ts
```

---

###  Frontend

* URL: http://127.0.0.1:5500/frontend/index.html
* Simple HTML + TypeScript UI
* Uses fetch API to call backend

---

##  Running the Project

### Step 1: Start Database

```
docker-compose up -d
```

### Step 2: Start Backend

```
cd backend
npm install
npx ts-node src/server.ts
```

### Step 3: Open Frontend

Open in browser:

```
http://127.0.0.1:5500/frontend/index.html
```

---

##  Application Flow

###  Authentication Flow

### 1. Register

* User enters email & password
* Password is hashed using bcrypt
* Data stored in PostgreSQL

### 2. Login

* Backend verifies credentials

### 3. OTP Generation

* OTP is generated randomly
* Stored in database
* Displayed in backend console

### 4. OTP Verification

* User enters OTP
* Backend verifies OTP
* Login success

---

##  Flow Overview

```
Frontend → Backend → PostgreSQL
          ↓
        OTP Generated
          ↓
     OTP Verification
          ↓
     Login Success
```

---

##  Development Notes

* Backend uses Express with TypeScript
* Database connected using pg library
* Passwords are securely hashed using bcrypt
* OTP is stored temporarily for verification
* Docker ensures consistent database setup

---

##  Tech Stack

### Backend:

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* bcrypt

### Frontend:

* HTML
* TypeScript (compiled to JavaScript)

### Database:

* PostgreSQL (Relational Database)
* Stores email, hashed password, and OTP
* Runs inside Docker

### DevOps:

* Docker
* Docker Compose

---

## Author

Ajay Thumula
