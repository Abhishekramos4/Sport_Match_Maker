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
import axios from 'axios';


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
   
    
    const{nearbyTeams} = props;

//   console.log(nearbyTeams);
    const[teams,setTeams] = useState([]);
  
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
    },[]);

    useEffect(()=>{
        console.log(teams);
    },[teams])

    

function sendMatchRequest(teamName)
{
        // axios.post()
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
    <AppBar className={classes.appBar}>
        <Toolbar>
        <IconButton edge="start" color="inherit" onClick={props.closeFunc} aria-label="close">
      <CloseIcon />
    </IconButton>
    <Typography variant="h6" className={classes.title}>
     Nearby Teams
    </Typography>
        </Toolbar>
    </AppBar>
    <Grid container>
        <Grid item md={6}>
            <FoundTeamMap   longitude={72.869736} latitude={19.113646} teams={nearbyTeams}/>
        </Grid>
        <Grid item md={6}>
            <List>
                {/* {
                    console.log(teams)
                    
                    }                   
                    <ListItem key="ab">
                        {teams[0].teamName}
                    </ListItem> */}
                     {/* teams.map((team,index)=>{
                        return (
                            <ListItem key={team.teamName}>
                                <Card className={classes.teamCard}>
                                    <CardContent>
                                        <Typography>
                                       {team.teamName}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                    {
                                        team.sent?
                                        <Button >
                                                Request Sent
                                            </Button>
                                        :
                                        <Button onClick={()=>{
                                            sendMatchRequest(team.teamName);
                                        }}>
                                                Send Request
                                            </Button>

                                    }
                                            
                                    </CardActions>
                                </Card>
                            </ListItem>

                        );
                    }) */}
                
            </List>
        </Grid>
    </Grid>
</div>


);
   


}

export default FoundTeams;