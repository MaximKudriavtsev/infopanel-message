FROM mhart/alpine-node:8.1.4
ADD . .
RUN npm install 
ENV HOST=0.0.0.0
ENV AUTH_REDIRECT_URL=https://internal.devexpress.com/azure-auth
ENV REDIRECT_CALLBACK_HTTP=http://192.168.98.97:8957
ENV MONGO_CONNECTION_URL=mongodb://mongodb-host:27017/Resolve
ENV MONGO_COLLECTION_NAME=Events
EXPOSE 1000
CMD npm start