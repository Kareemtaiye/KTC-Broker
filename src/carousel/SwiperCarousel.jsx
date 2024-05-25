import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/autoplay";
// import "swiper/css/navigation";
// import "swiper/css/bundle";

// import "./SwiperCarousel.css";

// import { Autoplay, Pagination, Navigation } from "swiper/modules";

// import image1 from "../../public/investPhoto1.jpg";
// import image2 from "../../public/investPhoto2.jpg";
// import image3 from "../../public/investPhoto3.jpg";
// import mobilePhone from "../../public/mobilePhone.png";

const details = [
  {
    src: image1,
    h1: "invest with citadel",
    p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At officiis laboriosam maiores impedit tenetur, dignissimos est nesciunt nemo fugiat dolor quo ipsa pariatur ad libero illum sunt. Praesentium, neque dolores?",
    buttonDetails: "Sign Up",
  },

  {
    src: image2,
    h1: "invest with citadel",
    p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At officiis laboriosam maiores impedit tenetur, dignissimos est nesciunt nemo fugiat dolor quo ipsa pariatur ad libero illum sunt. Praesentium, neque dolores?",
    buttonDetails: "Register",
  },

  {
    src: image3,
    h1: "invest with citadel",
    p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At officiis laboriosam maiores impedit tenetur, dignissimos est nesciunt nemo fugiat dolor quo ipsa pariatur ad libero illum sunt. Praesentium, neque dolores?",
    buttonDetails: "Join Now",
  },
];

function SwiperCarousel() {
  return (
    <Swiper
      loop={true}
      pagination={true}
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {details.map((detail, index) => {
        return (
          <SwiperSlide key={index}>
            <div
              key={index}
              // style={{
              //   backgroundImage: `linear-gradient(to left,rgba(88, 104, 255, 0.219), rgba(0, 0, 0, 0.1)),url(${detail.src})`,
              // }}
              // className="swiper-carousel-container"
            >
              <h1 className="swiper-carousel-h1">{detail.h1}</h1>
              <p className="swiper-carousel-p">{detail.p}</p>
              <button className="swiper-carousel-btn">
                {detail.buttonDetails}
              </button>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default SwiperCarousel;
