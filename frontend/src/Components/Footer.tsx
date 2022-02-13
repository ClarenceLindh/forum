import React, { useEffect, useState, useContext } from "react";
import "../Styles/App.scss";
import { Link } from "react-router-dom";
import { Context } from "../Context/ContextProvider";


const Footer = () => {
  const { loggedInUser, whoAmI } = useContext(Context);



    

  return (
    <div className="inFooter">
      
    <Link to={{pathname:'/'}}>Home</Link>
    <Link to={{pathname:'/create'}}>+</Link>
      
      <div>My treads</div>
      {loggedInUser.role === "ROLE_ADMIN" ? (
                    <div>
                      <Link to={{pathname:"/admin/banned"}}>Banned users</Link>
                  </div>
                ): (
                    <a>
                      
                    </a>
                )}
    </div>
  );
};


export default Footer;
