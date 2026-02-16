# Password Management Setup

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start both frontend and backend:**
   ```bash
   npm run dev:full
   ```
   
   Or run them separately:
   - Backend: `npm run server` (runs on http://localhost:3001)
   - Frontend: `npm run dev` (runs on http://localhost:5173)

## Changing the Password

### Option 1: Using the Admin Page (Easiest - No Technical Knowledge Required)

1. Make sure the server is running
2. Navigate to: `http://localhost:5173/password-admin`
3. Enter:
   - Current password
   - New password
   - Confirm new password
4. Click "Change Password"

### Option 2: Manual Edit (For Technical Users)

1. Open the file: `server/password.json`
2. Change the `password` value:
   ```json
   {
     "password": "your-new-password"
   }
   ```
3. Save the file
4. The server will automatically use the new password (no restart needed)

## Important Notes

- The password is stored in `server/password.json`
- The admin page requires the current password to change it (security measure)
- The server must be running for the password verification to work
- Default password is: `investor`

## Production Deployment

For production, set the `VITE_API_URL` environment variable to your backend URL:
```bash
VITE_API_URL=https://your-backend-url.com npm run build
```

