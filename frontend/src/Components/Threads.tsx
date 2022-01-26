import React from 'react';

export default function Threads({ threadList }: {threadList: string[]}) {


    const topicsList = [{ topic: "sport" }, { topic: "music" }, { topic: "art" }];
    // const List = [{ hmm: "test" }, { hmm: "test" }, { hmm: "test" }];

  return (
  
  <div>



        
        <header>
        

          <div className="categories">
            {topicsList.map(function (e) {
              return <div id="topic">{e.topic}</div>;
            })}
          </div>
        </header>



        <body>
            {threadList}
          {/* <div className="items">
            {List.map(function (e) {
              return <div className="textItems">{e.hmm}</div>;
            })}
          </div> */}
        </body>


      </div>
    );
}
