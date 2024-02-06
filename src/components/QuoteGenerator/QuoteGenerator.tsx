import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import './quote-generator.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import Skeleton from 'react-loading-skeleton';
import { fetchQuote } from '../../redux/quoteSlice';
import { motion } from 'framer-motion';

const QuoteGenerator = () => {
  const dispatch = useAppDispatch();
  const [selectedTag, setSelectedTag] = useState('random');
  const tags = useAppSelector(state => state.quote.quoteTags);
  const hiddenTagRef = useRef<HTMLDivElement>(null!);
  const [tagWidth, setTagWidth] = useState<number>(60);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(e.target.value);

    setTimeout(() => {
      setTagWidth(hiddenTagRef.current.getBoundingClientRect().width);
    }, 0);
  };

  return (
    <>
      <motion.div
        className='new-quote'
        id='new-quote'
        onClick={() => dispatch(fetchQuote(selectedTag))}
        layout
      >
        <motion.span layout></motion.span>
        <FontAwesomeIcon
          icon={faWandMagicSparkles}
          className='icon'
        />
        Generate a
        {!!!tags.length ? (
          <Skeleton
            width='70px'
            baseColor='#4a423f'
            highlightColor='#525252'
          />
        ) : (
          <select
            name='tag'
            id='tag'
            value={selectedTag}
            onChange={handleChange}
            onClick={(e: React.MouseEvent<HTMLSelectElement>) =>
              e.stopPropagation()
            }
            style={{ width: tagWidth }}
          >
            <option value='random'>random</option>
            {tags.map(tag => (
              <option
                value={tag.slug}
                key={tag._id}
              >
                {tag.name.toLowerCase().replace(' quotes', '')}
              </option>
            ))}
          </select>
        )}
        quote
      </motion.div>
      <span
        className='hidden'
        ref={hiddenTagRef}
        style={{ width: 'fit-content' }}
      >
        {selectedTag}
      </span>
    </>
  );
};

export default QuoteGenerator;
