FROM node:14
WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
EXPOSE 4000
RUN yarn install --production
CMD ["node", "server.js"]