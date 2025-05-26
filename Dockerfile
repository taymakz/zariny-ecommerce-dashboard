# Stage 1: Build the app
FROM node:18-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy files and install dependencies
COPY . .
RUN pnpm install --frozen-lockfile

# Build the Nuxt app
RUN pnpm build

# Stage 2: Serve the app
FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy only the necessary files from builder
COPY --from=builder /app/.output .output
COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-lock.yaml .

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", ".output/server/index.mjs"]
