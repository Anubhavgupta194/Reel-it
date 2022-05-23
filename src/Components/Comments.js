import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import { database } from '../firebase';

function Comments({postData}) {
    const [comments,setComments] = useState(null);
    useEffect(()=>{
            const sol= async()=>{
                let arr = []
                for(let i=0;i<postData.comments.length;i++){
                    let data = await database.comments.doc(postData.comments[i]).get()
                   
                    arr.push(data.data())
                }
               
                setComments(arr)
            }
            sol();

        // postData.comments.map( async(comments)=>{
        //     let data = await database.comments.doc(comments.get())
        //     arr.push(data.data())
        // })
        // for(let i=0;i<postData.comments.length;i++){
        //     let data = await database.comments.doc(postData.comments[i]).get()
        //     console.log(data);
        //     arr.push(data.data())
        // }
       
        // setComments(arr)
    },[postData])
    return (
        <div>
            {
                comments==null? <CircularProgress/> :
                <>
                {
                    comments.map((comment,index)=>(
                        <div style={{display:'flex'}} key={index}>
                            <Avatar  src={comment.uProfileImage}/>
                            <p>&nbsp;&nbsp;<span style={{fontWeight:'bold'}}>{comment.uName}</span>&nbsp;&nbsp; {comment.text}</p>
                        </div>
                    ))
                }
                </>
            }
        </div>
    )
}

export default Comments