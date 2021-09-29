FROM node:lts-buster-slim
WORKDIR /usr/app
COPY . ./
# RUN npm install
CMD node main.js