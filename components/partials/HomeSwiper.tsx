"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules"; // ✅ Autoplay module

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay"; // ✅ optional, autoplay animation

export default function HomeSwiper() {
  return (
    <section className="flex flex-col w-full mt-15">
      <h2 className="text-blue-500 font-bold text-xl">HELP TOPICS</h2>
      <h2 className="font-bold text-3xl">Enhance Your Lifestyle</h2>

      <Swiper
        modules={[Navigation, Autoplay]} // ✅ Include Autoplay here
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={10}
        slidesPerView={2}
        slidesPerGroup={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 6 },
        }}
        className="w-full pt-4"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <SwiperSlide key={i}>
            <div className="card flex flex-col py-4 rounded-md  mx-1">
              <Image
                src="https://i.pinimg.com/736x/58/27/4d/58274de117a35ba287907e701d1e755a.jpg"
                alt={`Topic ${i + 1}`}
                width={150}
                height={100}
                className="h-auto mb-2 rounded-lg"
                priority
              />
              <h3 className="font-bold">Product Name</h3>
              <p className="card-footer text-gray-600 text-sm w-[70%]">
                Lorem ipsum amet dolor, etit tu
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[Navigation, Autoplay]} // ✅ Include Autoplay here
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={10}
        slidesPerView={2}
        slidesPerGroup={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 6 },
        }}
        className="w-full pt-4"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <SwiperSlide key={i}>
            <div className="card flex flex-col py-4 rounded-md  mx-1">
              <Image
                src="https://i.pinimg.com/736x/45/1d/b1/451db155874786bd0ba76bee971ac657.jpg"
                alt={`Topic ${i + 1}`}
                width={150}
                height={100}
                className="h-auto mb-2 rounded-lg"
                priority
              />
              <h3 className="font-bold">Product Name</h3>
              <p className="card-footer text-gray-600 text-sm w-[70%]">
                Lorem ipsum amet dolor, etit tu
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
