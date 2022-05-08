/** import helper function. */
import helpers from "../../../helpers/helpers.js";

class portfolio {
    /** default actions. */
    constructor() {
        this.event = document.querySelector(".speak-crypto-portfolios");
        this.template = document.querySelector(".stage-crypto-portfolios");
        this.element = document.querySelector(".perform");
        this.helper = helpers;
    }

    /** fire it on. */
    init() {
        /** setup initial listener. */
        this.event.addEventListener("click", (e) => {
            if (e.target.dataset.sidebar === 'portfolios') {
                /** retrieve data .*/
                this.request({method: 'GET', table:'portfolio'});
                /** clone template. */
                let content = this.template.content.cloneNode(true);
                /** query document and do conditional statement base on the result. */
                let check = document.querySelector('.crypto-order');
                if (check === null || check === undefined) {
                    /** clear element before appending. */
                    this.element.innerHTML = '';
                    /** append template content. */
                    this.element.appendChild(content);
                    /** insert modal code block. */
                    let record = document.querySelector('.click-order-record');
                    if (record) {
                        record.addEventListener("click", (e) => {
                            /** show insert modal. */
                            if (e.target.dataset.action === 'crypto') {
                                this.backdrop({mode:'show', action:'insert'});
                            }

                            /** set insert event listener. */
                            let insertCancel = document.querySelector('.crypto-portfolio-insert > .crypto-modal > .modal-group > .modal-close');
                            if (insertCancel) {
                                insertCancel.addEventListener('click', (e) => {
                                    this.backdrop({mode:'hide', action:'insert'});
                                });
                            }

                            /** set close event listener. */
                            let insertClose = document.querySelector('.crypto-portfolio-insert > .crypto-modal > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
                            if (insertClose) {
                                insertClose.addEventListener('click', (e) => {
                                    this.backdrop({mode:'hide', action:'insert'});
                                });
                            }

                            /** set submit event listener. */
                            let insertSubmit = document.querySelector('.crypto-portfolio-insert > .crypto-modal > .modal-group > .modal-button > .button-submit > .modal-insert');
                            if (insertSubmit) {
                                insertSubmit.addEventListener('click', (e) => {
                                    this.backdrop({mode:'hide', action:'insert', trigger: 'submit', input: insertSubmit});
                                })
                            }
                        });
                    }
                    /** update modal code block. */
                    setTimeout( () => {
                        let update = document.querySelectorAll('.crypto-order > .items > .action > .update');
                        if (update) {
                            for (let i = 0; i < update.length; i++) {
                                update[i].addEventListener("click", () => {
                                    /** show update modal. */
                                    this.backdrop({mode:'show',action:'update'});

                                    /** populate modal. */
                                    let parent = update[i].parentElement.parentElement;
                                    this.helper.init({type: 'input', action: 'populate', target: 'crypto-portfolio-update', el: parent, data: ['id', 'order', 'wallet', 'name', 'coin', 'quantity', 'capital']});

                                    /** set submit event listener. */
                                    let updateSubmit = document.querySelector('.crypto-portfolio-update > .crypto-modal > .modal-group > .modal-button > .button-submit > .modal-update');
                                    if (updateSubmit) {
                                        updateSubmit.addEventListener('click', (e) => {
                                            this.backdrop({mode:'hide', action:'update', trigger: 'submit', input: updateSubmit});
                                        });
                                    }
                                });
                            }
                            /** query document close button. */
                            let updateClose = document.querySelector('.crypto-portfolio-update > .crypto-modal > .modal-group > .modal-close');
                            if (updateClose) {
                                updateClose.addEventListener('click', (e) => {
                                    this.backdrop({mode:'hide', action:'update'});
                                });
                            }

                            /** query document update button. */
                            let updateCancel = document.querySelector('.crypto-portfolio-update > .crypto-modal > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
                            if (updateCancel) {
                                updateCancel.addEventListener('click', (e) => {
                                    this.backdrop({mode:'hide', action:'update'});
                                });
                            }
                        }
                    }, 10000);
                    /** destroy modal code block. */
                    setTimeout( () => {
                        let destroy = document.querySelectorAll('.crypto-order > .items > .action > .destroy');
                        if (destroy) {
                            for (let i = 0; i < destroy.length; i++) {
                                destroy[i].addEventListener("click", () => {
                                    /** show destroy modal. */
                                    this.backdrop({mode:'show', action:'destroy'});

                                    /** populate modal. */
                                    let parent = destroy[i].parentElement.parentElement;
                                    console.log(parent);
                                    this.helper.init({type: 'input', action: 'populate', target: 'crypto-portfolio-destroy', el: parent, data: ['id', 'order', 'wallet', 'name', 'coin', 'quantity', 'capital']});

                                    /** set destroy event listener. */
                                    let destroySubmit = document.querySelector('.crypto-portfolio-destroy > .crypto-modal > .modal-group > .modal-button > .button-submit > .modal-destroy');
                                    if (destroySubmit) {
                                        destroySubmit.addEventListener('click', (e) => {
                                            this.backdrop({mode:'hide', action:'destroy', trigger: 'submit', input: destroySubmit});
                                        });
                                    }
                                });

                                /** set cancel event listener. */
                                let destroyClose = document.querySelector('.crypto-portfolio-destroy > .crypto-modal > .modal-group > .modal-close');
                                if (destroyClose) {
                                    destroyClose.addEventListener('click', (e) => {
                                        this.backdrop({mode:'hide', action:'destroy'});
                                    });
                                }

                                /** set cancel event listener. */
                                let destroyCancel = document.querySelector('.crypto-portfolio-destroy > .crypto-modal > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
                                if (destroyCancel) {
                                    destroyCancel.addEventListener('click', (e) => {
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
            }
        });
    }
    /** function on how backdrop behaves. */
    backdrop(config) {
        if (config['mode'] === 'show') {
            /** query document to pinpoint modal element. */
            let show = document.querySelector(`.crypto-portfolio-${config['action']}`);
            /** show modal. */
            show.classList.add('backdrop');
            show.style.display = 'block';
        }

        if (config['mode'] === 'hide') {
            /** query document to pinpoint modal element. */
            let modal = document.querySelector(`.crypto-portfolio-${config['action']}`);
            /** hide modal. */
            modal.classList.remove('backdrop');
            modal.style.display = 'none';
            if (config['trigger'] === 'submit') {
                /** collect all input for processing. */
                let collect = this.helper.init({type:'input', section: 'portfolio', target: `crypto-portfolio-${config['action']}`, action: 'value', data: ['id', 'wallet', 'order', 'name', 'coin', 'quantity', 'capital']});;
                /** check if inputs are empty and valid. */
                let result = this.helper.init({type: 'validate', data: collect});
                /** double check and then proceed. */
                if (Object.keys(result['error']).length === 0) {
                    /** request access token and then post to backend. */
                    this.request({method: 'POST', table:'portfolio', statement:config['action'], input:result['success']});
                    /** clear input. */
                    if (config['action'] === 'insert') {
                        this.helper.init({type:'input', section: 'portfolio', target: `crypto-portfolio-${config['action']}`, action: 'clear', data: ['wallet', 'name', 'coin', 'quantity', 'capital']});
                    }
                } else {
                    this.error({target: `crypto-portfolio-${config['action']}`, data:result['error']});
                    /** show modal. */
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
                axios.get('/api/crypto-portfolio-retrieve', {
                    params: {table: 'portfolio'}
                }).then(response => {
                    if (response.data.status === true) {
                        /** populate order element with data. */
                        if (response.data.order) {
                            for (let i=0; i<response.data.order.length; i++) {
                                this.helper.init({type:'node', id:`${i+1}`, target:'crypto-order', statement: response.data.sql, input: response.data.order[i]});
                            }
                        }
                        /** populate hold element with data. */
                        if (response.data.hold.total) {
                            for (let key in response.data.hold.total) {
                                this.helper.init({type:'node', target:'crypto-hold', statement: response.data.sql, input: response.data.hold.total[key]});
                            }
                        }
                        /** populate fund element with data. */
                        if (response.data.fund.total) {
                            for (let key in response.data.fund.total) {
                                this.helper.init({type:'node', target:'crypto-fund', statement: response.data.sql, input: response.data.fund.total[key]});
                            }
                        }
                    }
                });
            });
        }

        /** store data. */
        if (config['method'] === 'POST') {
            axios.get('/sanctum/csrf-cookie').then( () => {
                axios.post('/api/crypto-portfolio-store', {
                    table: config['table'],
                    statement: config['statement'],
                    input: config['input']
                }).then(response => {
                    /** populate order element with data. */
                    if (response.data.status === true) {
                        /** add or update element in document tree. */
                        if (response.data.sql === 'select') {
                            for (let key in response.data.coin) {
                                this.helper.init({type:'node', id: 0, target:'crypto-order', statement: response.data.sql, input: response.data.coin[key]});
                            }
                        }
                        /** add or update element in document tree. */
                        if (response.data.sql === 'update') {
                            for (let key in response.data.coin) {
                                this.helper.init({type:'node', target:'crypto-order', statement: response.data.sql, input: response.data.coin[key]});
                            }
                        }
                        /** remove element in document tree. */
                        if (response.data.sql === 'destroy') {
                            this.helper.init({type:'node', target:'crypto-order', statement: response.data.sql, input: response.data.coin});
                        }
                    }
                    /** display message. */
                    if (response.data.status) {
                        this.helper.init({type: 'message', status: response.data.status, message: response.data.message});
                    }
                })
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
export default new portfolio();