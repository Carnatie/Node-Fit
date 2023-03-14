FROM node:18-alpine
ENV JWT_SECRET=MNDAPOO2IMDA02NNFA
ENV DATABASE_URL=mysql://root:Root@localhost:3306/nodefit
WORKDIR /usr/src/node-fit
COPY package.json package-lock.json ./
RUN npm install --only=prod
COPY prisma .
RUN npx prisma generate
COPY ./dist ./dist
EXPOSE 80
CMD npm run start:prod