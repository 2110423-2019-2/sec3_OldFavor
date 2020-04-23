FROM node:carbon
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g serve
RUN npm install -g create-react-app
# Copy app source code
COPY . .
RUN npm run build
#Expose port and start application
EXPOSE 5000
CMD [ "serve", "-s", "build" ]
