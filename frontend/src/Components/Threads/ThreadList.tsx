import React from 'react';
import Thread from './Thread';
import "../../Styles/Thread.scss";


export default function ThreadList({threads}:{threads:any}) {




  return (


<div className='list'>
 { threads.map((thread: {  },index:number)=>{
    return <Thread key={index} thread={thread}/>
  })}
    </div>
    )


}
