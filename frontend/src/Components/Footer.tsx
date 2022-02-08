import React, { useEffect, useState } from "react";
import "../Styles/App.scss";
import { Link } from "react-router-dom";

const Footer = () => {
 
  return (
    <div className="inFooter">
      
    <Link to={{pathname:'/'}}>Home</Link>
    <Link to={{pathname:'/create'}}>+</Link>
    <Link to={{pathname:'/myThread'}}>MyThreads</Link> 
    
    </div>
  );
};

export default Footer;
