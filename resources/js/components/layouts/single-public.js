/** Vendor. */
import { Outlet } from 'react-router-dom';

/** Component. */
import Header from '../headers'

const Single = () => {
    /** Return something. */
    return (
        <section id="single">
            <Header />
            <Outlet />
        </section>
    );
}

export default Single;