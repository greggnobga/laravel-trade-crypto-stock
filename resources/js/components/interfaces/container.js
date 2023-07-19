/** Component. */
import Icon from "../../components/icons";

const Container = ({ header, children }) => {
    return (
        <div className="m-2 grid auto-rows-min h-fit">
            <div className="p-2 h-8 sm:10 uppercase"> {header}</div>
            <div className="p-2">{children}</div>
        </div>
    );
};

export default Container;
