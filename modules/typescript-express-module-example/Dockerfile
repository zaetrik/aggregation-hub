FROM node:10.16.0-alpine

ARG PORT

RUN addgroup -S dockeruser && adduser -S -g dockeruser dockeruser

ENV HOME=/home/dockeruser

COPY package.json package-lock.json $HOME/app/

COPY dist/ $HOME/app/dist

ADD https://github.com/Yelp/dumb-init/releases/download/v1.1.1/dumb-init_1.1.1_amd64 /usr/local/bin/dumb-init

WORKDIR $HOME/app

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait

RUN chown -R dockeruser:dockeruser $HOME/* /usr/local/ && \
    chmod +x /usr/local/bin/dumb-init && \
    npm install --silent --progress=false && \
    chown -R dockeruser:dockeruser $HOME/* && \
    chmod +x /wait

USER dockeruser

EXPOSE $PORT

CMD /wait && dumb-init npm start
