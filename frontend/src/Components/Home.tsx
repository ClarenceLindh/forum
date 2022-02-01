import React, { useEffect, useState } from "react";
import CreateThread from "./CreateThread";
import "../Styles/Home.scss";

const Home = () => {
  const [allTopics, setAllTopics] = React.useState<
    Array<{ id: any; name: string }>
  >([]);

  const [showCT, setShowCT] = React.useState(false);

  const getTopics = async () => {
    try {
      const response = await fetch("/rest/topics/all-topics", {});
      const json = await response.json();
      setAllTopics(json);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (allTopics.length === 0) {
      getTopics();
    }
  }, [allTopics]);

  return (
    <div className="main">
      {showCT ? <CreateThread topics={allTopics} /> : null}
      <div className="footer">
        <button onClick={() => setShowCT(true)} id="press">
          +
        </button>
      </div>
    </div>
  );
};

export default Home;
