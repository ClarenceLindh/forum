import React, { useEffect, useState } from "react";
import CreateThread from "./CreateThread";
import "../Styles/Home.scss";
import ThreadList from "./Threads/ThreadList";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Footer from "./Footer";


const Home = (loggedInUser: any) => {
  const navigate = useNavigate();

  const [showCT, setShowCT ] = useState(false);

  const [threads, setThreads] = useState([{}]);

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

  async function fetchData() {
    // controller url: "/rest/thread/{threadId}"
    const raw = await fetch(`rest/threads/all-threads`);
    const res = await raw.json();
    console.log(res);

    res.forEach((element: { id: any; name: string; complete: boolean }) => {
      setThreads((threads) => [...threads, element]);
    });

    console.log(res);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (allTopics.length === 0) {
      getTopics();
    }
  }, [allTopics]);

  return (
    <div className="main">
      <div className="header">
        <Link className="link" to="/">
          <h1>Forum</h1>
        </Link>
        <Link className="link" to="/login">
          <h2>Sign in</h2>
        </Link>
      </div>

      <div className="body">
        <div className="categories">
          {allTopics.map(function (e, index) {
            return (
              <div id="topic" key={index}>
                {e.name}
              </div>
            );
          })}
        </div>

        {showCT ? <CreateThread topics={allTopics} thread={threads} /> : null}
        <div className="footer">
          <button onClick={() => setShowCT(true)} id="press">
            +
          </button>
        </div>

        <div className="items">
          <ThreadList threads={threads} />
        </div>
      </div>
      <div id="footer"><Footer/></div>
    </div>
  );
};

export default Home;
