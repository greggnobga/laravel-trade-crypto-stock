/** import helper function. */
import helpers from "../../../helpers/helpers.js";

class stock_note {
    /** default actions. */
    constructor() {
        this.event = document.querySelector(".speak-stock-notes");
        this.template = document.querySelector(".stage-stock-notes");
        this.element = document.querySelector(".perform");
        this.helper = helpers;
    }

    /** fire it on. */
    init() {
        /** setup initial listener. */
        this.event.addEventListener("click", (e) => {
            if (e.target.dataset.sidebar === 'stock_notes') {
                /** retrieve data .*/
                this.request({ method: 'GET', table: 'note', statement: 'select' });
                /** clone template. */
                let content = this.template.content.cloneNode(true);
                // /** query document and do conditional statement base on the result. */
                let check = document.querySelector('.stock-note');
                if (check === null || check === undefined) {
                    /** clear element before appending. */
                    this.element.innerHTML = '';
                    /** append template content. */
                    this.element.appendChild(content);
                    /** insert modal code block. */
                    let record = document.querySelector(".click-note-record");
                    if (record) {
                        record.addEventListener("click", (e) => {
                            /** show insert modal. */
                            if (e.target.dataset.action === "stock") {
                                /** show modal. */
                                this.backdrop({ mode: "show", action: "insert" });

                                /** set submit event listener. */
                                let submit = document.querySelector(".stock-note-insert > .modal-form > .modal-group > .modal-button > .button-submit > .modal-insert");
                                if (submit) {
                                    let callback = () => {
                                        this.backdrop({ action: "insert", mode: "submit", element: submit, callback: callback });
                                    };
                                    /** add event listener. */
                                    submit.addEventListener("click", callback, false);
                                }
                            }

                            /** set cancel event listener. */
                            let cancel = document.querySelector(".stock-note-insert > .modal-form > .modal-group > .modal-close");
                            if (cancel) {
                                let callback = () => {
                                    this.backdrop({ action: "insert", mode: "hide" });
                                };
                                /** add event listener. */
                                cancel.addEventListener("click", callback, false);
                            }

                            /** set close event listener. */
                            let close = document.querySelector(".stock-note-insert > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");
                            if (close) {
                                let callback = () => {
                                    this.backdrop({ action: "insert", mode: "hide" });
                                };
                                /** add event listener. */
                                close.addEventListener("click", callback, false);
                            }
                        });
                    }
                    /** update modal code block. */
                    setTimeout(() => {
                        let update = document.querySelectorAll(".stock-note > .items > .action > .update");
                        if (update) {
                            for (let i = 0; i < update.length; i++) {
                                update[i].addEventListener("click", () => {
                                    /** show update modal. */
                                    this.backdrop({ mode: "show", action: "update" });
                                    /** populate modal. */
                                    let parent = update[i].parentElement.parentElement;
                                    this.helper.init({ type: "input", action: "populate", target: "stock-note-update", el: parent, data: ["id", "section", "note"] });

                                    /** set submit event listener. */
                                    let submit = document.querySelector(".stock-note-update > .modal-form > .modal-group > .modal-button > .button-submit > .modal-update");
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
                            let close = document.querySelector(".stock-note-update > .modal-form > .modal-group > .modal-close");
                            if (close) {
                                let callback = () => {
                                    this.backdrop({ action: "update", mode: "hide" });
                                };
                                /** add event listener. */
                                close.addEventListener("click", callback, false);
                            }

                            /** query document update button. */
                            let cancel = document.querySelector(".stock-note-update > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");
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
                        let destroy = document.querySelectorAll(".stock-note > .items > .action > .destroy");
                        if (destroy) {
                            for (let i = 0; i < destroy.length; i++) {
                                destroy[i].addEventListener("click", () => {
                                    /** show destroy modal. */
                                    this.backdrop({ mode: "show", action: "destroy" });

                                    /** populate modal. */
                                    let parent = destroy[i].parentElement.parentElement;
                                    this.helper.init({ type: "input", action: "destroy", target: "stock-note-destroy", section: 'note', el: parent, data: ["id", "section", "note"] });

                                    /** set destroy event listener. */
                                    let submit = document.querySelector(".stock-note-destroy > .modal-form > .modal-group > .modal-button > .button-submit > .modal-destroy");
                                    if (submit) {
                                        let callback = () => {
                                            this.backdrop({ action: "destroy", mode: "submit", element: submit, callback: callback });
                                        };
                                        /** add event listener. */
                                        submit.addEventListener("click", callback, false);
                                    }
                                });

                                /** set cancel event listener. */
                                let close = document.querySelector(".stock-note-destroy > .modal-form > .modal-group > .modal-close");
                                if (close) {
                                    let callback = () => {
                                        this.backdrop({ action: "destroy", mode: "hide" });
                                    };
                                    /** add event listener. */
                                    close.addEventListener("click", callback, false);
                                }

                                /** set cancel event listener. */
                                let cancel = document.querySelector(".stock-note-destroy > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");
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
            }

        });
    }
    /** function on how backdrop behaves. */
    backdrop(config) {
        /** query document to pinpoint modal element. */
        let modal = document.querySelector(`.stock-note-${config["action"]}`);

        if (config["mode"] === "show") {
            /** show modal. */
            modal.classList.add("backdrop");
            modal.style.display = "block";
            /** clear input. */
            if (config["action"] === "insert") {
                this.helper.init({
                    type: "input",
                    section: "note",
                    target: `stock-note-${config["action"]}`,
                    action: "clear",
                    data: ["note"]
                });
            }
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
                section: "note",
                target: `stock-note-${config["action"]}`,
                action: "value",
                data: ["id", "section", "note"]
            });
            /** check if inputs are empty and valid. */
            let result = this.helper.init({
                type: "validate",
                data: collect
            });
            /** double check and then proceed. */
            if (Object.keys(result.error).length === 0) {
                /** request access token and then post to backend. */
                this.request({
                    method: "POST",
                    table: "note",
                    statement: config["action"],
                    input: result["success"]
                });
            } else {
                /** display user  message. */
                this.helper.init({ type: "message", section: false, message: result["message"] });
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
        if (config['method'] === 'GET') {
            axios.get("/sanctum/csrf-cookie").then(response => {
                axios.get("/api/stock-note-retrieve", {
                    params: { table: config['table'], statement: config['statement'] }
                }).then(response => {
                    if (response.data.status === true) {
                        /** populate notes element with data. */
                        if (response.data.notes) {
                            for (let i = 0; i < response.data.notes.length; i++) {
                                this.helper.init({ type: "node", id: `${i + 1}`, target: "stock-note", statement: response.data.sql, input: response.data.notes[i] });
                            }
                        }
                    }
                    /** display  message. */
                    this.helper.init({ type: 'message', section: response.data.status, message: response.data.message });
                });

            });
        }
        /** store data. */
        if (config['method'] === 'POST') {
            axios.get('/sanctum/csrf-cookie').then(() => {
                axios.post('/api/stock-note-store', {
                    table: config['table'],
                    statement: config['statement'],
                    input: config['input']
                }).then(response => {
                    /** populate order element with data. */
                    if (response.data.status === true) {
                        /** add or update element in document tree. */
                        if (response.data.sql === 'select') {
                            for (let key in response.data.notes) {
                                this.helper.init({ type: 'node', id: 0, target: "stock-note", statement: response.data.sql, input: response.data.notes[key] });
                            }
                        }
                        /** add or update element in document tree. */
                        if (response.data.sql === "update") {
                            for (let key in response.data.notes) {
                                this.helper.init({ type: "node", target: "stock-note", statement: response.data.sql, input: response.data.notes[key] });
                            }
                        }
                        /** remove element in document tree. */
                        if (response.data.sql === "destroy") {
                            this.helper.init({ type: "node", target: "stock-note", statement: response.data.sql, input: response.data.notes });
                        }
                        /** display success message. */
                        this.helper.init({ type: "message", status: response.data.status, message: response.data.message });
                    }
                })
            });
        }
    }
}
export default new stock_note();
