import React, { useEffect, useRef, useState } from "react";
import { useDispatchcart, useCart } from "./ContextReducer";

export default function Cards(props) {
  let dispatch = useDispatchcart();
  let state = useCart();
  const priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  let finalPrice = qty*parseInt(options[size]);
  const handleaddcart = async () => {
    await dispatch({
      type: "ADD",
      id: props.foodItems._id,
      name: props.foodItems.name,
      price: finalPrice,
      img:props.foodItems.img,
      qty: qty,
      size: size,
    });
     await console.log(state);
  };
  useEffect(() => {
    setSize(priceRef.current.value)
  }, []);
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 m-5  ">
      <div className="card m-2" style={{ width: "18rem", height: "550px" }}>
        {/* Check if foodItem.img is valid */}
        {props.foodItems.img ? (
          <img
            src={props.foodItems.img}
            style={{ width: "18rem", height: "300px", objectFit: "fill" }}
            className="card-img-top"
            alt="Food"
          />
        ) : (
          <p>No image available</p>
        )}
        <div className="card-body">
          <h5 className="card-title">{props.foodItems.name}</h5>
          <p className="card-text">
            Some quick example text to build on the card title.
          </p>
          <div className="container w-100">
            <select
              className="m-2 h-100 rounded "
              aria-label="Default select example"
              onClick={(e)=>setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100 rounded" name="" id=""
            ref={priceRef}
            onChange={(e)=>setSize(e.target.value)}>
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {" "}
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5">₹{finalPrice}</div>
            <hr />
            <div
              className="btn btn-success text-white "
              style={{ objectFit: "fill" }}
              onClick={handleaddcart}
            >
              Add TO Cart
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
