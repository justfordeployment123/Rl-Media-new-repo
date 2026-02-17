# Frontend & Backend Setup Guide

Since the frontend and backend are deployed separately, you need to configure them to work together.

## Backend Configuration

The backend is deployed at: `rlamediagroup.com` (or your backend domain)

**Environment Variables to Set:**
- `PORT` - Server port (default: 3001, but Coolify sets this automatically)
- `HOST` - Server host (default: 0.0.0.0)
- `FRONTEND_URL` - Your frontend domain URL (e.g., `https://www.rlamediagroup.com` or `https://app.rlamediagroup.com`)

**Backend API Endpoints:**
- `POST /api/verify-password` - Verify investor password
- `POST /api/change-password` - Change password (requires current password)
- `GET /api/password-status` - Get password status

## Frontend Configuration

The frontend needs to know where the backend API is located.

**Environment Variable to Set:**
- `VITE_API_URL` - Your backend API URL (e.g., `https://rlamediagroup.com` or `https://api.rlamediagroup.com`)

### How to Set Environment Variables:

**For Vercel:**
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add: `VITE_API_URL` = `https://rlamediagroup.com` (your backend URL)
4. Redeploy

**For Netlify:**
1. Go to Site settings → Build & deploy → Environment
2. Add: `VITE_API_URL` = `https://rlamediagroup.com`
3. Redeploy

**For Other Platforms:**
Set the `VITE_API_URL` environment variable before building/deploying.

### Important Notes:

1. **Build-time Variable**: `VITE_API_URL` is a build-time variable in Vite, so you must:
   - Set it before running `npm run build`
   - Rebuild and redeploy after changing it

2. **CORS**: The backend is configured to allow requests from your frontend domain. Make sure `FRONTEND_URL` is set correctly in the backend.

3. **HTTPS**: If your frontend uses HTTPS, make sure your backend also uses HTTPS or configure CORS properly.

## Testing the Connection

After deployment:

1. **Check Backend**: Visit `https://rlamediagroup.com/api/password-status` - should return JSON
2. **Check Frontend**: Visit your frontend URL and try accessing `/password-admin`
3. **Check Browser Console**: Open DevTools → Console to see if there are CORS or connection errors

## Troubleshooting

**Error: "Cannot GET /password-admin"**
- This means you're accessing the backend URL directly
- Access the frontend URL instead (where your React app is deployed)

**Error: "Failed to fetch" or CORS errors**
- Check that `FRONTEND_URL` is set correctly in backend
- Check that `VITE_API_URL` is set correctly in frontend
- Verify both are using HTTPS (or both HTTP in development)

**Error: "Network error"**
- Verify the backend is running and accessible
- Check that the backend URL in `VITE_API_URL` is correct
- Test the backend API directly: `curl https://rlamediagroup.com/api/password-status`

