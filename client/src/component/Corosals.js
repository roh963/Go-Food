import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Search  from './Search';

const Corosals = () => {
  const styles = {
    height: '500px'
  };
  const [index, setIndex] = useState(0);

  // Function to handle slide transition
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // Function to automatically transition slides
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    }, 3000); // Change slide every 3 seconds

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={styles}
          src="https://img.freepik.com/free-photo/delicious-burger-with-fresh-ingredients_23-2150857908.jpg?size=626&ext=jpg&ga=GA1.1.1969349623.1681485773&semt=sph"
          alt="First slide"
        />
        <Carousel.Caption>
          <Search />
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={styles}
          src="https://img.freepik.com/free-photo/top-view-stir-fried-noodles-with-vegetables-shrimps-plate-wooden-table_141793-8520.jpg?t=st=1710501576~exp=1710505176~hmac=f3828ffa0fb229c1765905d5a156eb1e6bc873647eae6b0001a2d51ce727cc41&w=826"
          alt="Second slide"
        />
        <Carousel.Caption>
          <Search />
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={styles}
          src="https://img.freepik.com/free-photo/anise-board-near-rice-dish_23-2147894745.jpg?t=st=1710501687~exp=1710505287~hmac=3db040080076bd6e271c08b29d48f244345b672a103d3e6b58683fb964c2dbfd&w=740"
          alt="Third slide"
        />
        <Carousel.Caption>
          <Search />
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Corosals;
