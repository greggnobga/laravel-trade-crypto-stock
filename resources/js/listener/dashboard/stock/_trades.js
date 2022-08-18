/** import helper function. */
import helpers from "../../../helpers/helpers.js";

class stock_trade {
    /** default actions. */
    constructor() {
        this.event = document.querySelector(".speak-stock-trades");
        this.template = document.querySelector(".stage-stock-trades");
        this.element = document.querySelector(".perform");
        this.helper = helpers;
    }

    /** fire it on. */
    init() {
        /** setup initial listener. */
        this.event.addEventListener("click", (e) => {
            if (e.target.dataset.sidebar === 'stock_trades') {
                /** clone template. */
                let content = this.template.content.cloneNode(true);
                // /** query document and do conditional statement base on the result. */
                let check = document.querySelector('.stock-trade');
                if (check === null || check === undefined) {
                  /** retrieve data .*/
                  this.request({method: 'GET', table:'trade'});
                    /** clear element before appending. */
                    this.element.innerHTML = '';
                    /** append template content. */
                    this.element.appendChild(content);
                    /** fetch button. */
                    let fetch = document.querySelector(`.card > .header > .meta > .right > .click-trade-fetch`);
                    if (fetch) {
                      fetch.addEventListener('click', (e) => {
                        this.request({method:'POST', action: 'fetch'});
                      });
                    }

                    /** insert modal code block. */
                    // let record = document.querySelector('.click-order-record');
                    // if (record) {
                    //     record.addEventListener("click", (e) => {
                    //         /** show insert modal. */
                    //         if (e.target.dataset.action === 'crypto') {
                    //             /** show modal. */
                    //             this.backdrop({mode:'show', action:'insert'});
                    //
                    //             /** set submit event listener. */
                    //             let portfolioSubmit = document.querySelector('.crypto-portfolio-insert > .crypto-modal > .modal-group > .modal-button > .button-submit > .modal-insert');
                    //             if (portfolioSubmit) {
                    //                 portfolioSubmit.addEventListener('click', (e) => {
                    //                     this.backdrop({mode:'hide', action:'insert', trigger: 'submit', input: portfolioSubmit});
                    //                 });
                    //             }
                    //         }
                    //
                    //         /** set insert event listener. */
                    //         let portfolioCancel = document.querySelector('.crypto-portfolio-insert > .crypto-modal > .modal-group > .modal-close');
                    //         if (portfolioCancel) {
                    //             portfolioCancel.addEventListener('click', (e) => {
                    //                 this.backdrop({mode:'hide', action:'insert'});
                    //             });
                    //         }
                    //
                    //         /** set close event listener. */
                    //         let portfolioClose = document.querySelector('.crypto-portfolio-insert > .crypto-modal > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
                    //         if (portfolioClose) {
                    //             portfolioClose.addEventListener('click', (e) => {
                    //                 this.backdrop({mode:'hide', action:'insert'});
                    //             });
                    //         }
                    //     });
                    // }
                    /** update modal code block. */
                    // setTimeout( () => {
                    //     let update = document.querySelectorAll('.crypto-order > .items > .action > .update');
                    //     if (update) {
                    //         for (let i = 0; i < update.length; i++) {
                    //             update[i].addEventListener("click", () => {
                    //                 /** show update modal. */
                    //                 this.backdrop({mode:'show', action:'update'});
                    //
                    //                 /** populate modal. */
                    //                 let parent = update[i].parentElement.parentElement;
                    //                 this.helper.init({type: 'input', action: 'populate', target: 'crypto-portfolio-update', el: parent, data: ['id', 'order', 'wallet', 'name', 'coin', 'quantity', 'capital']});
                    //
                    //                 /** set submit event listener. */
                    //                 let portfolioSubmit = document.querySelector('.crypto-portfolio-update > .crypto-modal > .modal-group > .modal-button > .button-submit > .modal-update');
                    //                 if (portfolioSubmit) {
                    //                     portfolioSubmit.addEventListener('click', (e) => {
                    //                         this.backdrop({mode:'hide', action:'update', trigger: 'submit', input: portfolioSubmit});
                    //                     });
                    //                 }
                    //             });
                    //         }
                    //         /** query document close button. */
                    //         let portfolioClose = document.querySelector('.crypto-portfolio-update > .crypto-modal > .modal-group > .modal-close');
                    //         if (portfolioClose) {
                    //             portfolioClose.addEventListener('click', (e) => {
                    //                 this.backdrop({mode:'hide', action:'update'});
                    //             });
                    //         }
                    //
                    //         /** query document update button. */
                    //         let portfolioCancel = document.querySelector('.crypto-portfolio-update > .crypto-modal > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
                    //         if (portfolioCancel) {
                    //             portfolioCancel.addEventListener('click', (e) => {
                    //                 this.backdrop({mode:'hide', action:'update'});
                    //             });
                    //         }
                    //     }
                    // }, 10000);
                    /** destroy modal code block. */
                    // setTimeout( () => {
                    //     let destroy = document.querySelectorAll('.crypto-order > .items > .action > .destroy');
                    //     if (destroy) {
                    //         for (let i = 0; i < destroy.length; i++) {
                    //             destroy[i].addEventListener("click", () => {
                    //                 /** show destroy modal. */
                    //                 this.backdrop({mode:'show', action:'destroy'});
                    //
                    //                 /** populate modal. */
                    //                 let parent = destroy[i].parentElement.parentElement;
                    //                 this.helper.init({type: 'input', action: 'populate', target: 'crypto-portfolio-destroy', el: parent, data: ['id', 'order', 'wallet', 'name', 'coin', 'quantity', 'capital']});
                    //
                    //                 /** set destroy event listener. */
                    //                 let portfolioSubmit = document.querySelector('.crypto-portfolio-destroy > .crypto-modal > .modal-group > .modal-button > .button-submit > .modal-destroy');
                    //                 if (portfolioSubmit) {
                    //                     portfolioSubmit.addEventListener('click', (e) => {
                    //                         this.backdrop({mode:'hide', action:'destroy', trigger: 'submit', input: portfolioSubmit});
                    //                     });
                    //                 }
                    //             });
                    //
                    //             /** set cancel event listener. */
                    //             let portfolioClose = document.querySelector('.crypto-portfolio-destroy > .crypto-modal > .modal-group > .modal-close');
                    //             if (portfolioClose) {
                    //                 portfolioClose.addEventListener('click', (e) => {
                    //                     this.backdrop({mode:'hide', action:'destroy'});
                    //                 });
                    //             }
                    //
                    //             /** set cancel event listener. */
                    //             let portfolioCancel = document.querySelector('.crypto-portfolio-destroy > .crypto-modal > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
                    //             if (portfolioCancel) {
                    //                 portfolioCancel.addEventListener('click', (e) => {
                    //                     this.backdrop({mode:'hide', action:'destroy'});
                    //                 });
                    //             }
                    //         }
                    //     }
                    // }, 10000);
                    //
                    // let info = document.querySelector('.card > .header > .meta > .right > .messenger');
                    // info.classList.add('info');
                    // info.textContent = 'Update button enabled right after this message disappear.';
                    // setTimeout(() => { info.classList.remove('info'); }, 9000);
                }
            }

        });
    }
    /** function on how backdrop behaves. */
    // backdrop(config) {
    //     /** query document to pinpoint modal element. */
    //     let modal = document.querySelector(`.crypto-portfolio-${config['action']}`);
    //
    //     if (config['mode'] === 'show') {
    //         /** show modal. */
    //         modal.classList.add('backdrop');
    //         modal.style.display = 'block';
    //     }
    //
    //     if (config['mode'] === 'hide') {
    //         /** hide modal. */
    //         modal.classList.remove('backdrop');
    //         modal.style.display = 'none';
    //
    //         if (config['trigger'] === 'submit') {
    //             /** collect all input for processing. */
    //             let collect = this.helper.init({type:'input', section: 'portfolio', target: `crypto-portfolio-${config['action']}`, action: 'value', data: ['id', 'wallet', 'order', 'name', 'coin', 'quantity', 'capital']});
    //
    //             /** check if inputs are empty and valid. */
    //             let result = this.helper.init({type: 'validate', data: collect});
    //
    //             /** double check and then proceed. */
    //             if (Object.keys(result['error']).length === 0) {
    //                 /** hide modal. */
    //                 modal.classList.remove('backdrop');
    //                 modal.style.display = 'none';
    //
    //                 /** request access token and then post to backend. */
    //                 this.request({method: 'POST', table:'portfolio', statement:config['action'], input:result['success']});
    //
    //                 /** clear input. */
    //                 if (config['action'] === 'insert') {
    //                     this.helper.init({type:'input', section: 'portfolio', target: `crypto-portfolio-${config['action']}`, action: 'clear', data: ['wallet', 'name', 'coin', 'quantity', 'capital']});
    //                 }
    //             } else {
    //                 /** display error. */
    //                 this.error({target: `crypto-portfolio-${config['action']}`, data:result['error']});
    //
    //                 /** show modal. */
    //                 modal.classList.add('backdrop');
    //                 modal.style.display = 'block';
    //             }
    //         }
    //     }
    // }
    /** function to process http request. */
    request(config) {
        /** retrieve data. */
        if (config.method === 'GET') {
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.get('/api/stock-trade-retrieve', {
                    params: {table: 'trade'}
                }).then(response => {
                  if (response.data.status === true) {
                    if (response.data.indexes.length != 0) {
                      /** populate indexes element with data. */
                      if (response.data.indexes) {
                        for (let i=0; i<response.data.indexes.length; i++) {
                          /** add item to document. */
                          this.helper.init({type:'node', id:`${i+1}`, target:'stock-index', statement: response.data.sql, input: response.data.indexes[i]});
                          }
                      }
                      /** populate trade element with data. */
                      if (response.data.stocks) {
                        for (let x=0; x<response.data.stocks.length; x++) {
                          /** add item to document. */
                          this.helper.init({type:'node', id:`${x+1}`, target:'stock-trade', statement: response.data.sql, input: response.data.stocks[x]});
                          }
                      }
                    }
                  }
                });
            });
        }

        /** store data. */
        if (config.method === 'POST') {
          /** fetch stock list. */
          if (config.action === 'fetch') {
            axios.get('https://phisix-api4.appspot.com/stocks.json', {
              headers: {
                'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'application/json',
                },
                withCredentials: false,
                credentials: 'same-origin',
              }).then( response => {
                if (response.data.stock.length != 0) {
                  let push = setInterval(() => {
                      /** remove first array element. */
                      let stock = response.data.stock[0];
                    /** format item data */
                    let input = {
                      name: this.helper.init({type: 'titlecase', string: stock.name}),
                      symbol: stock.symbol,
                      price: stock.price.amount,
                      change: stock.percent_change,
                      volume: stock.volume,
                    };
                    /** get csrf token and send post request. */
                    axios.get('/sanctum/csrf-cookie').then(response => {
                      axios.post('/api/stock-trade-store', {
                        table: 'trade',
                        statement: 'fetch',
                        input: input,
                        }).then(response => {
                          /** send user a message. */
                          this.helper.init({type: 'message', status: response.data.status, message: response.data.message});
                        });
                      });
                      /** remove first array element. */
                      response.data.stock.shift();
                      /** clear interval when array reach zero. */
                      if (response.data.stock.length === 0) {
                        clearInterval(push);
                      }
                  }, 5000);
                }
              });
          }
        }
    }
    /** function to display error. */
    // error(config) {
    //     /** run trough it all. */
    //     for (let key in config['data']) {
    //         let display = document.querySelector(`.${config['target']} > .crypto-modal > .modal-group > .modal-${key}-error`);
    //         display.textContent = config['data'][key];
    //     }
    //     /** clear all error messages after five seconds. */
    //     setTimeout( () => {
    //         for (let key in config['data']) {
    //             let display = document.querySelector(`.${config['target']} > .crypto-modal > .modal-group > .modal-${key}-error`);
    //             display.textContent = '';
    //         }
    //     }, 5000);
    // }
}
export default new stock_trade();
