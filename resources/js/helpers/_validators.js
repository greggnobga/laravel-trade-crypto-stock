class validator {
    init(config) {
        let success = {};
        let error = {};
        for (let key in config['data']) {
            if (config['data'][key] === '' || config['data'][key].length === 0) {
                error[key] = 'This field is required.'
            } else {
                if (key === 'quantity' || key === 'capital') {
                    config['data'][key] = config['data'][key].replace(',', '');
                }
                if (typeof(key) === 'string') {
                    if (/^[a-zA-Z0-9\-&,. ]*$/i.test(config['data'][key]) === true) {
                        success[key] = config['data'][key];
                    } else {
                        error[key] = 'Only letters and numbers are allowed.';
                    }
                }
            }
        }
        return {error: error, success: success};
    }
}
export default new validator();
