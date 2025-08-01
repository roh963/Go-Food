import React, { useEffect, useRef, useState } from "react";
import { useDispatchcart, useCart } from "./ContextReducer";
import { FaShoppingCart, FaStar, FaClock, FaFire, FaUtensils } from 'react-icons/fa';

export default function Cards(props) {
  let dispatch = useDispatchcart();
  let state = useCart();
  const priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  
  let finalPrice = qty * parseInt(options[size]);

  const handleaddcart = async () => {
    setIsAdding(true);
    
    try {
      let food = []
      for (const item of state) {
        if (item.id === props.foodItems._id) {
          food = item;
          break;
        }
      }
      
      console.log(food)
      console.log(new Date())
      
      if (food !== 0) {
        if (food.size === size) {
          await dispatch({ type: "UPDATE", id: props.foodItems._id, price: finalPrice, qty: qty })
          return
        }
        else if (food.size !== size) {
          await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size, img: props.foodItems.img })
          console.log("Size different so simply ADD one more to the list")
          return
        }
        return
      }
      
      await dispatch({
        type: "ADD",
        id: props.foodItems._id,
        name: props.foodItems.name,
        price: finalPrice,
        img: props.foodItems.img,
        qty: qty,
        size: size,
      });
      
      console.log(state);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    setSize(priceRef.current.value)
  }, []);

  return (
    <div className="food-card-wrapper h-100">
      <div className="food-card h-100">
        {/* Food Image */}
        <div className="food-card-image-container position-relative">
          {props.foodItems.img ? (
            <img
              src={props.foodItems.img}
              className="food-card-image w-100"
              alt={props.foodItems.name}
            />
          ) : (
            <div className="food-card-image-placeholder d-flex align-items-center justify-content-center">
              <FaUtensils size={48} className="text-muted" />
            </div>
          )}
          
          {/* Popular Badge */}
          <div className="position-absolute top-0 start-0 m-3">
            <span className="badge bg-danger rounded-pill">
              <FaFire className="me-1" />
              Popular
            </span>
          </div>
          
          {/* Rating Badge */}
          <div className="position-absolute top-0 end-0 m-3">
            <span className="badge bg-warning text-dark rounded-pill">
              <FaStar className="me-1" />
              4.5
            </span>
          </div>
        </div>

        {/* Food Details */}
        <div className="food-card-body">
          <div className="food-card-header mb-3">
            <h5 className="food-card-title">{props.foodItems.name}</h5>
            <div className="food-card-meta d-flex align-items-center text-muted small mb-2">
              <FaClock className="me-1" />
              <span>20-30 min</span>
            </div>
          </div>

          {/* Price Display */}
          <div className="food-card-price-section mb-3">
            <div className="d-flex align-items-center justify-content-between">
              <span className="food-card-price">₹{finalPrice}</span>
              <span className="text-muted small">per {size}</span>
            </div>
          </div>

          {/* Options */}
          <div className="food-card-options mb-3">
            <div className="row g-2">
              <div className="col-6">
                <label className="form-label small fw-bold">Quantity</label>
                <select
                  className="form-select form-select-sm"
                  value={qty}
                  onChange={(e) => setQty(parseInt(e.target.value))}
                >
                  {Array.from(Array(6), (e, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-6">
                <label className="form-label small fw-bold">Size</label>
                <select 
                  className="form-select form-select-sm"
                  ref={priceRef}
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  {priceOptions.map((data) => (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="food-card-actions">
            <button
              className={`btn btn-modern btn-primary w-100 ${isAdding ? 'disabled' : ''}`}
              onClick={handleaddcart}
              disabled={isAdding}
            >
              {isAdding ? (
                <>
                  <div className="spinner-border spinner-border-sm me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  Adding...
                </>
              ) : (
                <>
                  <FaShoppingCart className="me-2" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
