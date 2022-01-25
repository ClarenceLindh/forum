import React, { useState } from "react";
import "../Styles/CreateTread.scss";
//import { timeStamp } from "console";
import { formatISO } from "date-fns";


const CreateThread = () =>{
  
  const topicsList = [
    { id: 1, name: "sport" },
    { id: 2, name: "music" },
    { id: 3, name: "art" },
  ];

  const [headL, setHeadL] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [theTopic, setTopic] = useState<string>("");
  const today = formatISO(new Date());
  //const time = new Time();
/*  const theDate =
    today.getFullYear() +
    "-" + "0" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    "T0" +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds() +
    ".000+00:00";
*/
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const threadDetails = {
      topicId: { id: 1},
      title: headL,
      text: content,
      creationDate: today
    };
   /* alert(
      `headline: ${headL} content: ${content} topic: ${theTopic} date: ${today}`
    );*/

    try{
      const response = await fetch( "/rest/thread", {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify( threadDetails ),
        
      });
      console.log(JSON.stringify(response));
    } catch (error) {
      console.log(error);
    }   
  
  };

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
