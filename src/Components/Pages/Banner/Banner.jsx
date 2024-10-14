import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import "./BannerStyle.css";

import { Navigation } from "swiper/modules";

const Banner = () => {
  const imageSize = {
    height: "500px",
  };
  return (
    <div className="">
      <>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          <SwiperSlide>
            <img
              style={imageSize}
              src="https://i.ibb.co.com/Xkm5dWJ/CAG-Little-Ripon-Bookshop-012.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              style={imageSize}
              src="https://i.ibb.co.com/yf4X4G2/KS4-XD3-ZI3-KN7-OISKIXHPM6-BIRI.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              style={imageSize}
              src="https://i.ibb.co.com/VJ6WSxs/istockphoto-120004828-612x612.jpg"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </>
    </div>
  );
};

export default Banner;
