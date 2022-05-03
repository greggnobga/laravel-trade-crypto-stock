class input {
    init(config) {
        if (config['action'] === 'value') {
            let items = {};
            for (let key in config['data']) {
                items[config['data'][key]] = document.querySelector(`.${config['target']} > .crypto-${config['section']}-modal > .modal-${config['data'][key]}`).value;
            }
            return items;
        }
        if (config['action'] === 'clear') {
            for (let key in config['data']) {
                document.querySelector(`.${config['target']} > .crypto-${config['section']}-modal > .modal-${config['data'][key]}`).value = '';
            }
        }
    }
}
export default new input();
