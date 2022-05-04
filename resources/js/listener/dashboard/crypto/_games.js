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
                /** clear element before appending. */
                this.element.innerHTML = '';
                /** append template content. */
                this.element.appendChild(content);
                /** insert modal code block. */
                let record = document.querySelector('.click-game-record');
                if (record) {
                    record.addEventListener("click", (e) => {
                        /** show insert modal. */
                        if (e.target.dataset.modal === 'insert') {
                            this.backdrop({mode:'show', action:'insert'});
                        }
                    });
                }
            }
            this.request({method: 'GET'});
        });
    }
    backdrop(config) {
        if (config['mode'] === 'show') {
            /** show modal and add backdrop. */
            let modal = document.querySelector(`.crypto-game-wrapper`);
            modal.classList.add('backdrop');
            modal.style.display = 'block';

            if(config['action'] === 'insert') {
                let header = document.querySelector('.modal-header');
                header.textContent = 'Add Game';

                let dismiss = document.querySelectorAll(`.modal-dismiss`);
                for (let i=0; i<dismiss.length; i++) {
                    dismiss[i].addEventListener('click', ()=> {
                        modal.classList.remove('backdrop');
                        modal.style.display = 'none';
                        console.log('Hiding modal...')
                    });
                }

                let submit = document.querySelector(`.modal-submit`);
                submit.addEventListener('click', () => {
                        this.request({method: 'POST', table:'game', statement:config['action'], input:''})
                });
            }
        }
    }
    request(config) {
        if (config['method'] === 'GET') {
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.get('/api/crypto-game-retrieve').then(response => {
                    console.log(response.data);
                });
            });
        }

        if (config['method'] === 'POST') {
            if (config['statement'] === 'insert') {
                console.log('Run insert post query...')
            }
        }

    }
}

export default new games();
