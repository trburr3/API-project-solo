import { GiCursedStar } from "react-icons/gi";
import { useEffect, useState } from 'react';
import './Starinput.css';

const StarRatingInput = ({ rating, disabled, onChange }) => {
    const [activeRating, setActiveRating] = useState(rating);

    useEffect(() => {
      setActiveRating(rating)
    }, [rating])

    return (
      <>
      {/* <input
        type="number"
        disabled={disabled}
        value={rating}
        onChange={onChange}
      /> */}
      <div className='rating-input'>
        <div
          className={activeRating > 0 ? 'filled' : 'empty'}
          onMouseEnter={() => disabled ? setActiveRating(rating) : setActiveRating(1)}
          onMouseLeave={() => setActiveRating(rating)}
          onClick={() => onChange(1)}>
          <GiCursedStar />
        </div>
        <div
          className={activeRating > 1 ? 'filled' : 'empty'}
          onMouseEnter={() => disabled ? setActiveRating(rating) : setActiveRating(2) }
          onMouseLeave={() => setActiveRating(rating)}
          onClick={() => onChange(2)}>
          <GiCursedStar />
        </div>
        <div
          className={activeRating > 2 ? 'filled' : 'empty'}
          onMouseEnter={() => disabled ? setActiveRating(rating) : setActiveRating(3) }
          onMouseLeave={() => setActiveRating(rating)}
          onClick={() => onChange(3)}>
          <GiCursedStar />
        </div>
        <div
          className={activeRating > 3 ? 'filled' : 'empty'}
          onMouseEnter={() => disabled ? setActiveRating(rating) : setActiveRating(4) }
          onMouseLeave={() => setActiveRating(rating)}
          onClick={() => onChange(4)}>
          <GiCursedStar />
        </div>
        <div
          className={activeRating > 4 ? 'filled' : 'empty'}
          onMouseEnter={() => disabled ? setActiveRating(rating) : setActiveRating(5) }
          onMouseLeave={() => setActiveRating(rating)}
          onClick={() => onChange(5)}>
          <GiCursedStar />
        </div>
        <p>Stars</p>
      </div>
      </>
    );
  };

  export default StarRatingInput;
