import { formatISO } from "date-fns";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../Context/ContextProvider";
import "../Styles/Thread.scss";

function ViewThread(topics: any) {
    const { loggedInUser, whoAmI } = useContext(Context)

    const today = formatISO(new Date());
    const [comment, setComment] = useState("");
    const { threadId } = useParams(); // 
    const [post, setPost] = useState<any>({})
    const [creator, setCreator] = useState<any>({})
    const [editing, setEditing] = useState<boolean>(false)
    const [editedTitle, setEditedTitle] = useState<string>(post.title)
    const [editedText, setEditedText] = useState<string>(post.text)
    const [topic, setTopic] = useState<any>({})

    const getThreadById = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // controller url: "/rest/thread/{threadId}"
        const raw = await fetch(`/rest/thread/${threadId}`);
        const res = await raw.json();

        setPost(res);
        setCreator(res.creatorUserId)
        setTopic(res.topicId)
        console.log(res);
    }

    const saveEdit = async () => {
        if (editedTitle === undefined) {
            setEditedTitle(post.title)
        }
        if (editedText === undefined) {
            setEditedText(post.text)
        }
        if ((editedTitle === undefined && editedText === undefined) || (editedTitle === post.title && editedText === post.text)) {
            setEditing(false)
        } else {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topicId: {
                        id: topic.id
                    },
                    title: editedTitle,
                    text: editedText,
                    lastEdited: today
                })
            };
            await fetch(`/rest/thread/${threadId}`, requestOptions)
                .then(async response => {
                    const data = await response.json();

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    }

    const cancelEdit = () => {
        setEditing(false)
    }

    const checkStates = () => {
        console.log(editedTitle);
        console.log(editedText);
    }

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

    if (editing === false) {
        return (
            <div className="threadContainer">
                <br />
                <div className="threadTitle">
                    {loggedInUser.id === creator.id ? (
                        <div>
                            {post.title} <button onClick={() => setEditing(true)}>edit</button>
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
    } else {
        return (
            <div className="threadContainer">
                <br />
                <button onClick={checkStates}>TESt</button>

                <form onSubmit={saveEdit}>
                    <div className="threadTitle">
                        <input
                            className="threadTitle"
                            type="text"
                            defaultValue={post.title}
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />
                        <button onClick={saveEdit}>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                        <br />
                    </div>
                    <div className="threadContent">
                        <textarea
                            className="threadContent"
                            defaultValue={post.text}
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                        />
                    </div>
                </form>

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
}

export default ViewThread;
