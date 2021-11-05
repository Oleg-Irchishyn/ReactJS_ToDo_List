import React from 'react';
import Slider from 'react-slick';
import './styles/sliders.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return <div onClick={onClick}>Back</div>;
};

const NextArrow = (props: any) => {
  const { onClick } = props;

  return <div onClick={onClick}>Forward</div>;
};

const SliderExample: React.FC = () => {
  var settings = {
    dots: true,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return <Slider {...settings}></Slider>;
};

export default SliderExample;
