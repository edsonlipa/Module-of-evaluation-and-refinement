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
          Califica del 0 al 5, 0 si no se entiende el mensaje o 5 si el mensaje se entiende en su totalidad.
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
