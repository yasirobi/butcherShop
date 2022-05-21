import React from "react";

import slider1 from '../img/slider1.jpeg'
import slider2 from '../img/slider2.jpg'
import slider3 from '../img/slider3.webp'


import { Swiper, SwiperSlide } from "swiper/react";
import "../components/slide.css";
import 'swiper/css/bundle';
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation,EffectFade } from "swiper";
// import { Button } from "react-bootstrap";
// 2664 + 552
// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation,EffectFade]);

export const Slider = () => {
  const images = [
    {
      src: slider1,
      title:"fresh meats",
      desc:"  Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam fugiat sit ducimus consequatur ex ullam magnam, sapiente iure molestias consequuntur!",
    },
    {
      src: slider2 ,
      title:"vaccum packaging",
      desc:"  Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam fugiat sit ducimus consequatur ex ullam magnam, sapiente iure molestias consequuntur!",
    },
    {
      src: slider3,
      title:"quality meats",
      desc:"  Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam fugiat sit ducimus consequatur ex ullam magnam, sapiente iure molestias consequuntur!",
    },
    
    
    
  ];
  return (
    <div>
      <Swiper effect={'fade'}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper"
      >

      
        {images.map((image, index) => (
        <SwiperSlide key={index}>
            
                <img src={image.src} alt="" /> 
               <div className="slide-items">
                   <h1>{image.title}</h1>
                   <p>{image.desc}</p>
                   <div className="btns">
                     <button className="btn btn-info btn-lg">explore more</button>
                      <button className="btn btn-outline btn-lg">shop now</button>
                   
                   </div>
                  
               </div>
               
     
        </SwiperSlide>
      ))}
        
       
      </Swiper>
    </div>
  );
};


export default Slider