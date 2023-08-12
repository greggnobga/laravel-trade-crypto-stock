import { createPortal } from 'react-dom';

const Modal = ({ children }) => {
  return createPortal(
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div class='fixed inset-0 bg-stone-800 opacity-50'></div>
      <div className='absolute bg-slate-200 p-4 max-h-[80%] min-w-[75%] rounded-lg shadow-lg max-h-full overflow-y-auto'>{children}</div>
    </div>,
    document.getElementById('modal'),
  );
};

export default Modal;
