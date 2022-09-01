/** import helper function. */
import helpers from "../../../helpers/helpers.js";

class crypto_game {
    constructor() {
        this.event = document.querySelector(".speak-crypto-games");
        this.template = document.querySelector(".stage-crypto-games");
        this.element = document.querySelector(".perform");
        this.helper = helpers;
    }

    init() {
        /** setup overview listener. */
        this.event.addEventListener("click", (e) => {
            if (e.target.dataset.sidebar === "crypto_games") {
                /** retrieve data .*/
                this.request({ method: "GET", table: "game" });
                /** clone template. */
                let content = this.template.content.cloneNode(true);
                /** query document and do conditional statement base on the result. */
                let check = document.querySelector(`.click-game`);
                if (check === null || check === undefined) {
                    /** clear element before appending new content. */
                    this.element.innerHTML = "";
                    /** append template content. */
                    this.element.appendChild(content);
                    /** query document so to insert record event listener. */
                    let record = document.querySelector(`.click-game-record`);
                    if (record) {
                        record.addEventListener("click", (e) => {
                            if (e.target.dataset.action === "crypto") {
                                /** show modal. */
                                this.backdrop({ mode: "show", action: "insert" });
                                /** set submit event listener. */
                                let submit = document.querySelector(".crypto-game-insert > .modal-form > .modal-group > .modal-button > .button-submit > .modal-insert");
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
                        let close = document.querySelector(".crypto-game-insert > .modal-form > .modal-group > .modal-close");
                        if (close) {
                            let callback = () => {
                                this.backdrop({ action: "insert", mode: "hide" });
                            };
                            /** add event listener. */
                            close.addEventListener("click", callback, false);
                        }
                        /** set cancel event listener. */
                        let cancel = document.querySelector(".crypto-game-insert > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");
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
                        let update = document.querySelectorAll(".crypto-game > .items > .action > .update");
                        if (update) {
                            for (let i = 0; i < update.length; i++) {
                                update[i].addEventListener("click", () => {
                                    /** show modal. */
                                    this.backdrop({ mode: "show", action: "update" });

                                    /** populate modal. */
                                    let parent = update[i].parentElement.parentElement;
                                    this.helper.init({ type: "input", action: "populate", target: "crypto-game-update", el: parent, data: ["id", "title", "genre", "platform", "blockchain", "status", "earn", "free", "rating"] });

                                    /** set submit event listener. */
                                    let submit = document.querySelector(".crypto-game-update > .modal-form > .modal-group > .modal-button > .button-submit > .modal-update");
                                    if (submit) {
                                        let callback = () => {
                                            this.backdrop({ action: "update", mode: "submit", element: submit, callback: callback });
                                        };
                                        /** add event listener. */
                                        submit.addEventListener("click", callback, false);
                                    }
                                });
                            }
                            /** set close event listener. */
                            let close = document.querySelector(".crypto-game-update > .modal-form > .modal-group > .modal-close");
                            if (close) {
                                let callback = () => {
                                    this.backdrop({ action: "update", mode: "hide" });
                                };
                                /** add event listener. */
                                close.addEventListener("click", callback, false);
                            }
                            /** set cancel event listener. */
                            let cancel = document.querySelector(".crypto-game-update > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");
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
                        let destroy = document.querySelectorAll(".crypto-game > .items > .action > .destroy");
                        if (destroy) {
                            for (let i = 0; i < destroy.length; i++) {
                                destroy[i].addEventListener("click", () => {
                                    /** show modal. */
                                    this.backdrop({ mode: "show", action: "destroy" });
                                    /** populate modal. */
                                    let parent = destroy[i].parentElement.parentElement;
                                    this.helper.init({ type: "input", action: "populate", target: "crypto-game-destroy", el: parent, data: ["id", "title", "genre", "platform", "blockchain", "status", "earn", "free", "rating"] });
                                    /** set submit event listener. */
                                    let submit = document.querySelector(".crypto-game-destroy > .modal-form > .modal-group > .modal-button > .button-submit > .modal-destroy");
                                    if (submit) {
                                        let callback = () => {
                                            this.backdrop({ action: "destroy", mode: "submit", element: submit, callback: callback });
                                        };
                                        /** add event listener. */
                                        submit.addEventListener("click", callback, false);
                                    }
                                });
                            }
                            /** set close event listener. */
                            let close = document.querySelector(".crypto-game-destroy > .modal-form > .modal-group > .modal-close");
                            if (close) {
                                let callback = () => {
                                    this.backdrop({ action: "destroy", mode: "hide" });
                                };
                                /** add event listener. */
                                close.addEventListener("click", callback, false);
                            }
                            /** set cancel event listener. */
                            let cancel = document.querySelector(".crypto-game-destroy > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");
                            if (cancel) {
                                let callback = () => {
                                    this.backdrop({ action: "destroy", mode: "hide" });
                                };
                                /** add event listener. */
                                cancel.addEventListener("click", callback, false);
                            }
                        }
                    }, 10000);
                    let info = document.querySelector(".card > .header > .meta > .right > .messenger");
                    info.classList.add("info");
                    info.textContent = "Update button enabled right after this message disappear.";
                    setTimeout(() => { info.classList.remove("info"); }, 9000);
                }
            }
        });
    }

    /** function on how backdrop behaves. */
    backdrop(config) {
        /** query modal. */
        let modal = document.querySelector(`.crypto-game-${config["action"]}`);

        if (config["mode"] === "show") {
            /** show backdrop. */
            modal.classList.add("backdrop");
            modal.style.display = "block";
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
                target: `crypto-game-${config["action"]}`,
                action: "value",
                data: ["id", "title", "genre", "platform", "blockchain", "status", "earn", "free", "rating"]
            });
            /** check if inputs are empty and valid. */
            let result = this.helper.init({
                type: "validate",
                data: collect
            });
            /** clear input if insert. */
            if (config["action"] === "insert") {
                this.helper.init({
                    type: "input",
                    target: `crypto-game-${config["action"]}`,
                    action: "clear",
                    data: ["id", "title", "genre", "platform", "blockchain", "status", "earn", "free", "rating"]
                });
            }
            /** double check and then proceed. */
            if (Object.keys(result.error).length === 0) {
                /** request access token and then post to backend. */
                this.request({
                    method: "POST",
                    table: "game",
                    statement: `${config["action"]}`,
                    input: result["success"]
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

    /** function to process http request. */
    request(config) {
        /** retrieve data. */
        if (config.method === "GET") {
            axios.get("/sanctum/csrf-cookie").then(response => {
                axios.get("/api/crypto-game-retrieve", {
                    params: { "table": "game" }
                }).then(response => {
                    if (response.data.status === true) {
                        /** populate order element with data. */
                        if (response.data.coin) {
                            for (let i = 0; i < response.data.coin.length; i++) {
                                this.helper.init({ type: "node", id: `${i + 1}`, target: "crypto-game", statement: response.data.sql, input: response.data.coin[i] });
                            }
                        }
                    }
                });
            });
        }

        /** store data. */
        if (config.method === "POST") {
            axios.get("/sanctum/csrf-cookie").then(response => {
                axios.post("/api/crypto-game-store", {
                    table: config.table,
                    statement: config.statement,
                    input: config.input
                }).then(response => {
                    /** populate order element with data. */
                    if (response.data.status === true) {
                        /** add or update element in document tree. */
                        if (response.data.sql === "select") {
                            for (let key in response.data.coin) {
                                this.helper.init({ type: "node", id: 0, target: "crypto-game", statement: response.data.sql, input: response.data.coin[key] });
                            }
                        }
                        /** add or update element in document tree. */
                        if (response.data.sql === "update") {
                            for (let key in response.data.coin) {
                                this.helper.init({ type: "node", target: "crypto-game", statement: response.data.sql, input: response.data.coin[key] });
                            }
                        }
                        /** remove element in document tree. */
                        if (response.data.sql === "destroy") {
                            this.helper.init({ type: "node", target: "crypto-game", statement: response.data.sql, input: response.data.coin });
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
export default new crypto_game();
