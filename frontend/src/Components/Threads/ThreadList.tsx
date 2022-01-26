import React from 'react';
import Thread from './Thread';


export default function ThreadList({ threadList }: {threadList: any[]}) {


    const topicsList = [{ topic: "sport" }, { topic: "music" }, { topic: "art" }];
    // const List = [{ hmm: "test" }, { hmm: "test" }, { hmm: "test" }];

  return (
    threadList.map(thread=>{
      return<Thread key={thread.id} thread={thread}/>
    })
  // <div>



        
  //       <header>
        

  //         <div className="categories">
  //           {topicsList.map(function (e) {
  //             return <div id="topic">{e.topic}</div>;
  //           })}
  //         </div>
  //       </header>



  //       <body>
  //         <div className='items'>
         
  //         </div>
           
  //         {/* <div className="items">
  //           {List.map(function (e) {
  //             return <div className="textItems">{e.hmm}</div>;
  //           })}
  //         </div> */}
  //       </body>


  //     </div>
     );
}
