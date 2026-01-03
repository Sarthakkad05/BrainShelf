# Build stage
FROM node:20-alpine AS builder

WORKDIR /app
    
COPY package*.json tsconfig*.json vite.config.ts ./
RUN npm install
    
COPY src ./src
COPY index.html .
RUN npm run build
    
# Production stage
FROM nginx:alpine
    
# Remove default config
RUN rm /etc/nginx/conf.d/default.conf
    
# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
    
# Copy built static files
COPY --from=builder /app/dist /usr/share/nginx/html
    
EXPOSE 80
    
CMD ["nginx", "-g", "daemon off;"]
    