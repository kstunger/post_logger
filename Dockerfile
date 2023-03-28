FROM node:19

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g pm2
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5007

# Start the Node.js process using pm2
CMD ["pm2-runtime", "server.js", "--name", "my-app", "--cron-restart", "0 6 * * *"]
