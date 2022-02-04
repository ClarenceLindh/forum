import React, {useContext, useState, useEffect } from "react";
import { Context } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../Styles/Thread.scss";
import Thread from "./Threads/Thread";

function ViewThread() {
    
    const { loggedInUser, whoAmI } = useContext(Context);
    const navigate = useNavigate();
    const [comment, setComment] = useState("");
    const {threadId} = useParams(); // 
    var [response] = useState<any>({});
    const [post, setPost] = useState<any>({})
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
        
    return (
        <div className="threadContainer">
            <br />
            <div className="threadTitle">  
                {post.title}
            <br />
            </div>
            <div className="threadContent">
                {post.text}                       
            </div>
            <div className="threadComment">
                <h3>Comment here</h3>
                <textarea className="comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comment..." />
                <div>
                    <button>Post</button>
                    {author.id == loggedInUser.id ? (      
                    <button onClick={deleteThreadById}>Delete</button>
                    ) : (
                        <></>
                    )
                }     
                    
                </div>
            </div>
            <br />
        </div>
    )
}


export default ViewThread;
