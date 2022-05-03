class sidebar {
    constructor() {
        this.jcrypto = document.querySelector(".js-crypto");
        this.dcrypto = document.querySelector(".dm-crypto");
        this.jstock = document.querySelector(".js-stock");
        this.dstock = document.querySelector(".dm-stock");
    }

    init() {
        /** setup sidebar listener. */
        this.jcrypto.addEventListener("click", (e) => {
            if (e.target.dataset.sidebar === 'crypto') {
                if (this.dcrypto.style.display === "none") {
                    this.dcrypto.style.display = "block";
                    this.dstock.style.display = "none";
                } else {
                    this.dcrypto.style.display = "none";
                }
            }
        });
        this.jstock.addEventListener("click", (e) => {
            if (e.target.dataset.sidebar === 'stock') {
                if (this.dstock.style.display === "none") {
                    this.dstock.style.display = "block";
                    this.dcrypto.style.display = "none";
                } else {
                    this.dstock.style.display = "none";
                }
            }
        });
    }
}
export default new sidebar();
