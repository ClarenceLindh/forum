import React, { useEffect, useState, useContext } from "react";
import "../Styles/App.scss";
import { Link } from "react-router-dom";
import { Context } from "../Context/ContextProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPlus, faUser } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  const { loggedInUser, whoAmI } = useContext(Context);
  
  
  return (
    <div className="inFooter">
      
    <Link to={{pathname:'/'}}><FontAwesomeIcon icon={faHouse} /></Link>
    {loggedInUser.role == "ROLE_ADMIN" ? (
             <Link to={{pathname:'/admin/blockedThreads'}}>Blocked Threads</Link>
             
          ) : (
            <></>
          )}

  {loggedInUser.role === "ROLE_ADMIN" ? (
                    <div>
                      <Link to={{pathname:"/admin/banned"}}>Banned users</Link>
                  </div>
  ):(
    <></>
  )}
    <Link to={{pathname:'/create'}}><FontAwesomeIcon icon={faPlus} /></Link>
    <Link to={{pathname:'/myThread'}}><FontAwesomeIcon icon={faUser} /></Link> 
    
    </div>
  );
};

export default Footer;
