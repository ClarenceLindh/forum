import React, { useState } from "react";
import { useParams } from "react-router";

function ViewThread() {
    const [comment, setComment] = useState("");
    const {threadId} = useParams();

    const getThreadById = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
    
        // controller url: "/rest/thread/{threadId}"
        const res = await fetch(`/rest/thread/${threadId}`, {});
        console.log(res);
      };


    return (
        <div className="threadContainer">
            <h1>View thread by ID</h1>
            <div className="threadTitle">
                <h1>THREAD TITLE</h1>
            </div>
            <div className="threadContent">
                <h3>CONTENT</h3>
                <form>
                    <button onClick={getThreadById}>Get Thread</button>
                </form>
            </div>
            <div className="threadComment">
                <h3>Comment here</h3>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comment..." />
            </div>
        </div>
    )
}

export default ViewThread