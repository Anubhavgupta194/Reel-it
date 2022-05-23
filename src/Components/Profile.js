
import { CircularProgress } from '@mui/material';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../firebase';
import AddComment from './AddComment';
import Comments from './Comments';
import Like2 from './Like2';
import Navbar from './Navbar';


export default function Profile() {
    const {id} = useParams()
    const [userData,setUserdata] = useState(null)
    const [posts,setPosts] = useState(null)
    const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };
    useEffect(()=>{
        database.users.doc(id).onSnapshot((snap)=>{
            setUserdata(snap.data())
        })
    },[id])

    useEffect(()=>{
        if(userData!=null){
            const sol= async()=>{
                let parr = [];
                for(let i=0;i<userData?.postid?.length;i++){
                    let postData = await database.Posts.doc(userData.postid[i]).get()
                    parr.push({...postData.data(),postId:postData.id})
                } 
                setPosts(parr)
            }

            sol();
       
    }
  
    },[userData])
  return (
    <>
    {
        posts==null || userData==null ? <CircularProgress/> : 
        <>
            <Navbar UserData={userData}/>
            <div className="spacer"></div>
            <div className="container">
                <div className="upper-part">
                    <div className="profile-img">
                        <img src={userData.profileUrl}/>
                    </div>
                    <div className="info">
                        <Typography variant="h6">
                            Email : {userData.email}
                        </Typography>
                        <Typography variant="h6">
                            Posts : {userData?.postid?.length}
                        </Typography>
                    </div>
                </div>
                <hr style={{marginTop:'1rem',marginBottom:'2rem'}}/>
               
                <div className="profile-videos">
                {
                    posts.map((post,index)=>(
                        <React.Fragment key={index}>
                             

                            <div className="videos">
                                <video muted="muted" onClick={()=>handleClickOpen(post.pId)}>
                                    <source src={post.pUrl}/>
                                </video>
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
                                        <div className="comment-modal">
                                        <Card className="card1" style={{padding:'1rem'}}>
                                            <Comments postData={post}/>
                                        </Card>
                                            <Card variant="outlined" className="card2">
                                                <Typography style={{padding:'0.4rem'}}>{post.likes.length==0?'Liked by nobody':`Liked by ${post.likes.length} users`}</Typography>
                                                <div style={{display:'flex'}}>
                                                    <Like2 PostData={post} UserData={userData} style={{display:'flex',alignItems:'center',justifyContent:'center'}}/>
                                                    <AddComment style={{display:'flex',alignItems:'center',justifyContent:'center'}} userData={userData} postData={post}/>
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
            </div>
        </>
    }
    </>
  )
}
