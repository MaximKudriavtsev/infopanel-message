module.exports = {
  REDIRECT_HTTP: process.env.AUTH_REDIRECT_URL || 'https://internal.devexpress.com/azure-auth',
  IP: process.env.HOST || '127.0.0.1',
  LOCAL_MONGO: 'mongodb://127.0.0.1:27017/Resolve',
  USERS_COLLECTION: 'Events',
  APPLICATION_NAME: 'infopanel-message'
}