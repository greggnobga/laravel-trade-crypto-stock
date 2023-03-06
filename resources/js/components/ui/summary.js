const Summary = () => {

    const summaryItems = [
        { title: 'PSE Index', value: '6,724.62' },
        { title: 'All Shares', value: '3,591.67' },
        { title: 'Financials', value: '1,851.39' },
        { title: 'Industrial', value: '9,604.93' },
        { title: 'Holding Firms', value: '6,482.10' },
        { title: 'Services', value: '1,649.72' },
        { title: 'Mining and Oil', value: '11,103.17' },
        { title: 'Property', value: '2,894.60' }
    ];

    return (
        <div className="summary">
            {summaryItems.map(item => {
                return <div className="items" key={item['title']}>
                    <p className="title">{item['title']}</p>
                    <p className="value">{item['value']}</p>
                </div>;
            })}
        </div>
    );
}

export default Summary;