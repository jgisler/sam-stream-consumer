class ClientFactory {

    static getInstance() {
        if (theInstance === undefined) {
            theInstance = new ClientFactory(require('aws-sdk'));
        }
        return theInstance;
    }

    constructor(aws) {
        this.class = this.constructor.name;
        this.aws = aws;
    }

}

let theInstance;
module.exports = ClientFactory;