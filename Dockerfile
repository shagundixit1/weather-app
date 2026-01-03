# here we have to describe each and every line which we have to put as a command in terminal

# Base image
# you can also start from scratch as goes from installing ubuntu dependencies to then giving commands of node installation or directly start with node as base
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy backend dependency files
# you can also do COPY ..
COPY . .
# COPY backend/package*.json ./backend/

# Install backend dependencies
RUN cd backend && npm install --production

# for react guys you need to put multiple lines like 
# RUN npm run build
# RUN npx prisma generate

# Copy backend source code
COPY backend ./backend

# Expose backend port
EXPOSE 5000


# All ABOVE LINES RUN FOR CREATING A IMAGE 

# AFTER THIS LINES RUNS FOR RUNNING THAT CONTAINER OR IMAGE or when you start the image
# Start backend server
CMD ["node", "backend/server.js"]
