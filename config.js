module.exports = {
  REDIRECT_HTTP: process.env.AUTH_REDIRECT_URL,
  IP: process.env.HOST,
  LOCAL_MONGO: process.env.MONGO_CONNECTION_URL,
  USERS_COLLECTION: process.env.MONGO_COLLECTION_NAME,
  APPLICATION_NAME: 'infopanel-message'
}