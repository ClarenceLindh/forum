import React, { useEffect, useState, useContext } from "react";
import "../Styles/App.scss";
import { Link } from "react-router-dom";
import { Context } from "../Context/ContextProvider";


const Footer = () => {
  const { loggedInUser, whoAmI } = useContext(Context);
  const [banned, setBanned] = useState ([{}])

  async function fetchBlocked() {
    
    const raw = await fetch(`/rest/users/allBlockedUsers`);
    const res = await raw.json();
    console.log(res);

    res.forEach((element: { id: any; name: string; complete: boolean }) => {
      setBanned((banned) => [...banned, element]);
    });
  }

    useEffect( ()=> {
      fetchBlocked();
      console.log("dis is ban", banned)
    }, []);

  return (
    <div className="inFooter">
      
    <Link to={{pathname:'/'}}>Home</Link>
    <Link to={{pathname:'/create'}}>+</Link>
      
      <div>My treads</div>
      {loggedInUser.role === "ROLE_ADMIN" ? (
                    <div>
                      admin list
                  </div>
                ): (
                    <a>
                      
                    </a>
                )}
    </div>
  );
};


export default Footer;
