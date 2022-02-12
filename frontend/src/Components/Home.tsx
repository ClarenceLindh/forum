import React, { useContext, useEffect, useState } from "react";
import CreateThread from "./CreateThread";
import "../Styles/Home.scss";
import ThreadList from "./Threads/ThreadList";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/ContextProvider";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Home = () => {
  const navigate = useNavigate();

  const { loggedInUser, whoAmI,logout } = useContext(Context);
  //const [showCT, setShowCT] = useState(false);
  const [threads, setThreads] = useState([{}]);
  const [activeTopic, setActiveTopic] = useState("")
  const [ filteredThreads, setFilteredThreads ] = useState([]);



  ////////////////////////////////////////
 


  /////////////////////////////////////////////////////
  ////////////////////////////////////////////////////
  const [allTopics, setAllTopics] = React.useState<
    Array<{ id: any; name: string }>
  >([]);

  const getTopics = async () => {
    try {
      const response = await fetch("/rest/topics/all-topics", {});
      const json = await response.json();
      setAllTopics(json);
    } catch (error) {
      console.log("error", error);
    }
  };

  // ReactDOM.render(
  //   // Try changing to isLoggedIn={true}:
  //   <Greeting isLoggedIn={false} />,
  //   document.getElementById('root')
  // );

  async function fetchData() {
    // controller url: "/rest/thread/{threadId}"
    const raw = await fetch(`/rest/threads/all-unblocked-threads`);
    const res = await raw.json();
    console.log("res", res);
    
    console.log("setFilteredThreads", filteredThreads);

    res.forEach((element: { id: any; name: string; complete: boolean }) => {
      setThreads((threads) => [...threads, element]);
    });

  
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (allTopics.length === 0) {
      getTopics();
    }
  }, [allTopics]);

  const handleClick = (e:any) => {
    setActiveTopic(e);
  }

  return (
    <div>
      <div className="main">
        <Header />

        <div className="body">
          <div className="categories">
            {allTopics.map(function (e, index) {
              return (
                <button id="topic" key={index} value="sport" onClick={() => handleClick(e.name)} >
                  {e.name}
                </button>

              );
            })}
          </div>


          <div className="items">
            <ThreadList threads={threads} activeTopic={activeTopic} />
          </div>
        </div>

      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
