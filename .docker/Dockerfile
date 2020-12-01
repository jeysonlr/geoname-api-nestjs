FROM node:14.4-slim
RUN apt-get update && apt-get install -y git python-minimal make gcc g++
# RUN apt-get install postgresql
RUN rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html
COPY . /var/www/html

RUN yarn
EXPOSE 7000

CMD bash -c "yarn start"
