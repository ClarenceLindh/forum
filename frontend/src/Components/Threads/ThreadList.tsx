import React from "react";
import Thread from "./Thread";
import "../../Styles/Thread.scss";

const ThreadList = (filteredThreads: any, { threads }: { threads: any } ) => {
  
  const checkFilteredThreads = () => {
    if (filteredThreads) {
      filteredThreads.map((_thread: {}, index: number) => {
        return <Thread key={index} filteredThreads={filteredThreads} />;
      })
    } else {
      threads.map((thread: {}, index: number) => {
        return <Thread key={index} thread={thread} />;
      })
    }
  };

  return (
    <div className="list">
      {checkFilteredThreads}
    </div>
  );
};

export default ThreadList;
