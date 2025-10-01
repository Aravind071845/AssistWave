import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReviewsCarousel = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/get/reviews") // Adjust backend URL as needed
      .then((response) => {
        setReviews(response.data.value);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="mt-10 max-w-6xl mx-auto px-4">
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <div key={index} className="p-8 bg-neutral-900 rounded-2xl shadow-xl w-full">
            <div className="flex justify-between text-xl font-semibold mb-4">
              <span>{review.name}</span>
              <span className="text-sm text-gray-400">
                {review.created_at ? new Date(review.created_at).toLocaleDateString() : "No Date"}
              </span>
            </div>
            <p className="text-yellow-400 text-lg">Rating: {"⭐".repeat(review.rating)}</p>
            <p className="text-gray-300 mt-3 text-lg">{review.review}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReviewsCarousel;
