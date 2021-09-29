FROM node:16

ADD app /app
ADD data /data
WORKDIR /app

RUN yarn add -D nodemon ts-node concurrently
RUN yarn install
RUN yarn run tsoa routes
RUN yarn run tsoa swagger
RUN yarn run tsc --outDir build --experimentalDecorators


EXPOSE 3001

CMD ["node", "build/api/server.js"]