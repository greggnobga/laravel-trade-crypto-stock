class input {
    init(config) {
        /** fetch value. */
        if (config['action'] === 'value') {
            let items = {};
            for (let key in config['data']) {
                items[config['data'][key]] = document.querySelector(`.${config['target']} > .crypto-modal > .modal-group > .modal-${config['data'][key]}`).value;
            }
            return items;
        }
        /** clear input. */
        if (config['action'] === 'clear') {
            for (let key in config['data']) {
                document.querySelector(`.${config['target']} > .crypto-modal > .modal-group > .modal-${config['data'][key]}`).value = '';
            }
        }

        /** populate input. */
        if (config['action'] === 'populate') {
            /** loop through keys */
            for (let i=0; i<config['data'].length; i++) {
                let content = config['el'].querySelector(`.${config['data'][i]}`).textContent;
                if (config['data'][i] === 'id') {
                    let id = config['el'].querySelector(`.${config['data'][i]}`).dataset.id;
                    document.querySelector(`.${config['target']} > .crypto-modal > .modal-group > .modal-${config['data'][i]}`).setAttribute('value', id);
                } else {
                    document.querySelector(`.${config['target']} > .crypto-modal > .modal-group > .modal-${config['data'][i]}`).value = content;
                }
            }
        }
    }
}
export default new input();
