import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

function CarouselPizza() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className='d-block w-100'
          src='https://img.dominos.vn/BANNER+BAC+(1)-small.png'
          alt='First slide'
        />
      </Carousel.Item>
      <Carousel.Item>
      <img
          className='d-block w-100'
          src='https://img.dominos.vn/BANNER+BOGO5+NEW+NEW+NEW+(3).jpg'
          alt='First slide'
        />
      </Carousel.Item>
      <Carousel.Item>
      <img
          className='d-block w-100'
          src='https://img.dominos.vn/BG3+BANNER+(2).jpg'
          alt='First slide'
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselPizza;