import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "../../Styles/Comment.scss";
import { format, compareAsc } from 'date-fns'
import { Context } from '../../Context/ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function Comment({ comment }: { comment: any }) {

  const { loggedInUser, whoAmI } = useContext(Context);

  const [commenterName, setCommenterName] = useState<any>({});
  comment.creationDate = format(new Date(), 'yyyy/MM/dd')

  const date2 = comment.creationDate;
  console.log('Date', date2);

  const date = comment.creationDate;

  function getCommenterName() {

    let commenter = comment.commenter;
    setCommenterName(commenter);
    console.log('COMMENT Object: ', comment);
    console.log("this should be mods", comment.thread.threadModerators)
  }

  let deleteCommentById = async () => {
    
        if (
            window.confirm("are you sure you want to delete the comment?") == true
        ) {
            try {
                let response = await fetch(`/rest/comment/${comment.id}`, {
                    method: "DELETE",
                });
                console.log(response.status);
                window.location.reload();
                
            } catch (error) {
                alert("Something went wrong try again");
            }
        } else {
            alert("Comment was not deleted");
        }
    
};

  useEffect(() => {
    getCommenterName();
  }, []);

  return (<div className='card'>

    <div>
      {comment.text}
    </div>
    <br />
    <div>
      {commenterName.username}
    </div>
    <br />
    <div>
      {/*threadcreator=använder / comment=användare/  Admin/ threadmoderator.name== loggedinuser&& threadmoderator id == threadid */}
    {  comment.thread.creator.username===loggedInUser.username || loggedInUser.username===commenterName.username || loggedInUser.role==="ROLE_ADMIN" || (comment.thread.threadModerators.find((mod:any)=>mod.id===loggedInUser.id)) ? (
          <button
          className="noButtonCss bigButton"
          onClick={deleteCommentById}
      >
          <FontAwesomeIcon icon={faTrashCan} />
      </button>
    ):(
      <></>
    )
      }
      
    </div>
    {comment.creationDate}
  </div>

  )

}
