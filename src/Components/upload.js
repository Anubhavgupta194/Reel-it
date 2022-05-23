import MovieIcon from '@material-ui/icons/Movie';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Authstore } from '../context/AuthContext';
import { database, storage } from '../firebase';
export default function Upload() {
    const {user}=useContext(Authstore);
    const [error, SetError]=useState('');
    // const {loading, SetLoading}=useState(false);
    let [loading,SetLoading] = useState(false);
    const [userdata,setUserData] = useState('')
    useEffect(()=>{
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
        setUserData(snapshot.data())
    })
    return ()=> {unsub()}
},[user])
   
    const handleclick= async(file)=>{
        if(file==null){
            SetError("Please select a file first");
            setTimeout(()=>{
                SetError('')
            },2000)
            return;
        }
        if(file.size/(1024*1024)>100){
            SetError('This video is very big');
            setTimeout(()=>{
                SetError('')
            },2000);
            return;
        }
        let uid=uuidv4();
        SetLoading(true)
        const uploadTask = storage.ref(`/Posts/${uid}/${file.name}`).put(file);
      uploadTask.on('state_changed',fn1,fn2,fn3);
      function fn1(snapshot){
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
        console.log(`Upload is ${progress} done.`)
    }
    function fn2(err){
        SetError(err.message)
        setTimeout(()=>{
            SetError('')
        },12000);
        SetLoading(false)
        return;

    }
    function fn3(){
        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
            let obj={
                likes:[],
                comments:[],
                pId:uid,
                pUrl:url,
                uProfile : userdata.profileUrl,
                uName : userdata.fullname,
                userId : userdata.userId,
                createdAt : database.getTimeStamp()
            }
            database.Posts.add(obj).then(async(ref)=>{
                   await database.users.doc(userdata.userId).update({
                      postid:userdata.postid!=null?[...userdata.postid,ref.id]:[ref.id],
                  })
            }).then(()=>{
                SetLoading(false)
            }).catch((err)=>{
                SetError(err.message)
                setTimeout(()=>{
                    SetError('')
                },12000)
                SetLoading(false)
            })
        })
        
    }


    }
  return (
    
    <div style={{marginTop:'5rem',marginBottom:'1rem'}}>
       { error!='' ? <Alert severity="error">{error}</Alert>:
            <div>
                <Button color="secondary" variant="outlined" margin="dense" startIcon={<MovieIcon/>} component="label" disabled={loading}
               onChange={(e)=>{handleclick(e.target.files[0])}} >
                Upload
                <input type="file" accept="video/*" hidden />
                </Button>
                {loading && <LinearProgress color="secondary" style={{marginTop:'3%'}} />}
           </div>
       }

    </div>
  )
}
