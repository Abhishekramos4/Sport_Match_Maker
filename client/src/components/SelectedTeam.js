import React from 'react';
import {AppBar,Toolbar,Typography,IconButton,List,ListItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
      backgroundColor:"black"
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }));
function SelectedTeam(props)
{
    console.log(props.players);

const classes= useStyles();
return(
    <div>
  <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={props.closeFunc} aria-label="close">
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
         {props.teamName}
        </Typography>
        
        
      </Toolbar>
    </AppBar>
    <List>

    
           {

            props.players.map((player,index)=>{

                return (
                    <ListItem key={index}>
                        {player.fname +" "+ player.lname}
                    </ListItem>
                );
            })


           }
    
      
    </List>
    </div>
  
  

);


}

export default SelectedTeam;