import React, { useEffect } from "react";
import CreateThread from './CreateThread';
import '../Styles/Home.scss';


const topicsList= [{"topic":"sport"},{"topic":"music"},{"topic":"art"}];
const List= [{"hmm":"test"},{"hmm":"test"},{"hmm":"test"}];


class Home extends React.Component {

 
	render() {
		return (
			<div className="main">

                <header>
                    <div>
                    <h1>FORUM</h1>
                <h2>Sign in</h2>
                    </div>

               

                <div className="categories">
						  {topicsList.map(function(d,idx){
							  return(<div id="topic" key={idx}>{d.topic}</div>)
							 // return(<div id="topic" value={d.topic} onChange={(e) => setTopic(e.target.value)} key={idx}>{d.topic}</div>)
						  })}	 
                          
                           {List.map(function(d,idx){
							  return(<div key={idx}>{d.hmm}</div>)
							 // return(<div id="topic" value={d.topic} onChange={(e) => setTopic(e.target.value)} key={idx}>{d.topic}</div>)
						  })}
					    
                </div>
                </header>

                <body>
                
                </body>

				
 </div>
        )
        }
    }
    export default Home;
          