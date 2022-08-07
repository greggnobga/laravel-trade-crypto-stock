class node {
    init(config) {
        /** create base element. */
        if (config.statement === 'select') {
            /** create parent element. */
            let parent = document.createElement('div');
            parent.classList.add('items');
            /** create child element. */
            for (let key in config.input) {
                let child = document.createElement('div');
                child.classList.add(key);
                child.textContent = config.input[key];
                parent.appendChild(child);

                /** restructure id content. */
                if (key === 'id') {
                    child.classList.add(key);
                    child.setAttribute('data-id', config.input[key]);
                    child.textContent = config.id;
                }

                /** restructure action content. */
                if (key === 'action') {
                    let content = parent.querySelector('.action');
                    content.textContent = '';
                    let string = config.input[key];
                    let action = string.split(' ');
                    for (let k in action) {
                        /** create inner element. */
                        let inner = document.createElement('span');
                        inner.classList.add(action[k].toLowerCase());
                        inner.textContent = action[k];
                        content.appendChild(inner);
                    }
                }
            }
            /** append parent element. */
            let element = document.querySelector(`.${config.target}`);
            element.appendChild(parent);
        }
        /** update element. */
        if (config.statement === 'update') {
            let element = document.querySelector(`.${config.target} > .items > [data-id='${config.input.id}']`).parentElement;
            /** run trough it all. */
            for (let key in config.input) {
                if (key === 'action') continue;
                if (key === 'id') continue;
                let child = element.querySelector(`.${key}`);
                child.textContent = config.input[key];
            }
        }
        /** destroy element. */
        if (config.statement === 'destroy') {
            let element = document.querySelector(`.${config.target} > .items > [data-id='${config.input}']`);
            element.parentElement.remove();
        }

        /** return. */
        return true;
    }
}
export default new node();
