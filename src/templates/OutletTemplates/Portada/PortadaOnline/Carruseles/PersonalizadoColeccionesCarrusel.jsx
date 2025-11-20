/* eslint-disable react/prop-types */
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ItemCard } from './CarruselesHelpers/ItemCard';
import { useSwiperCarousel } from './CarruselesUseEffects/useSwiper';

export const PersonalizadoColeccionesCarrusel = ({ nombreCarrusel, items, filterType }) => {

  useSwiperCarousel(items);
  return (
    <div className="max-w-full h-full pt-2 sm:pl-2 pb-0 px-4 sm:px-0 overflow-hidden swiper-container lg:pb-8 lg:pt-0 sm:ml-20 lg:pl-1 lg:ml-[82px] lg:pr-20 sm:pr-14">
      <h2 className="pl-2 mt-4 mb-2 text-base text-white lg:pl-1 sm:pl-0 text-start lg:text-xl">
        {nombreCarrusel}
      </h2>
      <div className="pl-2 sm:pl-4 xl:pl-0 swiper-wrapper">
        {items.map((item, index) => (
          <div key={index} className="swiper-slide">
            <ItemCard item={item} filterType={filterType} />
          </div>
        ))}
      </div>
    </div>
  );
};
