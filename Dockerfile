FROM node:18-alpine
WORKDIR /usr/src/node-fit
COPY package.json package-lock.json ./
RUN npm install --only=prod
COPY prisma .
RUN npx prisma generate
COPY ./dist ./dist
EXPOSE 80
CMD npm start:prod