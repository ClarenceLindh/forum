import React, { useEffect, useState } from "react";
import CreateThread from "./CreateThread";
import "../Styles/Home.scss";
import ThreadList from "./Threads/ThreadList";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";

const Home = (loggedInUser: any) => {
  const [threads, setThreads] = useState([{}]);
  
  function UserGreeting(props:any) {
    return <h1>Welcome back!</h1>;
  }
  
  function GuestGreeting(props:any) {
    return <h1>Please sign up.</h1>;
  }

  const [allTopics, setAllTopics] = React.useState<
    Array<{ id: any; name: string }>
  >([]);

  const [showCT, setShowCT] = React.useState(false);

  const getTopics = async () => {
    try {
      const response = await fetch("/rest/topics/all-topics", {});
      const json = await response.json();
      setAllTopics(json);
    } catch (error) {
      console.log("error", error);
    }
  };

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/login`; 
    navigate(path);}

    function Greeting(props:any) {
      const isLoggedIn = props.isLoggedIn;
      if (isLoggedIn) {
        return <UserGreeting />;
      }
      return <GuestGreeting />;
    }

    ReactDOM.render(
      // Try changing to isLoggedIn={true}:
      <Greeting isLoggedIn />,
      document.getElementById('root')
    );

  async function fetchData() {
    // controller url: "/rest/thread/{threadId}"
    const raw = await fetch(`rest/threads/all-threads`);
    const res = await raw.json();
    console.log(res);

    res.forEach((element: { id: any; name: string; complete: boolean }) => {
      setThreads((threads) => [...threads, element]);
    });

    console.log(res);
  }

  useEffect(() => {
    fetchData();
   
  }, []);

  useEffect(() => {
    if (allTopics.length === 0) {
      getTopics();
    }
  }, [allTopics]);

  return (
    <div className="main">
      <div className="header">
        <div></div>
        <h1>Forum</h1>
        <h2 onClick={routeChange}>Sign in</h2>
      </div>

      <div className="body">
        <div className="categories">
          {allTopics.map(function (e, index) {
            return (
              <div id="topic" key={index}>
                {e.name}
              </div>
            );
          })}
        </div>

        {showCT ? <CreateThread topics={allTopics} /> : null}
        <div className="footer">
          <button onClick={() => setShowCT(true)} id="press">
            +
          </button>
        </div>

        <div className="items">
          <ThreadList threads={threads} />
        </div>
      </div>
      
    </div>
  );
};

export default Home;
