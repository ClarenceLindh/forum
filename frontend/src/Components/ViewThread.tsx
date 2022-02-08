import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Context/ContextProvider";
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
  const [modId, setModId] = useState<any>("");
  const [modUsername, setModUsername] = useState<any>("");
  const [creator, setCreator] = useState<any>(false);
    const { loggedInUser, whoAmI } = useContext(Context);
    const [author, setAuthor] = useState<any>({})
    const getThreadById = async (e: { preventDefault: () => void; }) => {
     e.preventDefault();
    
        // controller url: "/rest/thread/{threadId}"
        const raw = await fetch(`/rest/thread/${threadId}`);
        const res = await raw.json();
        response = res;

        setPost(res);
        setAuthor(res.creatorUserId);
        console.log('this is response: ', response);
        console.log(res);

      };
      useEffect( () => {
        getThreadById({preventDefault: () => {
        }});
    }, [threadId]);
    let deleteThreadById = async ()=> {
       if(author.id == loggedInUser.id) 
       { if (window.confirm("are you sure you want to delete " + post.title ) == true){
        try{
            let response = await fetch(`/rest/thread/${threadId}`, {method: 'DELETE'})
            console.log(response.status)
            if(response.status == 200) navigate("/")
        }catch(error){
            alert("error try later")
        }}else{
            alert("you cancled the delete")
        }
    }else{
        alert("only " + author.username + " or admin is allowed to delete " + post.title)
    }
      }
  const checkIfCreator = async () => {
    try {
      if (
        post.creatorUserId.id !== undefined &&
        loggedInUser.id !== undefined &&
        post.creatorUserId.id === loggedInUser.id
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
                    )
                }     
            </div>
      <div className="threadContent">{post.text}</div>
        {creator ? (
          <form onSubmit={(e) => addModerator(e)}>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setModId(e.target.value)}
            />
            <button>Add Moderator</button>
          </form>
        ) : null}
            <a>creator: {author.username}</a>
            <div className="threadComment">
                <h3>Comment here</h3>
                <textarea className="comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comment..." />
                <div>
                    <button>Post</button>
                    
        </div>
      </div>
      <br />
    </div>
  );
}


export default ViewThread;
