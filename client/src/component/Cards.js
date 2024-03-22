import React from "react";

export default function Cards() {
  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
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
            <option value="half">Half</option>
            <option value="full">Full</option>
          </select>
          <div className="d-inline h-100 fs-5">Total Price</div>
        </div>
      </div>
    </div>
  );
}
