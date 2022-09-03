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
                this.request({ method: "GET", table: "watchlist", statement: "select" });
                /** clone template. */
                let content = this.template.content.cloneNode(true);
                // /** query document and do conditional statement base on the result. */
                let check = document.querySelector(".stock-watchlist");
                if (check === null || check === undefined) {
                    /** clear element before appending. */
                    this.element.innerHTML = "";
                    /** append template content. */
                    this.element.appendChild(content);
                    /** destroy modal code block. */
                    setTimeout(() => {
                        let destroy = document.querySelectorAll(".stock-watchlist > .items > .action > .destroy");
                        if (destroy) {
                            for (let i = 0; i < destroy.length; i++) {
                                destroy[i].addEventListener("click", () => {
                                    /** show destroy modal. */
                                    this.backdrop({ mode: "show", action: "destroy" });

                                    /** populate modal. */
                                    let parent = destroy[i].parentElement.parentElement;
                                    this.helper.init({ type: "input", action: "destroy", target: "stock-watchlist-destroy", section: 'populate', el: parent, data: ["id", "symbol"] });

                                    /** set destroy event listener. */
                                    let submit = document.querySelector(".stock-watchlist-destroy > .modal-form > .modal-group > .modal-button > .button-submit > .modal-destroy");
                                    if (submit) {
                                        let callback = () => {
                                            this.backdrop({ action: "destroy", mode: "submit", element: submit, callback: callback });
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
                section: "watchlist",
                target: `stock-watchlist-${config["action"]}`,
                action: "destroy",
                section: 'content',
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
                    table: "watchlist",
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
            axios.get("/sanctum/csrf-cookie").then(response => {
                axios.get("/api/stock-watchlist-retrieve", {
                    params: { table: config["table"], statement: config["statement"] }
                }).then(response => {
                    if (response.data.status === true) {
                        /** populate order element with data. */
                        if (response.data.watchlist) {
                            /** sort debt equity ratio. */
                            let watchlist = response.data.watchlist.sort((a, b) => {
                                return a.debtequityratio - b.debtequityratio;
                            })
                            /** loop me up. */
                            for (let i = 0; i < watchlist.length; i++) {
                                this.helper.init({ type: "node", id: `${i + 1}`, target: `stock-${config["table"]}`, statement: response.data.sql, input: watchlist[i] });
                            }
                        }
                    }
                });
            });
        }

        /** store data. */
        if (config["method"] === "POST") {
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
                            this.helper.init({ type: "node", target: "stock-watchlist", statement: response.data.sql, input: response.data.stock });
                        }
                    }
                    /** display  message. */
                    this.helper.init({ type: "message", status: response.data.status, message: response.data.message });
                })
            });
        }
    }
}
export default new stock_watchlist();
