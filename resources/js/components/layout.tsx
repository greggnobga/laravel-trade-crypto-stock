/** Vendor. */
import { Outlet } from 'react-router-dom';

/** Component. */
import Headers from './header';
import Footers from './footer';

const Single = () => {
    /** Return something. */
    return (
        <>
            <Headers />
            <div className='min-h-screen overflow-hidden'>
                <Outlet />
            </div>
            <Footers />
        </>
    );
};

export default Single;
