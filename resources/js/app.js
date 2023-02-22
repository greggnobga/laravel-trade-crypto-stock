/** React. */
import { Fragment, useEffect } from 'react';

/** Hook. */
import useHttp from './hooks/use-http';

/** Component. */
import Header from './components/headers'
const App = () => {
    /** Use http hook. */
    const testResponse = (data) => {
        console.log(data);
    };

    const { isLoading, sendRequest } = useHttp({
        url: '/api/login',
        method: 'GET',
        params: {}
    }, testResponse);

    useEffect(() => {
        sendRequest();
    }, []);


    return (
        <Fragment>
            <Header />
        </Fragment>

    );
}

export default App;