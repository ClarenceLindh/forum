import React, { useContext, useEffect, useState } from "react";
import CreateThread from "./CreateThread";
import "../Styles/Home.scss";
import ThreadList from "./Threads/ThreadList";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/ContextProvider";
import { Link } from "react-router-dom";
import Footer from "./Footer";

type ThreadType = {
  id: number;
  creator: {
    id: number;
    username: string;
    role: boolean;
    blockedThreads: [
      {
        id: number;
      }
    ];
  };
  topicId: {
    id: number;
    name: string;
  };
  title: string;
  text: string;
  creationDate: string;
  lastEdited: boolean;
  bannedUsers: [
    {
      id: number;
    }
  ];
  blockedThreadStatus: boolean;
  threadModerators: [
    {
      id: number;
    }
  ];
}

const Home = () => {
  const navigate = useNavigate();

  const { loggedInUser, whoAmI } = useContext(Context);
  //const [showCT, setShowCT] = useState(false);
  const [threads, setThreads] = useState(
    [
      {
        id: Number,
        creator: {
          id: Number,
          username: String,
          role: Boolean,
          blockedThreads: [
            {
              id: Number,
            }
          ],
        },
        topicId: {
          id: Number,
          name: String,
        },
        title: String,
        text: String,
        creationDate: String,
        lastEdited: Boolean,
        bannedUsers: [
          {
            id: Number,
          }
        ],
        blockedThreadStatus: Boolean,
        threadModerators: [
          {
            id: Number,
          }
        ]
      }
    ]
  );
  const [activeTopic, setActiveTopic] = useState("");
  const [filteredThreads, setFilteredThreads] = useState(
    [
      {
        id: Number,
        creator: {
          id: Number,
          username: String,
          role: Boolean,
          blockedThreads: [
            {
              id: Number,
            }
          ],
        },
        topicId: {
          id: Number,
          name: String,
        },
        title: String,
        text: String,
        creationDate: String,
        lastEdited: Boolean,
        bannedUsers: [
          {
            id: Number,
          }
        ],
        blockedThreadStatus: Boolean,
        threadModerators: [
          {
            id: Number,
          }
        ]
      }
    ]
  );

  ////////////////////////////////////////
  const logout = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // tell backend to forget us
    console.log("logout work");
    let response = await fetch("/logout", {
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      mode: "no-cors", //  <3
    }).then(() => {
      whoAmI();
    });

    window.location.reload();
  };

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
    console.log(res);

    res.forEach((element: any) => {
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

  // filter threads by topic

  const filterByTopic = (name: string) => {
    setActiveTopic(name);
    if (activeTopic !== "") {
      setActiveTopic("setActiveTopic: " + name);

      console.log("name: ", name);
      console.log("threads", threads);

      setFilteredThreads(threads.filter((thread: any) => {
        console.log("checking filter on thread: ", thread);
        console.log(Object.keys(thread.topicId));
        return thread.topicId.name === "Stuff";
      }))

      console.log("filteredThreads: ", threads);
    }
  };

  // const handleClick = (  ) => {
  //   const byTopic = e
  //   console.log("ämne " ,byTopic)

  //   const filterThreads = threads.filter(function(thread){
  //     return thread.topicId.name === byTopic
  //   })
  //   setThreads(filterThreads)

  // }

  return (
    <div>
      <div className="main">
        <div className="header">
          <div></div>
          <h1>Forum</h1>
          <div>
            {Object.keys(loggedInUser).length === 0 &&
            loggedInUser.constructor === Object ? (
              <h2
                onClick={() => {
                  navigate("/login");
                }}
              >
                Sign in
              </h2>
            ) : (
              <div className="loginLogoutContainer">
                <h3>Welcome back {loggedInUser.username}!</h3>
                <button onClick={logout}>logout</button>
              </div>
            )}
          </div>
        </div>

        <div className="body">
          <div className="categories">
            {allTopics.map(function (e, index) {
              return (
                <button
                  id="topic"
                  key={index}
                  value="sport"
                  onClick={() => filterByTopic(e.name)}
                >
                  {e.name}
                </button>
              );
            })}
          </div>
          <div className="items">
            <ThreadList threads={threads} filteredThreads={filteredThreads}  />
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
