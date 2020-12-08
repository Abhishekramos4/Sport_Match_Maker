import React,{useState,useEffect} from 'react';
import NavbarProfile from './NavbarProfile'
import {makeStyles} from '@material-ui/core/styles'
import axios from 'axios';
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
        latitude:19.113646,longitude:72.869736,
     }
  
 }).then((res)=>{
   console.log(res.data);
 setGroundData(res.data);
 })

    },[]);

    // useEffect(()=>{
    // console.log(groundData);
    // var arr=[
    //   {
    //         'type': 'Feature',
    //         'properties': {
    //         'description':
    //         '<h5>'+groundData[0].Name+'</h5>',
          
          
    //         'icon': 'theatre'
    //         },
    //         'geometry': {
    //         'type': 'Point',
    //         'coordinates': [ groundData[0].Longitude,groundData[0].location.Latitude]
    //         }
            
    //   }]
    // },[groundData]);

  

return (

<div className={classes.root}>
<NavbarProfile/>
<main className={classes.content}>
<div className={classes.toolbar} />
<GroundsMapHolder groundData={groundData}/>
</main>
</div>


);



}

export default GroundNearMe;