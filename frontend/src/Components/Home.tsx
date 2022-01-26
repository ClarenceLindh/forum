import React, {  useState } from "react";
import "../Styles/Home.scss";
import ThreadList from "./Threads/ThreadList";



const Home = () => {
 
  const [threads, setThreads] = useState([{id:1,name:'Todo1', complete:false }])
  
    return (
      <div className="main">

        <header>
        <div className="header">
              <div></div>
            <h1>FORUM</h1>
            <h2>Sign in</h2>
          </div>
        </header>

        <ThreadList threadList={threads}/>

    
    

      </div>
    );
  }

export default Home;
