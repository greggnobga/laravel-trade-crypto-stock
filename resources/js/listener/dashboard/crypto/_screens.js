class screen {
    constructor() {
        this.event = document.querySelector(".speak-crypto-screens");
        this.template = document.querySelector(".stage-crypto-screens");
        this.element = document.querySelector(".perform");
    }

    init() {
        /** setup overview listener. */
        this.event.addEventListener("click", (e) => {
            if (e.target.dataset.sidebar === 'screens') {
                console.log(e.target.dataset.sidebar);
                let content = this.template.content.cloneNode(true);
                /** clear content*/
                this.element.innerHTML = '';
                /** inject content*/
                this.element.appendChild(content);
            }
            this.request();
        });
    }

    request() {
       axios.get('/sanctum/csrf-cookie').then(response => {
            axios.get('/api/crypto-screen-retrieve').then(response => {
                console.log(response.data);
            });
        });
    }
}

export default new screen();
