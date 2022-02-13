import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "../../Styles/Comment.scss";
import { format, compareAsc } from 'date-fns'
import { Context } from '../../Context/ContextProvider';

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
    {  comment.thread.creator.username===loggedInUser.username || loggedInUser.username===commenterName.username || loggedInUser.role==="USER_ADMIN" || (comment.thread.threadModerators.find((mod:any)=>mod.id===loggedInUser.id)) ? (
        <h2>
         ❌
        </h2>
    ):(
      <h1>dont work</h1>
    )
      }
      
    </div>
    {comment.creationDate}
  </div>

  )

}
