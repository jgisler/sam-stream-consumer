const Logger = require('./Logger');
const ExampleTableProcessor = require('./ExampleTableProcessor');

class StreamConsumerService {

    static getInstance() {
        if (theInstance === undefined) {
            theInstance = new StreamConsumerService(ExampleTableProcessor.getInstance());
        }
        return theInstance;
    }

    constructor(exampleTableProcessor) {
        this.class = this.constructor.name;
        this.logger = Logger.getLogger(this.class);

        this.exampleTableProcessor = exampleTableProcessor;
        this.exampleTableStreamArn = process.env.EXAMPLE_TABLE_STREAM_ARN;
    }

    consumeEvent(event) {
        return Promise.all(event.Records.map((record) => this.processRecord(record)))
            .then((results) => [].concat(...results));
    }

    processRecord(record) {
        switch(record.eventSourceARN) {
            case this.exampleTableStreamArn:
                return this.exampleTableProcessor.processRecord(record);

            default:
                this.logger.error('processRecord', new Error(`Unknown eventSourceARN: ${record.eventSourceARN}`));
                return Promise.resolve(`Unknown eventSourceARN: ${record.eventSourceARN}`);
        }
    }
}

let theInstance;
module.exports = StreamConsumerService;