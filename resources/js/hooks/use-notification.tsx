/** Display notification. */
const useNotification = () => {
    /** Fetch auth from local storage. */
    const authFromStorage = JSON.parse(localStorage.getItem('auth') || '{}');

    /** Check if auth is in storage. */
    if (authFromStorage) {
        /** Put updated data in a variable. */
        let updatedData = { ...authFromStorage, show_message: false };

        /** Set the localstorage again. */
        localStorage.setItem('auth', JSON.stringify(updatedData));
    }

    /** Fetch stock explorer from local storage. */
    const stockExplorerFromStorage = JSON.parse(localStorage.getItem('stock-explorer') || '{}');

    /** Check if stock explorer is in storage. */
    if (stockExplorerFromStorage) {
        /** Put updated data in a variable. */
        let updatedData = { ...stockExplorerFromStorage, show_message: false };

        /** Set the localstorage again. */
        localStorage.setItem('stock-explorer', JSON.stringify(updatedData));
    }

    /** Fetch stock detail from local storage. */
    const stockDetailFromStorage = JSON.parse(localStorage.getItem('stock-detail') || '{}');

    /** Check if stock detail is in storage. */
    if (stockDetailFromStorage) {
        /** Put updated data in a variable. */
        let updatedData = { ...stockDetailFromStorage, show_message: false };

        /** Set the localstorage again. */
        localStorage.setItem('stock-detail', JSON.stringify(updatedData));
    }
};

export default useNotification;
