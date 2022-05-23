import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Authstore } from '../context/AuthContext';
import { database, storage } from '../firebase';
import insta from '../images/insta.jpg';
export default function Signup() {
  const usestyle = makeStyles({
    text1: {
      color: "grey",
      textAlign: "center"
    },
    card2: {
      width: "25.8rem",
      height: "3rem",
      marginTop: "1rem"

    }
  })
  const classes = usestyle();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const {signup} = useContext(Authstore);

  const handleClick = async(e) => {
       if(file==null){
      setError("Please upload profile image first");
      setTimeout(()=>{
          setError('')
      },8000)
      return;
  }
  try{
      setError('')
      setLoading(true)
      let userObj = await signup(email,password)
      let uid = userObj.user.uid
      const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
      uploadTask.on('state_changed',fn1,fn2,fn3);
      function fn1(snapshot){
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
          console.log(`Upload is ${progress} done.`)
      }
      function fn2(error){
          setError(error.message);
          setTimeout(()=>{
              setError('')
          },8000);
          setLoading(false)
          return;
      }
      function fn3(){
          uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
              console.log(url);
              database.users.doc(uid).set({
                  email:email,
                  userId:uid,
                  fullname:name,
                  profileUrl:url,
                  createdAt:database.getTimeStamp()
              })
          })
          setLoading(false);
          history('/')
      }
  }catch(err){
      setError(err.message);
      setTimeout(()=>{
          setError('')
      },5000)
  }

  }

  return (
  <div className="signupwrapper">
  <div className="signupcard1">
    <Card variant="outlined">
        <div id='insta'>
            <img src={insta} alt="" />
        </div>
        <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
                Sign up to see photos and videos from your friends
            </Typography>
            {error!='' && <Alert severity="error">{error}</Alert>}
            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" size="small"value={name} onChange={(e)=>setName(e.target.value)}/>
            <Button color="secondary" fullWidth={true} variant="outlined" margin="dense" startIcon={<CloudUploadIcon />} component="label">
            Upload Profile Image
            <input type="file" accept="image/*" hidden onChange={(e)=>setFile(e.target.files[0])}/>
            </Button>
        </CardContent>
        <CardActions>
            <Button color="primary" fullWidth={true} variant="contained" disabled={loading} onClick={handleClick}> 
            Sign up
            </Button>
        </CardActions>
        <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
                By signing up, you agree to our Terms, Conditions and Cookies policy.
            </Typography>
        </CardContent>
    </Card>
    <Card variant="outlined" className={classes.card2}>
        <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
                Having an account ? <Link to="/login" style={{textDecoration:'none'}}>Login</Link>
            </Typography>
        </CardContent>
    </Card>
  </div>
</div>
  
  );

}