/** Vendor. */
import { Outlet } from 'react-router-dom';

/** Component. */
import Header from '../headers'
import Menu from '../pages/dashboard/menu'

const Single = () => {
    /** Return something. */
    return (
        <section id="single">
            <Header />
            <Menu />
            <Outlet />
        </section>
    );
}

export default Single;