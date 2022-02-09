import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatISO } from "date-fns";
import "../Styles/Thread.scss";
import CommentList from "./Comments/CommentList";

function ViewThread() {
    const [commentUser, setCommentUser] = useState<any>({});
    const [comments, setComments] = useState([{}])
    const [comment, setComment] = useState<any>({});
    const commentDate = formatISO(new Date());
    const { threadId } = useParams(); // 
    var [response] = useState<any>({});

    const [post, setPost] = useState<any>({})
    // const [activateComment, setActivateComment] = React.useState(false)

    const getThreadById = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const raw = await fetch(`/rest/thread/${threadId}`);
        const res = await raw.json();
        response = res;
        setPost(res);

        console.log('this is response: ', response);
        console.log(res);
    };

    // /rest/threads/all-comments
    async function getAllComments() {
        const raw = await fetch(`/rest/thread/comments/${threadId}`);
        const res = await raw.json();
        console.log('All comments on Thread: ', res);

        res.forEach((element: {res: any}) => {
            setComments((comments) => [...comments, element]);
          });
      
          console.log('getAllComments?', res);
        }


    const postComment = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const commentDetails = {
            threadId: {
                id: threadId
            },
            text: comment,
            username: commentUser,
            creationDate: commentDate
        }

        try {
            const response = await fetch("/rest/thread/comment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(commentDetails)
            })
            const result = response.json();
            console.log("this is result: ", result);
            console.log("this is commentDetails: ", commentDetails)
            setComment(commentDetails);

        } catch (error) {
            return error;
        }

        window.location.reload();
    }

    const whoAmI = async () => {
        console.log('WE ARE HERE')
        let response = await fetch("/auth/whoami", {
          method: "get",
          headers: { "Content-Type": "application/json" },
          mode: "no-cors", //  <3
        }).then(response => response.json())
        .then(response => { 
         const userComment = response.username
          console.log("User that commented: ", userComment);
          setCommentUser(userComment);
        })
      }


    useEffect(() => {
        getThreadById({
            preventDefault: () => {

            }
        });
    }, [threadId]);

    useEffect(() => {
        whoAmI();
    }, [])

    useEffect(() => {
        getAllComments();
    }, [threadId]);
    

    return (
        <div className="threadContainer">
            <div className="threadTitle">
                {post.title}
                <br />
            </div>
            <div className="threadContent">
                {post.text}
            </div>
            <br />

            <div className="comments">
                <CommentList comments={comments} />
                <h3>Comment here</h3>
                <form>
                    <textarea className="comment" onChange={(e) => setComment(e.target.value)} placeholder="Comment..." />
                    <div className="postBtn" >
                        <button onClick={postComment}>Post</button>
                    </div>
                </form>
            </div>
                <br />
            <br />
            
            <br />
        </div>
    )
}

export default ViewThread