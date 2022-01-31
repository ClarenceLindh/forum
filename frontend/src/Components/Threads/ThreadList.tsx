import React from 'react';
import Thread from './Thread';


export default function ThreadList({threads}:{threads:any}) {




  return (


<div>
 { threads.map((thread: {  },index:number)=>{
    return <Thread key={index} thread={thread}/>
  })}
    </div>
    )


}
