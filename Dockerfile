FROM mhart/alpine-node:8.1.4
ADD . .
RUN npm install 
ENV HOST=0.0.0.0
ENV AUTH_REDIRECT_URL=https://internal.devexpress.com/azure-auth
ENV AUTH_REDIRECT_CALLBACK_URL=https://internal.devexpress.com
ENV MONGO_CONNECTION_URL=mongodb://mongodb-reactive-prod:27017/Resolve
ENV MONGO_COLLECTION_NAME=Events
EXPOSE 1000
CMD npm start