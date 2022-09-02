class input {
    init(config) {
        /** fetch value. */
        if (config.action === 'value') {
            let items = [];
            for (let i = 0; i < config.data.length; i++) {
                /** screen api. */
                if (config.data[i] === 'api') {
                    items[config.data[i]] = document.querySelector(`.${config.target} > .modal-form > .modal-group > .modal-gecko > .modal-${config.data[i]}`).value;
                }
                /** screen edge. */
                else if (config.data[i] === 'edge') {
                    items[config.data[i]] = document.querySelector(`.${config.target} > .modal-form > .modal-group > .modal-gecko > .modal-${config.data[i]}`).value;
                }
                /** the rest. */
                else {
                    items[config.data[i]] = document.querySelector(`.${config.target} > .modal-form > .modal-group > .modal-${config.data[i]}`).value;
                }
            }
            return items;
        }
        /** clear input. */
        if (config.action === 'clear') {
            for (let key in config.data) {
                if (config.data.hasOwnProperty(key)) {
                    /** screen api. */
                    if (config.data[key] === 'api') {
                        document.querySelector(`.${config.target} > .modal-form > .modal-group > .modal-gecko > .modal-${config.data[key]}`).value = '';
                    }
                    /** screen edge. */
                    else if (config.data[key] === 'edge') {
                        document.querySelector(`.${config.target} > .modal-form > .modal-group > .modal-gecko > .modal-${config.data[key]}`).value = '';
                    }
                    /** the rest. */
                    else {
                        document.querySelector(`.${config.target} > .modal-form > .modal-group > .modal-${config.data[key]}`).value = '';
                    }
                }
            }
        }

        /** populate input. */
        if (config.action === 'populate') {
            /** loop through keys */
            for (let i = 0; i < config.data.length; i++) {
                /** scavenge content. */
                let content = config.el.querySelector(`.${config.data[i]}`).textContent;

                /** set id value. */
                if (config.data[i] === 'id') {
                    let id = config.el.querySelector(`.${config.data[i]}`).dataset.id;
                    document.querySelector(`.${config.target} > .modal-form > .modal-group > .modal-${config.data[i]}`).setAttribute('value', id);
                }

                /** set api value. */
                else if (config.data[i] === 'api') {
                    document.querySelector(`.${config.target} > .modal-form > .modal-group > .modal-gecko > .modal-${config.data[i]}`).value = content;
                }

                /** set edge value. */
                else if (config.data[i] === 'edge') {
                    document.querySelector(`.${config.target} > .modal-form > .modal-group > .modal-gecko > .modal-${config.data[i]}`).value = content;
                }

                /** the rest. */
                else {
                    document.querySelector(`.${config.target} > .modal-form > .modal-group > .modal-${config.data[i]}`).value = content;
                }
            }
        }

        /** for destory modal. */
        if (config.action === 'destroy') {
            /** declare repository. */
            let content = [];
            /** if to set content. */
            if (config['section'] === 'populate') {
                /** loop through keys */
                for (let i = 0; i < config.data.length; i++) {
                    /** set id value. */
                    if (config.data[i] === 'id') {
                        let id = config.el.querySelector(`.${config.data[i]}`).dataset.id;
                        document.querySelector(`.${config.target} > .modal-form > .modal-group > .modal-${config.data[i]}`).setAttribute('value', id);
                    } else {
                        let text = config.el.querySelector(`.${config.data[i]}`).textContent;
                        document.querySelector(`.${config.target} > .modal-form > .modal-group > .modal-${config.data[i]}-question > .modal-${config.data[i]}`).textContent = text;
                    }
                }
            }
            /** if to get content. */
            if (config['section'] === 'content') {
                /** loop through keys */
                for (let i = 0; i < config.data.length; i++) {
                    if (config.data[i] === 'id') {
                        content[config.data[i]] = document.querySelector(`.${config.target} > .modal-form > .modal-group > .modal-${config.data[i]}`).value;
                    }
                    /** the rest. */
                    else {
                        content[config.data[i]] = document.querySelector(`.${config.target} > .modal-form > .modal-group > .modal-${config.data[i]}-question > .modal-${config.data[i]}`).textContent;
                    }
                }
            }
            /** return something. */
            return content;
        }
    }
}
export default new input();
