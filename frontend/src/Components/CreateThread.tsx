import React, { useState } from "react";




function CreateThread() {
	
	const [headL, setHeadL] = useState("");
	const [content, setContent] = useState("");

	const handleSubmit = () => {
		
	   alert(`headline: ${headL} content: ${content}`)
   
   }


			return (
			<div className="createThread">
				<h2>Create Thread</h2>
				<form onSubmit={handleSubmit}>
  				
    				<input className="headlineThread" type="text" value={headL} onChange={(e) => setHeadL(e.target.value)} placeholder="Headline...." />
					
					<input className="contentThread" type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write something...." />
  					
  					<input className="submitThread" type="submit" value="Submit" />
				</form>
			</div>
)        

      }


	  
export default CreateThread;
