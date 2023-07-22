/** Component. */
import Icon from "../../components/icons";

/** Modal edge template. */
export const modalEdgeTemplate = (props) => {
    /** Return. */
    return (
        <div className="card grid auto-rows-min h-fit rounded-t-md bg-stone-100 uppercase cursor-pointer">
            <div className="p-0">
                <div className="p-2 flex flex-row justify-between border-b border-stone-200">
                    <h1 className="text-xl">{props.header}</h1>
                    <p className="sm:pl-2" onClick={props.close}>
                        <Icon id="close" />{" "}
                        <span className="invisible sm:visible">Close</span>
                    </p>
                </div>
            </div>
            <div className="p-0">
                <div className="p-2 flex flex-row items-center justify-center border-b border-stone-200 w-full hover:text-purple-500">
                    <div className="w-4/12">Index</div>
                    <div className="w-4/12">Symbol</div>
                    <div className="w-4/12">Action</div>
                </div>
            </div>
            <div className="p-0">
                {props.data ? (
                    props.data.map((item, index) => {
                        /** Return. */
                        return (
                            <>
                                <div className="p-2 flex flex-row items-center justify-center border-b border-stone-200 w-full hover:text-green-500">
                                    <div className="w-4/12">{index + 1}</div>
                                    <div className="w-4/12">{item.symbol}</div>
                                    <div className="w-4/12">
                                        {props.index === index &&
                                        props.shown ? (
                                            <span
                                                className="uppercase"
                                                onClick={() => {
                                                    props.form(false);
                                                }}
                                            >
                                                <Icon id="add" />{" "}
                                                <span className="invisible sm:visible">
                                                    Close
                                                </span>
                                            </span>
                                        ) : (
                                            <span
                                                className="uppercase"
                                                onClick={() => {
                                                    props.form(true);
                                                    props.set(index);
                                                }}
                                            >
                                                <Icon id="add" />{" "}
                                                <span className="invisible sm:visible">
                                                    Update
                                                </span>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {props.shown && props.index === index && (
                                    <div className="p-2 flex flex-col sm:flex-row items-center justify-center border-b border-stone-200 w-full hover:text-green-500">
                                        <div className="grow sm:w-4/12">
                                            {item.symbol}
                                        </div>
                                        <div className="grow sm:w-4/12">
                                            <input
                                                className={`p-2 rounded shadow ${
                                                    props.error
                                                        ? "border border-red-500 text-red"
                                                        : "border border-green-500 text-green"
                                                }`}
                                                id="edge"
                                                name="edge"
                                                type="text"
                                                placeholder="Enter Edge ID"
                                                onBlur={props.blur}
                                                onChange={props.change}
                                                value={props.value}
                                                autoComplete="off"
                                            />
                                            {props.error && (
                                                <p className="pt-1 text-red-500 text-[.50rem]">
                                                    Please enter a valid edge
                                                    id.
                                                </p>
                                            )}
                                        </div>
                                        <div className="grow sm:w-4/12">
                                            <button
                                                className="uppercase"
                                                onClick={() => {
                                                    props.action({
                                                        symbol: item.symbol,
                                                        value: props.value,
                                                    });
                                                    props.form(false);
                                                    props.reset();
                                                }}
                                                disabled={props.error}
                                            >
                                                <Icon id="submit" />{" "}
                                                <span className="invisible sm:visible">
                                                    Submit
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        );
                    })
                ) : (
                    <div className="form-center">
                        <p>No record found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

/** Desktop modale template. */
export const modalBlueTemplate = (props) => {
    /** Show form hadler. */
    const showFormHandler = (symbol) => {
        props.form(true);
        console.log(symbol);
    };

    /** Return. */
    return (
        <div className="card grid auto-rows-min h-fit rounded-t-md bg-stone-100 uppercase cursor-pointer">
            <div className="p-0">
                <div className="p-2 flex flex-row justify-between border-b border-stone-200">
                    <h1 className="text-xl">{props.header}</h1>
                    <div className="p-0">
                        <span
                            className="text-right sm:pl-2"
                            onClick={() => props.form(!props.shown)}
                        >
                            {props.shown ? (
                                <>
                                    <Icon id="cancel" />{" "}
                                    <span className="invisible sm:visible">
                                        Cancel
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Icon id="add" />{" "}
                                    <span className="invisible sm:visible">
                                        Add
                                    </span>
                                </>
                            )}
                        </span>
                        <span
                            className="text-right sm:pl-2"
                            onClick={props.close}
                        >
                            <Icon id="close" />{" "}
                            <span className="invisible sm:visible">Close</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className="p-0">
                <div className="p-2 flex flex-row items-center justify-center border-b border-stone-200 w-full hover:text-purple-500">
                    <div className="w-4/12">Index</div>
                    <div className="w-4/12">Symbol</div>
                    <div className="w-4/12">Action</div>
                </div>
            </div>
            <div className="p-0">
                {props.shown ? (
                    <div className="p-2 flex flex-col sm:flex-row items-center justify-center border-b border-stone-200 w-full hover:text-green-500">
                        <div className="grow sm:w-4/12 uppercase">
                            Add Bluechip
                        </div>
                        <div className="grow sm:w-4/12">
                            <input
                                className={`p-2 rounded shadow ${
                                    props.error
                                        ? "border border-red-500 text-red"
                                        : "border border-green-500 text-green"
                                }`}
                                id="bluechip"
                                name="bluechip"
                                type="text"
                                placeholder="Enter Symbol"
                                onBlur={props.blur}
                                onChange={props.change}
                                value={props.value}
                                autoComplete="off"
                            />
                            {props.error && (
                                <p className="pt-1 text-red-500 text-[.50rem]">
                                    Please enter a valid symbol.
                                </p>
                            )}
                        </div>
                        <div className="grow sm:w-4/12">
                            <button
                                className="uppercase"
                                onClick={() => {
                                    props.action({
                                        statement: "store",
                                        value: props.value,
                                    });
                                    props.form(false);
                                    props.reset();
                                }}
                                disabled={props.error}
                            >
                                <Icon id="submit" />{" "}
                                <span className="invisible sm:visible">
                                    Submit
                                </span>
                            </button>
                        </div>
                    </div>
                ) : props.data ? (
                    props.data.map((item, index) => {
                        return (
                            <div className="p-2 flex flex-row items-center justify-center border-b border-stone-200 w-full hover:text-green-500">
                                <div className="w-4/12">{index + 1}</div>
                                <div className="w-4/12">{item.symbol}</div>
                                <div className="w-4/12">
                                    <button
                                        className="uppercase"
                                        onClick={() => {
                                            props.action({
                                                statement: "destroy",
                                                value: item.symbol,
                                            });
                                            props.form(false);
                                            props.reset();
                                        }}
                                        disabled={props.error}
                                    >
                                        <Icon id="destroy" />{" "}
                                        <span className="invisible sm:visible">
                                            Delete
                                        </span>
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="form-center">
                        <p>No record found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
