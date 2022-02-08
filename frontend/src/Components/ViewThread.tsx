import React, { useContext, useState, useEffect } from "react";
import { Context } from "../Context/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../Styles/Thread.scss";
import { formatISO } from "date-fns";

function ViewThread() {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const { threadId } = useParams(); //
  var [response] = useState<any>({});
  const [post, setPost] = useState<any>({});
  const [modId, setModId] = useState<any>("");
  const [modUsername, setModUsername] = useState<any>("");
  const [creator, setCreator] = useState<any>(false);
  const { loggedInUser, whoAmI } = useContext(Context);
  const [author, setAuthor] = useState<any>({});
  const [topic, setTopic] = useState<any>({});
  const today = formatISO(new Date());

  const getThreadById = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // controller url: "/rest/thread/{threadId}"
    const raw = await fetch(`/rest/thread/${threadId}`);
    const res = await raw.json();
    response = res;

    setTopic(res.topicId);
    setPost(res);
    setAuthor(res.creator);
    console.log("this is response: ", response);
    console.log(res);
  };

  useEffect(() => {
    getThreadById({ preventDefault: () => {} });
  }, [threadId]);

  const checkIfCreator = async () => {
    try {
      if (
        post.creator.id !== undefined &&
        loggedInUser.id !== undefined &&
        post.creator.id === loggedInUser.id
      ) {
        setCreator(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfCreator();
  }, [post]);

  const addModerator = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (
      window.confirm(
        `Are you sure you want to add ` + modId + " as a moderator?"
      )
    ) {
      try {
        console.log(modId);
        let response = await fetch(`/rest/thread/${threadId}/user/${modId}`, {
          method: "POST",
        });
        console.log("addModerator response", response);
      } catch (error) {
        alert("error try later");
      }
    }
  };

  let deleteThreadById = async () => {
    if (author.id == loggedInUser.id) {
      if (
        window.confirm("are you sure you want to delete " + post.title) == true
      ) {
        try {
          let response = await fetch(`/rest/thread/${threadId}`, {
            method: "DELETE",
          });
          console.log(response.status);
          if (response.status == 200) navigate("/");
        } catch (error) {
          alert("error try later");
        }
      } else {
        alert("you cancled the delete");
      }
    } else {
      alert(
        "only " +
          author.username +
          " or admin is allowed to delete " +
          post.title
      );
    }
  };

  let blockThread = async () => {
    if (loggedInUser.role == "ROLE_ADMIN") {
      if (
        window.confirm("are your sure you want to block " + post.title) == true
      ) {
        try {
          let response = await fetch(`/rest/thread/${threadId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              topicId: { id: topic.id },
              title: post.title,
              text: post.text,
              lastEdited: today,
              blockedThreadStatus: true,
            }),
          });
          console.log(response);
          if (response.status == 200) navigate("/");
        } catch (error) {
          alert("error try later");
        }
      } else {
        alert("you cancled the blocking");
      }
    } else {
      alert("only admin is allowed to block threads");
    }
  };

  if (post.blockedThreadStatus === false) {
    return (
      <div className="threadContainer">
        <br />
        <div className="threadTitle">
          {post.title}
          <br />
          {author.id == loggedInUser.id ? (
            <button onClick={deleteThreadById}>Delete</button>
          ) : (
            <></>
          )}
          {loggedInUser.role == "ROLE_ADMIN" ? (
            <button onClick={blockThread}>Block</button>
          ) : (
            <></>
          )}
        </div>
        <div className="threadContent">{post.text}</div>
        {creator ? (
          <form onSubmit={(e) => addModerator(e)}>
            <input
              type="text"
              placeholder="User ID"
              onChange={(e) => setModId(e.target.value)}
            />
            <button>Add Moderator</button>
          </form>
        ) : null}
        <a>creator: {author.username}</a>
        <div className="threadComment">
          <h3>Comment here</h3>
          <textarea
            className="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comment..."
          />
          <div>
            <button>Post</button>
          </div>
        </div>
        <br />
      </div>
    );
  } else if (
    loggedInUser.role == "ROLE_ADMIN" &&
    post.blockedThreadStatus === true
  ) {
    return (
      <div className="threadContainer">
        <br />
        <div className="threadTitle">
          {post.title}
          <br />
          {author.id == loggedInUser.id ? (
            <button onClick={deleteThreadById}>Delete</button>
          ) : (
            <></>
          )}
          {loggedInUser.role == "ROLE_ADMIN" &&
          post.blockedThreadStatus === true ? (
            <button onClick={blockThread}>unblock</button> //unblock thread work on it
          ) : (
            <></>
          )}
        </div>
        <div className="threadContent">{post.text}</div>
        <a>creator: {author.username}</a>
        <div className="threadComment">
          <h3>Comment here</h3>
          <textarea
            className="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comment..."
          />
          <div>
            <button>Post</button>
          </div>
        </div>
        <br />
      </div>
    );
  } else if (post.blockedThreadStatus === true) {
    return (
      <>
        <h1>THREAD IS BLOCKED</h1>
        <button>
          <Link className="linkButton" to={"/"}>
            CLICK ON ME TO GO HOME
          </Link>
        </button>
      </>
    );
  } else {
    return (
      <>
        <h1>PAGE DOESNT EXIT 404 ERROR</h1>
        <button>
          <Link className="linkButton" to={"/"}>
            CLICK ON ME TO GO HOME
          </Link>
        </button>
      </>
    );
  }
}

export default ViewThread;
