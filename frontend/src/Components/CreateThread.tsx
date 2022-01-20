import React, { useState } from "react";
import axios from "axios";
import "../Styles/CreateTread.scss";



function CreateThread() {
	const baseURL = "http://localhost:8080";
	
	/*const{
		user,
		topics

	}=props;*/
	
	const [headL, setHeadL] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [theTopic, setTopic] = useState<string>("");

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		 e.preventDefault();
		 const threadDetails = {
			 "creatorUserId" : "1",
			 "title": headL,
			 "text" : content,
			 "topicId" : theTopic
		 }
		 alert(`headline: ${headL} content: ${content} topic: ${theTopic} `)
		
/*
		 axios.post(baseURL + "rest/thread", {
			 method: "POST",
			 headers: { "Content-Type": "application/json" },
			 body: JSON.stringify(threadDetails),
			 });

			 console.log(JSON.stringify(threadDetails));
			};
	   
   */
		}
  
	
   const topicsList= [{value:"sport"},{value:"music"},{value:"art"}];

 

			return (
			<div className="createThread" >
				<h2>Create Thread</h2>
				<form onSubmit={handleSubmit}>
  				
    				<input className="headlineThread" type="text" value={headL} onChange={(e) => setHeadL(e.target.value)} placeholder="Headline...." />
					
					<textarea className="contentThread" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write something...." />
  					<div className="topicList">
						  <select onChange={(e) => setTopic(e.target.value)} name="" id="">
							  {topicsList.map((option) =>(
						  <option value={option.value} >{option.value}</option>
						))}
						</select>
		
					  </div>
  					<div  className="submit"><input className="submitThread" type="submit" value="Submit" /></div>
				</form>
			</div>
)   ;     

							  
};     


	  
export default CreateThread;