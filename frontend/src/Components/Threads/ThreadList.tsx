import React, { useEffect, useState } from "react";
import Thread from "./Thread";
import "../../Styles/Thread.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const ThreadList = (props: { threads: any; activeTopic: any; }) => {
  const threads = props.threads;

  let activeTopic = props.activeTopic;
  const [filteredThreads, setFilteredThreads] = useState([]);
  let toggle = false;

  const toggleStuff = () => {
    setFilteredThreads(
      threads.filter((thread: any) => {
        if (thread.topicId === undefined && toggle === false) {
          threads.shift();
          toggle = true;
        }
      })
    );
  };

  const filterOnTopic = () => {
    if (activeTopic) {
      setFilteredThreads(
        threads.filter((thread: any) => {
          return thread.topicId.name === activeTopic;
        })
      );
    }
  };

  useEffect(() => {
    toggleStuff();
    filterOnTopic();
  }, [props.threads, props.activeTopic]);

  const renderThreads = () => {
    if (filteredThreads.length === 0) {
      return threads;
    } else {
      return filteredThreads;
    }
  };

  return (
    <div className="list">
      <h1 >{activeTopic}</h1>
      {renderThreads().map((thread: {}, index: number) => {
        return <Thread key={index} thread={thread} />;
      })}
    </div>
  );
};

export default ThreadList;
