import React from 'react';
import "../../Styles/Thread.scss";

export default function Thread({ thread }: {thread: any}) {


  return (<div  className='box'>

    <div>
    <h2>{thread.title}</h2>
    </div>

    <div>
   {thread.text}
    </div>
<br /><br /><br /> <br />
{thread.creationDate}
  </div>
  
  
  )

}
