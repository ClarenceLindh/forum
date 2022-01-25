import React, { useState } from "react";

function ViewThread() {
    const [comment, setComment] = useState("");


    return (
        <div className="threadContainer">
            <h1>View thread by ID</h1>
            <div className="threadTitle">
                <h1>THREAD TITLE</h1>
            </div>
            <div className="threadContent">
                <h3>CONTENT</h3>
            </div>
            <div className="threadComment">
                <h3>Comment here</h3>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comment..." />
            </div>
        </div>
    )
}

export default ViewThread