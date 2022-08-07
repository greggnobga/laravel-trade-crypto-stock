/** import javascript helpers. */
import validators from './_validators.js';
import input from './_input.js';
import node from './_node.js';
import message from './_message.js';
import sanitze from './_sanitize.js';

/** define class. */
class helpers {
    init(config) {
        let result;
        /** run input. */
        if (config.type === 'input') {
            result = input.init(config);
        }

        /** run message. */
        if( config.type === 'message') {
            result = message.init(config);
        }

        /** run node. */
        if( config.type === 'node') {
            result = node.init(config);
        }

        /** run message. */
        if( config.type === 'sanitize') {
            result = sanitze.init(config);
        }

        /** run validator. */
        if (config.type === 'validate') {
            result = validators.init(config);
        }

        return result;
    }
}
/** export class. */
export default new helpers();
