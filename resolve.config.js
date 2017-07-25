//const fileDriver = require('resolve-storage-file');
const mongoDriver = require('resolve-storage-mongo');
const busDriver = require('resolve-bus-memory');
const aggregates = require('./src/common/aggregates').default;
const events = require('./src/common/aggregates/record-events').default;
const queries = require('./src/common/read-models').default;
const config = require('./config.js');
//console.log(fileDriver());

module.exports = {
  bus: { driver: busDriver },
  storage: {
    driver: mongoDriver,
    params: { url: config.LOCAL_MONGO, collection: config.USERS_COLLECTION }
  },

  aggregates,
  events,
  queries
}