# Use Node.js LTS version
FROM node:20-alpine

# Install wget for healthcheck
RUN apk add --no-cache wget

# Set working directory
WORKDIR /app

# Copy package.json and server files (when build context is server/)
COPY package.json ./
COPY server.js ./
COPY password.json ./password.json

# Install only production dependencies needed for backend
RUN npm install --production --no-optional

# Create healthcheck script that checks port 5000 (Coolify default) or 3001
RUN echo '#!/bin/sh' > /app/healthcheck.sh && \
    echo 'wget --spider --quiet http://localhost:5000/api/password-status 2>/dev/null || wget --spider --quiet http://localhost:3001/api/password-status 2>/dev/null' >> /app/healthcheck.sh && \
    chmod +x /app/healthcheck.sh

# Create directory for password file persistence
RUN mkdir -p /app/data

# Expose the port the app runs on (default 3001, but can be overridden)
EXPOSE 3001 5000

# Set default environment variables
ENV PORT=3001
ENV HOST=0.0.0.0

# Health check (checks port 5000 first, then 3001)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD /app/healthcheck.sh

# Run the server
CMD ["node", "server.js"]

