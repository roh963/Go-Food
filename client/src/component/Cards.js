import React from "react";

export default function Cards(props) {
  let options = props.options;
  let priceOptions = Object.keys(options)
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 m-3  ">
      <div className="card m-2" style={{ width: "18rem",height:"500px" }}>
        {/* Check if imgSrc is valid */}
        {props.imgSrc ? (
          <img src={props.imgSrc}  style={{ width: "18rem",height:"300px",objectFit:"fill" }} className="card-img-top" alt="Food" />
        ) : (
          <p>No image available</p>
        )}
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <p className="card-text">
            Some quick example text to build on the card title.
          </p>
          <div className="container w-100">
            <select
              className="m-2 h-100 rounded "
              aria-label="Default select example"
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100 rounded" name="" id="">
             {
              priceOptions.map((data)=>{
                return <option key={data} value={data} > {data}</option>
              })
             }
            </select>
            <div className="d-inline h-100 fs-5">Total Price</div>
          </div>
        </div>
      </div>
    </div>
  );
}
