import React, { useState } from 'react'
import { Link ,useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate();
  const [credentioal,setcredentional] = useState({ name:"",
  password:"",
   email:"",
   geolocation:""})
  const handsubmit =async(e)=>{
   e.preventDefault();
   const response = await fetch("http://localhost:5000/api//loginuser",{
    method:'POST',
    headers:{
       'Content-Type':'application/json'
    },
    body:JSON.stringify({ 
      email: credentioal.email,
      password: credentioal.password
    })
   });
     const json = await response.json();
     console.log(json);

     if(!json.success){
      alert("enter valid credentials");
     }
     if(json.success){
       localStorage.setItem("authToken",json.authToken)
       console.log(localStorage.getItem("authToken"));
       navigate("/")
     }
  };
  
  const onChange=(e)=>{
    setcredentional({...credentioal,[e.target.name]:e.target.value})
  }
  const styles = {
    heigth:"500px",
    width:"300px",
    margin:" 0 300px 0",
    padding:" 0 300px 0"

   }
  return (
    <div className='m-5 p-5 h-2 w-1 bg-dark'>
       <header className='bg-secondary p-1 mx- ' style={styles}>  Login YourSelf  </header>
      <form onSubmit={handsubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentioal.email} onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentioal.password} onChange={onChange} />
  </div>
  
  <button type="submit" className="btn btn-success">Submit</button>
  <Link to="/createuser" className='m-3 btn btn-danger' >Create  a user</Link>
</form>
    </div>
  )
}
