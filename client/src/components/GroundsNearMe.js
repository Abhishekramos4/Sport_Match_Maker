import React,{useState,useEffect} from 'react';
import NavbarProfile from './NavbarProfile'
import GroundsMap from './GroundsMap';
import {makeStyles} from '@material-ui/core/styles'
import axios from 'axios';

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
  console.log(res);
 });
// var arr=[{name: "Dream Sports Fields Pvt Ltd..",
// address: "Crystal Plaza, Oshivara Link Road, Andheri West, Mumbai - 400053, Opposite Infinti Mall",
// contact: "07947172083",
// ratings: "4.1",
// location: {
//     lat: 19.1251368,
//     lon: 72.841665
// },
// },
// {
//     name: "Get Set Play",
//     address: "Piramal Agastya Private Limited, Kamani-kurla West, Mumbai - 400070, Opposite Fire Brigade",
//    contact: "07947190450",
//     ratings: "5.0",
//    location: {
//         lat: 19.0867259,
//         lon: 72.8860501
//     }
// }
// ];
//  setGroundData(arr);

    },[]);

return (

<div className={classes.root}>
<NavbarProfile/>
<main className={classes.content}>
<div className={classes.toolbar} />
<GroundsMap myLat={19.113646} myLon={72.869736} groundData={groundData}/>
</main>
</div>


);



}

export default GroundNearMe;