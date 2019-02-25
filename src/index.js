const StreamConsumerService = require('./lib/StreamConsumerService');

exports.handler = ((event, context, callback) => {
    return StreamConsumerService.getInstance().consumeEvent(event)
        .then(result => callback(null, result))
        .catch(error => callback(error))
});