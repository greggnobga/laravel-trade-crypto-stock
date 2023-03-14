/** Vendor. */
import { Outlet } from 'react-router-dom';

/** Component. */
import Header from '../headers'
import Footer from '../footer'

const Single = () => {
    /** Return something. */
    return (
        <section id="single">
            <Header />
            <div id="wrapper">
                {/* <Outlet /> */}
            </div>
            <Footer />
        </section>
    );
}

export default Single;