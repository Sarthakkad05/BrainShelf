# Build Stage 

FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and tsconfig
COPY package*.json tsconfig*.json ./

# Install all deps
RUN npm install

# Copy source code
COPY src ./src

# Build TypeScript → dist/
RUN npm run build

# Production Stage

FROM node:20-alpine 

WORKDIR /app

# Copy only package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm install --production

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["npm", "start"]



