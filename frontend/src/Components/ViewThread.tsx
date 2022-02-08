import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Context } from "../Context/ContextProvider";
import "../Styles/Thread.scss";
import Thread from "./Threads/Thread";


function ViewThread() {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const { threadId } = useParams(); //
  var [response] = useState<any>({});
  const [post, setPost] = useState<any>({});
  const [author, setAuthor] = useState<any>({});
  const { loggedInUser, whoAmI } = useContext(Context);

  const getThreadById = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // controller url: "/rest/thread/{threadId}"
    const raw = await fetch(`/rest/thread/${threadId}`);
    const res = await raw.json();
    response = res;

    setPost(res);
    setAuthor(res.creator);

    console.log("this is response: ", response);
    console.log(res);
  };

  useEffect(() => {
    getThreadById({ preventDefault: () => {} });
  }, [threadId]);

  let deleteThreadById = async () => {
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
      alert("you canceled the delete");
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
  return (
    <div className="threadContainer">
            <br />
            <div className="threadTitle">  
                {post.title} {author.role === "ROLE_DELETED" ? (
                    <div>
                      Started by deletedUser
                    </div>
                ): (
                    <div>
                Started by {author.username}
                    </div>
                )}
            <br />
      </div>
      <div className="threadContent">{post.text}</div>
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
}

export default ViewThread;
