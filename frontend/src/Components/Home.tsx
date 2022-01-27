import CreateThread from "./CreateThread";
import React, { useState } from "react";
import "../Styles/Home.scss";
import ThreadList from "./Threads/ThreadList";

const Home = (loggedInUser: any) => {
  const test = true;
  const [threads, setThreads] = useState([
    { id: 1, name: "Todo1", complete: false },
    { id: 1, name: "Todo2", complete: false },
    { id: 1, name: "Todo3", complete: false },
    { id: 1, name: "Todo4", complete: false },
  ]);
  const topicsList = [{ topic: "sport" }, { topic: "music" }, { topic: "art" }];

  return (
    <div className="main">
      <div className="main">
        <CreateThread />
      </div>

      <div className="header">
        <div></div>
        <h1>Forum</h1>
        <h2>Sign in</h2>
      </div>

      <body>
        <div className="categories">
          {topicsList.map(function (e) {
            return <div id="topic">{e.topic}</div>;
          })}
        </div>

        <div className="items">
          <ThreadList threads={threads} />
        </div>
      </body>
    </div>
  );
};

export default Home;
