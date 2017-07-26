FROM mhart/alpine-node:8.1.4
ADD . .
RUN npm install 
ENV HOST=0.0.0.0
ENV AUTH_REDIRECT_URL=https://internal.devexpress.com/azure-auth
ENV REDIRECT_CALLBACK_HTTP=https://internal.devexpress.com/azure-auth
ENV MONGO_CONNECTION_URL=mongodb://mongodb-host:27017/Resolve
ENV MONGO_COLLECTION_NAME=Events
EXPOSE 1000
CMD npm start