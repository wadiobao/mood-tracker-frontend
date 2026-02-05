# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Production stage - using busybox httpd for a tiny, nginx-free static server
FROM busybox:1.36

WORKDIR /app

# Copy the static files from the builder stage
COPY --from=builder /app/dist .

# Serve the files on port 80 using busybox httpd
# -p 80: listen on port 80
# -h /app: document root
# -f: ran in foreground
CMD ["httpd", "-f", "-p", "80", "-h", "/app"]
