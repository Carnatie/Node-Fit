FROM node:18-alpine
WORKDIR /usr/src/node-fit
COPY package.json package-lock.json ./
RUN npm ci --only=prod
COPY prisma .
RUN npx prisma generate