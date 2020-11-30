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
   
    const [sent,setSent]=useState(false);

    const{nearbyTeams} = props;


function sendMatchRequest()
{
        //axios.post
        setSent(true);
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
                {
                    nearbyTeams.map((team,index)=>{
                        return (
                            <ListItem key={index}>
                                <Card className={classes.teamCard}>
                                    <CardContent>
                                        <Typography>
                                       {team.teamName}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                    {
                                        sent?
                                        <Button >
                                                Request Sent
                                            </Button>
                                        :
                                        <Button onClick={sendMatchRequest}>
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
        </Grid>
    </Grid>
</div>


);
   


}

export default FoundTeams;