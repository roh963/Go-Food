import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link,useNavigate } from "react-router-dom";
import Modal from "../Model";
import Cart from "../screen/Cart";
export default function Navbars() {
  const [cartView, setcartView] = useState(false);
  const navigation = useNavigate();
  const handlelogout = ()=>{
    localStorage.removeItem("authToken");
    navigation("/login");

  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light  bg-dark">
        <Link
          className="navbar-brand  m-2 p-2"
          style={{ fontWeight: "bold", color: "#d6d3c9", fontStyle: "italic",fontSize:"50px"  }}
        >
          {" "}
          GO Food{" "}
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-1">
            <li className="nav-item active fs-5">
              <Link
                className="nav-link semibold-text"
                style={{ fontWeight: "600", color: "#e1faf9" }}
                to="/"
              >
                Home
              </Link>
            </li>
            {
              (localStorage.getItem("authToken"))
              ? <li className="nav-item active fs-5">
              <Link
                className="nav-link semibold-text"
                style={{ fontWeight: "600", color: "#e1faf9" }}
                to="/myorder"
              >
                My Order
              </Link>
            </li>
              :""
            }
          </ul>
         {
          (!localStorage.getItem("authToken"))? <div className="d-flex  mx-1 " >
          
          <Link
            className="btn btn-success text-white semibold-text mx-1 "
            style={{ fontWeight: "600", color: "#e1faf9" }}
            to="/login"
          >
            Login
          </Link>
      

       
          <Link
            className="btn btn-success text-white semibold-text mx-1 "
            style={{ fontWeight: "600", color: "#e1faf9" }}
            to="/createuser"
          >
            SignUp
          </Link>

        </div>: <div className="d-flex  mx-1 " >
          
          <Link
            className="btn bg-white  text-success semibold-text mx-2 "
            style={{ fontWeight: "600", color: "#e1faf9" }}
            onClick={()=>setcartView(true)}
         
          >
             <Badge color="secondary" >
                  <ShoppingCartIcon />
             </Badge>
             Cart
          </Link>
          {cartView ? <Modal onClose={() => setcartView(false)}><Cart></Cart></Modal> : ""}
              
       
          <div
            className="btn btn-success text-white bold-text  mx-1 "
            style={{ fontWeight: "600", color: "#e1faf9" }}
           onClick={handlelogout}
          >
            LogOut
          </div>

        </div>
         }
        </div>
      </nav>
    </>
  );
}
