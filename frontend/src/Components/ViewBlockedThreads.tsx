import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer"
import ThreadList from "./Threads/ThreadList";

export default function ViewBlockedThreads() {
    const { loggedInUser, whoAmI } = useContext(Context);
    const [creatorUsername, setCreatorUsername] = useState<string>("")
    const [threads, setThreads] = useState([{}]);
    const activeTopic = null


    const fetchBlockedThreads = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
    let raw = await fetch(`/rest/blocked-threads/user/${creatorUsername}`)
    let res = await raw.json();
    console.log(raw)
    console.log(res)
    res.forEach((element: { id: any; name: string; complete: boolean }) => {
        setThreads((threads) => [...threads, element]);
      });
}


    if(loggedInUser.role == "ROLE_ADMIN"){return(
        <div>
            <form onSubmit={fetchBlockedThreads}>
              <input
              type="text"
              placeholder="search by username"
              onChange={(e) => setCreatorUsername(e.target.value)}
              onSubmit={fetchBlockedThreads}
            />
            </form>
            <div className="items">
            <ThreadList threads={threads} activeTopic={activeTopic} />
          </div>
            <div id="footer">
        <Footer />
      </div>
        </div>
    )}else{
        return(
            <>
        <h1>YOU DONT HAVE ACSESS FOR THIS PAGE</h1>
        <button>
          <Link className="linkButton" to={"/"}>
            CLICK ON ME TO GO HOME
          </Link>
        </button>
            </>
        )
    }
}