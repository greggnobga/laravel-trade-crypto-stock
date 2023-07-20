/** Component. */
import Icon from "../../components/icons";

/** Desktop modale template. */
export const desktopModalTemplate = ({ data, header, close }) => {
    console.log(data);
    return (
        <div className="card grid auto-rows-min h-fit rounded-t-md bg-stone-100 uppercase">
            <div className="p-2 border-bottom">
                <div className="flex flex-row justify-between">
                    <h1 className="text-xl">{header}</h1>
                    <p className="pl-2" onClick={close}>
                        <Icon id="close" /> Close
                    </p>
                </div>
            </div>
            <div className="p-2">
                <div className="flex flex-row items-center justify-center">
                    <div className="grow">Index</div>
                    <div className="grow">Symbol</div>
                    <div className="grow">Action</div>
                </div>
            </div>
            <div className="p-2">
                {data &&
                    Object.entries(data).map((item, index) => {
                        return <p>{item[1].symbol}</p>;
                    })}
            </div>
        </div>
    );
};
