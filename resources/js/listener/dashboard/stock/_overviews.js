/** import helper function. */
import helpers from "../../../helpers/helpers.js";

class stock_overview {
    /** default actions. */
    constructor() {
        this.event = document.querySelector(".speak-stock-overviews");
        this.template = document.querySelector(".stage-stock-overviews");
        this.element = document.querySelector(".perform");
        this.helper = helpers;
    }

    init() {
        /** setup overview listener. */
        this.event.addEventListener("click", (e) => {
            if (e.target.dataset.sidebar === 'stock_overviews') {
                /** clone template. */
                let content = this.template.content.cloneNode(true);
                /** clear content. */
                this.element.innerHTML = '';
                /** inject content. */
                this.element.appendChild(content);
                /** fetch data. */
                this.request();
            }
        });
    }

    request() {
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.get('/api/stock-overview-retrieve').then(response => {
                /** populate portfolio box. */
                if (response.data.stock.portfolios) {
                    /** query element. */
                    let port = document.querySelector(`.stock-overview > .boxes > [data-section='${response.data.stock.portfolios.section}'] > .body`);
                    /** loop through response. */
                    for (let item in response.data.stock.portfolios) {
                        /** create parent div. */
                        let parent = document.createElement('div');
                        parent.classList.add('two-column');
                        if (response.data.stock.portfolios.hasOwnProperty(item)) {
                            /** ignore section key. */
                            if (item === 'section') {
                                continue;
                            }
                            /** create key div. */
                            let one = document.createElement('div');
                            one.classList.add('one');
                            one.textContent = item.charAt(0).toUpperCase() + item.slice(1);
                            /** append parent. */
                            parent.appendChild(one);
                            /** create value div. */
                            let two = document.createElement('div');
                            two.classList.add('two');
                            two.textContent = response.data.stock.portfolios[item].toLocaleString('en');
                            if (item === 'capital') {
                                two.textContent = response.data.stock.portfolios[item].toLocaleString('en', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                });
                            }

                            /** append parent. */
                            parent.appendChild(two);
                        }
                        /** append port. */
                        port.appendChild(parent);
                    }
                }
                /** populate watchlist box. */
                if (response.data.stock.watchlists) {
                    /** query element. */
                    let watchlist = document.querySelector(`.stock-overview > .boxes > [data-section='${response.data.stock.watchlists.section}'] > .body`);
                    /** loop through response. */
                    for (let item in response.data.stock.watchlists) {
                        /** create parent div. */
                        let parent = document.createElement('div');
                        parent.classList.add('one-column');
                        if (response.data.stock.watchlists.hasOwnProperty(item)) {
                            /** ignore section key. */
                            if (item === 'section') {
                                continue;
                            }
                            /** create key div. */
                            let one = document.createElement('h2');
                            one.classList.add('one');
                            one.textContent = response.data.stock.watchlists[item];
                            /** append parent. */
                            parent.appendChild(one);
                        }
                        /** append port. */
                        watchlist.appendChild(parent);
                    }
                }
                /** populate trade box. */
                if (response.data.stock.trades) {
                    /** query element. */
                    let trade = document.querySelector(`.stock-overview > .boxes > [data-section='${response.data.stock.trades.section}'] > .body`);
                    /** loop through response. */
                    for (let item in response.data.stock.trades) {
                        /** create parent div. */
                        let parent = document.createElement('div');
                        parent.classList.add('one-column');
                        if (response.data.stock.trades.hasOwnProperty(item)) {
                            /** ignore section key. */
                            if (item === 'section') {
                                continue;
                            }
                            /** create key div. */
                            let one = document.createElement('h2');
                            one.classList.add('one');
                            one.textContent = response.data.stock.trades[item];
                            /** append parent. */
                            parent.appendChild(one);
                        }
                        /** append port. */
                        trade.appendChild(parent);
                    }
                }
                /** populate note box. */
                if (response.data.stock.notes) {
                    /** query element. */
                    let note = document.querySelector(`.stock-overview > .boxes > [data-section='${response.data.stock.notes.section}'] > .body`);
                    /** loop through response. */
                    for (let item in response.data.stock.notes) {
                        /** create parent div. */
                        let parent = document.createElement('div');
                        parent.classList.add('one-column');
                        if (response.data.stock.notes.hasOwnProperty(item)) {
                            /** ignore section key. */
                            if (item === 'section') {
                                continue;
                            }
                            /** create key div. */
                            let one = document.createElement('h2');
                            one.classList.add('one');
                            one.textContent = response.data.stock.notes[item];
                            /** append parent. */
                            parent.appendChild(one);
                        }
                        /** append port. */
                        note.appendChild(parent);
                    }
                }
            });
        });
    }
}

export default new stock_overview();
