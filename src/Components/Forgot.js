import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import * as React from 'react';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Authstore } from '../context/AuthContext';
import { auth } from '../firebase';
import craousel from '../images/craousel.png';
import i1 from '../images/i1.png';
import i2 from '../images/i2.webp';
import i3 from '../images/i3.webp';
import i4 from '../images/i4.jpg';
import insta from '../images/insta.jpg';

export default function Forgot() {
    const context = useContext(Authstore);
 console.log(context);
    const usestyle=makeStyles({
      text1:{
        color:"grey",
        textAlign:"center"
      } ,
      card2:{
            width:"25.8rem",
            height:"3rem",
            marginTop:"1rem"
           
      }
    })

   
    const classes=usestyle();
    const history = useNavigate();
    const [email,SetEmail]=useState('');
    const [error,SetError]=useState('');
    const [loading,SetLoading]=useState(false);

    const handleforgot=()=>{
       try{
           SetError('');
           SetLoading(true);
           let res=auth.sendPasswordResetEmail(email);
           SetLoading(false);
     }
       catch(err){
            SetError(err.message);
            SetLoading(false);
            setTimeout(()=>{
            SetError('')
        },4000 )
            
        }
    }
  return (
    <div className='loginwrapper'>

    <div className='imgcar' style={{backgroundImage:'url('+craousel+')',backgroundSize:'cover'}}>
         <div className='car'>
         <CarouselProvider
      
             visibleSlides={1}
             naturalSlideWidth={100}
             naturalSlideHeight={175}
             totalSlides={4}
             isPlaying={true}
             infinite={true}
             dragEnabled={false}
             touchEnabled={false}
             
              >
          <Slider>
            <Slide index={0}> <img style={{objectFit:'cover',height:'100%',width:"100%"}} src={i1}/></Slide>
            <Slide index={1}><img style={{objectFit:'cover',height:'100%',width:"100%"}} src={i2}/></Slide>
            <Slide index={2}><img style={{objectFit:'cover',height:'100%',width:"100%"}} src={i3}/></Slide>
            <Slide index={2}><img  style={{objectFit:'cover',height:'100%',width:"100%"}} src={i4}/></Slide>
          </Slider>
        </CarouselProvider>
  
         </div>
    
    </div>
    <div className='logincard1'>
      <Card variant='outlined'>
              <div id='insta' >
                <img src={insta}/>
              </div>
        <CardContent>
          {/* <Typography className={classes.text1 }variant="subtitle1">
            signup to see photos and vedios from your friends
          </Typography>*/}
          {error!='' && <Alert severity="error">{error}</Alert>}
          <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense'  size='small' value={email} onChange={(e)=>SetEmail(e.target.value)}/>
          {/* <TextField id="outlined-basic" label="FullName" variant="outlined" fullWidth={true} margin='dense' size='small'/> */}
          {/* <Typography variant="body2" color="text.secondary">
            <Button color='secondary'size="small" id="outlined-basic" fullWidth={true} margin='dense' variant='outlined' startIcon={<CloudUploadIcon/>} component='label'>
              Upload profile Image
              <input type='file' accept='images' hidden/>
              </Button>
            <br/>
            <br/>
          <Button color='primary'  id="outlined-basic" fullWidth={true} margin='dense' variant='contained'> Signup</Button>
         
          </Typography> */}
          <Typography  color='primary' className={classes.text1 }variant="subtitle1">
            
           <Link to='/forgot' onClick={()=>handleforgot() }disabled={loading}>Forgot Password?</Link>
          </Typography>
          <Button color='primary'  id="outlined-basic" fullWidth={true} margin='dense' variant='contained' className='loginbutton' disabled={loading} ><Link to='/login'> Login</Link>
         </Button>
        
          
        </CardContent>
       
      </Card>
    
    
    </div>
  
    </div>
  )
}
