import React, { useEffect, useState } from "react";
import "../Styles/App.scss";
import { Link } from "react-router-dom";

const Footer = () => {
 
  return (
    <div className="inFooter">
      
    <Link to={{pathname:'/'}}>Home</Link>
    <Link to={{pathname:'/create'}}>+</Link>
      
      <div>My treads</div>
    </div>
  );
};

export default Footer;
