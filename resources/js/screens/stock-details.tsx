/** Vendor. */
// import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// /** Hook. */
// import { useAppDispatch, useAppSelector } from '$lib/hooks/use-rtk';
// import useNotification from '$lib/hooks/use-notification';

// /** Action. */
// import { explorerRequest } from '$lib/store/feature/stock/explorer-slice';

// /** Component. */
// import Loader from '$lib/components/loader';
// import Notification from '$lib//components/notification';

const StockDetails = () => {
    // /** Use state. */
    // const [notice, setNotice] = useState(false);
    // /** Use selector. */
    // const stockExplorerFetch = useSelector((state) => state.stockExplorerFetch);
    // const { loading, stockexplorer } = stockExplorerFetch;
    // const showMessage = useSelector((state) => state.showMessage);
    // const { message, error } = showMessage;
    // /** Use screen. */
    // const { isMobile } = useScreen();

    /** Use params. */
    const { ticker } = useParams();

    // /** Use navigate. */
    // const navigate = useNavigate();

    // /** Use selector. */
    // const stockExplorer = useAppSelector((state) => state.stockExplorer);
    // const { loading, show_message, pages, stocks } = stockExplorer;

    // /** Use dispatch. */
    // const dispatch = useAppDispatch();

    // /** Use effect. */
    // useEffect(() => {
    //     /** If no page is provided, redirect to page 1 */
    //     if (!page) {
    //         navigate('/stock-explorer', { replace: true });
    //     }

    //     dispatch(explorerRequest({ section: 'explorer', statement: 'select', page: currentPage }));

    //     /** Dispatch request on reload. */
    //     // if (!stocks) {
    //     //     dispatch(explorerRequest({ section: 'explorer', statement: 'select', page: currentPage }));
    //     // }
    // }, [page, navigate, show_message, pages]);

    /** Return something. */
    return (
        <section className='p-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            <h1>Stock detail page of {ticker}</h1>
        </section>
    );
};

export default StockDetails;
