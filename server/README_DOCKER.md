# Docker Setup for Backend

## Quick Start

### Option 1: Using Docker Compose (Recommended)

1. **Build and run:**
   ```bash
   docker-compose up -d
   ```

2. **View logs:**
   ```bash
   docker-compose logs -f backend
   ```

3. **Stop:**
   ```bash
   docker-compose down
   ```

### Option 2: Using Docker directly

1. **Build the image:**
   ```bash
   docker build -f server/Dockerfile -t rl-media-backend .
   ```

2. **Run the container:**
   ```bash
   docker run -d \
     --name rl-media-backend \
     -p 3001:3001 \
     -v $(pwd)/server/password.json:/app/server/password.json \
     rl-media-backend
   ```

3. **View logs:**
   ```bash
   docker logs -f rl-media-backend
   ```

4. **Stop and remove:**
   ```bash
   docker stop rl-media-backend
   docker rm rl-media-backend
   ```

## Important Notes

- The password file (`password.json`) is mounted as a volume, so password changes persist across container restarts
- The backend will be available at `http://localhost:3001`
- Make sure to update your frontend's `VITE_API_URL` to point to the backend URL

## Environment Variables

You can set environment variables in `docker-compose.yml` or when running with `docker run`:

```bash
docker run -d \
  --name rl-media-backend \
  -p 3001:3001 \
  -e PORT=3001 \
  -v $(pwd)/server/password.json:/app/server/password.json \
  rl-media-backend
```

## Production Deployment

For production, you may want to:
1. Use environment variables for sensitive data
2. Set up proper networking between containers
3. Use a reverse proxy (nginx) in front
4. Set up SSL/TLS certificates

