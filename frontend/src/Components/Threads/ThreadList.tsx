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
  const [ filteredThreads, setFilteredThreads ] = React.useState([]);
  
  const filterOnTopic = () => {
    if (threads.topicId === undefined) {
      threads.shift();
    }
    
    if (activeTopic) {
      setFilteredThreads(threads.filter(function (thread: {
        topicId: { name: any };
      }) {
        console.log(thread.topicId.name);
        return thread.topicId.name == activeTopic;
      }));
      
    }
   
  };

  useEffect(() => {
    filterOnTopic();
    console.log("props.threads: ", props.threads);
    console.log("props.activeTopic: ", props.activeTopic);
    console.log("filteredThreads: ", filteredThreads);
  }, [props.threads]);

  return (
    <div className="list">
      <h1>{props.threads.activeTopic}</h1>
      {props.threads.map((thread: {}, index: number) => {
        return <Thread key={index} thread={thread} />;
      })}
    </div>
  );
};

export default ThreadList;
