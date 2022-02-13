import React, { useContext, useEffect, useState } from "react";

import "../Styles/Home.scss";
import ThreadList from "./Threads/ThreadList";
import Footer from "./Footer";
import { Link } from "react-router-dom";

import { Context } from "../Context/ContextProvider";
import Header from "./Header";

const MyThreads = () => {
  const { loggedInUser, whoAmI } = useContext(Context);

  const [threads, setThreads] = useState([{}]);

  async function fetchMyThreads() {
    const raw = await fetch(`/rest/threads/user/${loggedInUser.id}`);
    const res = await raw.json();

    res.forEach((element: { id: any; name: string; complete: boolean }) => {
      
      setThreads((threads) => [...threads, element]);
    });
  }

  useEffect(() => {
    fetchMyThreads();
  }, []);

  if (
    Object.keys(loggedInUser).length === 0 &&
    loggedInUser.constructor === Object
  ) {
    return (
      <div>
      <div className="main">
        <div className="header">
          <div></div>
          <h1>Forum</h1>
          <div></div>
        </div>

        <div className="loginMessage">
          <h2>You need to <Link to={{pathname:'/login'}}>Log in</Link></h2>
        </div>
      </div>
      <div id="footer">
          <Footer />
        </div>
      </div>
    );
  } else {
    return (
        <div>
      <div className="main">
        <Header />

        <div className="body">
          <div >
            <h2>My Threads</h2>
          </div>

          <div className="items">
            <ThreadList threads={threads} activeTopic={undefined} />
          </div>
          
        </div>
      </div>
        <div id="footer">
          <Footer />
        </div>
      </div>
    );
  }
};

export default MyThreads;
