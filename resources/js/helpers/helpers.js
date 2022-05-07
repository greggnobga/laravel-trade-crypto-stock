/** import javascript helpers. */
import validators from './_validators.js';
import input from './_input.js';
import node from './_node.js';
import message from './_message.js';

/** define class. */
class helpers {
    init(config) {
        let result;
        /** run validator. */
        if (config['type'] === 'validate') {
            result = validators.init(config);
        }
        /** run input. */
        if (config['type'] === 'input') {
            result = input.init(config);
        }
        /** run node. */
        if( config['type'] === 'node') {
            result = node.init(config);
        }

        /** run message. */
        if( config['type'] === 'message') {
            result = message.init(config);
        }

        return result;
    }
}
/** export class. */
export default new helpers();

