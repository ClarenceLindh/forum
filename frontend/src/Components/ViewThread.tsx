import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatISO } from "date-fns";
import "../Styles/Thread.scss";

function ViewThread() {
    const [comment, setComment] = useState<any>({});
    const commentDate = formatISO(new Date());
    const { threadId } = useParams(); // 
    var [response] = useState<any>({});

    const [post, setPost] = useState<any>({})
    const [activateComment, setActivateComment] = React.useState(false)

    const getThreadById = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const raw = await fetch(`/rest/thread/${threadId}`);
        const res = await raw.json();
        response = res;
        setPost(res);

        console.log('this is response: ', response);
        console.log(res);


    };

    const postComment = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const commentDetails = {
            threadId: {
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
            const result = response.json();
            console.log("this is result: ", result);
            console.log("this is commentDetails: ", commentDetails)
            setComment(commentDetails);

        } catch (error) {
            return error;
        }
    }


    useEffect(() => {
        getThreadById({
            preventDefault: () => {

            }
        });
    }, [threadId]);
   

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
                <div className="commentResult">
                    <div>
                        {comment.text}
                    </div>

                </div>
                <br />
            </div>
            <br />
            <div className="threadComment">
                <h3>Comment here</h3>
                <form>
                    <textarea className="comment" onChange={(e) => setComment(e.target.value)} placeholder="Comment..." />
                    <div className="postBtn" >
                        <button onClick={postComment}>Post</button>
                    </div>
                </form>



            </div>
            <br />
        </div>
    )
}

export default ViewThread