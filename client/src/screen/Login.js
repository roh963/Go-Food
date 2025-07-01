import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import foodVideo from '../images/pexels-ron-lach-8879537 (1080p)(1).mp4'; // Import your video file here

export default function Login() {
  const navigate = useNavigate();
  const [credentioal, setcredentional] = useState({
    name: "",
    password: "",
    email: "",
    geolocation: ""
  });

  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    video.play().catch(error => {
      // Auto-play was prevented
      // You can handle this situation here
      console.error('Auto-play was prevented:', error);
    });
  }, []);

  const handsubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/loginuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentioal.email,
        password: credentioal.password
      })
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentioal.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  const onChange = (e) => {
    setcredentional({ ...credentioal, [e.target.name]: e.target.value })
  };

  const containerStyles = {
    height: "500px",
    width: "300px",
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
      <video ref={videoRef} style={videoStyles} autoPlay loop muted>
        <source src={foodVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='container mt-5' style={containerStyles}>
        <header className='m-1' style={headerStyles}>Login Yourself</header>
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={handsubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentioal.email} onChange={onChange} aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentioal.password} onChange={onChange} />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
              <Link to="/createuser" className='m-3 btn btn-danger' >Create a user</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
