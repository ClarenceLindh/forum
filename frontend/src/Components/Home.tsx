import React, { useEffect, useState } from "react";
import CreateThread from "./CreateThread";
import "../Styles/Home.scss";
import { json } from "stream/consumers";

const Home = () => {
  const [allTopics, setAllTopics] = React.useState<
    Array<{ id: any; name: string }>
  >([]);

  const [showCT, setShowCT] = React.useState(false);

  const closeCreateThread = (closeT: boolean) => setShowCT(closeT);

  const getTopics = async () => {
    try {
      const response = await fetch("/rest/topics/all-topics", {});
      const json = await response.json();
      console.log(json);

      setAllTopics(json);
      console.log(allTopics);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (allTopics.length === 0) {
      getTopics();
    }
    console.log(allTopics);
    console.log(showCT);
  }, [allTopics, showCT]);

  return (
    <div className="main">
      {showCT ? (
        <CreateThread topics={allTopics} closeCT={closeCreateThread} />
      ) : null}
      <div className="footer">
        <button onClick={() => setShowCT(true)} id="press">
          +
        </button>
      </div>
    </div>
  );
};

export default Home;
