//const fileDriver = require('resolve-storage-file');
const mongoDriver = require('resolve-storage-mongo');
const busDriver = require('resolve-bus-memory');
const aggregates = require('./src/common/aggregates').default;
const events = require('./src/common/aggregates/record-events').default;
const queries = require('./src/common/read-models').default;
//console.log(fileDriver());

module.exports = {
  bus: { driver: busDriver },
  storage: {
    driver: mongoDriver,
    params: { url: 'mongodb://InfoPanel:d221241M@noomid-shard-00-00-uso0b.mongodb.net:27017,noomid-shard-00-01-uso0b.mongodb.net:27017,noomid-shard-00-02-uso0b.mongodb.net:27017/events?ssl=true&replicaSet=NooMID-shard-0&authSource=admin', collection: 'messageEvents' }
  },

  aggregates,
  events,
  queries
}