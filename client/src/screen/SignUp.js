import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import foodVideo from '../images/pexels-ron-lach-8879537 (1080p)(1).mp4';

export default function SignUp() {
  const navigate = useNavigate();
  const [credentioal, setcredentioal] = useState({
    name: "",
    password: "",
    email: "",
    geolocation: "",
  });

  const handsubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentioal.name,
        password: credentioal.password,
        email: credentioal.email,
        location: credentioal.geolocation,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    }
    if (json.success) {
      navigate("/login");
    }
  };

  const onChange = (e) => {
    setcredentioal({ ...credentioal, [e.target.name]: e.target.value });
  };

  const containerStyles = {
    height: "600px",
    width: "350px",
    margin: "0 auto", // Centering the container horizontally
    position: 'relative',
    overflow: 'hidden'
  };

  const videoStyles = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: '-1'
  };

  const headerStyles = {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    textAlign: "center",
    padding: "8px",
    borderRadius: "10px 10px 0 0", // Rounded corners only on top
    marginBottom: "20px"
  };

  return (
    <div>
      <video src={foodVideo} style={videoStyles} autoPlay loop muted />
      <div className="container mt-5" style={containerStyles}>
      <header className='m-1' style={headerStyles}>SignUP YourSelf</header>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handsubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">Name</label>
                <input type="text" className="form-control" id="exampleInputName" name="name" value={credentioal.name} onChange={onChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={credentioal.email} onChange={onChange} aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentioal.password} onChange={onChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                <input type="text" className="form-control" id="exampleInputAddress" name="geolocation" value={credentioal.geolocation} onChange={onChange} />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
              <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
