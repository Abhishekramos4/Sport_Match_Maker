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
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
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


    const[teams,setTeams] = useState([]);
    const [isLoading,setIsLoading]=useState(true);
    
  
    useEffect(()=>{
        
        console.log(nearbyTeams);
        var arr= [ nearbyTeams.map((team)=>{
            return(
                {
                    ...team,
                    sent:false
                }
            );
        })];
        setTeams(arr);
        setTimeout(()=>{setIsLoading(false);},2000)
        
    },[nearbyTeams]);

    useEffect(()=>{
        console.log(teams);
    },[teams])

    

function sendMatchRequest(teamName)
{
       
    console.log(teamName);
    console.log(matchReq);
    alert("Request sent to"+teamName);
 var  obj={
     type:matchReq.type,
    team:matchReq.team,
    opponent:teamName,
    date:matchReq.date,
    time:matchReq.time,
    sport:matchReq.sport
    }

    axios.post("http://localhost:5000/send-request",obj).then((res)=>{
        console.log(res.data);
    }).catch((err)=>{
            console.log(err)
    });
    
    // // axios.post()
    //     console.log(teamName);
    //     console.log(teams);
    //    var i = teams.findIndex((obj)=>{
    //        return obj.teamName==teamName;
    //     });

    //     setTeams((prev)=>{
    //         prev[i]={
    //             ... prev[i],
    //             sent:true
    //         }
    //     });

        
}

    return(
    <div>
    <AppBar className={classes.appBar} >
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
                                        <Typography>
                                       {user.fname+" "+user.lname}
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
                                        <Typography>
                                       {team.name}
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


            </div>
           
}
        </Grid>
    </Grid>
</div>


);
   


}

export default FoundTeams;