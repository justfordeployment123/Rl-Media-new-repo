# Docker Setup (Backend Only)

This repo contains both frontend + backend. **The backend Docker build must use the `server/` folder as the build context**.

## Build & Run (Docker)

From the repo root:

```bash
docker build -t rl-media-backend ./server
docker run -d --name rl-media-backend -p 3001:3001 rl-media-backend
```

## Persist the password file

Mount `server/password.json` into the container so password changes survive restarts:

```bash
docker run -d --name rl-media-backend -p 3001:3001 ^
  -v %cd%\server\password.json:/app/password.json ^
  rl-media-backend
```

Note: inside the container the backend reads `password.json` from the same folder as `server.js`, so the mount target should be `/app/password.json`.

## Coolify settings (important)

- **Build context**: `server/`
- **Dockerfile**: `server/Dockerfile`
- **Port**: use Coolify’s `PORT` env (it will inject it). The server reads `PORT` automatically.

## Frontend connection

In your frontend deploy, set:
- `VITE_API_URL=https://<your-backend-domain>`



