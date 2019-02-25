const Logger = require('./Logger');

class ExampleTableProcessor {

    static getInstance() {
        if (theInstance === undefined) {
            theInstance = new ExampleTableProcessor();
        }
        return theInstance;
    }

    constructor() {
        this.class = this.constructor.name;
        this.logger = Logger.getLogger(this.class);
    }

    processRecord(record) {
        this.logger.info('processRecord', 'record', record);
        switch(record.eventName) {
            case 'INSERT': return this.processInsert(record);
            case 'MODIFY': return this.processModify(record);
            case 'REMOVE': return this.processRemove(record);
            default:
                this.logger.error('processRecord', new Error(`Unrecognized eventName: ${record.eventName}`));
                return Promise.resolve(`Unrecognized eventName: ${record.eventName}`);
        }
    }

    processInsert(record) {
        return Promise.resolve({
            new: {
                id: record.dynamodb.NewImage.Id.N,
                message: record.dynamodb.NewImage.Message.S
            }
        });
    }

    processModify(record) {
        return Promise.resolve({
            old: {
                id: record.dynamodb.OldImage.Id.N,
                message: record.dynamodb.OldImage.Message.S
            },
            new: {
                id: record.dynamodb.NewImage.Id.N,
                message: record.dynamodb.NewImage.Message.S
            }
        });
    }

    processRemove(record) {
        return Promise.resolve({
            old: {
                id: record.dynamodb.OldImage.Id.N,
                message: record.dynamodb.OldImage.Message.S
            }
        });
    }
}

let theInstance;
module.exports = ExampleTableProcessor;