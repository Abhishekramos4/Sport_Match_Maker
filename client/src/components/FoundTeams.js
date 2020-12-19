import React,{useState,useEffect} from 'react';
import {Typography,
    AppBar,
    Toolbar,
    IconButton,
    Grid, 
    ListItem,
    List,
    Card,
    Button,
CardContent,
CardActions,
Snackbar
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import  MuiAlert from '@material-ui/lab/Alert';
import FoundTeamMap from './FoundTeamMap';
import Loading from './Loading';
import axios from 'axios';
import { isMatch } from 'lodash';


const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
      backgroundColor:"black"
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    teamCard:{
        width:"100%"
    }
  }));

  

function FoundTeams(props)
{
    const classes = useStyles();
   
    
    const{matchReq,nearbyTeams,isTeam} = props;


    const[teams,setTeams] = useState(nearbyTeams);
    const [isLoading,setIsLoading]=useState(false);
    const[openRequestAlert,setOpenRequestAlert] = useState(false);
  

    function handleRequestAlertClose(event,reason)
{

    if (reason === "clickaway") {
        return;
      }
  
     setOpenRequestAlert(false);

}
    

function sendMatchRequest(teamName)
{
       
    console.log(teamName);
    console.log(matchReq);
   
 var  obj={
     userId:localStorage.getItem("userId"),
     type:matchReq.type,
    team:matchReq.team,
    opponent:teamName,
    date:matchReq.date,
    time:matchReq.time,
    sport:matchReq.sport
    }

    axios.post("http://localhost:5000/send-request",obj).then((res)=>{
        console.log(res.data);
        setOpenRequestAlert(true);
    }).catch((err)=>{
            console.log(err)
    });

        
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }  


    return(
    <div>
    <AppBar className={classes.appBar} >
    {console.log(teams)}
        <Toolbar >
        <IconButton edge="start" color="inherit" onClick={props.closeFunc} aria-label="close">
      <CloseIcon />
    </IconButton>
    <Typography variant="h6" className={classes.title}>
     {
         isTeam? "Nearby Teams" :"Nearby Individuals" 
     }
    
    </Typography>
        </Toolbar>
    </AppBar>
    <Grid container>
        <Grid item md={6} xs={12} sm={12}>
            <FoundTeamMap   longitude={localStorage.getItem("userLong")} latitude={localStorage.getItem("userLat")} isTeam={isTeam} teams={nearbyTeams}/>
        </Grid>
        <Grid item md={6} xs={12} sm={12}>
{isLoading?<Loading/>:
            <div>
            {
                matchReq.type=="individual"? 
                
                <List>
                    {
                        nearbyTeams.map((user,index)=>{
                            return (
                                <ListItem key={user.userId} >
                                <Card className={classes.teamCard}>
                               
                                    <CardContent>
                                        <Typography variant="h6">
                                       {user.fname+" "+user.lname}
                                        </Typography>
                                        <Typography>
                                        <b>UserId:</b>&nbsp;   {user.userId}
                                        </Typography>
                                        <Typography>
                                        <b>Contact:</b>&nbsp; {user.contact}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                    <Grid container>
                                    <Grid item md={9} xs={false}>


                                    </Grid>

                                    <Grid item md={3}>

                                    
                                       
                                        <Button variant="outlined" onClick={()=>{sendMatchRequest(user.userId);}} style={{color:"white",backgroundColor:"black"}}>
                                                Send Request
                                        </Button>

                                   
                                    </Grid>
                                   
                                    </Grid>
                                    
                                            
                                    </CardActions>
                                </Card>
                            </ListItem>


                            );



                        })
                       
                    }
                </List>
                
                :

                <List>
            {
            nearbyTeams.map((team,index)=>{
                        return (
                            <ListItem key={team.name} team={team.name}>
                                <Card className={classes.teamCard}>
                               
                                    <CardContent>
                                        <Typography variant="h6">
                                       {team.name}
                                        </Typography>
                                        <Typography>
                                            <b>Captain:</b>&nbsp;{team.captain}
                                        </Typography>
                                        <Typography>
                                            <b>Sport:</b>&nbsp;{team.sports}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                    <Grid container>
                                    <Grid item md={9} xs={false}>


                                    </Grid>

                                    <Grid item md={3}>

                                    
                                       
                                        <Button variant="outlined" onClick={()=>{sendMatchRequest(team.name);}} style={{color:"white",backgroundColor:"black"}}>
                                                Send Request
                                        </Button>

                                   
                                    </Grid>
                                   
                                    </Grid>
                                    
                                            
                                    </CardActions>
                                </Card>
                            </ListItem>

                        );
                    })
            }
            </List>
            }
            <Snackbar open={openRequestAlert} autoHideDuration={6000} onClose={handleRequestAlertClose}>
        <Alert onClose={handleRequestAlertClose} severity="success">
        
        Request sent successfully.
            
        </Alert>
</Snackbar>



            </div>
           
}
        </Grid>
    </Grid>
</div>


);
   


}

export default FoundTeams;