import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function Video(props) {
  const handlemute=(e)=>{
    e.preventDefault();
    e.target.muted=!e.target.muted
  }
  const handleended=(e)=>{
    let next=ReactDOM.findDOMNode(e.target).parentNode.nextSibling
    
           if(next){
            next.scrollIntoView({behavior:"smooth"})
             e.target.muted=true;
           }
  }
  useEffect(()=>{
        let videos=document.querySelectorAll('video')[props.index];
        if(props.modal==true){
              videos.pause();
        }
    })
  return (
        
          <video src={props.src} className="video-styling" muted="muted" onClick={handlemute} controls onEnded={(e)=>{handleended(e)}}> </video>
       
  )
}
