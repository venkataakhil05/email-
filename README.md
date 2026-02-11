# CMS API (MERN)

A Content Management System API built with the MERN stack.

## Prerequisites
- **Node.js**: [Download](https://nodejs.org/)
- **MongoDB**: [Download](https://www.mongodb.com/try/download/community)

## Installation
1.  **Install dependencies**:
    ```bash
    npm install
    ```

## Configuration
Ensure `.env` has:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/user_management
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
JWT_SECRET=your_jwt_secret
```

## Running the Server
```bash
npm start
```
Server runs on: `http://localhost:5000`

## API Endpoints

### root
- `GET /` -> Returns "CMS API Running"

### Authentication (`/api/auth`)
1.  **Send OTP**: `POST /api/auth/send-otp`
    - Body: `{ "email": "user@example.com" }`
2.  **Verify OTP**: `POST /api/auth/verify-otp`
    - Body: `{ "email": "user@example.com", "otp": "123456" }`
3.  **Signup**: `POST /api/auth/signup`
    - Body: `{ "email": "user@example.com", "password": "securepassword" }`
4.  **Login**: `POST /api/auth/login`
    - Body: `{ "email": "user@example.com", "password": "securepassword" }`
    - **Returns**: `{ "data": { "token": "..." } }`

### Artifacts (`/api/artifacts`)
*Requires Header: `Authorization: Bearer <token>`*

1.  **Create Artifact**: `POST /api/artifacts`
    - Body: `{ "title": "My Post", "description": "Content here" }`
2.  **Get Artifacts**: `GET /api/artifacts`

## Automated Test
Run the test script to verify the flow (Edit script with your email first if needed):
```bash
node test_cms.js
```
