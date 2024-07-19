export const removeIndex = (object, keys) => {
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

export const mapObject = (object) => {
    /** Restructure result into desired key value pairs. */
    let stocks = [];
    if (object.hasOwnProperty("stock")) {
        /** Remap keys before saving to state. */
        for (let i = 0; i < object["stock"].length; i++) {
            stocks.push({
                name: object["stock"][i]["name"],
                change: object["stock"][i]["percent_change"],
                price: object["stock"][i]["price"]["amount"],
                symbol: object["stock"][i]["symbol"],
                volume: object["stock"][i]["volume"],
            });
        }
    }
    /** Return */
    return stocks;
};

export const chunkObject = ({ divide, data }) => {
    /** Convert object intor array. */
    const converted = Object.values(data);

    /** Divide data by item. */
    const chunks = Array.from(
        { length: Math.ceil(converted.length / divide) },
        (_, index) => converted.slice(index * divide, (index + 1) * divide)
    );

    /** Get chunks length. */
    const pages = Array(chunks.length).fill(null);

    /** Return. */
    return { chunks, pages };
};
