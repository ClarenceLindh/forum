import React, { useEffect, useState, useRef } from "react";
import CreateThread from "./CreateThread";
import "../Styles/Home.scss";
import console from "console";



const Home = () => {

  //const [allTopics, setAllTopics] = useState<any>();
  const [showResults, setShowResults] = React.useState(false)
  const viewCreateThread = () => setShowResults(true)
  
  
  /*const getTopics = async() =>
 
  {   
    await fetch ("/rest/topics/all-topics")
    .then(response => {
      return response.json();
    })
    .then((data) => {
      setAllTopics({
        allTopics:data.map((topic: { id: any; name: any; }) => (
          {
            id:topic.id,
            name:topic.name,
          }
        ))
      })
    })
    */
   
    /*
    const renderTopics =() =>{
      return allTopics.map(topic => {
        <div>{topic.name}</div>
       // <SingleTopic key={topic.id} name = {topic.name} />;
      })

    }*/
  
  //};

  useEffect(() => {
  const url = "/rest/topics/all-topics"  

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log("error", error);
    }
  };

  fetchData();  
}, []);


  
  return (
    <div className="main">
     
     {showResults ?
      <CreateThread  />
      : null }

      <button onClick={viewCreateThread} id="press">
					make your thread
				</button>

    </div>
  );

};

export default Home;