import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

const TrackRecordSlider = ({ testimonials }) => {
    const settings = {
        className: "trackrecord-slide",
        dotsClass: "trackrecord-dots",
        dots: true,
        infinite: true,
        speed: 1000,
        autoplaySpeed: 3000,
        fadeIn: false,
        autoplay: true,
        pauseOnHover: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div>
            <Slider {...settings} >
                {testimonials.map((testimonial, i) => (
                    <div id={i}>
                        <div className="slide-image">
                            <PreviewCompatibleImage imageInfo={testimonial.image} />
                        </div>
                        <div className="slide-testimonial">
                            {testimonial.testimonial}
                        </div>
                        <p>{testimonial.testifier}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

TrackRecordSlider.propTypes = {
    testimonials: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
            testimonial: PropTypes.string,
            testifier: PropTypes.string,
        })
    )
};

export default TrackRecordSlider;