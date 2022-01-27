import React, { useEffect, useState } from "react";
import CreateThread from "./CreateThread";
import "../Styles/Home.scss";

const Home = () => {

  const [allTopics, setAllTopics] = useState<any>([]);
  
  const getTopics = async() =>
  {    
    const response = await fetch("/rest/topics/all-topics", {});
    console.log(response);
    setAllTopics(response)
  };

  useEffect(() => {
getTopics();
  }, []);
 
  
  return (
    <div className="main">
     
      <CreateThread allTopics={allTopics}/>
    </div>
  );

};

export default Home;
