/** Vendor. */
import { Outlet } from 'react-router-dom';

/** Component. */
import Header from '../headers'
import Footer from '../footer'

const Single = () => {
    /** Return something. */
    return (
        <section id="single" className="fade-in-bottom">
            <Header />
            <div id="wrapper">
                <Outlet />
            </div>
            <Footer />
        </section>
    );
}

export default Single;