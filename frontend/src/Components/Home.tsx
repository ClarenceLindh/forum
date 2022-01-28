import React, {  useState,useEffect } from "react";
import "../Styles/Home.scss";
import ThreadList from "./Threads/ThreadList";



const Home = () => {
  const [threads, setThreads] = useState([{}])
  const topicsList=[{topic:"sport"},{topic:"music"},{topic:"art"}]
   


  
  const getThreads = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

       // controller url: "/rest/thread/{threadId}"
       const raw = await fetch(`rest/threads/all-threads`);
       const res = await raw.json();
       
        res.forEach((element: { id:any; name: string; complete: boolean; }) => {
          setThreads(threads=>[...threads,element])
          console.log(threads);
         });
     
      
     
  };


  
  return (

     

<div className="main">



     
     <div className="header">  
        <div></div>
        <h1>Forum</h1>
        <h2>Sign in</h2>
      </div>

    
      <div className="body">
        <div className="categories">
          {topicsList.map(function(e,index){
            return <div id="topic" key={index}>{e.topic}</div>
          })}
        </div>

        <div className="items">
        <button onClick={getThreads}>Get Thread</button>

        <ThreadList threads={threads}/>

        </div>
        </div>
      
 
       </div>
   
    );
  }

export default Home;




