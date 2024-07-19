/** Vendor. */
import { useParams } from 'react-router-dom';

/** Component. */
import Container from '$lib/components/Container';

interface StockPage {
    symbol: string;
}

const StockPage: React.FC = () => {
    /** Access router params. */
    const { symbol } = useParams<StockPage>();

    console.log(symbol);

    /** Return something. */
    return (
        <Container>
            <div clas='w-full bg-slate-200 border border-green-400'>
                <h1 className='p-2 text-center'>Stock page for {symbol}.</h1>
            </div>
        </Container>
    );
};

export default StockPage;
