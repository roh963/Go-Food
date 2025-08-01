import React, { useState, useEffect } from "react";
import Navbars from "../component/Navbars";
import Footers from "../component/Footers";
import Cards from "../component/Cards";
import Carousel from "react-bootstrap/Carousel";
import FormControl from "react-bootstrap/FormControl";
import { FaSearch, FaUtensils, FaHamburger, FaPizzaSlice, FaIceCream, FaCoffee } from 'react-icons/fa';

export default function Home() {
  const [search, setsearch] = useState("");
  const [index, setIndex] = useState(0);
  const [foodcat, setfoodcat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to handle slide transition
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // Function to automatically transition slides
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    }, 4000); // Change slide every 4 seconds

    return () => {
      clearInterval(timer);
    };
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      let response = await fetch(`${process.env.REACT_APP_API_URL}/api/foodData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      setfoodcat(response[1]);
      setfoodItem(response[0]);
      console.log(response[0], response[1]);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Get category icon based on category name
  const getCategoryIcon = (categoryName) => {
    const name = categoryName.toLowerCase();
    if (name.includes('burger') || name.includes('fast food')) return <FaHamburger />;
    if (name.includes('pizza')) return <FaPizzaSlice />;
    if (name.includes('dessert') || name.includes('ice cream')) return <FaIceCream />;
    if (name.includes('beverage') || name.includes('drink')) return <FaCoffee />;
    return <FaUtensils />;
  };

  return (
    <div className="min-vh-100">
      <Navbars />
      
      {/* Hero Section with Carousel */}
      <section className="hero-section position-relative mb-5">
        <Carousel 
          activeIndex={index} 
          onSelect={handleSelect} 
          interval={null}
          className="carousel-modern"
        >
          <Carousel.Item>
            <div className="carousel-item-wrapper">
              <img
                className="d-block w-100"
                src="https://img.freepik.com/free-photo/delicious-burger-with-fresh-ingredients_23-2150857908.jpg?size=626&ext=jpg&ga=GA1.1.1969349623.1681485773&semt=sph"
                alt="Delicious Burger"
              />
              <div className="carousel-overlay">
                <div className="container">
                  <div className="carousel-caption-modern">
                    <h1 className="text-white mb-3">Delicious Burgers</h1>
                    <p className="text-white-50 mb-4">Fresh ingredients, amazing taste</p>
                    <button className="btn btn-modern btn-primary">Order Now</button>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
          
          <Carousel.Item>
            <div className="carousel-item-wrapper">
              <img
                className="d-block w-100"
                src="https://img.freepik.com/free-photo/top-view-stir-fried-noodles-with-vegetables-shrimps-plate-wooden-table_141793-8520.jpg?t=st=1710501576~exp=1710505176~hmac=f3828ffa0fb229c1765905d5a156eb1e6bc873647eae6b0001a2d51ce727cc41&w=826"
                alt="Asian Noodles"
              />
              <div className="carousel-overlay">
                <div className="container">
                  <div className="carousel-caption-modern">
                    <h1 className="text-white mb-3">Asian Delights</h1>
                    <p className="text-white-50 mb-4">Authentic flavors from the East</p>
                    <button className="btn btn-modern btn-primary">Explore Menu</button>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
          
          <Carousel.Item>
            <div className="carousel-item-wrapper">
              <img
                className="d-block w-100"
                src="https://img.freepik.com/free-photo/anise-board-near-rice-dish_23-2147894745.jpg?t=st=1710501687~exp=1710505287~hmac=3db040080076bd6e271c08b29d48f244345b672a103d3e6b58683fb964c2dbfd&w=740"
                alt="Traditional Cuisine"
              />
              <div className="carousel-overlay">
                <div className="container">
                  <div className="carousel-caption-modern">
                    <h1 className="text-white mb-3">Traditional Cuisine</h1>
                    <p className="text-white-50 mb-4">Home-style cooking at its best</p>
                    <button className="btn btn-modern btn-primary">Discover More</button>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
        
        {/* Search Bar */}
        <div className="search-overlay">
          <div className="container">
            <div className="search-container">
              <div className="position-relative">
                <FaSearch className="search-icon" />
                <FormControl
                  type="text"
                  placeholder="Search for your favorite food..."
                  className="search-input"
                  value={search}
                  onChange={(e) => setsearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Food Categories Section */}
      <section className="food-categories py-5">
        <div className="container">
          {loading ? (
            // Loading Skeleton
            <div className="row">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="col-12 col-md-6 col-lg-3 mb-4">
                  <div className="card-modern skeleton" style={{ height: '300px' }}></div>
                </div>
              ))}
            </div>
          ) : (
            foodcat.length > 0 &&
            foodcat.map((data) => (
              <div key={data._id} className="category-section fade-in">
                <div className="d-flex align-items-center mb-4">
                  <div className="category-icon me-3">
                    {getCategoryIcon(data.CategoryName)}
                  </div>
                  <h2 className="category-title mb-0">{data.CategoryName}</h2>
                </div>
                
                <div className="row g-4">
                  {foodItem.length > 0 &&
                    foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                      )
                      .map((filterItems, index) => (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <Cards
                            foodItems={filterItems}
                            options={filterItems.options[0]}
                          />
                        </div>
                      ))}
                </div>
              </div>
            ))
          )}
          
          {!loading && foodcat.length === 0 && (
            <div className="text-center py-5">
              <h3 className="text-muted">No food categories available</h3>
              <p className="text-muted">Please check back later for delicious meals!</p>
            </div>
          )}
        </div>
      </section>
      
      <Footers />
    </div>
  );
}
