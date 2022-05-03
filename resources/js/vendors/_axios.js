class axios {
    constructor() {
        window.axios = require('axios');
    }
    init() {
        window.axios.defaults.withCredentials = true;
        window.axios.defaults.baseURL = "http://trade.poseidon.local/";
        window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }
}
export default new axios();
