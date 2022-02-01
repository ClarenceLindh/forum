import React from 'react';
import { Link } from 'react-router-dom';
import "../../Styles/Thread.scss";

export default function Thread({ thread }: {thread: any}) {

  const threadId = thread.id;

  return (<div  className='box'>

    <div>
    <h2>{thread.title}</h2>
      <div>{thread.id}</div>
      <Link to={`/viewThread/${threadId}`} >
        {thread.title}
      </Link>
    </div>

    <div>
   {thread.text}
    </div>
<br /><br /><br /> <br />
{thread.creationDate}
  </div>
  
  
  )

}
