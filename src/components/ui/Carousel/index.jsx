import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.scss';

const defaultSettings = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
  arrows: false
};

function Carousel(props) {
  const settings = props.setting || defaultSettings;

  return (
    <div>
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
