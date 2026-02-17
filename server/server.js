import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Path to password file
const PASSWORD_FILE = path.join(__dirname, 'password.json');

// Initialize password file if it doesn't exist
if (!fs.existsSync(PASSWORD_FILE)) {
  fs.writeFileSync(PASSWORD_FILE, JSON.stringify({ password: 'investor' }, null, 2));
}

// Helper function to read password
const getPassword = () => {
  try {
    const data = fs.readFileSync(PASSWORD_FILE, 'utf8');
    return JSON.parse(data).password;
  } catch (error) {
    console.error('Error reading password file:', error);
    return 'investor'; // Default fallback
  }
};

// Helper function to save password
const savePassword = (newPassword) => {
  try {
    fs.writeFileSync(PASSWORD_FILE, JSON.stringify({ password: newPassword }, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving password file:', error);
    return false;
  }
};

// Verify password endpoint
app.post('/api/verify-password', (req, res) => {
  const { password } = req.body;
  const correctPassword = getPassword();
  
  if (password === correctPassword) {
    res.json({ success: true, message: 'Password correct' });
  } else {
    res.status(401).json({ success: false, message: 'Incorrect password' });
  }
});

// Change password endpoint
app.post('/api/change-password', (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  if (!newPassword || newPassword.trim().length === 0) {
    return res.status(400).json({ success: false, message: 'New password cannot be empty' });
  }
  
  // Verify current password first
  const correctPassword = getPassword();
  if (currentPassword !== correctPassword) {
    return res.status(401).json({ success: false, message: 'Current password is incorrect' });
  }
  
  // Save new password
  if (savePassword(newPassword)) {
    res.json({ success: true, message: 'Password changed successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to save password' });
  }
});

// Get current password status (for admin page)
app.get('/api/password-status', (req, res) => {
  const password = getPassword();
  res.json({ 
    success: true, 
    hasPassword: !!password,
    passwordLength: password ? password.length : 0
  });
});

const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

