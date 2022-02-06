import React, { useEffect, useState } from "react";
import "../Styles/App.scss";
import { useNavigate, NavLink } from "react-router-dom";

const Footer = () => {
 /* const history = useHistory();
  const nextPath=(path)=>{
    history.pushState(path)
    <div onClick={()=>nextPath("/")}>Home</div>
     <NavLink to="/">Home</NavLink>
  }*/
  return (
    <div className="inFooter">
      
      <NavLink to="/">Home</NavLink>
      <NavLink to="/create">+</NavLink>
      
      <div>My treads</div>
    </div>
  );
};

export default Footer;
