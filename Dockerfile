# Stage 1: Builder
FROM node:22-alpine AS builder

WORKDIR /opt/app

# Copy package.json and package-lock.json before installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci --verbose

# Copy application files
COPY . .

# Stage 2: Runner (Smaller Final Image)
FROM node:22-alpine AS runner

WORKDIR /opt/app

# Copy dependencies and source code from builder
COPY --from=builder /opt/app/node_modules ./node_modules
COPY --from=builder /opt/app ./


# Set the entry point
CMD ["node", "index.js"]
