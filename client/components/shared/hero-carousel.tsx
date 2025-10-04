"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {  Navigation } from "swiper/modules";
import { heroSlides } from "@/constants";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./hero-carousel-fade.css";

export function HeroCarousel() {
    return (
        <section className="relative w-[1500px] mx-auto">
            <Swiper
                modules={[Navigation]}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                navigation
                className="w-full"
            >
                {heroSlides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative h-[300px] md:h-[400px] lg:h-[600px] w-full overflow-hidden">
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="amazon-hero-fade" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
