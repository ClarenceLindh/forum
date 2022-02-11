import React, { useEffect, useState, useContext } from "react";
import "../Styles/App.scss";
import { Link } from "react-router-dom";
import { Context } from "../Context/ContextProvider";

const Footer = () => {
  const { loggedInUser, whoAmI } = useContext(Context);
  
  return (
    <div className="inFooter">
      
    <Link to={{pathname:'/'}}>Home</Link>
    {loggedInUser.role == "ROLE_ADMIN" ? (
             <Link to={{pathname:'/admin/blockedThreads'}}>Blocked Threads</Link>
          ) : (
            <></>
          )}
   
    <Link to={{pathname:'/create'}}>+</Link>
    <Link to={{pathname:'/myThread'}}>MyThreads</Link> 
    
    </div>
  );
};

export default Footer;
