/** React. */
import { Fragment } from 'react';

/** Component. */
import Icon from '../../icons';
import Summary from '../../interfaces/summary';

import Hero from './hero';
import Reason from './reason';
import Compare from './compare';
import Stories from './stories';

const Home = () => {
    return (
        <Fragment>
            <Summary />
            <Hero />
            <Reason />
            <Stories />
            <Compare />
        </Fragment>
    );
}

export default Home;