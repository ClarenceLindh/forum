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
    console.log('this is commenter: ', commenter);
    console.log('this is commenterName: ', commenterName)
    console.log('this is threadUsername: ', comment.thread.creator.username)
    console.log('this is ehoamin: ', loggedInUser)
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
    {  comment.thread.creator.username===loggedInUser.username || loggedInUser.username===commenterName.username || loggedInUser.role==="USER_ADMIN" ? (
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
