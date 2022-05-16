/** import helper function. */
import helpers from "../../../helpers/helpers.js";

class moons {
    constructor() {
        this.event = document.querySelector(".speak-crypto-moons");
        this.template = document.querySelector(".stage-crypto-moons");
        this.element = document.querySelector(".perform");
        this.helper = helpers;
    }

    init() {
        /** setup overview listener. */
        this.event.addEventListener("click", (e) => {
            if (e.target.dataset.sidebar === 'moons') {
                /** retrieve data .*/
                this.request({method: 'GET', table:'moon'});
                /** clone template. */
                let content = this.template.content.cloneNode(true);
                /** query document and do conditional statement base on the result. */
                let check = document.querySelector(`.click-moon`);
                if (check === null || check === undefined) {
                    /** clear element before appending new content. */
                    this.element.innerHTML = '';
                    /** append template content. */
                    this.element.appendChild(content);
                    /** query document so to insert record event listener. */
                    let record = document.querySelector(`.click-moon-record`);
                    if (record) {
                        record.addEventListener("click", (e) => {
                            if (e.target.dataset.action === 'crypto') {
                                /** show modal. */
                                this.backdrop({mode:'show', action:'insert'});

                                /** set submit event listener. */
                                let moonSubmit = document.querySelector('.crypto-moon-insert > .crypto-modal > .modal-group > .modal-button > .button-submit > .modal-insert');
                                if (moonSubmit) {
                                    moonSubmit.addEventListener('click', (e) => {
                                        this.backdrop({mode:'hide', action:'insert', trigger: 'submit', input: moonSubmit});
                                    })
                                }
                            }
                        });

                        /** set close event listener. */
                        let moonClose = document.querySelector('.crypto-moon-insert > .crypto-modal > .modal-group > .modal-close');
                        if (moonClose) {
                            moonClose.addEventListener('click', (e) => {
                                this.backdrop({mode:'hide', action:'insert'});
                            });
                        }

                        /** set cancel event listener. */
                        let moonCancel = document.querySelector('.crypto-moon-insert > .crypto-modal > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
                        if (moonCancel) {
                            moonCancel.addEventListener('click', (e) => {
                                this.backdrop({mode:'hide', action:'insert'});
                            });
                        }
                    }
                    /** update modal code block. */
                    setTimeout( () => {
                        let update = document.querySelectorAll('.crypto-moon > .items > .action > .update');
                        if (update) {
                            for (let i = 0; i < update.length; i++) {
                                update[i].addEventListener("click", () => {
                                    /** show modal. */
                                    this.backdrop({mode:'show', action:'update'});

                                    /** populate modal. */
                                    let parent = update[i].parentElement.parentElement;
                                    this.helper.init({type: 'input', action: 'populate', target: 'crypto-moon-update', el: parent, data: ['id', 'name', 'coin', 'description', 'zone', 'website']});

                                    /** set submit event listener. */
                                    let moonSubmit = document.querySelector('.crypto-moon-update > .crypto-modal > .modal-group > .modal-button > .button-submit > .modal-update');
                                    if (moonSubmit) {
                                        moonSubmit.addEventListener('click', (e) => {
                                            this.backdrop({mode:'hide', action:'update', trigger: 'submit', input: moonSubmit});
                                        })
                                    }
                                });
                            }

                            /** set close event listener. */
                            let updateClose = document.querySelector('.crypto-moon-update > .crypto-modal > .modal-group > .modal-close');
                            if (updateClose) {
                                updateClose.addEventListener('click', (e) => {
                                    this.backdrop({mode:'hide',action:'update'});
                                });
                            }

                            /** set cancel event listener. */
                            let updateCancel = document.querySelector('.crypto-moon-update > .crypto-modal > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
                            if (updateCancel) {
                                updateCancel.addEventListener('click', (e) => {
                                    this.backdrop({mode:'hide',action:'update'});
                                });
                            }

                        }
                    }, 10000);

                    /** destroy modal code block. */
                    setTimeout( () => {
                        let destroy = document.querySelectorAll('.crypto-moon > .items > .action > .destroy');
                        if (destroy) {
                            for (let i = 0; i < destroy.length; i++) {
                                destroy[i].addEventListener("click", () => {
                                    /** show modal. */
                                    this.backdrop({mode:'show', action:'destroy'});

                                    /** populate modal. */
                                    let parent = destroy[i].parentElement.parentElement;
                                    this.helper.init({type: 'input', action: 'populate', target: 'crypto-moon-destroy', el: parent, data: ['id', 'name', 'coin', 'description', 'zone', 'website']});

                                    /** set submit event listener. */
                                    let moonSubmit = document.querySelector('.crypto-moon-destroy > .crypto-modal > .modal-group > .modal-button > .button-submit > .modal-destroy');
                                    if (moonSubmit) {
                                        moonSubmit.addEventListener('click', (e) => {
                                            this.backdrop({mode:'hide', action:'destroy', trigger: 'submit', input: moonSubmit});
                                        })
                                    }
                                });
                            }

                            /** set close event listener. */
                            let moonClose = document.querySelector('.crypto-moon-destroy > .crypto-modal > .modal-group > .modal-close');
                            if (moonClose) {
                                moonClose.addEventListener('click', (e) => {
                                    this.backdrop({mode:'hide',action:'destroy'});
                                });
                            }

                            /** set cancel event listener. */
                            let moonCancel = document.querySelector('.crypto-moon-destroy > .crypto-modal > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
                            if (moonCancel) {
                                moonCancel.addEventListener('click', (e) => {
                                    this.backdrop({mode:'hide',action:'destroy'});
                                });
                            }

                        }
                    }, 10000);

                    let info = document.querySelector('.card > .header > .meta > .right > .messenger');
                    info.classList.add('info');
                    info.textContent = 'Update button enabled right after this message disappear.';
                    setTimeout(() => { info.classList.remove('info'); }, 9000);
                }
            }
        });
    }

    /** function on how backdrop behaves. */
    backdrop(config) {
        /** query modal. */
        let modal = document.querySelector(`.crypto-moon-${config['action']}`);

        if (config['mode'] === 'show') {
            /** show backdrop. */
            modal.classList.add('backdrop');
            modal.style.display = 'block';
        }

        if (config['mode'] === 'hide') {
            /** hide backdrop. */
            modal.classList.add('backdrop');
            modal.style.display = 'none';

            if (config['trigger'] === 'submit') {
                /** hide backdrop. */
                modal.classList.add('backdrop');
                modal.style.display = 'none';

                /** collect all input for processing. */
                let collect = this.helper.init({type:'input', target: `crypto-moon-${config['action']}`, action: 'value', data: ['id', 'name', 'coin', 'description', 'zone', 'website']});

                /** check if inputs are empty and valid. */
                let result = this.helper.init({type: 'validate', data: collect});

                /** double check and then proceed. */
                if (Object.keys(result['error']).length === 0) {
                    /** request access token and then post to backend. */
                    this.request({method: 'POST', table: 'moon', statement: `${config['action']}`, input: result['success']});

                    /** clear input if insert. */
                    if (config['action'] === 'insert') {
                        this.helper.init({type:'input', target: `crypto-moon-${config['action']}`, action: 'clear', data: ['name', 'coin', 'description', 'zone', 'website']});
                    }
                } else {
                    /** display error. */
                    this.error({target: `crypto-moon-${config['action']}`, data:result['error']});

                    /** show backdrop. */
                    modal.classList.add('backdrop');
                    modal.style.display = 'block';
                }
            }
        }
    }

    /** function to process http request. */
    request(config) {
        /** retrieve data. */
        if (config['method'] === 'GET') {
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.get('/api/crypto-moon-retrieve', { params: {'table': 'moon'}
                }).then(response => {
                    if (response.data.status === true) {
                        /** populate order element with data. */
                        if (response.data.coin) {
                            for (let i=0; i<response.data.coin.length; i++) {
                                this.helper.init({type:'node', id:`${i+1}`, target:'crypto-moon', statement: response.data.sql, input: response.data.coin[i]});
                            }
                        }
                    }
                });
            });
        }

        /** store data. */
        if(config['method'] === 'POST') {
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post('/api/crypto-moon-store', {
                    table: config['table'],
                    statement: config['statement'],
                    input: config['input']
                }).then(response => {
                    /** populate order element with data. */
                    if (response.data.status === true) {
                        /** add or update element in document tree. */
                        if (response.data.sql === 'select') {
                            for (let key in response.data.coin) {
                                this.helper.init({type:'node', id: 0, target:'crypto-moon', statement: response.data.sql, input: response.data.coin[key]});
                            }
                        }
                        /** add or update element in document tree. */
                        if (response.data.sql === 'update') {
                            for (let key in response.data.coin) {
                                this.helper.init({type:'node', target:'crypto-moon', statement: response.data.sql, input: response.data.coin[key]});
                            }
                        }
                        /** remove element in document tree. */
                        if (response.data.sql === 'destroy') {
                            this.helper.init({type:'node', target:'crypto-moon', statement: response.data.sql, input: response.data.coin});
                        }
                    }
                    /** display message. */
                    if (response.data.status) {
                        this.helper.init({type: 'message', status: response.data.status, message: response.data.message});
                    }
                });
            });
        }
    }

    /** function to display error. */
    error(config) {
        /** run trough it all. */
        for (let key in config['data']) {
            let display = document.querySelector(`.${config['target']} > .crypto-modal > .modal-group > .modal-${key}-error`);
            display.textContent = config['data'][key];
        }
        /** clear all error messages after five seconds. */
        setTimeout( () => {
            for (let key in config['data']) {
                let display = document.querySelector(`.${config['target']} > .crypto-modal > .modal-group > .modal-${key}-error`);
                display.textContent = '';
            }
        }, 5000);
    }
}
export default new moons();
