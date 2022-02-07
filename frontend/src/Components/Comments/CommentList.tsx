import React from 'react';
import Comment from './Comment';


export default function CommentList({comments}:{comments:any}) {



  return (


<div className='commentList'>
 { comments.map((comment: {}, index:number)=>{
    return <Comment key={index} comment={comment}/>
  })}
    </div>
    )


}
