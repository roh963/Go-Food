import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import ShoppingCartIcon from '@mui/icons-material/Shop2';
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Model";
import Cart from "../screen/Cart";
import { FaUser, FaSignOutAlt, FaHome, FaClipboardList, FaHeart, FaBell } from 'react-icons/fa';

export default function Navbars() {
  const [cartView, setcartView] = useState(false);
  const navigation = useNavigate();
  
  const handlelogout = () => {
    localStorage.removeItem("authToken");
    navigation("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-modern">
        <div className="container">
          <Link
            className="navbar-brand navbar-brand-modern"
            to="/"
          >
            🍽️ GO Food
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ border: 'none', color: 'white' }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link nav-link-modern"
                  to="/"
                >
                  <FaHome className="me-2" />
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link
                    className="nav-link nav-link-modern"
                    to="/myorder"
                  >
                    <FaClipboardList className="me-2" />
                    My Orders
                  </Link>
                </li>
              )}
            </ul>
            
            <div className="d-flex align-items-center gap-3">
              {!localStorage.getItem("authToken") ? (
                <>
                  <Link
                    className="btn btn-modern btn-outline"
                    to="/login"
                  >
                    <FaUser className="me-2" />
                    Login
                  </Link>
                  <Link
                    className="btn btn-modern btn-primary"
                    to="/createuser"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  {/* Notification Button */}
                  <button
                    className="btn btn-modern btn-outline position-relative"
                    style={{ 
                      minWidth: '50px', 
                      width: '50px', 
                      height: '50px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <FaBell size={16} />
                    <Badge 
                      bg="danger" 
                      className="position-absolute top-0 start-100 translate-middle"
                      style={{ fontSize: '0.6rem', minWidth: '18px', height: '18px' }}
                    >
                      3
                    </Badge>
                  </button>

                  {/* Wishlist Button */}
                  <button
                    className="btn btn-modern btn-outline"
                    style={{ 
                      minWidth: '50px', 
                      width: '50px', 
                      height: '50px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <FaHeart size={16} />
                  </button>

                  {/* Cart Button */}
                  <button
                    className="btn btn-modern btn-secondary position-relative"
                    onClick={() => setcartView(true)}
                    style={{ minWidth: '120px' }}
                  >
                    <ShoppingCartIcon className="me-2" />
                    Cart
                    <Badge 
                      bg="danger" 
                      className="position-absolute top-0 start-100 translate-middle"
                      style={{ fontSize: '0.7rem', minWidth: '20px', height: '20px' }}
                    >
                      {/* Add cart count here if needed */}
                    </Badge>
                  </button>
                  
                  <button
                    className="btn btn-modern btn-outline"
                    onClick={handlelogout}
                  >
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        
        {cartView && (
          <Modal onClose={() => setcartView(false)}>
            <Cart />
          </Modal>
        )}
      </nav>
    </>
  );
}
