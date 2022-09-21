/** import helper function. */
import helpers from "../../../helpers/helpers.js";

class crypto_overview {
    constructor() {
        this.event = document.querySelector(".speak-crypto-overviews");
        this.template = document.querySelector(".stage-crypto-overviews");
        this.element = document.querySelector(".perform");
        this.helper = helpers;
    }

    init() {
        /** fetch data. */
        this.request();
        /** setup overview listener. */
        this.event.addEventListener("click", (e) => {
            if (e.target.dataset.sidebar === 'crypto_overviews') {
                /** clone template. */
                let content = this.template.content.cloneNode(true);
                /** clear content. */
                this.element.innerHTML = '';
                /** inject content. */
                this.element.appendChild(content);
                /** fetch data. */
                this.request();
            }
        });
    }

    request() {
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.get('/api/crypto-overview-retrieve').then(response => {
                /** populate portfolio box. */
                if (response.data.coin.portfolios) {
                    /** query element. */
                    let port = document.querySelector(`.crypto-overview > .boxes > [data-section='${response.data.coin.portfolios.section}'] > .body`);

                    /** loop through response. */
                    for (let item in response.data.coin.portfolios) {
                        /** create parent div. */
                        let parent = document.createElement('div');
                        parent.classList.add('two-column');

                        if (response.data.coin.portfolios.hasOwnProperty(item)) {
                            /** ignore section key. */
                            if (item === 'section') {
                                continue;
                            }

                            /** create key div. */
                            let one = document.createElement('div');
                            one.classList.add('one');
                            one.textContent = item.charAt(0).toUpperCase() + item.slice(1);

                            /** append parent. */
                            parent.appendChild(one);

                            /** create value div. */
                            let two = document.createElement('div');
                            two.classList.add('two');
                            two.textContent = response.data.coin.portfolios[item].toLocaleString('en');

                            if (item === 'capital') {
                                two.textContent = response.data.coin.portfolios[item].toLocaleString('en', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                });
                            }

                            /** append parent. */
                            parent.appendChild(two);
                        }

                        /** append port. */
                        port.appendChild(parent);
                    }
                }

                /** populate moon box. */
                if (response.data.coin.moons) {
                    /** query element. */
                    let moon = document.querySelector(`.crypto-overview > .boxes > [data-section='${response.data.coin.moons.section}'] > .body`);

                    /** loop through response. */
                    for (let item in response.data.coin.moons) {
                        /** create parent div. */
                        let parent = document.createElement('div');
                        parent.classList.add('one-column');

                        if (response.data.coin.moons.hasOwnProperty(item)) {
                            /** ignore section key. */
                            if (item === 'section') {
                                continue;
                            }

                            /** create key div. */
                            let one = document.createElement('h2');
                            one.classList.add('one');
                            one.textContent = response.data.coin.moons[item];

                            /** append parent. */
                            parent.appendChild(one);
                        }

                        /** append port. */
                        moon.appendChild(parent);
                    }
                }

                /** populate game box. */
                if (response.data.coin.games) {
                    /** query element. */
                    let game = document.querySelector(`.crypto-overview > .boxes > [data-section='${response.data.coin.games.section}'] > .body`);

                    /** loop through response. */
                    for (let item in response.data.coin.games) {

                        /** create parent div. */
                        let parent = document.createElement('div');
                        parent.classList.add('one-column');

                        if (response.data.coin.games.hasOwnProperty(item)) {
                            /** ignore section key. */
                            if (item === 'section') {
                                continue;
                            }

                            /** create key div. */
                            let one = document.createElement('h2');
                            one.classList.add('one');
                            one.textContent = response.data.coin.games[item];

                            /** append parent. */
                            parent.appendChild(one);
                        }

                        /** append port. */
                        game.appendChild(parent);
                    }
                }

                /** populate screen box. */
                if (response.data.coin.screens) {
                    /** query element. */
                    let screen = document.querySelector(`.crypto-overview > .boxes > [data-section='${response.data.coin.screens.section}'] > .body`);

                    /** loop through response. */
                    for (let item in response.data.coin.screens) {

                        /** create parent div. */
                        let parent = document.createElement('div');
                        parent.classList.add('one-column');

                        if (response.data.coin.screens.hasOwnProperty(item)) {
                            /** ignore section key. */
                            if (item === 'section') {
                                continue;
                            }

                            /** create key div. */
                            let one = document.createElement('h2');
                            one.classList.add('one');
                            one.textContent = response.data.coin.screens[item];

                            /** append parent. */
                            parent.appendChild(one);
                        }

                        /** append port. */
                        screen.appendChild(parent);
                    }
                }
            });
        });
    }
}

export default new crypto_overview();
