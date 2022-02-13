import React, { useEffect, useState, useContext } from "react";
import Footer from "./Footer";

import { Context } from "../Context/ContextProvider";
import "../Styles/Home.scss";

function BannedUser() {

    const [banned, setBanned] = useState ([])
    const { loggedInUser, whoAmI } = useContext(Context);



    let unBanUser = async (banUserId:number) => {
        const accountInfo = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            blocked: false,

          })
        };
        await fetch(`/rest/editBan/${banUserId}`, accountInfo).then(
            async (response) => {
              const data = await response.json();
              window.location.reload()
            }
          )
        }
        

    async function fetchBlocked() {
    
        const raw = await fetch(`/rest/users/allBlockedUsers`);
        const res = await raw.json();
        console.log(res);
    
        setBanned(res);
      }

      useEffect( ()=> {
        fetchBlocked();
        console.log("dis is ban", banned)
      }, []);




  return (
    <div>
    <div className="main">
        <div className="header">
          <div></div>
          <h1>Forum</h1>
          <div></div>
        </div>
        
        <div className="body">
        <div >
            <h2>Banned accounts</h2>
        </div>
     <div className="items">
        <ul>
        {banned.map(
            (bannedUser:any) => (
                <li key={bannedUser.id}>
                   <div> {bannedUser.username} 
                   <button
                  onClick={() => unBanUser(bannedUser.id)}
                >
                  Unban
                </button></div>
                </li>
            )
        )}
        </ul>

        </div>
    </div>
        
        
    
    
    </div>
    <div id="footer">
          <Footer />
        </div>
    </div>
    
  )
}

export default BannedUser;