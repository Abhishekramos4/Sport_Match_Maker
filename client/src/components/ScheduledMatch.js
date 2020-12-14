import React,{useState,useEffect} from 'react';
import {
    Card,
    CardContent,
    List,
    ListItem,
    Typography,
    Grid,
    Paper

} from '@material-ui/core';
import NavbarProfile from './NavbarProfile'
import {makeStyles} from '@material-ui/core/styles';
import ImageTitle from './ImageTitle';
import Loading from './Loading';

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
 const[isLoading,setIsLoading]=useState(true);

 useEffect(()=>{

axios.get("http://localhost:5000/team-info",{
  params:{
    userId:localStorage.getItem("userId")
  }
}).then((resout)=>{

  var teamsArr=resout.data.teams.map((item)=>{
    return(item.name);
  });
  console.log(teamsArr);
  axios.get("http://localhost:5000/schedule-match",{params:{

userId:localStorage.getItem("userId")
,teams:teamsArr

}}).then((resin)=>{

console.log(resin);

setMatches(resin.data.matches);
setIsLoading(false)
}).
catch((err)=>
{console.log(err);})

}).catch((err)=>{
console.log(err);
});




},[]);
return(
<div className={classes.root}>
      <NavbarProfile isScheduledMatch={true}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Paper style={{padding:"2%"}}>
        <ImageTitle title="SCHEDULED MATCHES"/>
    {
        isLoading?<Loading/>:
        matches.length===0?
       <Typography align="center">You have no scheduled matches.</Typography>
       
     :  <List>
            
            
            {matches.map((item)=>{
            return(
            <ListItem >
            <Card className={classes.matchCard}>
            <CardContent>
            <Grid container>
            <Grid item md={12} align="center">
              <Typography variant="h5" >{item.sender} vs {item.receiver}</Typography>
            </Grid>    
            
            </Grid>
            
            
            </CardContent>
            </Card>
            </ListItem>
            );
           
            })
            
                }
            
        </List>

    

    }

        
        </Paper>
        
       
        
        </main>
        </div>

);
}

export default ScheduledMatches