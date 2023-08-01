/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.withCredentials = true;

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

/** Vendor. */
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

/** Store. */
import store from "./Store";

/** Component. */
import App from "./App";

/** Attached. */
if (document.getElementById("root")) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));
    Index.render(
        <Provider store={store}>
            <App />
        </Provider>
    );
}