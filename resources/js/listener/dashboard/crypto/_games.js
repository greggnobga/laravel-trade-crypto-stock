/** import helper function. */
import helpers from "../../../helpers/helpers.js";

class crypto_games {
    constructor() {
        this.event = document.querySelector(".speak-crypto-games");
        this.template = document.querySelector(".stage-crypto-games");
        this.element = document.querySelector(".perform");
        this.helper = helpers;
    }

    init() {
        /** setup overview listener. */
        this.event.addEventListener("click", (e) => {
            if (e.target.dataset.sidebar === 'crypto_games') {
                /** retrieve data .*/
                this.request({method: 'GET', table:'game'});
                /** clone template. */
                let content = this.template.content.cloneNode(true);
                /** query document and do conditional statement base on the result. */
                let check = document.querySelector(`.click-game`);
                if (check === null || check === undefined) {
                    /** clear element before appending new content. */
                    this.element.innerHTML = '';
                    /** append template content. */
                    this.element.appendChild(content);
                    /** query document so to insert record event listener. */
                    let record = document.querySelector(`.click-game-record`);
                    if (record) {
                        record.addEventListener("click", (e) => {
                            if (e.target.dataset.action === 'crypto') {
                                /** show modal. */
                                this.backdrop({mode:'show', action:'insert'});

                                /** set submit event listener. */
                                let gameSubmit = document.querySelector('.crypto-game-insert > .crypto-modal > .modal-group > .modal-button > .button-submit > .modal-insert');
                                if (gameSubmit) {
                                    gameSubmit.addEventListener('click', (e) => {
                                        this.backdrop({mode:'hide', action:'insert', trigger: 'submit', input: gameSubmit});
                                    })
                                }
                            }
                        });

                        /** set close event listener. */
                        let gameClose = document.querySelector('.crypto-game-insert > .crypto-modal > .modal-group > .modal-close');
                        if (gameClose) {
                            gameClose.addEventListener('click', (e) => {
                                this.backdrop({mode:'hide', action:'insert'});
                            });
                        }

                        /** set cancel event listener. */
                        let gameCancel = document.querySelector('.crypto-game-insert > .crypto-modal > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
                        if (gameCancel) {
                            gameCancel.addEventListener('click', (e) => {
                                this.backdrop({mode:'hide', action:'insert'});
                            });
                        }
                    }
                    /** update modal code block. */
                    setTimeout( () => {
                        let update = document.querySelectorAll('.crypto-game > .items > .action > .update');
                        if (update) {
                            for (let i = 0; i < update.length; i++) {
                                update[i].addEventListener("click", () => {
                                    /** show modal. */
                                    this.backdrop({mode:'show', action:'update'});

                                    /** populate modal. */
                                    let parent = update[i].parentElement.parentElement;
                                    this.helper.init({type: 'input', action: 'populate', target: 'crypto-game-update', el: parent, data: ['id', 'title', 'genre', 'platform', 'blockchain', 'status' , 'earn', 'free', 'rating']});

                                    /** set submit event listener. */
                                    let gameSubmit = document.querySelector('.crypto-game-update > .crypto-modal > .modal-group > .modal-button > .button-submit > .modal-update');
                                    if (gameSubmit) {
                                        gameSubmit.addEventListener('click', (e) => {
                                            this.backdrop({mode:'hide', action:'update', trigger: 'submit', input: gameSubmit});
                                        })
                                    }
                                });
                            }

                            /** set close event listener. */
                            let gameClose = document.querySelector('.crypto-game-update > .crypto-modal > .modal-group > .modal-close');
                            if (gameClose) {
                                gameClose.addEventListener('click', (e) => {
                                    this.backdrop({mode:'hide',action:'update'});
                                });
                            }

                            /** set cancel event listener. */
                            let gameCancel = document.querySelector('.crypto-game-update > .crypto-modal > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
                            if (gameCancel) {
                                gameCancel.addEventListener('click', (e) => {
                                    this.backdrop({mode:'hide',action:'update'});
                                });
                            }

                        }
                    }, 10000);

                    /** destroy modal code block. */
                    setTimeout( () => {
                        let destroy = document.querySelectorAll('.crypto-game > .items > .action > .destroy');
                        if (destroy) {
                            for (let i = 0; i < destroy.length; i++) {
                                destroy[i].addEventListener("click", () => {
                                    /** show modal. */
                                    this.backdrop({mode:'show', action:'destroy'});

                                    /** populate modal. */
                                    let parent = destroy[i].parentElement.parentElement;
                                    this.helper.init({type: 'input', action: 'populate', target: 'crypto-game-destroy', el: parent, data: ['id', 'title', 'genre', 'platform', 'blockchain', 'status' , 'earn', 'free', 'rating']});

                                    /** set submit event listener. */
                                    let gameSubmit = document.querySelector('.crypto-game-destroy > .crypto-modal > .modal-group > .modal-button > .button-submit > .modal-destroy');
                                    if (gameSubmit) {
                                        gameSubmit.addEventListener('click', (e) => {
                                            this.backdrop({mode:'hide', action:'destroy', trigger: 'submit', input: gameSubmit});
                                        })
                                    }
                                });
                            }

                            /** set close event listener. */
                            let gameClose = document.querySelector('.crypto-game-destroy > .crypto-modal > .modal-group > .modal-close');
                            if (gameClose) {
                                gameClose.addEventListener('click', (e) => {
                                    this.backdrop({mode:'hide',action:'destroy'});
                                });
                            }

                            /** set cancel event listener. */
                            let gameCancel = document.querySelector('.crypto-game-destroy > .crypto-modal > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
                            if (gameCancel) {
                                gameCancel.addEventListener('click', (e) => {
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
        let modal = document.querySelector(`.crypto-game-${config['action']}`);

        if (config['mode'] === 'show') {
            /** show backdrop. */
            modal.classList.add('backdrop');
            modal.style.display = 'block';
        }

        if (config['mode'] === 'hide') {
            /** hide backdrop. */
            modal.classList.remove('backdrop');
            modal.style.display = 'none';

            if (config['trigger'] === 'submit') {
                /** hide backdrop. */
                modal.classList.remove('backdrop');
                modal.style.display = 'none';

                /** collect all input for processing. */
                let collect = this.helper.init({type:'input', target: `crypto-game-${config['action']}`, action: 'value', data: ['id', 'title', 'genre', 'platform', 'blockchain', 'status' , 'earn', 'free', 'rating']});

                /** check if inputs are empty and valid. */
                let result = this.helper.init({type: 'validate', data: collect});

                /** double check and then proceed. */
                if (Object.keys(result['error']).length === 0) {
                    /** request access token and then post to backend. */
                    this.request({method: 'POST', table: 'game', statement: `${config['action']}`, input: result['success']});

                    /** clear input if insert. */
                    if (config['action'] === 'insert') {
                        this.helper.init({type:'input', target: `crypto-game-${config['action']}`, action: 'clear', data: ['id', 'title', 'genre', 'platform', 'blockchain', 'status' , 'earn', 'free', 'rating']});
                    }
                } else {
                    /** display error. */
                    this.error({target: `crypto-game-${config['action']}`, data:result['error']});

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
                axios.get('/api/crypto-game-retrieve', { params: {'table': 'game'}
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

        /** store data. */
        if(config['method'] === 'POST') {
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
                        /** add or update element in document tree. */
                        if (response.data.sql === 'update') {
                            for (let key in response.data.coin) {
                                this.helper.init({type:'node', target:'crypto-game', statement: response.data.sql, input: response.data.coin[key]});
                            }
                        }
                        /** remove element in document tree. */
                        if (response.data.sql === 'destroy') {
                            this.helper.init({type:'node', target:'crypto-game', statement: response.data.sql, input: response.data.coin});
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
export default new crypto_games();
