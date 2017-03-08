import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.scss';

const defaultSettings = {
  dots: false,
  infinite: true,
  slidesToShow: 7,
  slidesToScroll: 7,
  autoplay: true,
  autoplaySpeed: 3500,
  arrows: false
};

function Carousel(props) {
  const settings = props.setting || defaultSettings;

  return (
    <div className="c-carousel">
      <Slider {...settings}>
        {props.items.map(item => item)}
      </Slider>
    </div>
  );
}

Carousel.propTypes = {
  items: React.PropTypes.array.isRequired,
  settings: React.PropTypes.object
};

Carousel.defaultProps = {
  items: [],
};

export default Carousel;
