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
            if (e.target.dataset.sidebar === "stock_trades") {
                /** clone template. */
                let content = this.template.content.cloneNode(true);
                // /** query document and do conditional statement base on the result. */
                let check = document.querySelector(".stock-trade");
                if (check === null || check === undefined) {
                    /** retrieve data .*/
                    this.request({ method: "GET", provider: "local", table: "trade" });
                    /** clear element before appending. */
                    this.element.innerHTML = "";
                    /** append template content. */
                    this.element.appendChild(content);
                    /** fetch button. */
                    let fetch = document.querySelector(
                        `.card > .header > .meta > .right > .click-trade-fetch`
                    );
                    if (fetch) {
                        fetch.addEventListener("click", (e) => {
                            this.request({ method: "POST", provider: "simple" });
                        });
                    }
                    /** finance button. */
                    let finance = document.querySelector(
                        `.card > .header > .meta > .right > .click-trade-finance`
                    );
                    if (finance) {
                        finance.addEventListener("click", (e) => {
                            this.request({ method: "POST", provider: "reports" });
                        });
                    }
                    /** finance button. */
                    let price = document.querySelector(
                        `.card > .header > .meta > .right > .click-trade-price`
                    );
                    if (price) {
                        price.addEventListener("click", (e) => {
                            this.request({ method: "POST", provider: "prices" });
                        });
                    }

                    /** add modal code block. */
                    setTimeout(() => {
                        let add = document.querySelectorAll(
                            ".stock-trade > .items > .action > .add"
                        );
                        if (add) {
                            for (let i = 0; i < add.length; i++) {
                                add[i].addEventListener("click", () => {
                                    /** show update modal. */
                                    this.backdrop({
                                        mode: "show",
                                        provider: "edge",
                                    });

                                    // /** populate modal. */
                                    let parent =
                                        add[i].parentElement.parentElement;
                                    this.helper.init({
                                        type: "input",
                                        action: "populate",
                                        target: "stock-trade-insert",
                                        el: parent,
                                        data: [
                                            "id",
                                            "symbol",
                                            "edge",
                                        ],
                                    });
                                    /** set submit event listener. */
                                    let submit = document.querySelector(".stock-trade-insert > .modal-form > .modal-group > .modal-button > .button-submit > .modal-insert");
                                    if (submit) {
                                        submit.addEventListener('click', () => {
                                            this.backdrop({ action: 'insert', trigger: 'submit' });
                                        });
                                    }


                                });
                            }
                            /** query document close button. */
                            let tradeClose = document.querySelector(
                                ".stock-trade-insert > .modal-form > .modal-group > .modal-close"
                            );
                            if (tradeClose) {
                                tradeClose.addEventListener("click", (e) => {
                                    this.backdrop({
                                        mode: "hide",
                                        action: "insert",
                                    });
                                });
                            }

                            /** query document cancel button. */
                            let tradeCancel = document.querySelector(
                                ".stock-trade-insert > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel"
                            );
                            if (tradeCancel) {
                                tradeCancel.addEventListener("click", (e) => {
                                    this.backdrop({
                                        mode: "hide",
                                        action: "insert",
                                    });
                                });
                            }
                        }
                    }, 10000);

                    let info = document.querySelector(
                        ".card > .header > .meta > .right > .messenger"
                    );
                    info.classList.add("info");
                    info.textContent =
                        "Add button enabled right after this message disappear.";
                    setTimeout(() => {
                        info.classList.remove("info");
                    }, 9000);
                }
            }
        });
    }
    /** function on how backdrop behaves. */
    backdrop(config) {
        /** query document to pinpoint modal element. */
        let modal = document.querySelector(`.stock-trade-insert`);

        if (config["mode"] === "show") {
            /** show modal. */
            modal.classList.add("backdrop");
            modal.style.display = "block";

            /** insert fetch edge. */
            if (config["provider"] === 'edge') {
                let fetch = document.querySelector(`.stock-trade-insert > .modal-form > .modal-group > .modal-gecko > .modal-fetch`);
                fetch.addEventListener('click', () => {
                    let edge = document.querySelector(`.stock-trade-insert > .modal-form > .modal-group > .modal-gecko > .modal-edge`).value;
                    if (edge) {
                        /** retrieve data .*/
                        this.request({ method: 'GET', provider: 'edge', section: "watches", input: edge });
                    }
                });
            }
        }

        if (config["mode"] === "hide") {
            /** hide modal. */
            modal.classList.remove("backdrop");
            modal.style.display = "none";
        }

        if (config["trigger"] === "submit") {
            /** collect all input for processing. */
            let collect = this.helper.init({
                type: "input",
                section: "watchlist",
                target: "stock-trade-insert",
                action: "value",
                data: [
                    "symbol",
                    "edge",
                    "liabilities",
                    "equity",
                    "price",
                    "earning",
                    "income",
                    "gross"
                ],
            });
            /** check if inputs are empty and valid. */
            let result = this.helper.init({
                type: "validate",
                data: collect,
            });

            /** double check and then proceed. */
            if (Object.keys(result["error"]).length === 0) {
                /** sanitize input. */
                let sanitize = this.helper.init({ type: 'sanitize', action: 'comma', condition: ['symbol', 'edge', 'liabilities', 'equity', 'price', 'earning', 'income', 'gross'], data: result.success });

                /** request access token and then post to backend. */
                this.request({
                    method: "POST",
                    provider: "watches",
                    table: "watchlist",
                    statement: config["action"],
                    input: sanitize,
                });

                setInterval(() => {
                    this.helper.init({
                        type: "input",
                        section: "watchlist",
                        target: "stock-trade-insert",
                        action: "clear",
                        data: [
                            "liabilities",
                            "equity",
                            "price",
                            "earning",
                            "income",
                            "gross"
                        ],
                    });
                }, 10000);
                /** hide modal. */
                modal.classList.remove("backdrop");
                modal.style.display = "none";
            } else {
                /** display error. */
                this.error({
                    target: "stock-trade-insert",
                    data: result["error"],
                });
                /** show modal. */
                modal.classList.add("backdrop");
                modal.style.display = "block";
            }
        }
    }
    /** function to process http request. */
    request(config) {
        /** retrieve data. */
        if (config["method"] === "GET") {
            if (config['provider'] === 'local') {
                axios.get("/sanctum/csrf-cookie").then((response) => {
                    axios
                        .get("/api/stock-trade-retrieve", {
                            params: { table: config["table"] },
                        })
                        .then((response) => {
                            if (response.data.status === true) {
                                if (response.data.indexes.length != 0) {
                                    /** populate indexes element with data. */
                                    if (response.data.indexes) {
                                        for (
                                            let i = 0;
                                            i < response.data.indexes.length;
                                            i++
                                        ) {
                                            /** add item to document. */
                                            this.helper.init({
                                                type: "node",
                                                id: `${i + 1}`,
                                                target: "stock-index",
                                                statement: response.data.sql,
                                                input: response.data.indexes[i],
                                            });
                                        }
                                    }
                                    /** populate trade element with data. */
                                    if (response.data.stocks) {
                                        for (
                                            let x = 0;
                                            x < response.data.stocks.length;
                                            x++
                                        ) {
                                            /** add item to document. */
                                            this.helper.init({
                                                type: "node",
                                                id: `${x + 1}`,
                                                target: "stock-trade",
                                                statement: response.data.sql,
                                                input: response.data.stocks[x],
                                            });
                                        }
                                    }
                                }
                            }
                        });
                });
            }
            /** fetch stock information. */
            if (config['provider'] === "edge") {
                axios.get("/sanctum/csrf-cookie").then((response) => {
                    axios
                        .get("/stock-reports-retrieve", {
                            params: { section: config["section"], id: config["input"] },
                        })
                        .then((response) => {
                            if (response.data.status === true) {
                                /** populate modal. */
                                if (response.data.reports) {
                                    for (let x in response.data.reports) {
                                        document.querySelector(`.stock-trade-insert > .modal-form > .modal-group > .modal-${x}`).value = response.data.reports[x].toLocaleString('en');
                                    }
                                }
                            }
                        });
                });
            }
        }

        /** store data. */
        if (config["method"] === "POST") {
            /** fetch stock list. */
            if (config["provider"] === "simple") {
                axios
                    .get("https://phisix-api4.appspot.com/stocks.json", {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Content-Type": "application/json",
                        },
                        withCredentials: false,
                        credentials: "same-origin",
                    })
                    .then((response) => {
                        if (response.data.stock.length != 0) {
                            let push = setInterval(() => {
                                /** remove first array element. */
                                let stock = response.data.stock[0];
                                /** format item data */
                                let input = {
                                    name: this.helper.init({
                                        type: "titlecase",
                                        string: stock.name,
                                    }),
                                    symbol: stock.symbol,
                                    price: stock.price.amount,
                                    change: stock.percent_change,
                                    volume: stock.volume,
                                };
                                /** get csrf token and send post request. */
                                axios
                                    .get("/sanctum/csrf-cookie")
                                    .then((response) => {
                                        axios
                                            .post("/api/stock-trade-store", {
                                                table: "trade",
                                                statement: "fetch",
                                                input: input,
                                            })
                                            .then((response) => {
                                                /** send user a message. */
                                                this.helper.init({
                                                    type: "message",
                                                    status: response.data
                                                        .status,
                                                    message:
                                                        response.data.message,
                                                });
                                            });
                                    });
                                /** remove first array element. */
                                response.data.stock.shift();
                                /** clear interval when array reach zero. */
                                if (response.data.stock.length === 0) {
                                    /** send user a message. */
                                    this.helper.init({
                                        type: "message",
                                        status: true,
                                        message: "Processed completed.",
                                    });
                                    /** clear interval. */
                                    clearInterval(push);
                                    /** chat console. */
                                    console.log("Processed completed.");
                                }
                            }, 5000);
                        } else {
                            console.log("All records are up to date.");
                        }
                    });
            }
            /** fetch financial information */
            if (config["provider"] === "reports") {
                axios.get("/sanctum/csrf-cookie").then((response) => {
                    axios
                        .get("/stock-reports-retrieve", {
                            params: { section: "stocks" },
                        })
                        .then((response) => {
                            if (response.data.status === true) {
                                if (response.data.stocks.length !== 0) {
                                    let stocks = setInterval(() => {
                                        /** remove first array element. */
                                        let stock = response.data.stocks[0];

                                        /** get csrf token and send post request. */
                                        axios
                                            .get("/sanctum/csrf-cookie")
                                            .then((response) => {
                                                axios
                                                    .post(
                                                        "/stock-reports-store",
                                                        {
                                                            section: "reports",
                                                            id: stock.edge,
                                                        }
                                                    )
                                                    .then((response) => {
                                                        /** send user a message. */
                                                        this.helper.init({
                                                            type: "message",
                                                            status: response
                                                                .data.status,
                                                            message:
                                                                response.data
                                                                    .message,
                                                        });
                                                    });
                                            });
                                        /** remove first array element. */
                                        response.data.stocks.shift();
                                        /** clear interval when array reach zero. */
                                        if (response.data.stocks.length === 0) {
                                            /** send user a message. */
                                            this.helper.init({
                                                type: "message",
                                                status: true,
                                                message: "Processed completed.",
                                            });
                                            /** clear interval. */
                                            clearInterval(stocks);
                                            /** chat console. */
                                            console.log("Processed completed.");
                                        }
                                    }, 5000);
                                } else {
                                    console.log("All records are up to date.");
                                }
                            }
                            /** send user a message. */
                            this.helper.init({
                                type: "message",
                                status: response.data.status,
                                message: response.data.message,
                            });
                        });
                });
            }

            /** fetch financial information */
            if (config["provider"] === "prices") {
                axios.get("/sanctum/csrf-cookie").then((response) => {
                    axios
                        .get("/stock-reports-retrieve", {
                            params: { section: "stocks" },
                        })
                        .then((response) => {
                            if (response.data.status === true) {
                                if (response.data.stocks.length !== 0) {
                                    let stocks = setInterval(() => {
                                        /** remove first array element. */
                                        let stock = response.data.stocks[0];
                                        /** get csrf token and send post request. */
                                        axios
                                            .get("/sanctum/csrf-cookie")
                                            .then((response) => {
                                                axios
                                                    .post(
                                                        "/stock-reports-store",
                                                        {
                                                            section: "prices",
                                                            id: stock.edge,
                                                        }
                                                    )
                                                    .then((response) => {
                                                        /** send user a message. */
                                                        this.helper.init({
                                                            type: "message",
                                                            status: response
                                                                .data.status,
                                                            message:
                                                                response.data
                                                                    .message,
                                                        });
                                                    });
                                            });
                                        /** remove first array element. */
                                        response.data.stocks.shift();
                                        /** clear interval when array reach zero. */
                                        if (response.data.stocks.length === 0) {
                                            /** send user a message. */
                                            this.helper.init({
                                                type: "message",
                                                status: true,
                                                message: "Processed completed.",
                                            });
                                            /** clear interval. */
                                            clearInterval(stocks);
                                            /** chat console. */
                                            console.log("Processed completed.");
                                        }
                                    }, 5000);
                                } else {
                                    console.log("All records are up to date.");
                                }
                            }

                            /** send user a message. */
                            this.helper.init({
                                type: "message",
                                status: response.data.status,
                                message: response.data.message,
                            });
                        });
                });
            }
            /** post watchlist. */
            if (config['provider'] === "watches") {
                axios.get('/sanctum/csrf-cookie').then(() => {
                    axios.post('/api/stock-watchlist-store', {
                        table: config.table,
                        statement: config.statement,
                        input: config.input
                    }).then(response => {
                        /** populate order element with data. */
                        if (response.data.status === true) {
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
    }
    /** function to display error. */
    error(config) {
        /** run trough it all. */
        for (let key in config['data']) {
            let display = document.querySelector(`.${config['target']} > .modal-form > .modal-group > .modal-${key}-error`);
            display.textContent = config['data'][key];
        }
        /** clear all error messages after five seconds. */
        setTimeout(() => {
            for (let key in config['data']) {
                let display = document.querySelector(`.${config['target']} > .modal-form > .modal-group > .modal-${key}-error`);
                display.textContent = '';
            }
        }, 5000);
    }
}
export default new stock_trade();
