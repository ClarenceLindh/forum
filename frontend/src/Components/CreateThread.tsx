import React, { useEffect, useState } from "react";
import "../Styles/CreateTread.scss";
import { formatISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";

const CreateThread = (topics: any) => {
  const [headL, setHeadL] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [theTopic, setTopic] = useState<string>("");
  const today = formatISO(new Date());
  const [allTopics, setAllTopics] = React.useState<
    Array<{ id: any; name: string }>
  >([]);
  const navigate = useNavigate();

  const getTopics = async () => {
    try {
      const response = await fetch("/rest/topics/all-topics", {});
      const json = await response.json();
      setAllTopics(json);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (allTopics.length === 0) {
      getTopics();
    }
  }, [allTopics]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("handleSubmit");
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
      console.log("Response", response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    // reload the homepage after submit
    // eslint-disable-next-line no-lone-blocks
    window.location.reload();
  };

  return (
    <div className="main">
      <Header />
        <h2>Create Thread</h2>
      <div className="createThread">
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
            <select
              className="selectTopic"
              onChange={(e) => setTopic(e.target.value)}
              name=""
              id=""
            >
              {allTopics.map((index: any) => (
                <option value={index.id}>{index.name}</option>
              ))}
            </select>
          </div>
          <button
            className="bigButton noButtonCss"
            type="submit"
            value="Submit"
          >
            <FontAwesomeIcon icon={faShare} />
          </button>
        </form>
        <div id="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CreateThread;
