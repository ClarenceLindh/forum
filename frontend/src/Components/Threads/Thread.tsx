import React from 'react';

export default function Thread({ thread }: {thread: any}) {


  return (<div>

    <div>
    {thread.title}

    </div>

    <div>
   {thread.text}


    </div>

    <br />
  </div>
  
  
  )

}
