var seneca = require('seneca')()
seneca
  .use("entity")
  .use('mongo-store', {
    uri: 'mongodb://120.0.0.1:27017/seneca'
  })