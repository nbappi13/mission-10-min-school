# Stage 1: Install dependencies and build the Next.js application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock/package-lock.json
COPY package.json yarn.lock* package-lock.json* ./

# Install dependencies
RUN yarn install --frozen-lockfile || npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Next.js application
# Ensure your package.json has a "build" script like "next build"
RUN npm run build

# Stage 2: Run the Next.js application in a production-ready environment
FROM node:20-alpine AS runner

WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV production

# Copy necessary files from the builder stage
# Copy the .next directory (containing the build output)
COPY --from=builder /app/.next ./.next

# Copy public directory
COPY --from=builder /app/public ./public

# Copy package.json (only for running, not for installing dev dependencies)
COPY package.json ./package.json

# Install only production dependencies
RUN npm install --omit=dev

# Expose the port Next.js runs on
EXPOSE 3000

# Command to run the Next.js application
CMD ["npm", "start"]
