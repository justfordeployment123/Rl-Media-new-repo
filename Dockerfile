# Use Node.js LTS version
FROM node:20-alpine

# Install wget for healthcheck
RUN apk add --no-cache wget

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies needed for backend
RUN npm install --production --no-optional express cors

# Copy server files
COPY server/ ./server/

# Create directory for password file persistence
RUN mkdir -p /app/server/data

# Expose the port the app runs on
EXPOSE 3001

# Set environment variable for port
ENV PORT=3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --spider --quiet http://localhost:3001/api/password-status || exit 1

# Run the server
CMD ["node", "server/server.js"]


