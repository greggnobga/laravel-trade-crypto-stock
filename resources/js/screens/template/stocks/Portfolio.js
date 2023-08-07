/** Component. */
import Icon from '../../../components/Icon';

/** Desktop content. */
export const desktopContent = ({ icon, header, text, action, items }) => {
  return (
    <div className='grid auto-rows-min h-fit rounded-t-md bg-stone-100 uppercase my-2'>
      <div className='flex flex-wrap flex-row justify-between align-center h-fit border-b border-stone-200'>
        <div className='p-2'>
          <Icon id={icon} />
          <span className='uppercase pl-2'>{header}</span>
        </div>
        {text && (
          <div className='p-2 cursor-pointer' onClick={() => action()}>
            <Icon id={text} />
            <span className='uppercase'>{text}</span>
          </div>
        )}
      </div>
      <div className='p-2'>
        <div className='items'>Items render here!</div>
      </div>
    </div>
  );
};
