class message {
    init(config) {
        /** display success message and clear after moments. */
        let board = document.querySelector('.card > .header > .meta > .right > .messenger');
        /** display success message. */
        if (config.status=== true) {
            board.classList.add('success');
            board.textContent = config.message;
            setTimeout(() => { board.classList.remove('success'); }, 3000);
        }
        /** display error message. */
        if (config.status=== false) {
            board.classList.add('error');
            board.textContent = config.message;
            setTimeout(() => { board.classList.remove('error'); }, 3000);
        }
        /** return. */
        return true;
    }
}
export default new message();
