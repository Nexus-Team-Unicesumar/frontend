import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerCarousel = ({ selectedBanners }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Slider {...settings}>
        {selectedBanners.map((banner, index) => (
          <div key={index}>
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
              style={{ width: "100%", height: "60vh" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerCarousel;
