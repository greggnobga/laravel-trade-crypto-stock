class node {
    /** fire it on. */
    init(config) {
        /** create base element. */
        if (config.statement === "select") {
            /** create parent element. */
            let parent = document.createElement("div");
            parent.classList.add("items");
            /** create child element. */
            for (let key in config.input) {
                /** create document node. */
                let child = document.createElement("div");
                child.classList.add(key);
                child.textContent = config.input[key];
                parent.appendChild(child);

                /** set style display to none. */
                if (key === "edge") {
                    child.style.display = 'none';
                }

                /** set style display to none. */
                if (key === "sector") {
                    child.style.display = 'none';
                }

                /** restructure id content. */
                if (key === "id") {
                    child.classList.add(key);
                    child.setAttribute("data-id", config.input[key]);
                    child.textContent = config.id;
                }

                /** restructure action content. */
                if (key === "action") {
                    let content = parent.querySelector(".action");
                    content.textContent = "";
                    let string = config.input[key];
                    let action = string.split(" ");
                    for (let k in action) {
                        /** create inner element. */
                        let inner = document.createElement("span");
                        /** set class. */
                        inner.classList.add(action[k].toLowerCase());
                        /** evaluate value. */
                        if (action[k] === "Show") {
                            inner = document.createElement("a");
                            inner.setAttribute(
                                "href",
                                `https://edge.pse.com.ph/companyPage/financial_reports_view.do?cmpy_id=${config.input.edge}`
                            );
                            inner.setAttribute("target", "_blank");
                            inner.textContent = action[k];
                            inner.classList.add(action[k].toLowerCase());
                        } else {
                            inner.textContent = action[k];
                        }
                        /** append to document node. */
                        content.appendChild(inner);
                    }
                }
            }
            /** append parent element. */
            let element = document.querySelector(`.${config.target}`);
            element.appendChild(parent);
        }
        /** update element. */
        if (config.statement === "update") {
            let element = document.querySelector(`.${config.target} > .items > [data-id='${config.input.id}']`).parentElement;
            /** run trough it all. */
            for (let key in config.input) {
                /** ignore this key. */
                if (key === "edge") continue;
                if (key === "action") continue;
                if (key === "id") continue;

                /** fetch element. */
                let child = element.querySelector(`.${key}`);
                child.textContent = config.input[key];
            }
        }
        /** destroy element. */
        if (config.statement === "destroy") {
            let element = document.querySelector(
                `.${config.target} > .items > [data-id='${config.input}']`
            );
            element.parentElement.remove();
        }

        /** return. */
        return true;
    }
}
export default new node();
