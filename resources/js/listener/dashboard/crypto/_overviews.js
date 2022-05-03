class overview {
    constructor() {
        this.event = document.querySelector(".speak-crypto-overviews");
        this.template = document.querySelector(".stage-crypto-overviews");
        this.element = document.querySelector(".perform");
    }

    init() {
        /** setup overview listener. */
        this.event.addEventListener("click", (e) => {
             if (e.target.dataset.sidebar === 'overviews') {
                 console.log(e.target.dataset.sidebar);
                 let content = this.template.content.cloneNode(true);
                 /** clear content*/
                 this.element.innerHTML = '';
                 /** inject content */
                 this.element.appendChild(content);
             }
             this.request();
        });
    }

    request() {
       axios.get('/sanctum/csrf-cookie').then(response => {
            axios.get('/api/user').then(response => {
                console.log(response.data);
            });

           axios.get('/api/test').then(response => {
               console.log(response.data);
           });
        });
    }
}

export default new overview();
