import React, { useContext,useEffect, useState } from "react";

import "../Styles/Home.scss";
import ThreadList from "./Threads/ThreadList";
import Footer from "./Footer";

import { Context } from "../Context/ContextProvider";


const MyThreads = () => {

  const { loggedInUser, whoAmI } = useContext(Context);

  const [threads, setThreads] = useState([{}]);
/*
  const [allTopics, setAllTopics] = React.useState<
    Array<{ id: any; name: string }>
  >([]);

  

  const getTopics = async () => {
    try {
      const response = await fetch("/rest/topics/all-topics", {});
      const json = await response.json();
      setAllTopics(json);
    } catch (error) {
      console.log("error", error);
    }
  };
*/
  async function fetchMyThreads() {
    whoAmI();
    const raw = await fetch(`rest/threads/all-threads`);
    const res = await raw.json();
    console.log("user"+loggedInUser.creatorUserId.id);

    res.forEach((element: { id: any; name: string; complete: boolean }) => {
      //if(loggedInUser==element.creatorUserId.id)
      setThreads((threads) => [...threads, element]);
    });

    console.log(threads);
  }


  useEffect(() => {
    fetchMyThreads();
   
  }, []);

/*
  useEffect(() => {
    if (allTopics.length === 0) {
      getTopics();
    }
  }, [allTopics]);*/
  
  return (
    <div className="main">
      <div className="header">
        <div></div>
        <h1>Forum</h1>
        <h2>Sign in</h2>
      </div>

      <div className="body">
      


        <div className="items">
          <ThreadList threads={threads} />
        </div>
      </div>
      <div id="footer"><Footer/></div>
    </div>
  );
};

export default MyThreads;
