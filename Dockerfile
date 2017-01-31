FROM node:7.4.0
MAINTAINER David Inga <david.inga@vizzuality.com>

ENV NAME resourcewatch-app
ENV NODE_ENV production

# Install dependencies
RUN apt-get update && \
    apt-get install -y bash git python build-essential

RUN npm install --silent -g pm2

# Create app directory
RUN mkdir -p /usr/src/$NAME
WORKDIR /usr/src/$NAME

COPY . /usr/src/$NAME

# Install app dependencies
COPY package.json /usr/src/$NAME/
RUN npm install --silent --dev

# Generate statics files
ENV NODE_ENV production
RUN npm run build

EXPOSE 3000
CMD pm2 start --no-daemon processes.json
