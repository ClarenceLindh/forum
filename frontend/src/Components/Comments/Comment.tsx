import React from 'react';
import { Link } from 'react-router-dom';
import "../../Styles/Comment.scss"; 

export default function Comment({ comment }: {comment: any}) {


  return (<div  className='card'>

    <div>
   {comment.text}
    </div>    
<br />
{/* <div>
  <button><Link  className='linkButton' to={`/viewThread/${threadId}`} >Go to thread</Link></button>
</div> */}
<br />
{comment.username}
<br />
{comment.creationDate}
  </div>
  
  
  )

}
