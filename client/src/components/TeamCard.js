import React from 'react';
import {Card,CardActionArea,
    CardContent,
    Typography} from '@material-ui/core';

function TeamCard(props)
{

function getTeam()
{


}

return(
<Card>
<CardActionArea onClick={getTeam}>
<CardContent>
    <Typography gutterBottom variant="h5" component="h2">{props.teamName}</Typography>
   <Typography variant="body2" color="textSecondary" component="p">{props.sport}</Typography>
</CardContent>
</CardActionArea>
</Card>

);

}

 export default TeamCard;