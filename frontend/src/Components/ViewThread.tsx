import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Styles/Thread.scss";
import Thread from "./Threads/Thread";

function ViewThread() {

    const [comment, setComment] = useState("");
    const {threadId} = useParams(); // 
    var [response] = useState<any>({});
    const [post, setPost] = useState<any>({})
 
    const getThreadById = async (e: { preventDefault: () => void; }) => {
     e.preventDefault();
    
        // controller url: "/rest/thread/{threadId}"
        const raw = await fetch(`/rest/thread/${threadId}`);
        const res = await raw.json();
        response = res;

        setPost(res);
        
        console.log('this is response: ', response);
        console.log(res);
        

      };
      
      useEffect( () => {
        getThreadById({preventDefault: () => {
            
        }});
    }, [threadId]);
          /*
          Object.keys(data).map((obj, i) => {       return (         <div>           {data[obj].name}         </div>

          */
    

    // controller url: "/rest/thread/{threadId}"
    const raw = await fetch(`/rest/thread/${threadId}`);
    const res = await raw.json();
    console.log(res);
  };

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
                </div>
            </div>
            <br />
        </div>
    )
}

export default ViewThread;
