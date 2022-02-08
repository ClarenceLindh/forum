import React, { useContext, useEffect, useState } from "react";

import "../Styles/Home.scss";
import ThreadList from "./Threads/ThreadList";
import Footer from "./Footer";

import { Context } from "../Context/ContextProvider";

const MyThreads = () => {
  const { loggedInUser, whoAmI } = useContext(Context);

  const [threads, setThreads] = useState([{}]);

  async function fetchMyThreads() {
    const raw = await fetch(`/rest/threads/user/1`);
    const res = await raw.json();

    res.forEach((element: { id: any; name: string; complete: boolean }) => {
      //if(loggedInUser==element.creatorUserId.id)
      setThreads((threads) => [...threads, element]);
    });
  }

  useEffect(() => {
    fetchMyThreads();
  }, []);

  return (
    <div className="main">
      <div className="header">
        <div></div>
        <h1>Forum</h1>
        <div></div>
      </div>

      <div className="body">
       <div id="myThread"> <h2>My Threads</h2></div>
        <div className="items">
          <ThreadList threads={threads} />
        </div>
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default MyThreads;
