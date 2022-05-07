/** import helper function. */
import helpers from "../../../helpers/helpers.js";

class games {
    constructor() {
        this.event = document.querySelector(".speak-crypto-games");
        this.template = document.querySelector(".stage-crypto-games");
        this.element = document.querySelector(".perform");
        this.helper = helpers;
    }

    init() {
        /** setup overview listener. */
        this.event.addEventListener("click", (e) => {
            if (e.target.dataset.sidebar === 'games') {
                /** retrieve data .*/
                this.request({method: 'GET', table:'game'});
                /** clone template. */
                let content = this.template.content.cloneNode(true);
                /** clear element before appending. */
                this.element.innerHTML = '';
                /** append template content. */
                this.element.appendChild(content);
                /** insert modal code block. */
                let record = document.querySelector('.click-game-record');
                if (record) {
                    record.addEventListener("click", (e) => {
                        /** show insert modal. */
                        if (e.target.dataset.modal === 'insert') {
                            this.backdrop({mode:'show', action:'insert', trigger: 'submit'});
                        }
                    });
                }
                /** update modal code block. */
                setTimeout( () => {
                    let update = document.querySelectorAll('.crypto-game > .items > .action > .update');
                    if (update) {
                        for (let i = 0; i < update.length; i++) {
                            update[i].addEventListener("click", () => {
                                let grand = update[i].parentElement.parentElement;
                                /** show update modal. */
                                this.backdrop({mode:'show', action:'update', trigger: 'submit', input: grand});
                            });
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
    backdrop(config) {
        if (config['mode'] === 'show') {
            /** show modal. */
            let modal = document.querySelector(`.crypto-game-wrapper`);
            modal.classList.add('backdrop');
            modal.style.display = 'block';

            /** change insert header. */
            if (config['action'] === 'insert') {
                let header = document.querySelector('.modal-header');
                header.textContent = 'Add Game';
            }

            /** change update header. */
            if (config['action'] === 'update') {
                let header = document.querySelector('.modal-header');
                header.textContent = 'Update Game';
                /** extrapolate content into input value. */
                let items = ['id', 'title', 'genre', 'platform', 'blockchain', 'status', 'earn', 'free', 'rating'];
                for (let i = 0; i<items.length; i++) {
                    let txt = config['input'].querySelector(`.items > .${items[i]}`).textContent;
                    if (items[i] === 'id') {
                        let id = config['input'].querySelector(`.items > .${items[i]}`).dataset.id;
                        document.querySelector(`.crypto-modal > .modal-group > .modal-${items[i]}`).setAttribute('value', id);
                    } else {
                        document.querySelector(`.crypto-modal > .modal-group > .modal-${items[i]}`).setAttribute('value', txt);
                    }
                }
            }

            /** set dismiss button listener. */
            let dismiss = document.querySelectorAll(`.modal-dismiss`);
            for (let i=0; i<dismiss.length; i++) {
                dismiss[i].addEventListener('click', ()=> {
                    /** hide modal. */
                    modal.classList.remove('backdrop');
                    modal.style.display = 'none';
                });
            }

            /** set submit button listener. */
            let submit = document.querySelector(`.modal-submit`);
            submit.addEventListener('click', () => {
                if (config['trigger'] === 'submit') {
                    /** collect all input for processing. */
                    let collect = this.helper.init({type:'input', target: `crypto-game-wrapper`, action: 'value', data: ['id', 'title', 'genre', 'platform', 'blockchain', 'status', 'earn', 'free', 'rating']});
                    /** check if inputs are valid. */
                    let result = this.helper.init({type: 'validate', data: collect});
                    /** if no errors. */
                    if (Object.keys(result['error']).length === 0) {
                        /** hide modal. */
                        modal.classList.remove('backdrop');
                        modal.style.display = 'none';
                        /** forward to backend. */
                        this.request({method: 'POST', table:'game', statement:config['action'], input:result['success']});
                        /** clear input. */
                        if (config['action'] === 'insert') {
                            this.helper.init({type:'input', target: `crypto-game-wrapper`, action: 'clear', data: ['id', 'title', 'genre', 'platform', 'blockchain', 'status', 'earn', 'free', 'rating']});
                        }
                    } else {
                        this.error({target: `crypto-game-wrapper`, data:result['error']});
                        /** show modal. */
                        modal.classList.add('backdrop');
                        modal.style.display = 'block';
                    }
                }
            });
        }
    }
    /** function to process http request. */
    request(config) {
        if (config['method'] === 'GET') {
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.get('/api/crypto-game-retrieve', {
                    params: {'table': 'game'}
                }).then(response => {
                    if (response.data.status === true) {
                        /** populate order element with data. */
                        if (response.data.coin) {
                            for (let i=0; i<response.data.coin.length; i++) {
                                this.helper.init({type:'node', id:`${i+1}`, target:'crypto-game', statement: response.data.sql, input: response.data.coin[i]});
                            }
                        }
                    }
                });
            });
        }

        if (config['method'] === 'POST') {
            if (config['statement'] === 'insert') {
                axios.get('/sanctum/csrf-cookie').then(response => {
                    axios.post('/api/crypto-game-store', {
                        table: config['table'],
                        statement: config['statement'],
                        input: config['input']
                    }).then(response => {
                        /** populate order element with data. */
                        if (response.data.status === true) {
                            /** add or update element in document tree. */
                            if (response.data.sql === 'select') {
                                for (let key in response.data.coin) {
                                    this.helper.init({type:'node', id: 0, target:'crypto-game', statement: response.data.sql, input: response.data.coin[key]});
                                }
                            }
                        }
                    });
                });
            }
            if (config['statement'] === 'update') {
                axios.get('/sanctum/csrf-cookie').then(response => {
                    axios.post('/api/crypto-game-store', {
                        table: config['table'],
                        statement: config['statement'],
                        input: config['input']
                    }).then(response => {
                        /** populate order element with data. */
                        if (response.data.status === true) {
                            /** add or update element in document tree. */
                            if (response.data.sql === 'update') {
                                for (let key in response.data.coin) {
                                    this.helper.init({type:'node', id: 0, target:'crypto-game', statement: response.data.sql, input: response.data.coin[key]});
                                }
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
                if (key === 'id') continue;
                let display = document.querySelector(`.${config['target']} > .crypto-modal > .modal-group > .modal-${key}-error`);
                display.textContent = '';
            }
        }, 5000);
    }
}

export default new games();
