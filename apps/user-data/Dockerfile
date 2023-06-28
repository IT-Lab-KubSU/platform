# syntax=docker/dockerfile:1
FROM node:18

WORKDIR /app

COPY --chown=node:node . .

RUN rm -f *.env *.env.*

RUN apt-get update -y && apt-get install -y dumb-init

RUN npm install

ENV NODE_ENV=production

RUN npm run prefullbuild && npm run prebuild && npm run build

RUN mkdir temp temp/.prisma temp/@prisma temp/prisma && cp -r ./node_modules/.prisma/* ./temp/.prisma/ && cp -r ./node_modules/@prisma/* ./temp/@prisma/ && cp -r  ./node_modules/prisma/* ./temp/prisma/

RUN rm -rdf node_modules

RUN npm install --production

RUN cp -r ./temp/* ./node_modules/ && rm -rdf temp

RUN ls | grep -v node_modules | grep -v dist | xargs rm -rfv

RUN cp -r ./dist/* ./ && rm -rdf dist

USER node

CMD ["dumb-init", "node", "./main.js"]
