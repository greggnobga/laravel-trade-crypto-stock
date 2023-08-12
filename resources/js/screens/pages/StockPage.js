/** Vendor. */
import { useParams } from 'react-router-dom';

const StockPage = () => {
  /** Access router params. */
  const { symbol } = useParams();

  /** Return something. */
  return <h1 className='p-2 text-center'>Stock page for {symbol}.</h1>;
};

export default StockPage;
