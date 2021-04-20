import react, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./ratestaring.css";

const RateStaring = () => {
  const [rating, setrating] = useState(null);
  const [hover, sethover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setrating(ratingValue)}
            />
            <FaStar
              size={50}
              className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => sethover(ratingValue)}
              onMouseLeave={() => sethover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default RateStaring;
