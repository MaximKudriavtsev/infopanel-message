module.exports = {
  REDIRECT_HTTP: process.env.AUTH_REDIRECT_URL || 'https://internal.devexpress.com/azure-auth',
  IP: process.env.HOST || '127.0.0.1',
  LOCAL_MONGO: process.env.MONGO_CONNECTION_URL || 'mongodb://mongodb-host:27017/Resolve',
  USERS_COLLECTION: process.env.MONGO_COLLECTION_NAME || 'Events',
  APPLICATION_NAME: 'infopanel-message'
}