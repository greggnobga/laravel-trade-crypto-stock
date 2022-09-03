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
                let trade = document.querySelector(".stock-trade");
                if (trade === null || trade === undefined) {
                    /** retrieve data .*/
                    this.request({ method: "GET", provider: "local", table: "trade" });
                    /** clear element before appending. */
                    this.element.innerHTML = "";
                    /** append template content. */
                    this.element.appendChild(content);
                    /** fetch button. */
                    let fetch = document.querySelector(".card > .header > .meta > .right > .click-trade-fetch");
                    if (fetch) {
                        let callback = () => {
                            this.request({ method: "POST", provider: "simple" });
                            /** remove event listener after firing once. */
                            fetch.removeEventListener("click", callback);
                            /** disabled when no listener around. */
                            fetch.disabled = true;
                        };
                        /** add event listener. */
                        fetch.addEventListener("click", callback, false);
                    }
                    /** finance button. */
                    let finance = document.querySelector(".card > .header > .meta > .right > .click-trade-finance");
                    if (finance) {
                        let callback = () => {
                            this.request({ method: "POST", provider: "reports" });
                            /** remove event listener after firing once. */
                            finance.removeEventListener("click", callback);
                            /** disabled when no listener around. */
                            finance.disabled = true;
                        };
                        /** add event listener. */
                        finance.addEventListener("click", callback, false);
                    }
                    /** finance button. */
                    let price = document.querySelector(".card > .header > .meta > .right > .click-trade-price");
                    if (price) {
                        let callback = () => {
                            this.request({ method: "POST", provider: "prices" });
                            /** remove event listener after firing once. */
                            price.removeEventListener("click", callback);
                            /** disabled when no listener around. */
                            price.disabled = true;
                        };
                        /** add event listener. */
                        price.addEventListener("click", callback, false);
                    }
                    /** add modal code block. */
                    setTimeout(() => {
                        let watch = document.querySelectorAll(".stock-trade > .items > .action > .watch");
                        if (watch) {
                            for (let i = 0; i < watch.length; i++) {
                                watch[i].addEventListener("click", () => {
                                    /** show update modal. */
                                    this.backdrop({
                                        action: "insert",
                                        mode: "show",
                                        provider: "edge",
                                    });

                                    // /** populate modal. */
                                    let parent =
                                        watch[i].parentElement.parentElement;
                                    this.helper.init({
                                        type: "input",
                                        action: "populate",
                                        target: "stock-trade-insert",
                                        el: parent,
                                        data: ["id", "symbol", "edge"],
                                    });
                                    /** set event listener. */
                                    let submit = document.querySelector(".stock-trade-insert > .modal-form > .modal-group > .modal-button > .button-submit > .modal-insert");
                                    if (submit) {
                                        let callback = () => {
                                            this.backdrop({ action: "insert", mode: "submit", element: submit, callback: callback });
                                        };
                                        /** add event listener. */
                                        submit.addEventListener("click", callback, { once: true });
                                    }
                                });
                            }
                            /** query document close button. */
                            let close = document.querySelector(".stock-trade-insert > .modal-form > .modal-group > .modal-close");
                            if (close) {
                                let callback = () => {
                                    this.backdrop({ action: "insert", mode: "hide" });
                                };
                                /** add event listener. */
                                close.addEventListener("click", callback, false);
                            }
                            /** query document cancel button. */
                            let cancel = document.querySelector(".stock-trade-insert > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");
                            if (cancel) {
                                let callback = () => {
                                    this.backdrop({ action: "insert", mode: "hide" });
                                };
                                /** add event listener. */
                                cancel.addEventListener("click", callback, false);
                            }
                        }
                    }, 10000);

                    let info = document.querySelector(".card > .header > .meta > .right > .messenger");
                    info.classList.add("info");
                    info.textContent = "Watch button enabled right after this message disappear.";
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
        let modal = document.querySelector(`.stock-trade-${config["action"]}`,);

        if (config["mode"] === "show") {
            /** show modal. */
            modal.classList.add("backdrop");
            modal.style.display = "block";
            /** clear input if insert. */
            if (config["action"] === "insert") {
                this.helper.init({
                    type: "input",
                    section: "watchlist",
                    target: `stock-trade-${config["action"]}`,
                    action: "clear",
                    data: ["liabilities", "equity", "price", "earning", "income", "gross"],
                });
            }
            /** insert fetch edge. */
            if (config["provider"] === "edge") {
                let fetch = document.querySelector(`.stock-trade-${config["action"]} > .modal-form > .modal-group > .modal-gecko > .modal-fetch`);
                if (fetch) {
                    let callback = () => {
                        let edge = document.querySelector(`.stock-trade-${config["action"]} > .modal-form > .modal-group > .modal-gecko > .modal-edge`).value;
                        if (edge) {
                            /** retrieve data .*/
                            this.request({ method: "GET", provider: "edge", action: "insert", section: "watches", caller: "trade", input: edge });
                            /** disable after clicked. */
                            fetch.disabled = true;
                            /** remove event listener. */
                            fetch.removeEventListener("click", callback);
                        }
                    };
                    /** add event listener. */
                    fetch.addEventListener("click", callback, { once: true });
                }
                /** disable after clicked. */
                fetch.disabled = false;
            }
        }

        if (config["mode"] === "hide") {
            /** hide modal. */
            modal.classList.remove("backdrop");
            modal.style.display = "none";
        }

        if (config["mode"] === "submit") {
            /** disable after clicked. */
            config["element"].disabled = true;
            /** collect all input for processing. */
            let collect = this.helper.init({
                type: "input",
                section: "watchlist",
                target: `stock-trade-${config["action"]}`,
                action: "value",
                data: ["id", "symbol", "edge", "symbol", "edge", "liabilities", "equity", "price", "earning", "income", "gross"],
            });
            /** check if inputs are empty and valid. */
            let result = this.helper.init({
                type: "validate",
                data: collect,
            });
            /** double check and then proceed. */
            if (Object.keys(result["error"]).length === 0) {
                /** sanitize input. */
                let sanitize = this.helper.init({
                    type: "sanitize",
                    action: "comma",
                    condition: ["symbol", "edge", "liabilities", "equity", "price", "earning", "income", "gross"],
                    data: result["success"]
                });
                /** request access token and then post to backend. */
                this.request({
                    method: "POST",
                    provider: "watches",
                    table: "watchlist",
                    statement: config["action"],
                    input: sanitize,
                });
                /** disable after clicked. */
                config["element"].disabled = false;
            } else {
                /** remove listener. */
                config["element"].removeEventListener('click', config['callback']);
            }
            /** remove listener. */
            config["element"].removeEventListener('click', config['callback']);
            /** hide modal. */
            modal.classList.remove("backdrop");
            modal.style.display = "none";
        }
    }
    /** function to process http request. */
    request(config) {
        /** retrieve data. */
        if (config["method"] === "GET") {
            if (config["provider"] === "local") {
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
                                        for (let i = 0; i < response.data.indexes.length; i++) {
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
                                        for (let x = 0; x < response.data.stocks.length; x++) {
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
            if (config["provider"] === "edge") {
                axios.get("/sanctum/csrf-cookie").then((response) => {
                    axios
                        .get("/stock-reports-retrieve", {
                            params: { section: config["section"], id: config["input"], caller: config["caller"] }
                        })
                        .then((response) => {
                            if (response.data.status === true) {
                                /** populate modal. */
                                if (response.data.reports) {
                                    for (let x in response.data.reports) {
                                        document.querySelector(`.stock-trade-${config["action"]} > .modal-form > .modal-group > .modal-${x}`).value = response.data.reports[x].toLocaleString("en");
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
                                    name: this.helper.init({ type: "titlecase", string: stock.name }),
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
                                                    status: response.data.status,
                                                    message: response.data.message,
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
                                                    .post("/stock-reports-store", {
                                                        section: "reports",
                                                        id: stock.edge,
                                                    })
                                                    .then((response) => {
                                                        /** send user a message. */
                                                        this.helper.init({
                                                            type: "message",
                                                            status: response.data.status,
                                                            message: response.data.message,
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
                                                    .post("/stock-reports-store", {
                                                        section: "prices",
                                                        id: stock.edge,
                                                    })
                                                    .then((response) => {
                                                        /** send user a message. */
                                                        this.helper.init({
                                                            type: "message",
                                                            status: response.data.status,
                                                            message: response.data.message,
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
            if (config["provider"] === "watches") {
                axios.get("/sanctum/csrf-cookie").then(() => {
                    axios.post("/api/stock-watchlist-store", {
                        table: config["table"],
                        statement: config["statement"],
                        input: config["input"]
                    }).then(response => {
                        /** display success message. */
                        this.helper.init({
                            type: "message",
                            status: response.data.status,
                            message: response.data.message
                        });
                    });
                });
            }
        }
    }
}
export default new stock_trade();
