import React, { useEffect, useState, useRef } from 'react';
import { API_HOST } from '../../utils/Constants';

import './ImageSlider.scss';

const ImageSlider = ({ images }) => {
  const [x, setX] = useState(0);
  const slideRefs = useRef([]);

  const goLeft = () => {
    x === 0 ? setX(-100 * (images.length - 1)) : setX((prev) => prev + 100);
  };

  const goRight = () => {
    x === -100 * (images.length - 1) ? setX(0) : setX((prev) => prev - 100);
  };

  useEffect(() => {
    slideRefs.current.forEach(slide => slide.style.transform = `translateX(${x}%)`);
  }, [x]);

  return (
    <div className="slider">
      {images.map((item, index) => (
        <div
          key={index}
          className="slide"
          ref={(v) => (slideRefs.current[index] = v)}
        >
          <img src={`${API_HOST}/${item.src}`} alt="" />
        </div>
      ))}
      <button id="goLeft" onClick={goLeft}>
        <i class="fas fa-chevron-left"></i>
      </button>
      <button id="goRight" onClick={goRight}>
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default ImageSlider;
