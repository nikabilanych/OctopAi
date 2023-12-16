import Image from "next/image";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
interface ImageSliderProps {
  urls: string[];
}
const ImageSlider = ({ urls }: ImageSliderProps) => {
  const activeStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square w-8 h-8 z-50 border-2 bg-white border-zinc-300 place-items-center rounded-full";
  const inactiveStyles = "hidden text-gray-400";
  return (
    <div className="group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl">
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition">
        <button className=""></button>
        <button className=""></button>
        <Swiper className="w-full h-full">
          {urls.map((url, index) => (
            <SwiperSlide key={index} className="-z-10 relative h-full w-full">
              <Image
                fill
                loading="eager"
                className="-z-10 h-full w-full object-cover object-center"
                src={url}
                alt="Product image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ImageSlider;
