import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../Context/ContextProvider";
import "../Styles/Thread.scss";
import Thread from "./Threads/Thread";

function ViewThread() {
    const { loggedInUser, whoAmI } = useContext(Context)

    const [comment, setComment] = useState("");
    const { threadId } = useParams(); // 
    const [post, setPost] = useState<any>({})
    const [creator, setCreator] = useState<any>({})

    const getThreadById = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // controller url: "/rest/thread/{threadId}"
        const raw = await fetch(`/rest/thread/${threadId}`);
        const res = await raw.json();

        setPost(res);
        setCreator(res.creatorUserId)
        console.log(res);


    };

    useEffect(() => {
        getThreadById({
            preventDefault: () => {
            }
        })
        whoAmI()
    }, [threadId]);
    /*
    Object.keys(data).map((obj, i) => {       return (         <div>           {data[obj].name}         </div>

    */


    return (
        <div className="threadContainer">
            <br />
            <div className="threadTitle">
                {loggedInUser.id === creator.id ? (
                    <div>
                        {post.title} <button>edit</button>
                        <h1>EDIT</h1>
                    </div>
                ) : (
                    <>
                        {post.title}
                    </>
                )
                }

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
