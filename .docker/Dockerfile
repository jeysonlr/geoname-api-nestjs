FROM node:14.4-slim

RUN apt-get update && apt-get install -y git python-minimal make gcc g++
RUN rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html
COPY . /var/www/html

RUN yarn
EXPOSE 7001

CMD bash -c "yarn run start:dev"
