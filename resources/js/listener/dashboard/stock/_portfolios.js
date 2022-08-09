/** import helper function. */
import helpers from "../../../helpers/helpers.js";

class stock_portfolio {
    /** default actions. */
    constructor() {
        this.event = document.querySelector(".speak-stock-portfolios");
        this.template = document.querySelector(".stage-stock-portfolios");
        this.element = document.querySelector(".perform");
        this.helper = helpers;
    }

    /** fire it on. */
    init() {
        /** setup initial listener. */
        this.event.addEventListener("click", (e) => {
            if (e.target.dataset.sidebar === 'stock_portfolios') {
                /** retrieve data .*/
                this.request({method: 'GET', table:'portfolio'});
                /** clone template. */
                let content = this.template.content.cloneNode(true);
                // /** query document and do conditional statement base on the result. */
                let check = document.querySelector('.stock-portfolio');
                if (check === null || check === undefined) {
                    /** clear element before appending. */
                    this.element.innerHTML = '';
                    /** append template content. */
                    this.element.appendChild(content);
                    /** insert modal code block. */
                    let record = document.querySelector('.click-stock-record');
                    if (record) {
                        record.addEventListener("click", (e) => {
                            /** show insert modal. */
                            if (e.target.dataset.action === 'stock') {
                                /** show modal. */
                                this.backdrop({
                                    mode: 'show',
                                    action: 'insert'
                                });

                                /** set submit event listener. */
                                let portfolioSubmit = document.querySelector('.stock-portfolio-insert > .modal-form > .modal-group > .modal-button > .button-submit > .modal-insert');
                                if (portfolioSubmit) {
                                    portfolioSubmit.addEventListener('click', (e) => {
                                        this.backdrop({
                                            mode: 'hide',
                                            action: 'insert',
                                            trigger: 'submit',
                                            input: portfolioSubmit
                                        });
                                    });
                                }
                            }

                            /** set insert event listener. */
                            let portfolioCancel = document.querySelector('.stock-portfolio-insert > .modal-form > .modal-group > .modal-close');
                            if (portfolioCancel) {
                                portfolioCancel.addEventListener('click', (e) => {
                                    this.backdrop({
                                        mode: 'hide',
                                        action: 'insert'
                                    });
                                });
                            }

                            /** set close event listener. */
                            let portfolioClose = document.querySelector('.stock-portfolio-insert > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
                            if (portfolioClose) {
                                portfolioClose.addEventListener('click', (e) => {
                                    this.backdrop({
                                        mode: 'hide',
                                        action: 'insert'
                                    });
                                });
                            }
                        });
                    }
                    /** update modal code block. */
                    setTimeout( () => {
                        let update = document.querySelectorAll('.stock-order > .items > .action > .update');
                        if (update) {
                            for (let i = 0; i < update.length; i++) {
                                update[i].addEventListener("click", () => {
                                    /** show update modal. */
                                    this.backdrop({mode:'show', action:'update'});

                                    /** populate modal. */
                                    let parent = update[i].parentElement.parentElement;
                                    this.helper.init({type: 'input', action: 'populate', target: 'stock-portfolio-update', el: parent, data: ['id', 'order', 'ticker', 'name', 'fee', 'share', 'capital']});

                                    /** set submit event listener. */
                                    let portfolioSubmit = document.querySelector('.stock-portfolio-update > .modal-form > .modal-group > .modal-button > .button-submit > .modal-update');
                                    if (portfolioSubmit) {
                                        portfolioSubmit.addEventListener('click', (e) => {
                                            this.backdrop({mode:'hide', action:'update', trigger: 'submit', input: portfolioSubmit});
                                        });
                                    }
                                });
                            }
                            /** query document close button. */
                            let portfolioClose = document.querySelector('.stock-portfolio-update > .modal-form > .modal-group > .modal-close');
                            if (portfolioClose) {
                                portfolioClose.addEventListener('click', (e) => {
                                    this.backdrop({mode:'hide', action:'update'});
                                });
                            }

                            /** query document update button. */
                            let portfolioCancel = document.querySelector('.stock-portfolio-update > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
                            if (portfolioCancel) {
                                portfolioCancel.addEventListener('click', (e) => {
                                    this.backdrop({mode:'hide', action:'update'});
                                });
                            }
                        }
                    }, 10000);
                    /** destroy modal code block. */
                    setTimeout( () => {
                        let destroy = document.querySelectorAll('.stock-order > .items > .action > .destroy');
                        if (destroy) {
                            for (let i = 0; i < destroy.length; i++) {
                                destroy[i].addEventListener("click", () => {
                                    /** show destroy modal. */
                                    this.backdrop({mode:'show', action:'destroy'});

                                    /** populate modal. */
                                    let parent = destroy[i].parentElement.parentElement;
                                    this.helper.init({type: 'input', action: 'populate', target: 'stock-portfolio-destroy', el: parent, data: ['id', 'order', 'ticker', 'name', 'fee', 'share', 'capital']});

                                    /** set destroy event listener. */
                                    let portfolioSubmit = document.querySelector('.stock-portfolio-destroy > .modal-form > .modal-group > .modal-button > .button-submit > .modal-destroy');
                                    console.log(portfolioSubmit);
                                    if (portfolioSubmit) {
                                        portfolioSubmit.addEventListener('click', (e) => {
                                            this.backdrop({mode:'hide', action:'destroy', trigger: 'submit', input: portfolioSubmit});
                                        });
                                    }
                                });

                                /** set cancel event listener. */
                                let portfolioClose = document.querySelector('.stock-portfolio-destroy > .modal-form > .modal-group > .modal-close');
                                if (portfolioClose) {
                                    portfolioClose.addEventListener('click', (e) => {
                                        this.backdrop({mode:'hide', action:'destroy'});
                                    });
                                }

                                /** set cancel event listener. */
                                let portfolioCancel = document.querySelector('.stock-portfolio-destroy > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
                                if (portfolioCancel) {
                                    portfolioCancel.addEventListener('click', (e) => {
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
        /** query document to pinpoint modal element. */
        let modal = document.querySelector(`.stock-portfolio-${config.action}`);

        if (config.mode === 'show') {
            /** show modal. */
            modal.classList.add('backdrop');
            modal.style.display = 'block';
        }

        if (config.mode === 'hide') {
            /** hide modal. */
            modal.classList.remove('backdrop');
            modal.style.display = 'none';

            if (config.trigger === 'submit') {
                /** collect all input for processing. */
                let collect = this.helper.init({
                    type: 'input',
                    section: 'portfolio',
                    target: `stock-portfolio-${config.action}`,
                    action: 'value',
                    data: ['id', 'order', 'ticker', 'name', 'fee', 'share', 'capital']
                });

                /** check if inputs are empty and valid. */
                let result = this.helper.init({
                    type: 'validate',
                    data: collect
                });

                /** double check and then proceed. */
                if (Object.keys(result.error).length === 0) {
                    /** hide modal. */
                    modal.classList.remove('backdrop');
                    modal.style.display = 'none';

                    /** request access token and then post to backend. */
                    this.request({
                        method: 'POST',
                        table: 'portfolio',
                        order: result.success.order,
                        statement: config.action,
                        input: result.success
                    });

                    /** clear input. */
                    if (config.action === 'insert') {
                        this.helper.init({
                            type: 'input',
                            section: 'portfolio',
                            target: `stock-portfolio-${config.action}`,
                            action: 'clear',
                            data: ['order', 'ticker', 'name', 'fee', 'share', 'capital']
                        });
                    }
                } else {
                    /** display error. */
                    this.error({
                        target: `stock-portfolio-${config.action}`,
                        data: result.error
                    });

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
        if (config.method === 'GET') {
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.get('/api/stock-portfolio-retrieve', {
                    params: {
                        table: 'portfolio'
                    }
                }).then(response => {
                  console.log(response.data);
                    if (response.data.status === true) {
                        /** populate order element with data. */
                        if (response.data.stock) {
                            for (let i=0; i<response.data.stock.order.length; i++) {
                                this.helper.init({type:'node', id:`${i+1}`, target:'stock-order', statement: response.data.sql, input: response.data.stock.order[i]});
                            }
                        }
                    }
                });
            });
        }

        /** store data. */
        if (config.method === 'POST') {
            axios.get('/sanctum/csrf-cookie').then(() => {
                axios.post('/api/stock-portfolio-store', {
                    table: config.table,
                    order: config.input.order.toLowerCase(),
                    statement: config.statement,
                    input: config.input
                }).then(response => {
                    /** populate order element with data. */
                    console.log(response.data);
                    if (response.data.status === true) {
                        /** add or update element in document tree. */
                        if (response.data.sql === 'select') {
                            for (let key in response.data.stock) {
                                this.helper.init({type:'node', id: 0, target:'stock-order', statement: response.data.sql, input: response.data.stock[key]});
                            }
                        }
                        /** add or update element in document tree. */
                        if (response.data.sql === 'update') {
                            for (let key in response.data.stock) {
                                this.helper.init({type:'node', target:'stock-order', statement: response.data.sql, input: response.data.stock[key]});
                            }
                        }
                        /** remove element in document tree. */
                        if (response.data.sql === 'destroy') {
                          console.log(response.data);
                            this.helper.init({type:'node', target:'stock-order', statement: response.data.sql, input: response.data.stock});
                        }

                        /** display success message. */
                        this.helper.init({
                            type: 'message',
                            status: response.data.status,
                            message: response.data.message
                        });
                    }

                    /** display error message. */
                    if (response.data.status === false) {
                        this.helper.init({
                            type: 'message',
                            status: response.data.status,
                            message: response.data.message
                        });
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
        setTimeout(() => {
            for (let key in config.data) {
                let display = document.querySelector(`.${config.target} > .modal-form > .modal-group > .modal-${key}-error`);
                display.textContent = '';
            }
        }, 5000);
    }
}
export default new stock_portfolio();
