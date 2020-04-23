FROM node:carbon
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm install
RUN npm install pm2 -g
# Copy app source code
COPY . .
RUN npm run build
#Expose port and start application
EXPOSE 19888
CMD [ "pm2-runtime", "dist/index.js" ]
