import './quote-container.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import Skeleton from 'react-loading-skeleton';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { fetchQuote } from '../../redux/quoteSlice';
import { motion } from 'framer-motion';

const QuoteContainer = () => {
  const dispatch = useAppDispatch();
  const quote = useAppSelector(state => state.quote.quote);

  useEffect(() => {
    dispatch(fetchQuote('random'));
  }, []);

  return (
    <motion.div
      className='quote-container'
      layout
    >
      <div className='tag'>
        {quote?.tags[quote?.tags.length - 1].replace('Quotes', 'Quote') || (
          <Skeleton width='100px' />
        )}{' '}
      </div>
      <p
        className='quote'
        id='text'
      >
        <FontAwesomeIcon
          icon={faQuoteLeft}
          className='quote-icon'
        />
        {quote?.content || (
          <>
            <Skeleton
              inline
              style={{ width: '80%' }}
            />
            <Skeleton count={2} />
          </>
        )}
      </p>
      <motion.div
        className='quote-footer'
        layout
      >
        {/* dummy link to comply with FCC's project requirement */}
        <a
          className='hidden'
          id='tweet-quote'
          href='https://twitter.com/intent/tweet?text=dummy'
          aria-hidden
        />

        {/* have to use a javascript button instead of an anchor element
        to bypass ad blockers' cosmetic filtering */}
        <button
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?text=${quote?.content}%20%E2%80%94${quote?.author}&hashtags=quote`,
              '_blank'
            )
          }
          title='Tweet this quote'
          className='tweet'
        >
          <FontAwesomeIcon icon={faTwitter} />
        </button>
        <p
          className='author bold'
          id='author'
        >
          {quote?.author || <Skeleton width='100px' />}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default QuoteContainer;
