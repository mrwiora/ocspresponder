FROM node:lts-buster-slim
WORKDIR /usr/app
COPY . ./
RUN apt update -y && apt upgrade -y && apt install git -y && apt clean all
RUN npm install --production
RUN apt remove git -y && apt autoremove -y
CMD node main.js
