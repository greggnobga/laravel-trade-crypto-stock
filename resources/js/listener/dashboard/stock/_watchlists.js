/** import helper function. */
import helpers from "../../../helpers/helpers.js";

class stock_watchlist {
    /** default actions. */
    constructor() {
        this.event = document.querySelector(".speak-stock-watchlists");
        this.template = document.querySelector(".stage-stock-watchlists");
        this.element = document.querySelector(".perform");
        this.helper = helpers;
    }
    /** fire it on. */
    init() {
        /** setup initial listener. */
        this.event.addEventListener("click", (e) => {
            if (e.target.dataset.sidebar === "stock_watchlists") {
                /** retrieve data .*/
                this.request({ method: "GET", provider: "local", table: "watchlist", statement: "select" });
                /** clone template. */
                let content = this.template.content.cloneNode(true);
                // /** query document and do conditional statement base on the result. */
                let check = document.querySelector(".stock-watchlist");
                if (check === null || check === undefined) {
                    /** clear element before appending. */
                    this.element.innerHTML = "";
                    /** append template content. */
                    this.element.appendChild(content);
                    /** auto build watchlist. */
                    let build = document.querySelector(".card > .header > .meta > .right > .click-watchlist-build");
                    if (build) {
                        let callback = () => {
                            this.request({ method: "GET", provider: "edge", statement: "build", table: "watchlist" });
                            /** remove event listener after firing once. */
                            build.removeEventListener("click", callback);
                        };
                        /** add event listener. */
                        build.addEventListener("click", callback, false);
                    }
                    /** destroy modal code block. */
                    setTimeout(() => {
                        /** define sectors. */
                        let sectors = ["minings", "holdings", "services", "industrials", "properties", "financials", "boards", "funds"]
                        /** run through each. */
                        sectors.forEach(sector => {
                            /** define modal. */
                            let index = document.querySelectorAll(`.stock-${sector} > .items > .action > .destroy`);
                            if (index) {
                                for (let i = 0; i < index.length; i++) {
                                    index[i].addEventListener("click", () => {
                                        /** show destroy modal. */
                                        this.backdrop({ mode: "show", action: "destroy" });
                                        /** populate modal. */
                                        let parent = index[i].parentElement.parentElement;
                                        this.helper.init({ type: "input", action: "destroy", target: "stock-watchlist-destroy", section: 'watchlist', el: parent, data: ["id", "symbol"] });
                                        /** set event listener. */
                                        let submit = document.querySelector(".stock-watchlist-destroy > .modal-form > .modal-group > .modal-button > .button-submit > .modal-destroy");
                                        if (submit) {
                                            let callback = () => {
                                                this.backdrop({ action: "destroy", mode: "submit", sector: `${sector}`, element: submit, callback: callback });
                                            };
                                            /** add event listener. */
                                            submit.addEventListener("click", callback, false);
                                        }
                                    });
                                    /** set cancel event listener. */
                                    let close = document.querySelector(".stock-watchlist-destroy > .modal-form > .modal-group > .modal-close");
                                    if (close) {
                                        let callback = () => {
                                            this.backdrop({ action: "destroy", mode: "hide" });
                                        };
                                        /** add event listener. */
                                        close.addEventListener("click", callback, false);
                                    }
                                    /** set cancel event listener. */
                                    let cancel = document.querySelector(".stock-watchlist-destroy > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");
                                    if (cancel) {
                                        let callback = () => {
                                            this.backdrop({ action: "destroy", mode: "hide" });
                                        };
                                        /** add event listener. */
                                        cancel.addEventListener("click", callback, false);
                                    }
                                }
                            }
                        });
                    }, 10000);
                    let info = document.querySelector(".card > .header > .meta > .right > .messenger");
                    info.classList.add("info");
                    info.textContent = "Destroy button enabled right after this message disappear.";
                    setTimeout(() => { info.classList.remove("info"); }, 9000);
                }
            }
        });
    }
    /** function on how backdrop behaves. */
    backdrop(config) {
        /** query document to pinpoint modal element. */
        let modal = document.querySelector(`.stock-watchlist-${config["action"]}`);

        if (config["mode"] === "show") {
            /** show modal. */
            modal.classList.add("backdrop");
            modal.style.display = "block";
        }

        if (config["mode"] === "hide") {
            /** hide modal. */
            modal.classList.remove("backdrop");
            modal.style.display = "none";
        }

        if (config["mode"] === "submit") {
            /** collect all input for processing. */
            let collect = this.helper.init({
                type: "input",
                action: "value",
                target: `stock-watchlist-${config["action"]}`,
                data: ["id", "symbol"]
            });
            /** check if inputs are empty and valid. */
            let result = this.helper.init({
                type: "validate",
                data: collect
            });
            /** double check and then proceed. */
            if (Object.keys(result["error"]).length === 0) {
                /** request access token and then post to backend. */
                this.request({
                    method: "POST",
                    provider: "local",
                    table: "watchlist",
                    sector: config["sector"],
                    statement: config["action"],
                    input: result["success"]
                });
            } else {
                /** display user  message. */
                this.helper.init({ type: "message", status: false, message: result["message"] });
            }
            /** remove listener. */
            config["element"].removeEventListener("click", config["callback"]);
            /** hide modal. */
            modal.classList.remove("backdrop");
            modal.style.display = "none";
        }
    }
    /** function to process http request. */
    request(config) {
        /** retrieve data. */
        if (config["method"] === "GET") {
            if (config['provider'] === 'local') {
                axios.get("/sanctum/csrf-cookie").then(response => {
                    axios.get("/api/stock-watchlist-retrieve", {
                        params: { table: config["table"], statement: config["statement"] }
                    }).then(response => {
                        if (response.data.status === true) {
                            /** populate holdings element with data. */
                            if (response.data.sectors.miningandoil) {
                                /** sort debt equity ratio. */
                                let minings = response.data.sectors.miningandoil.sort((a, b) => {
                                    return a.debtequityratio - b.debtequityratio;
                                })
                                /** loop me up. */
                                for (let i = 0; i < minings.length; i++) {
                                    this.helper.init({ type: "node", id: `${i + 1}`, target: `stock-minings`, statement: response.data.sql, input: minings[i] });
                                }
                            }
                        }
                        /** populate holdings element with data. */
                        if (response.data.sectors.holdingfirms) {
                            /** sort debt equity ratio. */
                            let holdings = response.data.sectors.holdingfirms.sort((a, b) => {
                                return a.debtequityratio - b.debtequityratio;
                            })
                            /** loop me up. */
                            for (let i = 0; i < holdings.length; i++) {
                                this.helper.init({ type: "node", id: `${i + 1}`, target: `stock-holdings`, statement: response.data.sql, input: holdings[i] });
                            }
                        }
                        /** populate holdings element with data. */
                        if (response.data.sectors.services) {
                            /** sort debt equity ratio. */
                            let services = response.data.sectors.services.sort((a, b) => {
                                return a.debtequityratio - b.debtequityratio;
                            })
                            /** loop me up. */
                            for (let i = 0; i < services.length; i++) {
                                this.helper.init({ type: "node", id: `${i + 1}`, target: `stock-services`, statement: response.data.sql, input: services[i] });
                            }
                        }
                        /** populate holdings element with data. */
                        if (response.data.sectors.industrial) {
                            /** sort debt equity ratio. */
                            let industrials = response.data.sectors.industrial.sort((a, b) => {
                                return a.debtequityratio - b.debtequityratio;
                            })
                            /** loop me up. */
                            for (let i = 0; i < industrials.length; i++) {
                                this.helper.init({ type: "node", id: `${i + 1}`, target: `stock-industrials`, statement: response.data.sql, input: industrials[i] });
                            }
                        }
                        /** populate holdings element with data. */
                        if (response.data.sectors.property) {
                            /** sort debt equity ratio. */
                            let properties = response.data.sectors.property.sort((a, b) => {
                                return a.debtequityratio - b.debtequityratio;
                            })
                            /** loop me up. */
                            for (let i = 0; i < properties.length; i++) {
                                this.helper.init({ type: "node", id: `${i + 1}`, target: `stock-properties`, statement: response.data.sql, input: properties[i] });
                            }
                        }
                        /** populate holdings element with data. */
                        if (response.data.sectors.financials) {
                            /** sort debt equity ratio. */
                            let financials = response.data.sectors.financials.sort((a, b) => {
                                return a.debtequityratio - b.debtequityratio;
                            })
                            /** loop me up. */
                            for (let i = 0; i < financials.length; i++) {
                                this.helper.init({ type: "node", id: `${i + 1}`, target: `stock-financials`, statement: response.data.sql, input: financials[i] });
                            }
                        }
                        /** populate holdings element with data. */
                        if (response.data.sectors.smallmediumemergingboard) {
                            /** sort debt equity ratio. */
                            let boards = response.data.sectors.smallmediumemergingboard.sort((a, b) => {
                                return a.debtequityratio - b.debtequityratio;
                            })
                            /** loop me up. */
                            for (let i = 0; i < boards.length; i++) {
                                this.helper.init({ type: "node", id: `${i + 1}`, target: `stock-boards`, statement: response.data.sql, input: boards[i] });
                            }
                        }
                        /** populate holdings element with data. */
                        if (response.data.sectors.funds) {
                            /** sort debt equity ratio. */
                            let funds = response.data.sectors.funds.sort((a, b) => {
                                return a.debtequityratio - b.debtequityratio;
                            })
                            /** loop me up. */
                            for (let i = 0; i < funds.length; i++) {
                                this.helper.init({ type: "node", id: `${i + 1}`, target: `stock-funds`, statement: response.data.sql, input: funds[i] });
                            }
                        }
                        /** display  message. */
                        this.helper.init({ type: "message", status: response.data.status, message: response.data.message });
                    });
                });
            }
            if (config["provider"] === "edge") {
                axios.get("/sanctum/csrf-cookie").then(() => {
                    axios.get("/api/stock-watchlist-retrieve", {
                        params: { table: config["table"], statement: config["statement"] }
                    }).then(response => {
                        if (response.data.status === true) {
                            if (response.data.stocks.length !== 0) {
                                let stocks = setInterval(() => {
                                    /** remove first array element. */
                                    let stock = response.data.stocks[0];
                                    /** get csrf token and send post request. */
                                    axios.get("/sanctum/csrf-cookie").then((response) => {
                                        axios
                                            .get("/stock-reports-retrieve", {
                                                params: { section: 'watches', id: stock["edge"], symbol: stock["symbol"], sector: stock["sector"], volume: stock["volume"], caller: "watchlist" }
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
                                }, 10000);
                            }
                            /** display  message. */
                            this.helper.init({ type: "message", status: response.data.status, message: response.data.message });
                        }
                    })
                });
            }
        }

        /** store data. */
        if (config["method"] === "POST") {
            if (config["provider"] === "local") {
                axios.get("/sanctum/csrf-cookie").then(() => {
                    axios.post("/api/stock-watchlist-store", {
                        table: config["table"],
                        statement: config["statement"],
                        input: config["input"]
                    }).then(response => {
                        /** populate order element with data. */
                        if (response.data.status === true) {
                            /** remove element in document tree. */
                            if (response.data.sql === "destroy") {
                                this.helper.init({ type: "node", target: `stock-${config["sector"]}`, statement: response.data.sql, input: response.data.stock });
                            }
                        }
                        /** display  message. */
                        this.helper.init({ type: "message", status: response.data.status, message: response.data.message });
                    })
                });
            }
        }
    }
}
export default new stock_watchlist();
