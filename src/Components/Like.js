import FavoriteIcon from '@material-ui/icons/Favorite';
import React, { useContext, useEffect, useState } from 'react';
import { database } from '../firebase';

export default function Like({UserData,PostData}) {
    

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
             like==true? <FavoriteIcon   className={'icon-styling like'} onClick={handlelike}  />:<FavoriteIcon className={'icon-styling unlike'} onClick={handlelike} />
           }
           </>:
           <>
           </>
}
    </div>
  )
}
