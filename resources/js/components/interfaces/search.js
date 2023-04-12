/** Component. */
import Icon from "../icons";

const Search = (props) => {
    return (
        <div className={`search-${props.screen}`}>
            <div className="form">
                <div className="group">
                    <label className="label" htmlFor="search">
                        <Icon id="search" /> Search
                    </label>
                    <input className="input valid" name="search" type="text" />
                </div>
            </div>
            <div className="button">
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={props.search}
                >
                    Search
                </button>
                <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={props.display}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Search;
