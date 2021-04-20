import React, { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import RateStaring from "./RateStaring";

const MessageSlider = (props) => {
  const [current, setcurrent] = useState(0);
  const length = props.slides.length;

  const nextSlide = () => {
    setcurrent(current === length - 1 ? length - 1 : current + 1);
  };
  const prevSlide = () => {
    setcurrent(current === 0 ? 0 : current - 1);
  };

  if (!Array.isArray(props.slides) || props.slides.length <= 0) {
    return null;
  }

  return (
    <section className="card card-body">
      {props.slides.map((msg, index) => {
        return (
          <>
            <div
              className={index === current ? "card card-body" : " d-none"}
              key={index}
            >
              Mensaje {index + 1}:
              <div className="alert alert-dismissible  alert-light">
                <strong>{msg["message"]}</strong>
              </div>
              <RateStaring />
            </div>
          </>
        );
      })}
      <div className="">
        <FaArrowAltCircleLeft
          className="left-arrow d-inline button"
          onClick={prevSlide}
          size="30"
        />
        <FaArrowAltCircleRight
          className="right-arrow d-inline"
          onClick={nextSlide}
          size="30"
        />
      </div>
    </section>
  );
};

export default MessageSlider;
