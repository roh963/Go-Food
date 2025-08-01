import React, { useState } from 'react';
import Delete from '@material-ui/icons/Delete';
import { useCart, useDispatchcart } from '../component/ContextReducer';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTrash, FaCreditCard, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

export default function Cart() {
  const navi = useNavigate();
  let data = useCart();
  let dispatch = useDispatchcart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (data.length === 0) {
    return (
      <div className="empty-cart text-center py-5">
        <div className="empty-cart-icon mb-4">
          <FaShoppingCart size={64} className="text-muted" />
        </div>
        <h3 className="text-muted mb-3">Your Cart is Empty!</h3>
        <p className="text-muted mb-4">Add some delicious items to get started</p>
        <button 
          className="btn btn-modern btn-primary"
          onClick={() => navi('/')}
        >
          <FaArrowLeft className="me-2" />
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleCheckOut = async () => {
    setIsCheckingOut(true);
    
    try {
      let userEmail = localStorage.getItem("userEmail");
      let response = await fetch(`${process.env.REACT_APP_API_URL}/api/orderData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });
      
      console.log("JSON RESPONSE:::::", response.status);
      
      if (response.status === 200) {
        dispatch({ type: "DROP" });
        navi("/myorder");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleRemove = (index) => {
    dispatch({ type: "REMOVE", index: index });
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="cart-container">
      <div className="cart-header mb-4">
        <h2 className="text-gradient mb-2">
          <FaShoppingCart className="me-2" />
          Your Cart
        </h2>
        <p className="text-muted">Review your order before checkout</p>
      </div>

      <div className="cart-items">
        {data.map((food, index) => (
          <div key={index} className="cart-item card-modern mb-3">
            <div className="row align-items-center">
              <div className="col-md-2 col-4">
                <div className="cart-item-image">
                  {food.img ? (
                    <img 
                      src={food.img} 
                      alt={food.name} 
                      className="img-fluid rounded"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="cart-item-placeholder d-flex align-items-center justify-content-center bg-light rounded">
                      <FaShoppingCart size={24} className="text-muted" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="col-md-4 col-8">
                <h6 className="mb-1 fw-bold">{food.name}</h6>
                <small className="text-muted">Size: {food.size}</small>
              </div>
              
              <div className="col-md-2 col-4 text-center">
                <span className="badge bg-primary rounded-pill">{food.qty}</span>
              </div>
              
              <div className="col-md-2 col-4 text-center">
                <span className="fw-bold text-success">₹{food.price}</span>
              </div>
              
              <div className="col-md-2 col-4 text-end">
                <button 
                  type="button" 
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleRemove(index)}
                  title="Remove item"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary card-modern p-4 mt-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h4 className="mb-0">
              <FaCheckCircle className="me-2 text-success" />
              Order Summary
            </h4>
            <p className="text-muted mb-0">{data.length} items in cart</p>
          </div>
          
          <div className="col-md-6 text-md-end">
            <div className="total-price mb-3">
              <h3 className="text-gradient mb-0">₹{totalPrice}</h3>
              <small className="text-muted">Total Amount</small>
            </div>
            
            <button 
              className={`btn btn-modern btn-primary ${isCheckingOut ? 'disabled' : ''}`}
              onClick={handleCheckOut}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? (
                <>
                  <div className="spinner-border spinner-border-sm me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  Processing...
                </>
              ) : (
                <>
                  <FaCreditCard className="me-2" />
                  Checkout Now
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}