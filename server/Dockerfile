# Use Node.js LTS version
FROM node:20-alpine

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
  CMD node -e "require('http').get('http://localhost:3001/api/password-status', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Run the server
CMD ["node", "server/server.js"]

