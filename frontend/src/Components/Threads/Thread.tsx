import React from 'react';
import { Link } from 'react-router-dom';
import "../../Styles/Thread.scss";

export default function Thread({ thread }: {thread: any}) {

  const threadId = thread.id;

  return (<div  className='box'>

    <div>
    <h2>{thread.title}</h2>
    </div>

    <div>
   {thread.text}
    </div>    
<br />
<div>
  <button><Link  className='linkButton' to={`/viewThread/${threadId}`} >Go to thread</Link></button>
</div>
<br /><br /> <br />
{thread.creationDate}
  </div>
  
  
  )

}
