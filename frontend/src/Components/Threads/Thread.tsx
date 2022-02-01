import React from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import ViewThread from '../ViewThread';

export default function Thread({ thread }: {thread: any}) {

  const threadId = thread.id;

  return (<div >

    <div>
      <div>{thread.id}</div>
      <Link to={`/viewThread/${threadId}`} >
        {thread.title}
      </Link>
    </div>

    <div>
   {thread.text}


    </div>

    <br />
  </div>
  
  
  )

}
