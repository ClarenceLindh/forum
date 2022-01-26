import React, {  useState } from "react";
import "../Styles/Home.scss";
import Threads from "./Threads/Threads";



const Home = () => {
 
  const [threads, setThreads] = useState(['thread1', 'thread2'])
  
    return (
      <div className="main">

        <header>
        <div className="header">
              <div></div>
            <h1>FORUM</h1>
            <h2>Sign in</h2>
          </div>
        </header>

      <Threads threadList={threads}/>
    

      </div>
    );
  }

export default Home;
