FROM node:latest
RUN mkdir -p /home/app
EXPOSE 1802
WORKDIR /home/app
COPY ./package.json /home/app/package.json
RUN npm install
COPY . /home/app
CMD [ "npm", "start" ]