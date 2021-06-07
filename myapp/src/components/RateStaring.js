import { useState } from "react";
import { FaStar } from "react-icons/fa";
import {Form, Row, Col} from 'react-bootstrap'
import "./ratestaring.css";

const RateStaring = (props) => {
  const [rating, setRating] = useState(null);
  const [hover, sethover] = useState(null);
  
  const clickstarts=(e,ratingValue)=>{
    e.preventDefault();
    setRating(ratingValue);
    props.send_data({...props.menssage,[props.id]:ratingValue});
  }
  
  return (
      <Form >
        <Form.Group as={Row}>
          <Form.Label column sm={4}>
          Rate from 0 to 5 the clarity of the message, 0 if you do not understand the message and 5 if the message is fully understood.
          </Form.Label>
          <Col sm={8}>
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
              return (
                <label key={index} className="d-inline">
                  <input
                    className="radio_start"
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={(e)=>clickstarts(e,ratingValue)}
                  />
                  <FaStar
                    size={40}
                    className="star"
                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                    onMouseEnter={() => sethover(ratingValue)}
                    onMouseLeave={() => sethover(null)}
                  />
                </label>
              );
            })}

          </Col>
        </Form.Group>
      </Form>
  );
};

export default RateStaring;
