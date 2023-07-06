const useFilter = (object, keys) => {
    /** Filter account state. */
    const filtered = Object.keys(object)
        .filter((key) => {
            /** Declare placeholder. */
            const item = object[key];

            /** Remove key. */
            for (index in keys) {
                if (key !== keys[index]) {
                    return item;
                }
            }
        })
        .reduce((filter, key) => {
            /** Reconstruct the filtered object using the filtered keys */
            filter[key] = object[key];

            /** Return. */
            return filter;
        }, {});
    /** Return */
    return filtered;
};

export default useFilter;
