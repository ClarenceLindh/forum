import React from 'react';
import Thread from './Thread';


export default function ThreadList({threads}:{threads:any}) {




  return (

  threads.map((thread: { id: React.Key | null | undefined; })=>{
    return <Thread key={thread.id} thread={thread}/>
  })
    
    )
}
