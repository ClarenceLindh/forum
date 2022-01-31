import React, {  useState,useEffect } from "react";
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

const Home = () => {
  const [threads, setThreads] = useState([{}])
  const topicsList=[{topic:"sport"},{topic:"music"},{topic:"art"}]




  
useEffect(()=>{


  async function fetchData(){
   

       // controller url: "/rest/thread/{threadId}"
       const raw = await fetch(`rest/threads/all-threads`);
       const res = await raw.json();
       console.log(res)


        res.forEach((element: { id:any; name: string; complete: boolean; }) => {
          setThreads(threads=>[...threads,element])
         });

         console.log(res)
     
      
     

  };

  fetchData();

},[])
  


     
     
  

  
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

        <ThreadList threads={threads}/>

        </div>
        </div>
      
 
       </div>
   
    );
  }

export default Home;




