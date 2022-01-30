import React from 'react';

export default function Thread({ thread }: {thread: any}) {


  return (<div>

    <div>
   Title: {thread.title}

    </div>

    <div>
   Text: {thread.text}

    </div>

    <br />
  </div>
  
  
  )

}
