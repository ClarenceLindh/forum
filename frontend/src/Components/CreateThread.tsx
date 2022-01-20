import React, { useState } from "react";




function CreateThread() {
	
	const [headL, setHeadL] = useState("");
	const [content, setContent] = useState("");
	const [theTopic, setTopic] = useState("");

	const handleSubmit = () => {
		
	   alert(`headline: ${headL} content: ${content} topic: ${theTopic} `)
   
   }
   const topicsList= [{"topic":"sport"},{"topic":"music"},{"topic":"art"}];

   const pickTopic = () =>{
	//document.getElementById("createThread").style.borderColor = "lightblue";
	alert(`headline: ${theTopic} `)
	
} 

			return (
			<div className="createThread" >
				<h2>Create Thread</h2>
				<form onSubmit={handleSubmit}>
  				
    				<input className="headlineThread" type="text" value={headL} onChange={(e) => setHeadL(e.target.value)} placeholder="Headline...." />
					
					<textarea className="contentThread" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write something...." />
  					<div className="topicList">
						  {topicsList.map(function(d,idx){
							  return(<div id="topic" key={idx}>{d.topic}</div>)
							 // return(<div id="topic" value={d.topic} onChange={(e) => setTopic(e.target.value)} key={idx}>{d.topic}</div>)
						  })}
					  </div>
  					<div className="submit"><input className="submitThread" type="submit" value="Submit" /></div>
				</form>
			</div>
)        

      }


	  
export default CreateThread;
