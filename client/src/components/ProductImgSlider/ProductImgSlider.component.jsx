import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./ProductImgSlider.styles.scss";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

const ProductImgSlider = ({ photos }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const haveEnoughPhotos = photos.length > 1;

    return (
        <div className="product-img-slider">
            <Swiper
                loop={true}
                spaceBetween={10}
                navigation={haveEnoughPhotos}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="preview-swiper"
            >
                {photos.map(photo => (
                    <SwiperSlide key={photo}>
                        <img src={photo} alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>
            {haveEnoughPhotos && (
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={3}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="sub-swiper"
                >
                    {photos.map(photo => (
                        <SwiperSlide key={photo}>
                            <img src={photo} alt="" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default ProductImgSlider;
