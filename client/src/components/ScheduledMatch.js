import React,{useState,useEffect} from 'react';
import {
    Card,
    CardContent,

} from '@material-ui/core';
import NavbarProfile from './NavbarProfile'
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme)=>({
    root: {
        display: 'flex',
      },
      
      formPaper:{
        margin:"5px",padding:"3%", width:"90%"
    },
     // necessary for content to be below app bar
      toolbar:theme.mixins.toolbar,
      
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
  
     
}));


function ScheduledMatches()
{

const classes = useStyles();
 const[matches,setMatches]=useState([]);  

 useEffect(()=>{

//axios.post()

var data = [{
type:"individual",
sport:"chess",
opponent:"sr4",
date:"",
time:"",
},
{
type:"individual",
sport:"chess",
opponent:"sr4",
date:"",
time:"",

}];


})
return(
<div className={classes.root}>
      <NavbarProfile />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Card>
            <CardContent>
                
            </CardContent>
        </Card>
        
        </main>
        </div>

);
}

export default ScheduledMatches