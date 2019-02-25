const Logger = require('./Logger');

class StreamConsumerService {

    static getInstance() {
        if (theInstance === undefined) {
            theInstance = new StreamConsumerService();
        }
        return theInstance;
    }

    constructor() {
        this.class = this.constructor.name;
        this.logger = Logger.getLogger(this.class);
    }

    consumeEvent(event) {
        this.logger.info(event);
        return Promise.resolve('StreamConsumerService::consumeEvent');
    }
}