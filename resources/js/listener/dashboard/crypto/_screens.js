/** import helper function. */
import helpers from "../../../helpers/helpers.js";

class crypto_screen {
    constructor() {
        this.event = document.querySelector(".speak-crypto-screens");
        this.template = document.querySelector(".stage-crypto-screens");
        this.element = document.querySelector(".perform");
        this.helper = helpers;
    }

    init() {
        /** setup overview listener. */
        this.event.addEventListener("click", (e) => {
            if (e.target.dataset.sidebar === "crypto_screens") {
                /** retrieve data .*/
                this.request({ method: "GET", table: "screen", provider: "local" });
                let content = this.template.content.cloneNode(true);
                /** clear element before appending new content. */
                this.element.innerHTML = "";
                /** append template content. */
                this.element.appendChild(content);
                /** query document so to insert record event listener. */
                let record = document.querySelector(`.click-screen-record`);
                if (record) {
                    record.addEventListener("click", (e) => {
                        if (e.target.dataset.action === "crypto") {
                            /** show modal. */
                            this.backdrop({ mode: "show", action: "insert" });
                            /** set submit event listener. */
                            let submit = document.querySelector(".crypto-screen-insert > .modal-form > .modal-group > .modal-button > .button-submit > .modal-insert");
                            if (submit) {
                                let callback = () => {
                                    this.backdrop({ action: "insert", mode: "submit", element: submit, callback: callback });
                                };
                                /** add event listener. */
                                submit.addEventListener("click", callback, false);
                            }
                        }
                    });

                    /** set close event listener. */
                    let close = document.querySelector(".crypto-screen-insert > .modal-form > .modal-group > .modal-close");
                    if (close) {
                        let callback = () => {
                            this.backdrop({ action: "insert", mode: "hide" });
                        };
                        /** add event listener. */
                        close.addEventListener("click", callback, false);
                    }
                    /** set cancel event listener. */
                    let cancel = document.querySelector(".crypto-screen-insert > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");
                    if (cancel) {
                        let callback = () => {
                            this.backdrop({ action: "insert", mode: "hide" });
                        };
                        /** add event listener. */
                        cancel.addEventListener("click", callback, false);
                    }
                }
                /** update modal code block. */
                setTimeout(() => {
                    let update = document.querySelectorAll(".crypto-screen > .items > .action > .update");
                    if (update) {
                        for (let i = 0; i < update.length; i++) {
                            update[i].addEventListener("click", () => {
                                /** show update modal. */
                                this.backdrop({ mode: "show", action: "update" });

                                /** populate modal. */
                                let parent = update[i].parentElement.parentElement;
                                this.helper.init({ type: "input", action: "populate", target: "crypto-screen-update", el: parent, data: ["id", "api", "coin", "price", "market", "volume", "change"] });

                                /** set submit event listener. */
                                let submit = document.querySelector(".crypto-screen-update > .modal-form > .modal-group > .modal-button > .button-submit > .modal-update");
                                if (submit) {
                                    let callback = () => {
                                        this.backdrop({ action: "update", mode: "submit", element: submit, callback: callback });
                                    };
                                    /** add event listener. */
                                    submit.addEventListener("click", callback, false);
                                }
                            });
                        }
                        /** query document close button. */
                        let close = document.querySelector(".crypto-screen-update > .modal-form > .modal-group > .modal-close");
                        if (close) {
                            let callback = () => {
                                this.backdrop({ action: "update", mode: "hide" });
                            };
                            /** add event listener. */
                            close.addEventListener("click", callback, false);
                        }

                        /** query document update button. */
                        let cancel = document.querySelector(".crypto-screen-update > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");
                        if (cancel) {
                            let callback = () => {
                                this.backdrop({ action: "update", mode: "hide" });
                            };
                            /** add event listener. */
                            cancel.addEventListener("click", callback, false);
                        }
                    }
                }, 10000);

                /** destroy modal code block. */
                setTimeout(() => {
                    let destroy = document.querySelectorAll(".crypto-screen > .items > .action > .destroy");
                    if (destroy) {
                        for (let i = 0; i < destroy.length; i++) {
                            /* jshint -W083 */
                            destroy[i].addEventListener("click", () => {
                                /** show destroy modal. */
                                this.backdrop({ mode: "show", action: "destroy" });

                                /** populate modal. */
                                let parent = destroy[i].parentElement.parentElement;
                                this.helper.init({ type: "input", action: "populate", target: "crypto-screen-destroy", el: parent, data: ["id", "api", "coin", "price", "market", "volume", "change"] });

                                /** set destroy event listener. */
                                let submit = document.querySelector(".crypto-screen-destroy > .modal-form > .modal-group > .modal-button > .button-submit > .modal-destroy");
                                if (submit) {
                                    let callback = () => {
                                        this.backdrop({ action: "destroy", mode: "submit", element: submit, callback: callback });
                                    };
                                    /** add event listener. */
                                    submit.addEventListener("click", callback, false);
                                }
                            });
                            /* jshint +W083 */

                            /** set cancel event listener. */
                            let close = document.querySelector(".crypto-screen-destroy > .modal-form > .modal-group > .modal-close");
                            if (close) {
                                let callback = () => {
                                    this.backdrop({ action: "destroy", mode: "hide" });
                                };
                                /** add event listener. */
                                close.addEventListener("click", callback, false);
                            }

                            /** set cancel event listener. */
                            let cancel = document.querySelector(".crypto-screen-destroy > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");
                            if (cancel) {
                                let callback = () => {
                                    this.backdrop({ action: "destroy", mode: "hide" });
                                };
                                /** add event listener. */
                                cancel.addEventListener("click", callback, false);
                            }
                        }
                    }
                }, 10000);

                let info = document.querySelector(".card > .header > .meta > .right > .messenger");
                info.classList.add("info");
                info.textContent = "Update button enabled right after this message disappear.";
                setTimeout(() => { info.classList.remove("info"); }, 9000);
            }
        });
    }

    /** function on how backdrop behaves. */
    backdrop(config) {
        /** query document to pinpoint modal element. */
        let modal = document.querySelector(`.crypto-screen-${config["action"]}`);
        if (config["mode"] === "show") {
            /** show backdrop. */
            modal.classList.add("backdrop");
            modal.style.display = "block";
            /** clear input if insert. */
            if (config["action"] === "insert") {
                this.helper.init({
                    type: "input",
                    target: `crypto-screen-${config["action"]}`,
                    action: "clear",
                    data: ["coin", "api", "price", "market", "volume", "change"]
                });
            }
            /** insert fetch gecko. */
            if (config["action"] === "insert" || config["action"] === "update") {
                let fetch = document.querySelector(`.crypto-screen-${config["action"]} > .modal-form > .modal-group > .modal-gecko > .modal-fetch`);
                if (fetch) {
                    let callback = () => {
                        let api = document.querySelector(`.crypto-screen-${config["action"]} > .modal-form > .modal-group > .modal-gecko > .modal-api`).value;
                        if (api) {
                            /** retrieve data .*/
                            this.request({ method: "GET", provider: "gecko", action: config["action"], data: api });
                        }
                    };
                    /** add event listener. */
                    fetch.addEventListener("click", callback, false);
                }
            }
        }

        if (config["mode"] === "hide") {
            /** hide backdrop. */
            modal.classList.remove("backdrop");
            modal.style.display = "none";
        }

        if (config["mode"] === "submit") {
            /** collect all input for processing. */
            let collect = this.helper.init({
                type: "input",
                target: `crypto-screen-${config["action"]}`,
                action: "value",
                data: ["id", "coin", "api", "price", "market", "volume", "change"]
            });
            /** check if inputs are empty and valid. */
            let result = this.helper.init({
                type: "validate",
                data: collect
            });
            /** double check and then proceed. */
            if (Object.keys(result["error"]).length === 0) {
                /** sanitize input. */
                let sanitize = this.helper.init({
                    type: "sanitize",
                    action: "comma",
                    condition: ["price", "market", "volume", "change"],
                    data: result["success"]
                });
                /** request access token and then post to backend. */
                this.request({
                    method: "POST",
                    table: "screen",
                    statement: `${config["action"]}`,
                    input: sanitize
                });
            } else {
                /** display user  message. */
                this.helper.init({ type: "message", status: false, message: result["message"] });
            }
            /** remove listener. */
            config["element"].removeEventListener('click', config['callback']);
            /** hide modal. */
            modal.classList.remove("backdrop");
            modal.style.display = "none";
        }
    }

    request(config) {
        if (config.method === "GET") {
            /** fetch local data. */
            if (config.provider === "local") {
                axios.get("/sanctum/csrf-cookie").then(response => {
                    axios.get("/api/crypto-screen-retrieve", {
                        params: { "table": "screen" }
                    }).then(response => {
                        /** populate order element with data. */
                        if (response.data.coin) {
                            for (let i = 0; i < response.data.coin.length; i++) {
                                this.helper.init({ type: "node", id: `${i + 1}`, target: "crypto-screen", statement: response.data.sql, input: response.data.coin[i] });
                            }
                        }
                    });
                });
            }

            /** fetch coingecko data. */
            if (config.provider === "gecko") {
                axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${config.data}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                    },
                    withCredentials: false,
                    credentials: "same-origin",
                }).then(response => {
                    if (response.status === 200) {
                        let coin = [];
                        for (let key in response.data) {
                            if (response.data.hasOwnProperty(key)) {
                                for (let val in response.data[key]) {
                                    if (response.data[key].hasOwnProperty(val)) {
                                        switch (val) {
                                            case "usd":
                                                coin.price = response.data[key][val];
                                                break;
                                            case "usd_market_cap":
                                                coin.market = response.data[key][val];
                                                break;
                                            case "usd_24h_vol":
                                                coin.volume = response.data[key][val];
                                                break;
                                            case "usd_24h_change":
                                                coin.change = response.data[key][val];
                                                break;
                                            default:
                                                coin = [];
                                        }
                                    }
                                }
                            }
                        }
                        /** append to element. */
                        if (coin) {
                            for (let x in coin) {
                                document.querySelector(`.crypto-screen-${config["action"]} > .modal-form > .modal-group > .modal-${x}`).value = coin[x].toLocaleString("en");
                            }
                        }
                    }
                });

            }
        }
        /** store data. */
        if (config.method === "POST") {
            axios.get("/sanctum/csrf-cookie").then(response => {
                axios.post("/api/crypto-screen-store", {
                    table: config.table,
                    statement: config.statement,
                    input: config.input,
                }).then(response => {
                    /** populate order element with data. */
                    if (response.data.status === true) {
                        /** add or update element in document tree. */
                        if (response.data.sql === "select") {
                            for (let key in response.data.coin) {
                                this.helper.init({ type: "node", id: 0, target: "crypto-screen", statement: response.data.sql, input: response.data.coin[key] });
                            }
                        }
                        /** add or update element in document tree. */
                        if (response.data.sql === "update") {
                            for (let key in response.data.coin) {
                                this.helper.init({ type: "node", target: "crypto-screen", statement: response.data.sql, input: response.data.coin[key] });
                            }
                        }
                        /** remove element in document tree. */
                        if (response.data.sql === "destroy") {
                            this.helper.init({ type: "node", target: "crypto-screen", statement: response.data.sql, input: response.data.coin });
                        }
                        /** display success message. */
                        this.helper.init({ type: "message", status: response.data.status, message: response.data.message });
                    }

                    /** display error message. */
                    if (response.data.status === false) {
                        this.helper.init({ type: "message", status: response.data.status, message: response.data.message });
                    }
                });
            });
        }
    }
}

export default new crypto_screen();
