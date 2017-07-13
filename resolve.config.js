const fileDriver = require('resolve-storage-file');
const busDriver = require('resolve-bus-memory');
const aggregates = require('./src/common/aggregates').default;
const events = require('./src/common/aggregates/record-events').default;
const queries = require('./src/common/read-models').default;
//console.log(fileDriver());

module.exports = {
  bus: { driver: busDriver },
  storage: {
    driver: fileDriver,
    params: { pathToFile: './prod_db.json' }
  },

  aggregates,
  events,
  queries
}