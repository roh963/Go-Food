import React from 'react';
import { FaHeart, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaPinterest } from 'react-icons/fa';

export default function Footers() {
  return (
    <footer className="footer-modern bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row g-4">
          {/* Company Info */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="footer-section">
              <h5 className="text-gradient mb-3 fw-bold">🍽️ GO Food</h5>
              <p className="text-muted mb-3 fs-6">
                Delivering delicious meals to your doorstep. Fresh ingredients, 
                amazing taste, and exceptional service.
              </p>
              <div className="social-links">
                <a href="#" className="social-link me-2" title="Facebook">
                  <FaFacebook size={18} />
                </a>
                <a href="#" className="social-link me-2" title="Twitter">
                  <FaTwitter size={18} />
                </a>
                <a href="#" className="social-link me-2" title="Instagram">
                  <FaInstagram size={18} />
                </a>
                <a href="#" className="social-link me-2" title="LinkedIn">
                  <FaLinkedin size={18} />
                </a>
                <a href="#" className="social-link me-2" title="YouTube">
                  <FaYoutube size={18} />
                </a>
                <a href="#" className="social-link" title="Pinterest">
                  <FaPinterest size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="footer-section">
              <h6 className="fw-bold mb-3 text-white">Quick Links</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="footer-link d-flex align-items-center">
                    <span className="me-2">→</span>
                    Home
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="footer-link d-flex align-items-center">
                    <span className="me-2">→</span>
                    Menu
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="footer-link d-flex align-items-center">
                    <span className="me-2">→</span>
                    About Us
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="footer-link d-flex align-items-center">
                    <span className="me-2">→</span>
                    Contact
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="footer-link d-flex align-items-center">
                    <span className="me-2">→</span>
                    Track Order
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Categories */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="footer-section">
              <h6 className="fw-bold mb-3 text-white">Food Categories</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="footer-link d-flex align-items-center">
                    <span className="me-2">🍔</span>
                    Burgers
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="footer-link d-flex align-items-center">
                    <span className="me-2">🍕</span>
                    Pizza
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="footer-link d-flex align-items-center">
                    <span className="me-2">🍜</span>
                    Asian Cuisine
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="footer-link d-flex align-items-center">
                    <span className="me-2">🍰</span>
                    Desserts
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="footer-link d-flex align-items-center">
                    <span className="me-2">🥤</span>
                    Beverages
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="footer-section">
              <h6 className="fw-bold mb-3 text-white">Contact Us</h6>
              <div className="contact-info">
                <div className="contact-item mb-3">
                  <FaPhone className="me-2 text-primary" />
                  <span className="fs-6">+1 (555) 123-4567</span>
                </div>
                <div className="contact-item mb-3">
                  <FaEnvelope className="me-2 text-primary" />
                  <span className="fs-6">info@gofood.com</span>
                </div>
                <div className="contact-item mb-3">
                  <FaMapMarkerAlt className="me-2 text-primary" />
                  <span className="fs-6">123 Food Street, Cuisine City</span>
                </div>
                <div className="contact-item">
                  <span className="badge bg-success me-2">24/7 Support</span>
                  <span className="badge bg-warning text-dark">Free Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom mt-4 pt-4 border-top border-secondary">
          <div className="row align-items-center">
            <div className="col-12 col-md-6">
              <p className="mb-0 text-muted fs-6">
                &copy; 2024 GO Food. All rights reserved.
              </p>
            </div>
            <div className="col-12 col-md-6 text-md-end">
              <p className="mb-0 text-muted fs-6">
                Made with <FaHeart className="text-danger" /> by You
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
