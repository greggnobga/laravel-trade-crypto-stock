/** Vendor. */
import { Outlet } from 'react-router-dom';

/** Component. */
import Header from '../headers'

const Single = () => {
    /** Return something. */
    return (
        <section id="single">
            <Header />
            <div id="wrapper">
                <Outlet />
            </div>
        </section>
    );
}

export default Single;