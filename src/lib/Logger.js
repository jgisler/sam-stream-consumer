
class Logger {

    static getLogger(className) {
        return new Logger(className);
    }

    constructor(className) {
        this.className = className;
    }

    error(action, errorObj) {
        const logParts = [
            `class=${this.className}`,
            `action=${action}`
        ];

        if (errorObj !== undefined) {

            if (errorObj.message) {
                logParts.push(`message=${errorObj.message}`);
            }

            if (errorObj.stack) {
                logParts.push(`stack=${errorObj.stack}`);
            }

            logParts.push(this.pp(errorObj));
        }

        console.error(logParts.join(' '));
    }

    info(action, message, obj) {
        const logParts = [
            `class=${this.className}`,
            `action=${action}`,
            `${message} :: ${this.pp(obj)}`
        ];

        console.log(logParts.join(' '));
    }

    pp(obj) {
        if (obj === undefined) {
            return;
        }
        return JSON.stringify(obj, null, 2);
    }
}

module.exports = Logger;