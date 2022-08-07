class sanitize {
    init(config) {
        let result = {};
        if(config.action === 'comma') {
            for (let y in config.data) {
                if (config.data.hasOwnProperty(y)) {
                    for (let x in config.condition) {
                        if (config.condition.hasOwnProperty(x)) {
                            /** replace comma. */
                            if (config.condition[x] === y) {
                                result[y] = config.data[config.condition[x]].replace(/,/g, '');
                            }
                            /** check if key undefined. */
                            if (!result.hasOwnProperty(y)) {
                                /** the rest. */
                                result[y] = config.data[y];
                            }
                        }
                    }
                }
            }
        }
        /** return. */
        return result;
    }
}
export default new sanitize();
