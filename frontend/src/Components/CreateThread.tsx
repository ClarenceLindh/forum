import React, { useEffect, useState } from "react";
import "../Styles/CreateTread.scss";
//import { timeStamp } from "console";
import { formatISO } from "date-fns";

const CreateThread = (topics: any, closeCT: (arg0: boolean) => void) => {
 
  const [headL, setHeadL] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [theTopic, setTopic] = useState<string>("");
  const today = formatISO(new Date());

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const threadDetails = {
      topicId: { id: 1 },
      title: headL,
      text: content,
      creationDate: today,
    };

    try {
      const response = await fetch("/rest/thread", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(threadDetails),
      });
      console.log(response);
      //  closeCreateThread();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line no-lone-blocks
    window.location.reload();
    //{closeCT(false)}
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
            {topics.topics.map((index: any) => (
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
};

export default CreateThread;
