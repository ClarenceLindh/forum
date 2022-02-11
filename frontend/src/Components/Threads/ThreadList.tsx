import React, { useEffect } from "react";
import Thread from "./Thread";
import "../../Styles/Thread.scss";

const ThreadList = (props: { threads: any; activeTopic: any }) => {
  // const handleClick = (e:any) => {
  //   const byTopic = e
  //   console.log("ämne " ,byTopic)

  //   const filterThreads = threads.filter(function(thread){
  //     return thread.topicId.name == "music";})
  //   setThreads(filterThreads)

  // }
  const threads = props.threads;
  const activeTopic = props.activeTopic;
  
  const filterOnTopic = () => {
    if (threads.topicId === undefined) {
      threads.shift();
    }
    
    if (activeTopic) {
      const filteredThreads = threads.filter(function (thread: {
        topicId: { name: any };
      }) {
        console.log(thread.topicId.name);
        return thread.topicId.name == activeTopic;
      });
      return filteredThreads;
    }
    return threads;
  };

  useEffect(() => {
    console.log("props.threads: ", props.threads);
    console.log("props.activeTopic: ", props.activeTopic);
    console.log("filteredThreads: ");
  }, [props.threads]);

  return (
    <div className="list">
      <h1>{props.threads.activeTopic}</h1>
      {filterOnTopic().map((thread: {}, index: number) => {
        return <Thread key={index} thread={thread} />;
      })}
    </div>
  );
};

export default ThreadList;
