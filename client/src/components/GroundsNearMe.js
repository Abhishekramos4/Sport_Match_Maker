import React,{useState,useEffect} from 'react';
import NavbarProfile from './NavbarProfile'
import {makeStyles} from '@material-ui/core/styles'
import {Paper, Typography} from '@material-ui/core';
import axios from 'axios';
import ImageTitle from './ImageTitle';
import GroundsMapHolder from './GroundsMapHolder';

const useStyles=makeStyles((theme)=>(
    {

        root: {
            display: 'flex',
          },
          toolbar:theme.mixins.toolbar,
         
        
          content: {
            flexGrow: 1,
            padding: theme.spacing(3),
          }
        }
));

function GroundNearMe()
{
const classes=useStyles();
const [groundData,setGroundData]=useState([]);

    useEffect(()=>{


 axios.get("http://localhost:5000/get-nearby-grounds",{
     params:{
        latitude:localStorage.getItem("userLat"),longitude:localStorage.getItem("userLong"),
     }
  
 }).then((res)=>{
   console.log(res.data);
 setGroundData(res.data);
 })

    },[]);

  

return (

<div className={classes.root}>
<NavbarProfile isGround={true}/>
<main className={classes.content}>
<div className={classes.toolbar} />
<Paper style={{padding:"2%"}}>

<ImageTitle title="GROUNDS NEAR ME"/>
<GroundsMapHolder groundData={groundData}/>
</Paper>

</main>
</div>


);



}

export default GroundNearMe;