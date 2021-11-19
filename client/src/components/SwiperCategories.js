import React from 'react'
import {Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Navigation, Pagination} from 'swiper';
//import '/swiper/swiper-bundle.css';

// swiper bundle styles
import 'swiper/swiper-bundle.min.css'

// swiper core styles
import 'swiper/swiper.min.css'

// modules styles
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'

import CategoryCard from './CategoriesCard/CategoryCard.js'

SwiperCore.use([Navigation, Pagination]);

function SwiperCategories() {
    const slides = [];
    const lizardInfo = {name:"Lizzard", description: "Lizards from all sizes are included. Lizards are one the most amazing creatures on earth",image: "./images/lizard.jpg",route: "/search", search: 'lizzard'};
    const bluespace = {name: "BlueSPace", description :"Quiz on blue space the website", 
    image: "./images/logo11.png",route: "/search", search: 'bluespace'};
    const filler = {name: "Filler", description :"Will search for test", image: "./images/logo11.png",route: "/search", search: "test"};
    const sea = {name: "Deep Sea", description :"Deep Fish of the Sea", image: "./images/deepfish.jpg",route: "/search", search: "fish"};
    const tiger = {name: "Tigers", description :"All about tigers", image: "./images/tiger.jpg",route: "/search", search: "tiger"};
    const icecream = {name: "Ice Cream", description :"Ice Cream", image: "./images/icecream.jpg",route: "/search", search: "cream"};
    const catinfo = [bluespace,lizardInfo,filler, sea,tiger,icecream ]
    for (let i = 0; i < 6; i +=1){
        slides.push(
            <SwiperSlide key={`slide-${i}`}>
                <CategoryCard category={catinfo[i]}></CategoryCard>
            </SwiperSlide>
        );
    }
    return (
        <div>
            <Swiper id="main" tag='section' wrapperTag="ul" navigation pagination>
                {slides}
            </Swiper>
        </div>
    )
}

export default SwiperCategories
