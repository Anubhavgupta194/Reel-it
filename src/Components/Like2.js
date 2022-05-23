import FavoriteIcon from '@material-ui/icons/Favorite';
import React, { useContext, useEffect, useState } from 'react';
import { database } from '../firebase';

export default function Like2({UserData,PostData}) {
    

    const[like,setlikecheck]=useState(null);
    
    useEffect(() => {
        let check=PostData.likes.includes(UserData.userId)?true:false;
        setlikecheck(check);
    }, [PostData]);
    const handlelike=()=>{
        if(like)
        {let narr=PostData.likes.filter((el)=>el!=UserData.userId)
            database.Posts.doc(PostData.postid).update({
                        likes:narr
                    })

        }
        else{
            let narr=[...PostData.likes,UserData.userId]
            console.log(UserData.userid)
            database.Posts.doc(PostData.postid).update({
                likes:narr
            })   
        }
    }
  return (
    <div>{
           like!=null?
           <>
           {
             like==true? <FavoriteIcon style={{padding:'1rem',marginBottom:'1rem'}}  className={'like'} onClick={handlelike}  />:<FavoriteIcon style={{padding:'1rem'}} className={'unlike2'} onClick={handlelike} />
           }
           </>:
           <>
           </>
}
    </div>
  )
}
