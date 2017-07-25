FROM mhart/alpine-node:8.1.4
ADD . .
RUN npm install && npm install -g next && npm run build
ENV HOST=127.0.0.1
# ENV NODE_ENV=production
ENV AUTH_REDIRECT_URL=https://internal.devexpress.com/azure-auth
# ENV STORAGE_MODE=mongo
# ENV STORAGE_TIMEOUT=20000
ENV MONGO_CONNECTION_URL=mongodb://mongodb-host:27017/Resolve
ENV MONGO_COLLECTION_NAME=Events
EXPOSE 1000
# EXPOSE 27017
CMD npm start