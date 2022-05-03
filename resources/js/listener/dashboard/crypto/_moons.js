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
                                /** show insert modal. */
                                this.backdrop({mode:'show',action:'insert'});
                            }
                        });

                        /** query document to cancel button. */
                        let insertCancel = document.querySelector(".crypto-moon-insert > .crypto-moon-modal > .insert-cancel");
                        if (insertCancel) {
                            /** set event listener. */
                            insertCancel.addEventListener('click', (e) => {
                                this.backdrop({mode:'hide',action:'insert'});
                            })
                        }

                        /** query document to close button. */
                        let insertClose = document.querySelector(".crypto-moon-insert > .crypto-moon-modal > .insert-close");
                        if (insertClose) {
                            /** set event listener. */
                            insertClose.addEventListener('click', (e) => {
                                this.backdrop({mode:'hide',action:'insert'});
                            })
                        }

                        /** query document add button. */
                        let insertSubmit = document.querySelector(".crypto-moon-insert > .crypto-moon-modal > .insert-submit");
                        if (insertSubmit) {
                            /** set event listener. */
                            insertSubmit.addEventListener('click', (e) => {
                                this.backdrop({mode:'hide',action:'insert', trigger: 'submit', input: insertSubmit});
                            })
                        }
                    }
                    /** update modal code block. */
                    setTimeout( () => {
                        let update = document.querySelectorAll('.crypto-moon > .items > .action > .update');
                        if (update) {
                            for (let i = 0; i < update.length; i++) {
                                update[i].addEventListener("click", () => {
                                    /** show update modal. */
                                    this.backdrop({mode:'show',action:'update'});
                                    /** populate modal form on load. */
                                    let modal = document.querySelector(".crypto-moon-update > .crypto-moon-modal");
                                    let cl = ['id', 'name', 'coin', 'description', 'zone', 'website'];
                                    for (let key in cl) {
                                        let text = update[i].parentElement.parentElement.querySelector(`.${cl[key]}`).textContent;
                                        if (cl[key] === 'id') {
                                            let id = update[i].parentElement.parentElement.querySelector(`.${cl[key]}`).dataset.id;
                                            modal.querySelector(`.modal-${cl[key]}`).value = id;
                                        } else {
                                            modal.querySelector(`.modal-${cl[key]}`).value = text;
                                        }
                                    }
                                    /** query document element. */
                                    let updateSubmit = modal.querySelector(".update-submit");
                                    /** set submit event listener. */
                                    if (updateSubmit) {
                                        updateSubmit.addEventListener('click', (e) => {
                                            this.backdrop({mode:'hide', action:'update', trigger: 'submit', input: updateSubmit});
                                        });
                                    }
                                });
                            }

                            /** query document close button. */
                            let updateClose = document.querySelector(".crypto-moon-update > .crypto-moon-modal > .update-close");
                            if (updateClose) {
                                updateClose.addEventListener('click', (e) => {
                                    this.backdrop({mode:'hide',action:'update'});
                                });
                            }

                            /** query document update button. */
                            let updateCancel = document.querySelector(".crypto-moon-update > .crypto-moon-modal > .update-cancel");
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
                                    /** show destroy modal. */
                                    this.backdrop({mode:'show',action:'destroy'});
                                    /** populate modal form on load. */
                                    let modal = document.querySelector(".crypto-moon-destroy > .crypto-moon-modal");
                                    let cl = ['id', 'name', 'coin', 'description', 'zone', 'website'];
                                    for (let key in cl) {
                                        let text = destroy[i].parentElement.parentElement.querySelector(`.${cl[key]}`).textContent;
                                        if (cl[key] === 'id') {
                                            let id = destroy[i].parentElement.parentElement.querySelector(`.${cl[key]}`).dataset.id;
                                            modal.querySelector(`.modal-${cl[key]}`).value = id;
                                        } else {
                                            modal.querySelector(`.modal-${cl[key]}`).value = text;
                                        }
                                    }
                                    /** query document element. */
                                    let destroySubmit = modal.querySelector(".destroy-submit");
                                    /** set submit event listener. */
                                    if (destroySubmit) {
                                        destroySubmit.addEventListener('click', (e) => {
                                            this.backdrop({mode:'hide', action:'destroy', trigger: 'submit', input: destroySubmit});
                                        });
                                    }
                                });
                            }
                            /** query document close button. */
                            let destroyClose = document.querySelector(".crypto-moon-destroy > .crypto-moon-modal > .destroy-close");
                            if (destroyClose) {
                                destroyClose.addEventListener('click', (e) => {
                                    this.backdrop({mode:'hide',action:'destroy'});
                                });
                            }

                            /** query document update button. */
                            let destroyCancel = document.querySelector(".crypto-moon-destroy > .crypto-moon-modal > .destroy-cancel");
                            if (destroyCancel) {
                                destroyCancel.addEventListener('click', (e) => {
                                    this.backdrop({mode:'hide', action:'destroy'});
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
        if (config['mode'] === 'show') {
            /** query document to pinpoint modal element. */
            let show = document.querySelector(`.crypto-moon-${config['action']}-wrapper`);
            /** remove and hide backdrop. */
            show.classList.add('backdrop');
            show.style.display = 'block';
        }

        if (config['mode'] === 'hide') {
            /** query document to pinpoint modal element. */
            let hide = document.querySelector(`.crypto-moon-${config['action']}-wrapper`);
            /** remove and hide backdrop. */
            hide.classList.add('backdrop');
            hide.style.display = 'none';
            if (config['trigger'] === 'submit') {
                /** collect all input for processing. */
                let collect = this.helper.init({type:'input', section: 'moon', target: `crypto-moon-${config['action']}`, action: 'value', data: ['id', 'name', 'coin', 'description', 'zone', 'website']});
                /** check if inputs are empty and valid. */
                let result = this.helper.init({type: 'validate', data: collect});
                /** double check and then proceed. */
                if (Object.keys(result['error']).length === 0) {
                    /** hide backdrop. */
                    this.backdrop({mode:'hide', action:config['action']});
                    /** request access token and then post to backend. */
                    this.request({method: 'POST', table: 'moon', statement: `${config['action']}`, input: result['success']});
                    /** clear input if insert. */
                    if (config['action'] === 'insert') {
                        this.helper.init({type:'input', section: 'moon', target: `crypto-moon-${config['action']}`, action: 'clear', data: ['name', 'coin', 'description', 'zone', 'website']});
                    }
                } else {
                    this.backdrop({mode:'show', action:config['action']});
                    this.error({target: `crypto-moon-${config['action']}`, data:result['error']});
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
            let display = document.querySelector(`.${config['target']} > .crypto-moon-modal > .modal-${key}-error`);
            display.textContent = config['data'][key];
        }
        /** clear all error messages after five seconds. */
        setTimeout( () => {
            for (let key in config['data']) {
                let display = document.querySelector(`.${config['target']} > .crypto-moon-modal > .modal-${key}-error`);
                display.textContent = '';
            }
        }, 5000);
    }
}
export default new moons();
