/** Hook. */
import useFocus from '../../../hooks/use-focus';

const Stories = () => {
    /** Use focus hook. */
    const [refer, animate, effect] = useFocus({ default: 'stories', animate: 'fade-in-left' });

    /** Return something. */
    return (
        <div ref={refer} className={effect}>
            <div className="title">Our Stories</div>
            <div className="story">
                <div className="items">
                    <div className="thumbnail"><img src="/public/images/placeholder.png" alt="Placeholder Image" /></div>
                    <div className="content">
                        <h1>Story Title</h1>
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                        <span className="button"><button className="btn btn-outline">Read More</button></span>
                    </div>
                </div>
                <div className="items">
                    <div className="thumbnail"><img src="/public/images/placeholder.png" alt="Placeholder Image" /></div>
                    <div className="content">
                        <h1>Story Title</h1>
                        <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.</p>
                        <span className="button"><button className="btn btn-outline">Read More</button></span>
                    </div>
                </div>
                <div className="items">
                    <div className="thumbnail"><img src="/public/images/placeholder.png" alt="Placeholder Image" /></div>
                    <div className="content">
                        <h1>Story Title</h1>
                        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
                        <span className="button"><button className="btn btn-outline">Read More</button></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stories;