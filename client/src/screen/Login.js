import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import foodVideo from '../images/pexels-ron-lach-8879537 (1080p)(1).mp4';
import { FaUser, FaLock, FaEnvelope, FaSignInAlt, FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
  const navigate = useNavigate();
  const [credentioal, setcredentional] = useState({
    name: "",
    password: "",
    email: "",
    geolocation: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    video.play().catch(error => {
      console.error('Auto-play was prevented:', error);
    });
  }, []);

  const handsubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/loginuser`, {
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
        setError("Invalid email or password. Please try again.");
      } else {
        localStorage.setItem("userEmail", credentioal.email);
        localStorage.setItem("authToken", json.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate("/");
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (e) => {
    setcredentional({ ...credentioal, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when user starts typing
  };

  return (
    <div className="login-page position-relative min-vh-100 d-flex align-items-center justify-content-center">
      {/* Background Video */}
      <video 
        ref={videoRef} 
        className="position-absolute w-100 h-100" 
        style={{ objectFit: 'cover', zIndex: '-1' }}
        autoPlay 
        loop 
        muted
      >
        <source src={foodVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay */}
      <div className="position-absolute w-100 h-100" style={{ 
        background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.8) 0%, rgba(255, 71, 87, 0.8) 100%)',
        zIndex: '0'
      }}></div>

      {/* Login Form */}
      <div className="container position-relative" style={{ zIndex: '1' }}>
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="form-modern bounce-in">
              {/* Header */}
              <div className="text-center mb-4">
                <div className="mb-3">
                  <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle" 
                       style={{ width: '70px', height: '70px' }}>
                    <FaSignInAlt size={28} className="text-white" />
                  </div>
                </div>
                <h2 className="text-gradient mb-2 fw-bold">Welcome Back!</h2>
                <p className="text-muted fs-5">Sign in to your account to continue</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <FaUser className="me-2" />
                  {error}
                  <button type="button" className="btn-close" onClick={() => setError("")}></button>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handsubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold">
                    <FaEnvelope className="me-2" />
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    className="form-control form-control-modern" 
                    id="email" 
                    name='email' 
                    value={credentioal.email} 
                    onChange={onChange} 
                    required
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-bold">
                    <FaLock className="me-2" />
                    Password
                  </label>
                  <div className="position-relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      className="form-control form-control-modern" 
                      id="password" 
                      name='password' 
                      value={credentioal.password} 
                      onChange={onChange} 
                      required
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="btn position-absolute end-0 top-50 translate-middle-y me-2"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ border: 'none', background: 'transparent' }}
                    >
                      {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                    </button>
                  </div>
                </div>
                
                <div className="d-grid gap-2 mb-3">
                  <button 
                    type="submit" 
                    className={`btn btn-modern btn-primary ${isLoading ? 'disabled' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="spinner-border spinner-border-sm me-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        Signing In...
                      </>
                    ) : (
                      <>
                        <FaSignInAlt className="me-2" />
                        Sign In
                      </>
                    )}
                  </button>
                </div>
                
                <div className="text-center">
                  <p className="mb-0 text-muted fs-6">
                    Don't have an account?{' '}
                    <Link to="/createuser" className="text-decoration-none fw-bold text-primary">
                      <FaUserPlus className="me-1" />
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
