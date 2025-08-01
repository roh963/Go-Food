import React, { useEffect, useState } from "react";
import Footer from "../component/Footers";
import Navbar from "../component/Navbars";
import { FaClipboardList, FaCalendarAlt, FaUtensils, FaClock, FaCheckCircle, FaTruck, FaStar, FaMapMarkerAlt } from 'react-icons/fa';

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchMyOrder = async () => {
    try {
      setLoading(true);
      console.log(localStorage.getItem("userEmail"));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/myOrderData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });
      
      const data = await response.json();
      setOrderData(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container py-5">
          <div className="text-center">
            <div className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle mb-3" 
                 style={{ width: '80px', height: '80px' }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            <p className="mt-3 text-muted fs-5">Loading your orders...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Helper function to render order items
  const renderOrderItems = () => {
    if (!orderData || !orderData.orderData || !orderData.orderData.order_data) {
      return null;
    }

    const orderItems = [];
    let currentDate = null;

    orderData.orderData.order_data
      .slice(0)
      .reverse()
      .forEach((item, itemIndex) => {
        item.forEach((arrayData, arrayIndex) => {
          if (arrayData.Order_date) {
            // This is a date header
            currentDate = arrayData.Order_date;
            orderItems.push(
              <div key={`date-${itemIndex}-${arrayIndex}`} className="order-date-section mb-4 fade-in">
                <div className="order-date-header">
                  <FaCalendarAlt className="me-2 text-primary" />
                  <h5 className="mb-0 fw-bold">{currentDate}</h5>
                </div>
                <hr className="my-3" />
              </div>
            );
          } else {
            // This is an order item
            orderItems.push(
              <div key={`item-${itemIndex}-${arrayIndex}`} className="col-12 col-md-6 col-lg-4 mb-4 fade-in"
                   style={{ animationDelay: `${arrayIndex * 0.1}s` }}>
                <div className="order-item-card card-modern h-100">
                  <div className="order-item-image-container">
                    {arrayData.img ? (
                      <img
                        src={arrayData.img}
                        className="order-item-image"
                        alt={arrayData.name}
                      />
                    ) : (
                      <div className="order-item-placeholder">
                        <FaUtensils size={32} className="text-muted" />
                      </div>
                    )}
                    
                    {/* Order Status Badge */}
                    <div className="order-status-badge">
                      <span className="badge bg-success">
                        <FaCheckCircle className="me-1" />
                        Delivered
                      </span>
                    </div>

                    {/* Rating Badge */}
                    <div className="position-absolute top-0 start-0 m-3">
                      <span className="badge bg-warning text-dark">
                        <FaStar className="me-1" />
                        4.5
                      </span>
                    </div>
                  </div>
                  
                  <div className="order-item-body p-3">
                    <h6 className="order-item-title mb-2">
                      {arrayData.name}
                    </h6>
                    
                    <div className="order-item-details">
                      <div className="order-item-meta mb-2">
                        <span className="badge bg-primary me-2">
                          Qty: {arrayData.qty}
                        </span>
                        <span className="badge bg-secondary me-2">
                          Size: {arrayData.size}
                        </span>
                      </div>
                      
                      <div className="order-item-date mb-2">
                        <small className="text-muted d-flex align-items-center">
                          <FaClock className="me-1" />
                          {currentDate}
                        </small>
                      </div>

                      <div className="order-item-delivery mb-2">
                        <small className="text-muted d-flex align-items-center">
                          <FaTruck className="me-1" />
                          Delivered in 25 min
                        </small>
                      </div>
                      
                      <div className="order-item-price">
                        <span className="fw-bold text-success fs-5">
                          ₹{arrayData.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        });
      });

    return orderItems;
  };

  return (
    <div>
      <Navbar />
      
      <div className="container py-5">
        <div className="orders-header text-center mb-5">
          <div className="d-flex align-items-center justify-content-center mb-3">
            <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle me-3" 
                 style={{ width: '60px', height: '60px' }}>
              <FaClipboardList size={24} className="text-white" />
            </div>
            <h2 className="text-gradient mb-0">My Orders</h2>
          </div>
          <p className="text-muted fs-5">Track your order history and delivery status</p>
        </div>

        {Object.keys(orderData).length > 0 && orderData.orderData ? (
          <div className="orders-container">
            <div className="row">
              {renderOrderItems()}
            </div>
          </div>
        ) : (
          <div className="empty-orders text-center py-5">
            <div className="empty-orders-icon mb-4">
              <div className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle mb-3" 
                   style={{ width: '80px', height: '80px' }}>
                <FaClipboardList size={40} className="text-muted" />
              </div>
            </div>
            <h3 className="text-muted mb-3 fw-bold">No Orders Yet!</h3>
            <p className="text-muted mb-4 fs-5">Start ordering delicious food to see your order history here</p>
            <button 
              className="btn btn-modern btn-primary"
              onClick={() => window.location.href = '/'}
            >
              <FaUtensils className="me-2" />
              Order Now
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
