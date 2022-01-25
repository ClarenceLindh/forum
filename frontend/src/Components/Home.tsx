import React, { useEffect } from "react";
import CreateThread from "./CreateThread";
import "../Styles/Home.scss";

const topicsList = [{ topic: "sport" }, { topic: "music" }, { topic: "art" }];
const List = [{ hmm: "test" }, { hmm: "test" }, { hmm: "test" }];

class Home extends React.Component {
  render() {
    return (
      <div className="main">
        <header>
          <div className="header">
              <div></div>
            <h1>FORUM</h1>
            <h2>Sign in</h2>
          </div>

          <div className="categories">
            {topicsList.map(function (e) {
              return <div id="topic">{e.topic}</div>;
            })}
          </div>
        </header>



        <body>
          <div className="items">
            {List.map(function (e) {
              return <div className="textItems">{e.hmm}</div>;
            })}
          </div>
        </body>


      </div>
    );
  }
}
export default Home;
