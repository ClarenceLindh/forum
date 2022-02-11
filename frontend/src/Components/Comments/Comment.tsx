import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "../../Styles/Comment.scss";
import { format, compareAsc } from 'date-fns'


export default function Comment({ comment }: { comment: any }) {

  comment.creationDate = format(new Date(), 'yyyy/MM/dd')

  const date2 = comment.creationDate;
  console.log('Date', date2);
  console.log(format(new Date(), 'yyyy/MM/dd'))


  const date = comment.creationDate;
  let commenter = comment.commenter;
  if(!Array.isArray(commenter)) {
    commenter = [commenter];
  }
  
  console.log('COMMENT: ', comment);
  console.log('commenter', commenter);

  return (<div className='card'>

    <div>
      {comment.text}
    </div>
    <br />
    <div>
       {/* { commenter.map((username:{}, index:any)=> <p key={index}>{username}</p>) } */}
    </div>
    <br />
    {comment.creationDate}
  </div>


  )

}



