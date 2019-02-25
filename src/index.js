const StreamConsumerService = require('./lib/StreamConsumerService');

exports.handler = ((event, context, callback) =>
    StreamConsumerService.getInstance().consumeEvent(event)
        .then(result => callback(null, result))
        .catch(error => callback(error)));