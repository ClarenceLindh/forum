import React, { useState, useEffect, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Context } from "../Context/ContextProvider";
import "../Styles/Thread.scss";
import { formatISO } from "date-fns";
import CommentList from "./Comments/CommentList";


function ViewThread() {
  const navigate = useNavigate();
  const [comment, setComment] = useState({});
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
  const [editing, setEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>();
  const [editedText, setEditedText] = useState<string>();
  const [threadModerators, setThreadModerators] = useState<any>([]);
  const [commentUser, setCommentUser] = useState<any>({});
  const [comments, setComments] = useState([{}])
  const [filteredComments, setFilteredComments] = useState<any>([]);
  const commentDate = formatISO(new Date());
  var [response] = useState<any>({});
  let tuggle = false;


  const getThreadById = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // controller url: "/rest/thread/{threadId}"
    const raw = await fetch(`/rest/thread/${threadId}`);
    const res = await raw.json();
    response = res;

    setTopic(res.topicId);
    setPost(res);
    setAuthor(res.creator);
    setEditedTitle(res.title);
    setEditedText(res.text);
    setThreadModerators(res.threadModerators)
    console.log("this is response: ", response);
    console.log(res);
  };

  useEffect(() => {
    getThreadById({ preventDefault: () => {} });
    whoAmI();
  }, [threadId]);

  const toggleComments = () => {

    setFilteredComments(
        comments.filter((comment: any) => {
            if (comment.username === undefined && tuggle === false) {
                comments.shift();
                tuggle = true;
                console.log('COMMENTSSSSSSSSSSSSSSSS: ', comments)
            }
        })
    )
}

async function getAllComments() {
    const raw = await fetch(`/rest/thread/comments/${threadId}`);
    const res = await raw.json();
    console.log('All comments on Thread: ', res);

    const name = comment;
    console.log('THIS is Name: ', name)

    res.forEach((element: { res: any }) => {
        setComments((comments) => [...comments, element])
    });
}

const postComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const commentDetails = {
        thread: {
            id: threadId
        },
        text: comment,
        creationDate: commentDate
    }

    try {
        const response = await fetch("/rest/thread/comment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(commentDetails)
        })
        const result = response;
        console.log("this is result: ", result);
        console.log("this is commentDetails: ", commentDetails)
        setComment(commentDetails);

    } catch (error) {
        return error;
    }

    window.location.reload();
}

useEffect(() => {
    getAllComments();
}, [threadId]);

useEffect(() => {
    toggleComments()
}, [threadId])



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

  const saveEdit = async () => {
    if (editedTitle === undefined) {
      setEditedTitle(post.title);
    }
    if (editedText === undefined) {
      setEditedText(post.text);
    }
    if (
      (editedTitle === undefined && editedText === undefined) ||
      (editedTitle === post.title && editedText === post.text)
    ) {
      setEditing(false);
    } else {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId: {
            id: topic.id,
          },
          title: editedTitle,
          text: editedText,
          lastEdited: today,
        }),
      };
      await fetch(`/rest/thread/${threadId}`, requestOptions)
        .then(async (response) => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  };

  const cancelEdit = () => {
    setEditing(false);
  };

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
        window.location.reload();
      } catch (error) {
        alert("error try later");
      }
    }
  };

  let deleteThreadById = async () => {
    if (author.id == loggedInUser.id || loggedInUser.role == "ROLE_ADMIN") {
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
    
    let deleteAccountByClick = async () => {
    const accountInfo = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: "ROLE_DELETED",
      }),
    };
    if (
      window.confirm("are you sure you want to delete " + author.username) ==
      true
    ) {
      try {
        await fetch(`/rest/users/${author.id}`, accountInfo).then(
          async (response) => {
            const data = await response.json();
          }
        );
        if (response.status == 200) navigate("/");
      } catch (error) {
        alert("error, try later");
      }
    } else {
      alert("you canceled the delete");
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
  let unblockThread = async () => {
    if (loggedInUser.role == "ROLE_ADMIN") {
      if (
        window.confirm("are your sure you want to unblock " + post.title) == true
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
              blockedThreadStatus: false,
            }),
          });
          console.log(response);
          if (response.status == 200) navigate(`/admin/blockedThreads`); //all blocked threads
        } catch (error) {
          alert("error try later");
        }
      } else {
        alert(post.title + " is still blocked");
      }
    } else {
      alert("only admin is allowed to unblock threads");
    }
  };

  const renderModerators = () => {
    return (
      <div>
        <h3>Moderators</h3>
        <ul>
          {threadModerators.map(
            (moderators: { id: number; username: string }) => (
              <li key={moderators.id}>
                {moderators.username}
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        `Are you sure you want to remove ` +
                          moderators.username +
                          " as a moderator?"
                      )
                    ) {
                      removeModerator(moderators.id);
                    }
                  }}
                >
                  Delete
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    );
  };

  const removeModerator = async (modId: number) => {
    console.log("deleting moderator " + modId);
    try {
      let response = await fetch(`/rest/thread/${threadId}/user/${modId}`, {
        method: "DELETE",
      });
      console.log("removeModerator response", response);
      window.location.reload();
    } catch (error) {
      alert("error try later");
    }
  };

  const fetchModerators = async () => {
    try {

      let response = await fetch(`/rest/thread/${threadId}/moderators`);
      let data = await response.json();
      console.log("fetchModerators response", response);
      console.log("fetchModerators data", data);
      setThreadModerators(data);
    } catch (error) {
      alert("error try later");
    }
  };


  if (post.blockedThreadStatus === false) {
    return (
      <div className="threadContainer">
        <br />
        <div className="threadTitle">
          {editing === true ? (
            <div>
              <form onSubmit={saveEdit}>
                <input
                  className="threadTitle"
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </form>
            </div>
          ) : (
            <>{post.title}</>
          )}
          <br />
          {author.id == loggedInUser.id || loggedInUser.role == "ROLE_ADMIN" ? (
            <>
              <button onClick={() => setEditing(true)}>Edit</button>
              <button onClick={deleteThreadById}>Delete</button>
            </>
          ) : (
            <></>
          )}
          {loggedInUser.role == "ROLE_ADMIN" ? (
            <button onClick={blockThread}>Block</button>
          ) : (
            <></>
          )}
        </div>
        <div className="threadContent">
          {editing === true ? (
            <div>
              <form onSubmit={saveEdit}>
                <textarea
                  className="threadContent"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
              </form>
            </div>
          ) : (
            <>{post.text}</>
          )}
        </div>
        {creator ? (
          <div>
            <form onSubmit={(e) => addModerator(e)}>
              <input
                type="text"
                placeholder="User ID"
                onChange={(e) => setModId(e.target.value)}
              />
            </form>
            {renderModerators()}
          </div>
        ) : null}
        <a>{author.role === "ROLE_DELETED" ? (
                    <div>
                      Started by deletedUser
                    </div>
                ): (
                    <div>
                Started by {author.username}
                    </div>
                )}</a>
        <div className="threadComment">
          <h3>Comment here</h3>
          <textarea
            className="comment" onChange={(submit) => setComment(submit.target.value)} placeholder="Comment..."
          />
          <div>
            <button onClick={postComment}>Post</button>
            {loggedInUser.role === "ROLE_ADMIN" ? (
          <div className="dropdown">
            <span>Settings</span>
            <div className="dropdown-content">
              <button onClick={deleteAccountByClick}>Delete Account</button>
            </div>
          </div>):(
            <div>
                <div className="comments">
                {/* <button onClick={toggleComments}></button> */}
                {console.log('IN DIV: ', comments)}
                <CommentList comments={comments} />
            </div>
            </div>
          )} 
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
          {loggedInUser.role == "ROLE_ADMIN" ? (
            <>
              <button onClick={deleteThreadById}>Delete</button>
            </>
          ) : (
            <></>
          )}
          {loggedInUser.role == "ROLE_ADMIN" &&
          post.blockedThreadStatus === true ? (
            <button onClick={unblockThread}>unblock</button>
          ) : (
            <></>
          )}
        </div>
        <div className="threadContent">{post.text}</div>
        <a>creator: {author.username}</a>
        <div className="threadComment">
          <h3>Comment here</h3>
        <div className="threadContainer">
            <div className="threadTitle">
                {post.title}
                <br />
            </div>
            <div className="threadContent">
                {post.text}
            </div>
            <br />
            <br />
            <br />

            <br />
        </div>
    

          {/* <textarea
            className="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comment..."
          /> */}
          <div>
            <button>Post</button>
            <button onClick={deleteThreadById}>Delete</button>
          {loggedInUser.role === "ROLE_ADMIN" ? (
          <div className="dropdown">
            <span>Settings</span>
            <div className="dropdown-content">
              <button onClick={deleteAccountByClick}>Delete Account</button>
            </div>
          </div>):(
            <div></div>
          )} 
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
