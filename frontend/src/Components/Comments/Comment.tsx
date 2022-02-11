import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "../../Styles/Comment.scss";
import { format, compareAsc } from 'date-fns'

export default function Comment({ comment }: { comment: any }) {

  const [commenterName, setCommenterName] = useState<any>({});
  comment.creationDate = format(new Date(), 'yyyy/MM/dd')

  const date2 = comment.creationDate;
  console.log('Date', date2);
  // console.log(format(new Date(), 'yyyy/MM/dd'))

  const date = comment.creationDate;

  function getCommenterName() {

    let commenter = comment.commenter;
    setCommenterName(commenter);
    console.log('COMMENT Object: ', comment);
    console.log('this is commenter: ', commenter);
    console.log('this is commenterName: ', commenterName)
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
    {comment.creationDate}
  </div>

  )

}
