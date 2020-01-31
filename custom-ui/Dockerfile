FROM node:10.16.0-alpine

ARG PORT

ARG NODE_ENV

ENV NODE_ENV=$NODE_ENV

RUN addgroup -S dockeruser && adduser -S -g dockeruser dockeruser

ENV HOME=/home/dockeruser

COPY package.json package-lock.json $HOME/app/

COPY / $HOME/app

ADD https://github.com/Yelp/dumb-init/releases/download/v1.1.1/dumb-init_1.1.1_amd64 /usr/local/bin/dumb-init

WORKDIR $HOME/app

RUN chown -R dockeruser:dockeruser $HOME/* /usr/local/ && \
    chmod +x /usr/local/bin/dumb-init && \
    npm install && \
    npm run build && \
    chown -R dockeruser:dockeruser $HOME/*

USER dockeruser

EXPOSE $PORT

CMD dumb-init node server.js
