/** Vendor. */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

/** Store. */
import { store } from '$lib/store/store';

/** Component. */
import App from '$lib/app';

/** Attached. */
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
);
