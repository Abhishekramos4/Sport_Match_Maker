import React from 'react';
import {Card,CardActionArea,
    Button,
    CardActions,
    CardContent,
    Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'


const useStyles=makeStyles({
card:{
    minWidth:"100%"
}
});


function TeamCard(props)
{
    const classes= useStyles();
   


return(
<Card className={classes.card} >
{/* <CardActionArea onClick={
  ()=>{
      props.openFunc(props.teamName,props.players);
      
  }
}>
</CardActionArea> */}
<CardContent>
    <Typography gutterBottom variant="h5" component="h2">{props.teamName}</Typography>
   <Typography variant="body2" color="textSecondary" component="p">{props.sport}</Typography>
</CardContent>
<CardActions>
<Button >View Details</Button>
<Button>Exit From Team</Button>
</CardActions>

</Card>

);

}

 export default TeamCard;