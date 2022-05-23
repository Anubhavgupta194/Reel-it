import ChatIcon from '@mui/icons-material/Chat';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect, useState } from 'react';
import { Authstore } from '../context/AuthContext';
import { database } from '../firebase';
import AddComment from './AddComment';
import Comments from './Comments';
import Like from './Like';
import Like2 from './Like2';
import Video from './Video';


export default function Post() {
    const {user}=useContext(Authstore);
    const [userdata,SetUser]=useState('')
    const [postdata,SetPost]=useState([])
    const [open, setOpen] =useState(null);
    const[modal,setmodal]=useState(false);

    const handleClickOpen = (id) => {
      setOpen(id);
      setmodal(true);
    };
  
    const handleClose = () => {
      setOpen(null);
      setmodal(false);
    };
    useEffect(()=>{
            const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
            SetUser(snapshot.data())
        })
        return ()=> {unsub()}
    },[user])
    useEffect(()=>{
      let parr=[];
      database.Posts.orderBy('createdAt','desc').onSnapshot((snapshot)=>{
        parr=[]
        snapshot.forEach((doc)=>{
                let data={...doc.data(),postid:doc.id}
                parr.push(data)
        })
        SetPost(parr);
      })
    },[])
    const callback = (entries) => {
      entries.forEach((entry)=>{
          let ele = entry.target.childNodes[0]

          ele.play().then(()=>{
              if(!ele.paused && !entry.isIntersecting){
                  ele.pause()
              }
          })
      })
  }
  let observer = new IntersectionObserver(callback, {threshold:0.6});
  useEffect(()=>{
      const elements = document.querySelectorAll(".videos")
      elements.forEach((element)=>{
          observer.observe(element)
      })
      return ()=>{
          observer.disconnect();
      }
  },[postdata])
    
  return (
    <div>
        {   postdata==null||userdata==null?  <CircularProgress />:
        <div className="video-container">
        {
              postdata.map((post,index)=>(
                 < React.Fragment key={index}>
                    <div className="videos">

                      <Video src={post.pUrl} modal={modal} index={index}/> {/*this is hoe props are sent */}
                      <div className='fa' style={{display:"flex"}}>
                      <Avatar alt="Remy Sharp" src={userdata.profileUrl}/>
                      <h4>{userdata.fullname}</h4>
                      </div>
                      <Like UserData={userdata} PostData={post}/>
                      <ChatIcon className='chat-styling' onClick={()=>handleClickOpen(post.pId)}/>
                      <Dialog
                          open={open==post.pId}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                          fullWidth ={true}
                          maxWidth = 'md'
                        >
                          <div className="modal-container">
                                            <div className="video-modal">
                                                <video autoPlay={true} muted="muted" controls>
                                                    <source src={post.pUrl}/>
                                                </video>
                                            </div>
                                   <div className='comment-modal'>
                                       
                                   <Card variant="outlined"  className='card1' style={{padding:'1rem'}}>
                                   <Comments postData={post}/>
                                  </Card>
                                         <Card variant="outlined" className="card2">
                                         <Typography style={{padding:'0.3rem'}}>{post.likes.length==0?'Liked by nobody':`Liked by ${post.likes.length} users`}</Typography>
                                         <div style={{display:'flex'}}>
                                                        <Like2 PostData={post} UserData={userdata} style={{display:'flex',alignItems:'center',justifyContent:'center'}}/>
                                                        <AddComment style={{display:'flex',alignItems:'center',justifyContent:'center'}} userData={userdata} postData={post}/>
                                                    </div>
                                        </Card> 

                                   </div>
                             
                            </div>
                          
                        </Dialog>
                    </div>           
                   </React.Fragment>
              ))

            }    
              </div>
        }
    </div>
  )
}
