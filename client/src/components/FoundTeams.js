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
    <AppBar className={classes.appBar} >
        <Toolbar >
        <IconButton edge="start" color="inherit" onClick={props.closeFunc} aria-label="close">
      <CloseIcon />
    </IconButton>
    <Typography variant="h6" className={classes.title}>
     Nearby Teams
    </Typography>
        </Toolbar>
    </AppBar>
    <Grid container>
        <Grid item md={6} xs={12} sm={12}>
            <FoundTeamMap   longitude={localStorage.getItem("userLong")} latitude={localStorage.getItem("userLat")} teams={nearbyTeams}/>
        </Grid>
        <Grid item md={6} xs={12} sm={12}>
{isLoading?<Loading/>:
            <List>
            {
            teams.map((team,index)=>{
                        return (
                            <ListItem key={team.name}>
                                <Card className={classes.teamCard}>
                               
                                    <CardContent>
                                        <Typography>
                                       {team.name}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                    {
                                        team.sent?
                                        <Button >
                                                Request Sent
                                            </Button>
                                        :
                                        <Button variant="outlined" onClick={()=>{
                                            sendMatchRequest(team.name);
                                        }} style={{color:"white",backgroundColor:"black"}}>
                                                Send Request
                                            </Button>

                                    }
                                            
                                    </CardActions>
                                </Card>
                            </ListItem>

                        );
                    })
            }
            </List>
}
        </Grid>
    </Grid>
</div>


);
   


}

export default FoundTeams;