/** React. */
import { useState } from "react";

/** Component. */
import Icon from "../icons";

const Search = (props) => {
    /** Use state. */
    const [filter, setFilter] = useState("");

    /** Return something. */
    return (
        <div className={`search-${props.screen}`}>
            <div className="item">
                <input
                    className="input"
                    name="search"
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    required
                />
                <label className="label" htmlFor="search">
                    Search
                </label>
            </div>
            <div className="item">
                <button
                    className="btn btn-green-outline"
                    type="button"
                    onClick={() => {
                        props.search(filter);
                    }}
                >
                    <Icon id="submit" /> Search
                </button>
                <button
                    className="btn btn-red-outline"
                    type="button"
                    onClick={props.display}
                >
                    <Icon id="cancel" /> Cancel
                </button>
            </div>
        </div>
    );
};

export default Search;
