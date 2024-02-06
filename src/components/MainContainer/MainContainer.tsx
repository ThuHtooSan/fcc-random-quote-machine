import { QuoteContainer, QuoteGenerator } from '..';
import './main-container.scss';

const MainContainer = () => {
  return (
    <div
      className='main-container'
      id='quote-box'
    >
      <QuoteContainer />
      <QuoteGenerator />
    </div>
  );
};

export default MainContainer;
