
import React,{useEffect, useState,forwardRef} from 'react';
import NavbarProfile from './NavbarProfile';
import FoundTeams from './FoundTeams';
import {Typography
,Paper
,TextField,
Grid,
Select,
MenuItem,
InputLabel,
Radio,
RadioGroup,
FormControl,
FormControlLabel,
FormLabel,
Button,
Dialog,
Slide,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import axios from 'axios';
import Loading from './Loading';




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  
toolbar:theme.mixins.toolbar,
  fields:{
    margin:"3%"
  },

  formPaper:{
    padding:"2%"
  },
radio:{
color:"black",
'&$checked': {
  color:"black",
}
},
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


function Profile() {

const[fetching,setIsFetched] = useState(true);


  


useEffect (()=>{
     
    var token = localStorage.getItem("userToken");
   
    axios.get('http://localhost:5000/profile',{ headers: {
      Authorization : `Bearer ${token}`
  }})
    .then ((res)=>{
     
      console.log(res.data);      
        localStorage.setItem("userId",res.data.userData.userId);
        localStorage.setItem("userFname",res.data.userData.fname);
        localStorage.setItem("userLname",res.data.userData.lname);
        localStorage.setItem("userLat",res.data.userData.latitude);
        localStorage.setItem("userLong",res.data.userData.longitude);
        
    }).catch(err=>{console.log(err);}).then(()=>{
        setIsFetched(false);
    });

    },[]
);



  const classes = useStyles();
  
  return (
   <div>
    { fetching? <Loading/>:
    <div className={classes.root}>
      <NavbarProfile />
      <main className={classes.content}>
        <div className={classes.toolbar} />
       <Typography>This is Your Profile</Typography>
      </main>
    </div>
    }
    </div>
  );

    
}



export default Profile;
 