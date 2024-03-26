import React, { useState, useEffect } from "react";
import Navbars from "../component/Navbars";
import Footers from "../component/Footers";
import Cards from "../component/Cards";
import Carousel from "react-bootstrap/Carousel";
import FormControl from "react-bootstrap/FormControl";

export default function Home() {
  const [search, setsearch] = useState("");
  const styles = {
    height: "800px",
    width:"500px",
    position: "relative",
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
  const [foodcat, setfoodcat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api//foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setfoodcat(response[1]);
    setfoodItem(response[0]);
    console.log(response[0], response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbars />
      <div className="mb-1">
        <div style={{ position: "relative" }}>
          <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                style={styles}
                src="https://img.freepik.com/free-photo/delicious-burger-with-fresh-ingredients_23-2150857908.jpg?size=626&ext=jpg&ga=GA1.1.1969349623.1681485773&semt=sph"
                alt="First slide"
              />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                style={styles}
                src="https://img.freepik.com/free-photo/top-view-stir-fried-noodles-with-vegetables-shrimps-plate-wooden-table_141793-8520.jpg?t=st=1710501576~exp=1710505176~hmac=f3828ffa0fb229c1765905d5a156eb1e6bc873647eae6b0001a2d51ce727cc41&w=826"
                alt="Second slide"
              />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                style={styles}
                src="https://img.freepik.com/free-photo/anise-board-near-rice-dish_23-2147894745.jpg?t=st=1710501687~exp=1710505287~hmac=3db040080076bd6e271c08b29d48f244345b672a103d3e6b58683fb964c2dbfd&w=740"
                alt="Third slide"
              />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              margin: "0 3rem",
            }}
          >
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2 m-3 "
              style={{ width: "800px", height: "40px" }}
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mt-3 container">
        {foodcat.length > 0 &&
          foodcat.map((data) => (
            <div key={data._id}>
              <div className="fs-3 ">{data.CategoryName}</div>
              <hr />
              <div className="row ">
                {foodItem.length > 0 &&
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase())
                    )
                    .map((filterItems) => (
                      <div
                        key={filterItems._id}
                        className="col-12 col-md-6 col-lg-3"
                      >
                        <Cards
                          foodItems={filterItems}
                          options={filterItems.options[0]}
                        />
                      </div>
                    ))}
              </div>
            </div>
          ))}
      </div>
      <Footers  />
    </div>
  );
}
