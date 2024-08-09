/** Map stocks. */
export const mapObject = (object: any) => {
    /** Restructure result into desired key value pairs. */
    let stocks = [];
    if (object.hasOwnProperty('stock')) {
        /** Remap keys before saving to state. */
        for (let i = 0; i < object['stock'].length; i++) {
            stocks.push({
                name: object['stock'][i]['name'],
                change: object['stock'][i]['percent_change'],
                price: object['stock'][i]['price']['amount'],
                symbol: object['stock'][i]['symbol'],
                volume: object['stock'][i]['volume'],
            });
        }
    }
    /** Return */
    return stocks;
};
