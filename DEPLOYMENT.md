# Deployment Configuration

## For Railway/Coolify Deployment

The platform is configured to deploy **backend only**. Make sure to:

1. **Set Build Context**: Point to `server/` directory
2. **Set Dockerfile Path**: Use `server/Dockerfile`
3. **Disable Auto-detection**: If using Railway, disable Nixpacks and use Dockerfile instead

## Configuration Files Created

- `railway.json` - Railway-specific configuration (if using Railway)
- `nixpacks.toml` - Nixpacks configuration (if using Nixpacks)
- `server/Dockerfile` - Backend Dockerfile

## Important Notes

- The backend runs on port 3001 (or PORT env var)
- Password file is stored in `server/password.json`
- Make sure the deployment platform is set to use Dockerfile build method, not auto-detection

## Environment Variables

Set these in your deployment platform:
- `PORT` - Server port (default: 3001)
- `HOST` - Server host (default: 0.0.0.0)

