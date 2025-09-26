# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first to leverage cache
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/Model ./Model
COPY --from=builder /app/Controller ./Controller
COPY --from=builder /app/Configuration ./Configuration
COPY --from=builder /app/Route ./Route
COPY --from=builder /app/Util ./Util
COPY --from=builder /app/Mail ./Mail
COPY --from=builder /app/Middleware ./Middleware
COPY --from=builder /app/Index.js ./

# Add non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 4000
CMD ["node", "Index.js"]