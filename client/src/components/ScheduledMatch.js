import React,{useState,useEffect} from 'react';
import {
    Card,
    CardContent,
    List,
    ListItem,
    Typography,
    Avatar,Grid

} from '@material-ui/core';
import NavbarProfile from './NavbarProfile'
import {makeStyles} from '@material-ui/core/styles';
// import CricketCard from '../images/CricketCard.jpg';
// import FootballCard from '../images/FootballCard.jpg';
// import VolleyballCard from '../images/VolleyballCard.jpg';
// import ChessCard from '../images/ChessCard.jpg';
// import TennisCard from '../images/TennisCard.jpg';
// import BadmintonCard from '../images/BadmintonCard.jpg';
// import PoolCard from '../images/PoolCard.jpg';

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
      matchCard:{
        width:"100%"      
    }
  
     
}));


function ScheduledMatches()
{

const classes = useStyles();
 const[matches,setMatches]=useState([]);  

 useEffect(()=>{

//axios.post()

var data = [{
type:"individual",
sport:"Chess",
opponent:"sr4",
date:"",
time:"",
},
{
type:"individual",
sport:"Cricket",
opponent:"Andheri Tigers",
date:"",
time:"",

}];
setMatches(data);

})
return(
<div className={classes.root}>
      <NavbarProfile />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <List>
            
            
            {matches.map((item)=>{
            return(
            <ListItem >
            <Card className={classes.matchCard}>
            <CardContent>
            <Grid container>
                <Grid item lg ={2} sm={3} xs={12}>
                <Avatar style={{height:"100px",width:"100px"}} >{item.opponent[0]+item.opponent[1]}</Avatar>
                </Grid>
                <Grid item lg={10} sm={9} xs={12}>
                <Typography><Typography variant='h6'>Sport Type:</Typography>{item.type}</Typography>
                <Typography><Typography variant='h6'>Opponent:</Typography>{item.opponent}</Typography>
                <Typography><Typography variant='h6'>Sport:</Typography>{item.sport}</Typography>
                
                </Grid>
            </Grid>
            
            
            </CardContent>
            </Card>
            </ListItem>
            );
           
            })
            
                }
            
        </List>
       
        
        </main>
        </div>

);
}

export default ScheduledMatches