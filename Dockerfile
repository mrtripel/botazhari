FROM node:lts-buster

RUN apt-get update -y && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

COPY package.json .

RUN npm install
RUN npm i -g pm2

COPY . .

RUN pm2 start index.js
