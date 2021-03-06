import React, { useState, useEffect, useContext } from "react";
import NotFound from "../Components/NotFound"
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Context } from "../Context/ContextProvider";
import "../Styles/Thread.scss";
import "../Styles/App.scss";
import { formatISO } from "date-fns";
import CommentList from "./Comments/CommentList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowUpFromBracket,
    faCircleMinus,
    faCirclePlus,
    faEnvelope,
    faFloppyDisk,
    faPenToSquare,
    faShare,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import Footer from "./Footer";
import { setDefaultResultOrder } from "dns";
import { setWeekYearWithOptions } from "date-fns/fp";

function ViewThread() {
    const navigate = useNavigate();
    const [comment, setComment] = useState({});
    const { threadId } = useParams(); //
    var [response] = useState<any>({});
    const [post, setPost] = useState<any>({});
    const [modId, setModId] = useState<any>("");
    const [modUsername, setModUsername] = useState<any>("");
    const [creator, setCreator] = useState<any>(false);
    const { loggedInUser, whoAmI } = useContext(Context);
    const [author, setAuthor] = useState<any>({});
    const [topic, setTopic] = useState<any>({});
    const today = formatISO(new Date());
    const [editing, setEditing] = useState<boolean>(false);
    const [editedTitle, setEditedTitle] = useState<string>();
    const [editedText, setEditedText] = useState<string>();
    const [threadModerators, setThreadModerators] = useState<any>([]);
    const [threadBans, setThreadBans] = useState<any>([]);
    const [commentUser, setCommentUser] = useState<any>({});
    const [comments, setComments] = useState([{}])
    const [filteredComments, setFilteredComments] = useState<any>([]);
    const commentDate = formatISO(new Date());
    var [response] = useState<any>({});
    const [res,setRes] = useState<any>({});
    let tuggle = false;

    const getThreadById = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        // controller url: "/rest/thread/{threadId}"
        const raw = await fetch(`/rest/thread/${threadId}`);
        const res = await raw.json();
        response = res;


        setRes(res)
        setTopic(res.topicId);
        setPost(res);
        setAuthor(res.creator);
        setEditedTitle(res.title);
        setEditedText(res.text);
        setThreadModerators(res.threadModerators);
        setThreadBans(res.threadBans)
        console.log("this is response: ", response);
        console.log(res);
    };


    useEffect(() => {
        getThreadById({ preventDefault: () => { } });
        whoAmI();
    }, [threadId]);

    const toggleComments = () => {

        setFilteredComments(
            comments.filter((comment: any) => {
                if (comment.username === undefined && tuggle === false) {
                    comments.shift();
                    tuggle = true;
                    console.log('COMMENTSSSSSSSSSSSSSSSS: ', comments)
                }
            })
        )
    }

    async function getAllComments() {
        const raw = await fetch(`/rest/thread/comments/${threadId}`);
        const res = await raw.json();
        console.log('All comments on Thread: ', res);

        const name = comment;
        console.log('THIS is Name: ', name)

        res.forEach((element: { res: any }) => {
            setComments((comments) => [...comments, element])
        });
    }

    const postComment = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const commentDetails = {
            thread: {
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
            const result = response;
            console.log("this is result: ", result);
            console.log("this is commentDetails: ", commentDetails)
            setComment(commentDetails);

        } catch (error) {
            return error;
        }

        window.location.reload();
    }

    useEffect(() => {
        getAllComments();
        toggleComments()
    }, [threadId]);

    const checkIfCreator = async () => {
        try {
            if (
                author.id !== undefined &&
                loggedInUser.id !== undefined &&
                author.id === loggedInUser.id
            ) {
                setCreator(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkIfCreator();
    }, [post, loggedInUser, comment, threadBans, threadModerators]);

    const saveEdit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (editedTitle === undefined) {
            setEditedTitle(post.title);
        }
        if (editedText === undefined) {
            setEditedText(post.text);
        }
        if (
            (editedTitle === undefined && editedText === undefined) ||
            (editedTitle === post.title && editedText === post.text)
        ) {
            setEditing(false);
        } else {
            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    topicId: {
                        id: topic.id,
                    },
                    title: editedTitle,
                    text: editedText,
                    lastEdited: today,
                }),
            };
            await fetch(`/rest/thread/${threadId}`, requestOptions)
                .then(async (response) => {
                    const data = await response.json();
                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                })
                .catch((error) => {
                    console.error("There was an error!", error);
                });
        }
        window.location.reload();
    };

    const cancelEdit = () => {
        setEditing(false);
    };

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
                window.location.reload();
            } catch (error) {
                alert("error try later");
            }
        }
    };

    let deleteThreadById = async () => {
        if (author.id == loggedInUser.id || loggedInUser.role == "ROLE_ADMIN") {
            if (
                window.confirm("are you sure you want to delete " + post.title) == true
            ) {
                try {
                    let response = await fetch(`/rest/thread/${threadId}`, {
                        method: "DELETE",
                    });
                    console.log(response.status);
                    if (response.status == 200) navigate("/");
                } catch (error) {
                    alert("error try later");
                }
            } else {
                alert("you cancled the delete");
            }
        } else {
            alert(
                "only " +
                author.username +
                " or admin is allowed to delete " +
                post.title
            );
        }
    };


    let banAccountByClick = async () => {
      const accountInfo = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blocked: true,
        }),
      }
      if (
        window.confirm("are you sure you want to ban " + author.username) ==
        true
      ) {
        try {
          await fetch(`/rest/editBan/${author.id}`, accountInfo).then(
            async (response) => {
              const data = await response.json();
            }
          );
          if (response.status == 200) navigate("/");
        } catch (error) {
          alert("error, try later");
        }
      } else {
        alert("you canceled the ban");
      }
    };

    let deleteAccountByClick = async () => {
        const accountInfo = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                deleted: true,
                date: Date.now()
            }),
        };
        if (
            window.confirm("are you sure you want to delete " + author.username) ==
            true
        ) {
            try {
                await fetch(`/rest/editDelete/${author.id}`, accountInfo).then(
                    async (response) => {
                        const data = await response.json();
                    }
                );
                if (response.status == 200) navigate("/");
            } catch (error) {
                alert("error, try later");
            }
        } else {
            alert("you canceled the delete");
        }
    };

    let blockThread = async () => {
        if (loggedInUser.role == "ROLE_ADMIN") {
            if (
                window.confirm("are your sure you want to block " + post.title) == true
            ) {
                try {
                    let response = await fetch(`/rest/thread/${threadId}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            topicId: { id: topic.id },
                            title: post.title,
                            text: post.text,
                            lastEdited: today,
                            blockedThreadStatus: true,
                        }),
                    });
                    console.log(response);
                    if (response.status == 200) navigate("/");
                } catch (error) {
                    alert("error try later");
                }
            } else {
                alert("you cancled the blocking");
            }
        } else {
            alert("only admin is allowed to block threads");
        }
    };
    let unblockThread = async () => {
        if (loggedInUser.role == "ROLE_ADMIN") {
            if (
                window.confirm("are your sure you want to unblock " + post.title) ==
                true
            ) {
                try {
                    let response = await fetch(`/rest/thread/${threadId}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            topicId: { id: topic.id },
                            title: post.title,
                            text: post.text,
                            lastEdited: today,
                            blockedThreadStatus: false,
                        }),
                    });
                    console.log(response);
                    if (response.status == 200) navigate(`/admin/blockedThreads`); //all blocked threads
                } catch (error) {
                    alert("error try later");
                }
            } else {
                alert(post.title + " is still blocked");
            }
        } else {
            alert("only admin is allowed to unblock threads");
        }
    };

    const renderModerators = () => {
        return (
            <div>
                <h3 className="modTitle">Moderators</h3>
                <ul className="modList">
                    {threadModerators.map(
                        (moderators: { id: number; username: string }) => (
                            <li key={moderators.id}>
                                {moderators.username}
                                <button
                                    className="noButtonCss"
                                    onClick={() => {
                                        if (
                                            window.confirm(
                                                `Are you sure you want to remove ` +
                                                moderators.username +
                                                " as a moderator?"
                                            )
                                        ) {
                                            removeModerator(moderators.id);
                                        }
                                    }}
                                >
                                    <FontAwesomeIcon icon={faCircleMinus} />
                                </button>
                            </li>
                        )
                    )}
                </ul>
            </div>
        );
    };

    const removeModerator = async (modId: number) => {
        console.log("deleting moderator " + modId);
        try {
            let response = await fetch(`/rest/thread/${threadId}/user/${modId}`, {
                method: "DELETE",
            });
            console.log("removeModerator response", response);
            window.location.reload();
        } catch (error) {
            alert("error try later");
        }
    };

    const fetchModerators = async () => {
        try {
            let response = await fetch(`/rest/thread/${threadId}/moderators`);
            let data = await response.json();
            console.log("fetchModerators response", response);
            console.log("fetchModerators data", data);
            setThreadModerators(data);
        } catch (error) {
            alert("error try later");
        }
    };

    if (post.blockedThreadStatus === false) {
        return (
            <div>
                <Header />
                <div className="threadContainer">
                    <div className="threadTitle">
                        {editing === true ? (
                            <div>
                                <form onSubmit={saveEdit}>
                                    <input
                                        type="text"
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                    />
                                    <button className="bigButton noButtonCss" onClick={saveEdit}>
                                        <FontAwesomeIcon icon={faFloppyDisk} />
                                    </button>
                                    <button
                                        className="bigButton noButtonCss"
                                        onClick={cancelEdit}
                                    >
                                        <FontAwesomeIcon icon={faCircleMinus} />
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <>{post.title}</>
                        )}
                        <br />
                        {author.id === loggedInUser.id ||
                        loggedInUser.role === "ROLE_ADMIN" ||
                        threadModerators.find((moderator: any) => moderator.id === loggedInUser.id) ? (
                            <Link to={`/thread/bannedusers/${threadId}`}><button>See banned users</button></Link>
                        ) : (
                            <></>
                        )
                        }
                        {author.id == loggedInUser.id ||
                            loggedInUser.role == "ROLE_ADMIN" ? (
                            <>
                                <button
                                    className="noButtonCss bigButton"
                                    onClick={() => setEditing(true)}
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                <button
                                    className="noButtonCss bigButton"
                                    onClick={deleteThreadById}
                                >
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            </>
                        ) : (
                            <></>
                        )}
                        {loggedInUser.role == "ROLE_ADMIN" ? (
                            <button onClick={blockThread}>Block</button>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="threadText">
                        {editing === true ? (
                            <div>
                                <form onSubmit={saveEdit}>
                                    <textarea
                                        className="inputText"
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                    />
                                </form>
                            </div>
                        ) : (
                            <>{post.text}</>
                        )}
                    </div>
                    {creator ? (
                        <div>
                            <form onSubmit={(e) => addModerator(e)}>
                                <input
                                    className="addModerator"
                                    type="text"
                                    placeholder="User ID"
                                    onChange={(e) => setModId(e.target.value)}
                                />
                                <button className="noButtonCss"><FontAwesomeIcon icon={faCirclePlus} /></button>
                            </form>
                            {renderModerators()}
                        </div>
                    ) : (
                        <></>)}
                    <div>
                        <div>
                            {loggedInUser.role === "ROLE_ADMIN" ? (
                                <div>
                                <div className="dropdown">
                                    <span>Settings</span>
                                    <div className="dropdown-content">
                                        <button onClick={deleteAccountByClick}>Delete Account</button>
                                        <button onClick={banAccountByClick}>Ban Account</button>
                                      
                                    </div>
                                   
                                </div>
                                   <div className="comments">
                                        <CommentList comments={comments} />
                                    </div>
                                </div>) : (
                                <div>
                                    <div className="comments">
                                        <CommentList comments={comments} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>




                            <a>{author.deleted === true ? (
                                <div>
                                    Started by deletedUser
                                </div>
                            ) : (
                                <div className="commentAuth">
                                    Started by {author.username}
                                </div>
                            )}</a>
                            <div className="threadComment">
                                <h3 className="commentTitle">Comment here</h3>
                                <textarea
                                    className="comment" onChange={(submit) => setComment(submit.target.value)} placeholder="Comment..." disabled={threadBans.find((bannedUser: any) => bannedUser.id === loggedInUser.id)}
                                />
                                <div>
                                    
                                </div>
                            </div>







                            <button onClick={postComment} className="bigButton noButtonCss">
                                <FontAwesomeIcon icon={faShare} />{" "}
                            </button>
                            <a
                                id="shareLink"
                                href={`mailto:?subject=Something for you&body=I think you would like this link https://localhoast:3000/viewThread/${threadId} `}
                            >
                                <button className="bigButton noButtonCss">
                                    <FontAwesomeIcon
                                        className="noButtonCss bigButton"
                                        icon={faEnvelope}
                                    />{" "}
                                </button>
                            </a>
                          
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    } else if (
        loggedInUser.role == "ROLE_ADMIN" &&
        post.blockedThreadStatus === true
    ) {
        return (
            <div>
                <Header />

                <div className="threadContainer">
                    <div className="threadTitle">
                        {post.title}
                        {loggedInUser.role == "ROLE_ADMIN" ? (
                            <>
                                <button
                                    className="noButtonCss bigButton"
                                    onClick={deleteThreadById}
                                >
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            </>
                        ) : (
                            <></>
                        )}
                        {loggedInUser.role == "ROLE_ADMIN" &&
                            post.blockedThreadStatus === true ? (
                            <button onClick={unblockThread}>unblock</button>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="threadContent">
                        {post.text} test
                        <a>Creator: {author.username}</a>
                    </div>
                    <div>
                        <div>
                            <button>
                                <FontAwesomeIcon icon={faShare} />
                            </button>
                            <button
                                className="noButtonCss bigButton"
                                onClick={deleteThreadById}
                            >
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>
                );
  }else if(post.blockedThreadStatus == true){
    return(
      <>
      <h1>THREAD IS BLOCKED</h1>
      <button>
      <Link className="linkButton" to={"/"}>
        CLICK ON ME TO GO HOME
       </Link>
      </button>
      </>
    )
  }else{
    return(
      <>
      {res == null ?(
        <NotFound/>
      ) : (
        <></>
      )}
     </> )
}}

export default ViewThread;