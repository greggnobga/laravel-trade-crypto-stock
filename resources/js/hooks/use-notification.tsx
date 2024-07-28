/** Display notification. */
const useNotification = () => {
    /** Fetch user data from local storage. */
    const fromStorage = JSON.parse(localStorage.getItem('auth') || '{}')

    /** Check if user data is in storage. */
    if (fromStorage) {
        /** Put updated user in a variable. */
        let updatedUser = { ...fromStorage, show_message: false }

        /** Set the localstorage again. */
        localStorage.setItem('auth', JSON.stringify(updatedUser))
    }
}

export default useNotification
