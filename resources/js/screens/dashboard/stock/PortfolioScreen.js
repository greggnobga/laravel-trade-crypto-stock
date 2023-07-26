/** React. */
import { useState, useContext, useEffect } from "react";

/** Hook. */
import useScreen from "../../../hooks/UseScreen";

/** Component. */
import Icon from "../../../components/Icon";

const Portfolio = () => {
    /** Use state. */
    const [record, setRecord] = useState(false);

    /** Show or hide form. */
    const recordHandler = () => {
        setRecord(!record);
    };

    return (
        <div className='border border-blue-500'>
            <div className='account'>
                <div className='board'>
                    <Icon id='portfolio' />
                    <span className='name'>Account</span>
                </div>
                <div className=''>
                    <div className='items'>Bar Chart Here!</div>
                </div>
            </div>
            <div className='asset'>
                <div className='board'>
                    <Icon id='portfolio' />
                    <span className='name'>Hold</span>
                </div>
                <div className=''>
                    <h1>Hold section</h1>
                </div>
            </div>
            <div className='order'>
                <div className='board'>
                    <div className='items'>
                        <div className='brand'>
                            <Icon id='trade' />
                            <span className='name'>Order</span>
                        </div>
                        <div className='record'>
                            <span onClick={recordHandler} className='btn btn-gold-outline'>
                                <Icon id='add' /> Add
                            </span>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <h1>Order form </h1>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
