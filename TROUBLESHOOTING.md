# Troubleshooting Guide

## Module Type Warning (Fixed)

The warning about module type has been fixed by creating a proper `package.json` file in the server directory with `"type": "module"`.

## Frontend Not Connecting to Backend

### Step 1: Check Browser Console

Open your browser's Developer Tools (F12) and check the Console tab. You should see:
- `Backend API URL: [your-backend-url]`
- Any error messages about failed fetch requests

### Step 2: Verify Environment Variable

**In your frontend deployment platform**, make sure you have set:
```
VITE_API_URL=https://rlamediagroup.com
```
(Replace with your actual backend URL)

**Important:** 
- This is a **build-time** variable in Vite
- You must **rebuild and redeploy** the frontend after setting it
- The variable name must start with `VITE_` to be accessible in the frontend

### Step 3: Test Backend API Directly

Test if your backend is accessible:
```bash
curl https://rlamediagroup.com/api/password-status
```

Or open in browser:
```
https://rlamediagroup.com/api/password-status
```

You should see JSON response like:
```json
{"success":true,"hasPassword":true,"passwordLength":8}
```

### Step 4: Check CORS

If you see CORS errors in the browser console:
1. Make sure your backend has `FRONTEND_URL` environment variable set to your frontend domain
2. Or temporarily allow all origins (already configured as fallback)

### Step 5: Common Issues

**Issue: "Failed to fetch"**
- Backend might be down
- Wrong API URL in `VITE_API_URL`
- Network/firewall blocking requests

**Issue: "CORS policy" error**
- Set `FRONTEND_URL` environment variable in backend to your frontend domain
- Make sure both frontend and backend use HTTPS (or both HTTP in dev)

**Issue: "404 Not Found"**
- Check that the API endpoint path is correct: `/api/password-status`
- Verify backend is running and accessible

**Issue: API URL shows "http://localhost:3001"**
- `VITE_API_URL` environment variable is not set in frontend deployment
- Frontend was built without the variable, so it's using the default

### Step 6: Verify Frontend Build

After setting `VITE_API_URL` and rebuilding:
1. Check the built files (in `dist/` folder)
2. Search for your backend URL in the built JavaScript files
3. If you see `localhost:3001`, the environment variable wasn't set during build

## Quick Debug Checklist

- [ ] Backend is running and accessible
- [ ] `VITE_API_URL` is set in frontend deployment platform
- [ ] Frontend was rebuilt after setting `VITE_API_URL`
- [ ] Frontend is deployed and accessible
- [ ] Browser console shows correct API URL (not localhost)
- [ ] No CORS errors in browser console
- [ ] Backend API endpoints return JSON responses

## Still Not Working?

1. Check browser console for specific error messages
2. Check network tab in DevTools to see the actual request/response
3. Verify backend logs for incoming requests
4. Test backend API directly with curl or Postman
5. Verify both frontend and backend URLs are correct

