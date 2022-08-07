/** import helper function. */
import helpers from "../../../helpers/helpers.js";

class crypto_screen {
    constructor() {
        this.event = document.querySelector(".speak-crypto-screens");
        this.template = document.querySelector(".stage-crypto-screens");
        this.element = document.querySelector(".perform");
        this.helper = helpers;
    }

    init() {
        /** setup overview listener. */
        this.event.addEventListener("click", (e) => {
            if (e.target.dataset.sidebar === 'crypto_screens') {
                /** retrieve data .*/
                this.request({method: 'GET', table:'screen', provider: 'local'});
                let content = this.template.content.cloneNode(true);
                /** clear element before appending new content. */
                this.element.innerHTML = '';
                /** append template content. */
                this.element.appendChild(content);
                /** query document so to insert record event listener. */
                let record = document.querySelector(`.click-screen-record`);
                if (record) {
                    record.addEventListener("click", (e) => {
                        if (e.target.dataset.action === 'crypto') {
                            /** show modal. */
                            this.backdrop({mode:'show', action:'insert'});

                            /** set submit event listener. */
                            let screenSubmit = document.querySelector('.crypto-screen-insert > .modal-form > .modal-group > .modal-button > .button-submit > .modal-insert');
                            if (screenSubmit) {
                                screenSubmit.addEventListener('click', (e) => {
                                    this.backdrop({mode:'hide', action:'insert', trigger: 'submit', input: screenSubmit});
                                });
                            }
                        }

                    });

                    /** set close event listener. */
                    let screenClose = document.querySelector('.crypto-screen-insert > .modal-form > .modal-group > .modal-close');
                    if (screenClose) {
                        screenClose.addEventListener('click', (e) => {
                            this.backdrop({mode:'hide', action:'insert'});
                        });
                    }

                    /** set cancel event listener. */
                    let screenCancel = document.querySelector('.crypto-screen-insert > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
                    if (screenCancel) {
                        screenCancel.addEventListener('click', (e) => {
                            this.backdrop({mode:'hide', action:'insert'});
                        });
                    }
                }
                /** update modal code block. */
                setTimeout( () => {
                    let update = document.querySelectorAll('.crypto-screen > .items > .action > .update');
                    if (update) {
                        for (let i = 0; i < update.length; i++) {
                          /* jshint -W083 */
                            update[i].addEventListener("click", () => {
                                /** show update modal. */
                                this.backdrop({mode:'show', action:'update'});

                                /** populate modal. */
                                let parent = update[i].parentElement.parentElement;
                                this.helper.init({type: 'input', action: 'populate', target: 'crypto-screen-update', el: parent, data: ['id', 'api', 'coin', 'price', 'market', 'volume', 'change']});

                                /** set submit event listener. */
                                let screenSubmit = document.querySelector('.crypto-screen-update > .modal-form > .modal-group > .modal-button > .button-submit > .modal-update');
                                if (screenSubmit) {
                                    screenSubmit.addEventListener('click', (e) => {
                                        this.backdrop({mode:'hide', action:'update', trigger: 'submit', input: screenSubmit});
                                    });
                                }
                            });
                            /* jshint +W083 */
                        }
                        /** query document close button. */
                        let screenClose = document.querySelector('.crypto-screen-update > .modal-form > .modal-group > .modal-close');
                        if (screenClose) {
                            screenClose.addEventListener('click', (e) => {
                                this.backdrop({mode:'hide', action:'update'});
                            });
                        }

                        /** query document update button. */
                        let screenCancel = document.querySelector('.crypto-screen-update > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
                        if (screenCancel) {
                            screenCancel.addEventListener('click', (e) => {
                                this.backdrop({mode:'hide', action:'update'});
                            });
                        }
                    }
                }, 10000);

                /** destroy modal code block. */
                setTimeout( () => {
                    let destroy = document.querySelectorAll('.crypto-screen > .items > .action > .destroy');
                    if (destroy) {
                        for (let i = 0; i < destroy.length; i++) {
                          /* jshint -W083 */
                            destroy[i].addEventListener("click", () => {
                                /** show destroy modal. */
                                this.backdrop({mode:'show', action:'destroy'});

                                /** populate modal. */
                                let parent = destroy[i].parentElement.parentElement;
                                this.helper.init({type: 'input', action: 'populate', target: 'crypto-screen-destroy', el: parent, data: ['id', 'api', 'coin', 'price', 'market', 'volume', 'change']});

                                /** set destroy event listener. */
                                let screenSubmit = document.querySelector('.crypto-screen-destroy > .modal-form > .modal-group > .modal-button > .button-submit > .modal-destroy');
                                if (screenSubmit) {
                                    screenSubmit.addEventListener('click', (e) => {
                                        this.backdrop({mode:'hide', action:'destroy', trigger: 'submit', input: screenSubmit});
                                    });
                                }
                            });
                            /* jshint +W083 */

                            /** set cancel event listener. */
                            let screenClose = document.querySelector('.crypto-screen-destroy > .modal-form > .modal-group > .modal-close');
                            if (screenClose) {
                                screenClose.addEventListener('click', (e) => {
                                    this.backdrop({mode:'hide', action:'destroy'});
                                });
                            }

                            /** set cancel event listener. */
                            let screenCancel = document.querySelector('.crypto-screen-destroy > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
                            if (screenCancel) {
                                screenCancel.addEventListener('click', (e) => {
                                    this.backdrop({mode:'hide', action:'destroy'});
                                });
                            }
                        }
                    }
                }, 10000);

                let info = document.querySelector('.card > .header > .meta > .right > .messenger');
                info.classList.add('info');
                info.textContent = 'Update button enabled right after this message disappear.';
                setTimeout(() => { info.classList.remove('info'); }, 9000);
            }
        });
    }

    /** function on how backdrop behaves. */
    backdrop(config) {
        /** query document to pinpoint modal element. */
        let modal = document.querySelector(`.crypto-screen-${config.action}`);

        if (config.mode === 'show') {
            /** show backdrop. */
            modal.classList.add('backdrop');
            modal.style.display = 'block';

            /** insert fetch gecko. */
            if(config.action === 'insert' || config.action === 'update') {
                let fetch = document.querySelector(`.crypto-screen-${config.action} > .modal-form > .modal-group > .modal-gecko > .modal-fetch`);
                fetch.addEventListener('click', () => {
                    let api = document.querySelector(`.crypto-screen-${config.action} > .modal-form > .modal-group > .modal-gecko > .modal-api`).value;
                    if (api) {
                        this.request({method: 'GET', provider: 'gecko', action: config.action, data: api});
                    }
                });
            }
        }

        if (config.mode === 'hide') {
            /** hide backdrop. */
            modal.classList.remove('backdrop');
            modal.style.display = 'none';

            if (config.trigger === 'submit') {
                /** hide backdrop. */
                modal.classList.remove('backdrop');
                modal.style.display = 'none';

                /** collect all input for processing. */
                let collect = this.helper.init({type:'input', target: `crypto-screen-${config.action}`, action: 'value', data: ['id', 'coin', 'api', 'price', 'market', 'volume', 'change']});

                /** check if inputs are empty and valid. */
                let result = this.helper.init({type: 'validate', data: collect});

                /** double check and then proceed. */
                if (Object.keys(result.error).length === 0) {
                    /** hide backdrop. */
                    modal.classList.remove('backdrop');
                    modal.style.display = 'none';

                    /** sanitize input. */
                    let sanitize = this.helper.init({type:'sanitize', action: 'comma', condition: ['price', 'market', 'volume', 'change'], data: result.success});

                    /** request access token and then post to backend. */
                    this.request({method: 'POST', table: 'screen', statement: `${config.action}`, input: sanitize});

                    /** clear input if insert. */
                    if (config.action === 'insert') {
                        this.helper.init({type:'input', target: `crypto-screen-${config.action}`, action: 'clear', data: ['coin', 'api', 'price', 'market', 'volume', 'change']});
                    }
                } else {
                    /** show backdrop. */
                    modal.classList.add('backdrop');
                    modal.style.display = 'block';
                    /** display backdrop. */
                    this.error({target: `crypto-screen-${config.action}`, data:result.error});
                }
            }
        }
    }

    request(config) {
        if (config.method === 'GET') {
            /** fetch local data. */
            if (config.provider === 'local') {
                axios.get('/sanctum/csrf-cookie').then(response => {
                    axios.get('/api/crypto-screen-retrieve', {
                        params: {'table': 'screen'}
                    }).then(response => {
                        /** populate order element with data. */
                        if (response.data.coin) {
                            for (let i=0; i<response.data.coin.length; i++) {
                                this.helper.init({type:'node', id:`${i+1}`, target:'crypto-screen', statement: response.data.sql, input: response.data.coin[i]});
                            }
                        }
                    });
                });
            }

            /** fetch coingecko data. */
            if (config.provider === 'gecko') {
                axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${config.data}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                    withCredentials: false,
                    credentials: 'same-origin',
                }).then(response => {
                    if (response.status === 200) {
                        let coin = [];
                        for (let key in response.data) {
                            if (response.data.hasOwnProperty(key)) {
                                for (let val in response.data[key]) {
                                    if (response.data[key].hasOwnProperty(val)) {
                                        switch (val) {
                                            case 'usd':
                                                coin.price = response.data[key][val];
                                                break;
                                            case 'usd_market_cap':
                                                coin.market = response.data[key][val];
                                                break;
                                            case 'usd_24h_vol'  :
                                                coin.volume = response.data[key][val];
                                                break;
                                            case 'usd_24h_change':
                                                coin.change = response.data[key][val];
                                                break;
                                            default:
                                                coin = [];
                                        }
                                    }
                                }
                            }
                        }
                        /** append to element. */
                        if (coin) {
                            for (let x in coin) {
                                document.querySelector(`.crypto-screen-${config.action} > .modal-form > .modal-group > .modal-${x}`).value = coin[x].toLocaleString('en');
                            }
                        }
                    }
                });

            }
        }
        /** store data. */
        if(config.method === 'POST') {
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post('/api/crypto-screen-store', {
                    table: config.table,
                    statement: config.statement,
                    input: config.input,
                }).then(response => {
                    /** populate order element with data. */
                    if (response.data.status === true) {
                        /** add or update element in document tree. */
                        if (response.data.sql === 'select') {
                            for (let key in response.data.coin) {
                                this.helper.init({type:'node', id: 0, target:'crypto-screen', statement: response.data.sql, input: response.data.coin[key]});
                            }
                        }
                        /** add or update element in document tree. */
                        if (response.data.sql === 'update') {
                            for (let key in response.data.coin) {
                                this.helper.init({type:'node', target:'crypto-screen', statement: response.data.sql, input: response.data.coin[key]});
                            }
                        }
                        /** remove element in document tree. */
                        if (response.data.sql === 'destroy') {
                            this.helper.init({type:'node', target:'crypto-screen', statement: response.data.sql, input: response.data.coin});
                        }
                        /** display success message. */
                        this.helper.init({type: 'message', status: response.data.status, message: response.data.message});
                    }

                    /** display error message. */
                    if (response.data.status === false) {
                        this.helper.init({type: 'message', status: response.data.status, message: response.data.message});
                    }
                });
            });
        }
    }

    /** function to display error. */
    error(config) {
        /** run trough it all. */
        for (let key in config.data) {
            let display = document.querySelector(`.${config.target} > .modal-form > .modal-group > .modal-${key}-error`);
            display.textContent = config.data[key];
        }
        /** clear all error messages after five seconds. */
        setTimeout( () => {
            for (let key in config.data) {
                let display = document.querySelector(`.${config.target} > .modal-form > .modal-group > .modal-${key}-error`);
                display.textContent = '';
            }
        }, 5000);
    }
}

export default new crypto_screen();
