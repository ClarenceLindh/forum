import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Styles/Thread.scss";
import { formatISO } from "date-fns";


function ViewThread() {
    const [comment, setComment] = useState<any>({});
    const commentDate = formatISO(new Date());
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

      const postComment = async (e: {preventDefault: () => void}) => {
          e.preventDefault();

          const commentDetails = {
              commentId: {},
              date: commentDate,
              text: comment,
              creator_id: {}
          }

          try {
              const response = await fetch("/rest/thread/comment", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(commentDetails)
                })
                const result = response.json();
                console.log("this is result: ", result);
                setComment(result);

          } catch(error) {
              return error;
          }
      }

      
      useEffect( () => {
        getThreadById({preventDefault: () => {
            
        }});
    }, [threadId]);
          /*
          Object.keys(data).map((obj, i) => {       return (         <div>           {data[obj].name}         </div>

          */
    


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
            <br />
            <div className="commentView">
                <h3>Comment view</h3>
            </div>
            <br />
            <div className="threadComment">
                <h3>Comment here</h3>
                <form>
                    <textarea className="comment" onChange={(e) => setComment(e.target.value)} placeholder="Comment..." />
                    <button onClick={postComment}>Post</button>
                </form>
            
            

            </div>
            <br />
        </div>
    )
}

export default ViewThread