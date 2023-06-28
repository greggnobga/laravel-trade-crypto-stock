const Stories = () => {
    /** Return something. */
    return (
        <div className="grid auto-rows-min bg-zinc-200 bg-opacity-50 border-b border-neutral-100">
            <div className="p-2 mb-2 uppercase text-right text-green-700 bg-green-200 bg-opacity-50">
                Our Stories
            </div>
            <div className="p-2 grid auto-rows-min gap-2 sm:grid-cols-2 md:grid-cols-3 border-three bg-stone-200 bg-opacity-40 hover:bg-stone-300 hover:bg-opacity-40">
                <div className="card">
                    <div className="hover:graycale">
                        <img
                            className="w-400 h-200 object-cover w-full"
                            src="/public/images/bitcoin.jpg"
                            alt="Placeholder Image"
                        />
                    </div>
                    <div className="p-2">
                        <h1 className="pb-2">Story Title</h1>
                        <p className="text-sm md:text-md lg:text-lg">
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium, totam
                            rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta
                            sunt explicabo. Nemo enim ipsam voluptatem quia
                            voluptas sit aspernatur aut odit aut fugit, sed quia
                            consequuntur magni dolores eos qui ratione
                            voluptatem sequi nesciunt.
                        </p>
                    </div>
                    <div className="p-2 text-right">
                        <button className="btn btn-orange">Read More</button>
                    </div>
                </div>
                <div className="card">
                    <div className="hover:graycale">
                        <img
                            className="w-400 h-200 object-cover w-full"
                            src="/public/images/boat.jpg"
                            alt="Placeholder Image"
                        />
                    </div>
                    <div className="p-2">
                        <h1 className="pb-2">Story Title</h1>
                        <p className="text-sm md:text-md lg:text-lg">
                            Neque porro quisquam est, qui dolorem ipsum quia
                            dolor sit amet, consectetur, adipisci velit, sed
                            quia non numquam eius modi tempora incidunt ut
                            labore et dolore magnam aliquam quaerat voluptatem.
                            Ut enim ad minima veniam, quis nostrum
                            exercitationem ullam corporis suscipit laboriosam,
                            nisi ut aliquid ex ea commodi consequatur.
                        </p>
                    </div>
                    <div className="p-2 text-right">
                        <button className="btn btn-orange">Read More</button>
                    </div>
                </div>
                <div className="card">
                    <div className="hover:graycale">
                        <img
                            className="w-400 h-200 object-cover w-full"
                            src="/public/images/marketing.jpg"
                            alt="Placeholder Image"
                        />
                    </div>
                    <div className="p-2">
                        <h1 className="pb-2">Story Title</h1>
                        <p className="text-sm md:text-md lg:text-lg">
                            At vero eos et accusamus et iusto odio dignissimos
                            ducimus qui blanditiis praesentium voluptatum
                            deleniti atque corrupti quos dolores et quas
                            molestias excepturi sint occaecati cupiditate non
                            provident, similique sunt in culpa qui officia
                            deserunt mollitia animi, id est laborum et dolorum
                            fuga.
                        </p>
                    </div>
                    <div className="p-2 text-right">
                        <button className="btn btn-orange">Read More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stories;
