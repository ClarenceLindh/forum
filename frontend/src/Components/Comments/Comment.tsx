import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "../../Styles/Comment.scss";
import { format, compareAsc } from 'date-fns'

format(new Date(2014, 1, 11), 'MM/dd/yyyy')

export default function Comment({ comment }: { comment: any }) {

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
       { commenter.map((username:{}, index:any)=> <p key={index}>{username}</p>) }
    </div>
    <br />
    {comment.creationDate}
  </div>


  )

}

