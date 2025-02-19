# Stage 1: Builder
FROM node:22-alpine AS builder

WORKDIR /opt/app

# Copy package.json and package-lock.json before installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci --verbose

# Copy application files
COPY . .

# Build the application (if applicable)
RUN npm run build

# Stage 2: Runner (Smaller Final Image)
FROM node:22-alpine AS runner

WORKDIR /opt/app

# Copy built app and dependencies from builder
COPY --from=builder /opt/app/node_modules ./node_modules
COPY --from=builder /opt/app ./

# Set the entry point
CMD ["node", "./dist/index.js"]
