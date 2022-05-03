class games {
    constructor() {
        this.event = document.querySelector(".speak-crypto-games");
        this.template = document.querySelector(".stage-crypto-games");
        this.element = document.querySelector(".perform");
    }

    init() {
        /** setup overview listener. */
        this.event.addEventListener("click", (e) => {
            if (e.target.dataset.sidebar === 'games') {
                console.log(e.target.dataset.sidebar);
                let content = this.template.content.cloneNode(true);
                /** clear content*/
                this.element.innerHTML = '';
                this.element.appendChild(content);
            }
            this.request();
        });
    }

    request() {
       axios.get('/sanctum/csrf-cookie').then(response => {
            axios.get('/api/crypto-game-retrieve').then(response => {
                console.log(response.data);
            });
        });
    }
}

export default new games();
