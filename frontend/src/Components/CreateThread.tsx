import React, { useState } from "react";
import axios from "axios";
import "../Styles/CreateTread.scss";
import { timeStamp } from "console";

function CreateThread() {
  const baseURL = "http://localhost:8080";

  /*const{
		user,
		topics

	}=props;*/

  const [headL, setHeadL] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [theTopic, setTopic] = useState<string>("");
  const today = new Date();
  //const time = new Time();
  const theDate =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    "T" +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds() +
    ".000+00:00";

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const threadDetails = {
      topicId: { id: 1 },
      title: headL,
      text: content,
      //creationDate: "2022-01-24T09:02:15.000+00:00",
      creationDate: theDate
    };
    alert(
      `headline: ${headL} content: ${content} topic: ${theTopic} date: ${theDate}`
    );

    
		 axios.post(baseURL + "/rest/thread", {
			 method: "POST",
			 headers: { "Content-Type": "application/json" },
			 body: JSON.stringify(threadDetails),
			 }).catch(error => console.log('Request failed:', error));

			 console.log(JSON.stringify(threadDetails));
			
	   
  
  };

  const topicsList = [
    { id: 1, name: "sport" },
    { id: 2, name: "music" },
    { id: 3, name: "art" },
  ];

  return (
    <div className="createThread">
      <h2>Create Thread</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="headlineThread"
          type="text"
          value={headL}
          onChange={(e) => setHeadL(e.target.value)}
          placeholder="Headline...."
        />

        <textarea
          className="contentThread"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write something...."
        />

        <div className="topicList">
          <select onChange={(e) => setTopic(e.target.value)} name="" id="">
            {topicsList.map((index) => (
              <option value={index.id}>{index.name}</option>
            ))}
          </select>
        </div>
        <div className="submit">
          <input className="submitThread" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default CreateThread;
