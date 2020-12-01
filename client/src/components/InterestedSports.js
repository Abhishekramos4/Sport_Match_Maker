import React,{useEffect,useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import  MuiAlert from '@material-ui/lab/Alert';
import NavbarProfile from './NavbarProfile';
import CricketCard from '../images/CricketCard.jpg';
import FootballCard from '../images/FootballCard.jpg';
import VolleyballCard from '../images/VolleyballCard.jpg';
import ChessCard from '../images/ChessCard.jpg';
import TennisCard from '../images/TennisCard.jpg';
import BadmintonCard from '../images/BadmintonCard.jpg';
import PoolCard from '../images/PoolCard.jpg';
import {Typography,Card,CardMedia,CardContent,CardActions,Grid,Button,Divider,Snackbar}   from  '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme)=>({
    rootCard: {
      maxWidth: 320,
      marginBottom:"20px"
    },
    media: {
      height: 170,
    },
    root: {
        display: 'flex',
      },
      buttonStyleAdd:{
          position:'relative',
          left:"78%",
          backgroundColor:"#4caf50"
         
      },
      buttonStyleRemove:{
        position:'relative',
        left:"68%",
        backgroundColor:"#f44336"
      }
      ,
    toolbar:theme.mixins.toolbar,
     
    
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      }
  }));

function InterestedSports()
{
const[interest,setInterest]=useState([]);
const[alertState,setAlertState]=useState([]);
const[boolInterest,setBoolInterest]=useState({
'Football':false,
'Cricket':false,
'Volleyball':false,
'Tennis':false,
'Chess':false,
'Badminton':false,
'Pool':false

});
const[openAlert,setOpenAlert]=useState(false);
const history =useHistory();

function handleAlertClose(event,reason)
{
    if (reason === "clickaway") {
        return;
      }
  
      setOpenAlert(false);
}

useEffect(()=>{

//axios.get
var myInterest=['Football','Cricket','Chess'];
setInterest([...myInterest]);

},[]);

useEffect(()=>
{
var obj={
    
};
for(var i=0;i<interest.length;i++)
{
  console.log(interest[i]);
  obj[interest[i]]=true;
}

setBoolInterest((prevState)=>({
...prevState,
...obj
}));
console.log(obj)
},[interest]
);

const handleAddRemove= (sport)=>
{
  
  var x=!boolInterest[sport];
    console.log(sport,x);
   var obj={
       
   }
   obj[sport]=x;

   setBoolInterest((prev)=>({
    ...prev,...obj

   }));
   setAlertState([x,sport]);
   setOpenAlert(true);
   console.log(boolInterest);
  

}

function handleApply()
{
    //axios.post
    history.push('/profile');
    


}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }  


const classes=useStyles();

const MyAlert=(props)=>{
    return(props.isAdd==true?<Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success">
        
         {props.sport} is added.
            
        </Alert>
</Snackbar>
:
<Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error">
        
         {props.sport} is removed.
            
        </Alert>
</Snackbar>);
        
        
}


return(
    


<div className={classes.root}>
<NavbarProfile/>
<main className={classes.content}>
<div className={classes.toolbar} />

<Typography variant='h4' style={{marginBottom:"2%"}}>Team Sports</Typography>

<Grid container spacing={3} justify="center" style={{marginBottom:"50px"}}>
<Grid item xs={12} md={4} sm={6}>
<Card className={classes.rootCard} >
    <CardMedia className={classes.media} image={FootballCard}/>
    <CardContent>
        <Typography variant='h5' component='h2'>Football</Typography>
    </CardContent>
    <CardActions>
    {
        boolInterest['Football']==true?
        <Button variant='contained' onClick={()=>{handleAddRemove('Football');}} className={classes.buttonStyleRemove}>Remove</Button>
        :<Button variant='contained' onClick={()=>{handleAddRemove('Football');}} className={classes.buttonStyleAdd}>Add</Button>
    }
    </CardActions>
</Card>

</Grid>


<Grid item xs={12}  sm={6} md={4}>
<Card className={classes.rootCard}>
    <CardMedia className={classes.media} image={CricketCard}/>
    <CardContent>
        <Typography variant='h5' component='h2'>Cricket</Typography>
    </CardContent>
    <CardActions>{
        boolInterest['Cricket']==true?
        <Button variant='contained' onClick={()=>{handleAddRemove('Cricket');}} className={classes.buttonStyleRemove}>Remove</Button>
        :<Button variant='contained' onClick={()=>{handleAddRemove('Cricket');}} className={classes.buttonStyleAdd}>Add</Button>
    }</CardActions>
</Card>
    
</Grid>

<Grid item xs={12}  sm={6} md={4}>
<Card className={classes.rootCard}>
    <CardMedia className={classes.media} image={VolleyballCard}/>
    <CardContent>
        <Typography variant='h5' component='h2'>Volleyball</Typography>
    </CardContent>
    <CardActions>{
        boolInterest['Volleyball']==true?
        <Button variant='contained' onClick={()=>{handleAddRemove('Volleyball');}} className={classes.buttonStyleRemove}>Remove</Button>
        :<Button variant='contained'onClick={()=>{handleAddRemove('Volleyball');}} className={classes.buttonStyleAdd}>Add</Button>
    }</CardActions>
</Card>
    
</Grid>



</Grid>

<Divider style={{marginBottom:"2%"}}/>
<Typography variant='h4' style={{marginBottom:"2%"}}>Individual Sports</Typography>
<Grid container spacing={3} style={{marginBottom:"50px"}}>
<Grid item xs={12}   sm={6} md={4}>
<Card className={classes.rootCard}>
    <CardMedia className={classes.media} image={ChessCard}/>
    <CardContent>
        <Typography variant='h5' component='h2'>Chess</Typography>
    </CardContent>
    <CardActions>{
        boolInterest['Chess']==true?
        <Button variant='contained' onClick={()=>{handleAddRemove('Chess');}} className={classes.buttonStyleRemove}>Remove</Button>
        :<Button variant='contained' onClick={()=>{handleAddRemove('Chess');}} className={classes.buttonStyleAdd}>Add</Button>
    }</CardActions>
</Card>
</Grid>

<Grid item xs={12}  sm={6} md={4} >
<Card className={classes.rootCard}>
    <CardMedia className={classes.media} image={BadmintonCard}/>
    <CardContent>
        <Typography variant='h5' component='h2'>Badminton</Typography>
    </CardContent>
    <CardActions>{
        boolInterest['Badminton']==true?
        <Button variant='contained' onClick={()=>{handleAddRemove('Badminton');}} className={classes.buttonStyleRemove}>Remove</Button>
        :<Button variant='contained' onClick={()=>{handleAddRemove('Badminton');}}  className={classes.buttonStyleAdd}>Add</Button>
    }</CardActions>
</Card>
</Grid>


<Grid item xs={12}  sm={6} md={4}>
<Card className={classes.rootCard}>
    <CardMedia className={classes.media} image={TennisCard}/>
    <CardContent>
        <Typography variant='h5' component='h2'>Tennis</Typography>
    </CardContent>
    <CardActions>{
        boolInterest['Tennis']==true?
        <Button variant='contained' onClick={()=>{handleAddRemove('Tennis');}} className={classes.buttonStyleRemove}>Remove</Button>
        :<Button variant='contained' onClick={()=>{handleAddRemove('Tennis');}} className={classes.buttonStyleAdd}>Add</Button>
    }</CardActions>
</Card>
</Grid>

<Grid item xs={12}  sm={6} md={4}>
<Card className={classes.rootCard}>
    <CardMedia className={classes.media} image={PoolCard}/>
    <CardContent>
        <Typography variant='h5' component='h2'>Pool</Typography>
    </CardContent>
    <CardActions>{
        boolInterest['Pool']==true?
        <Button variant='contained' onClick={()=>{handleAddRemove('Pool');}} className={classes.buttonStyleRemove}>Remove</Button>
        :<Button variant='contained'onClick={()=>{handleAddRemove('Pool');}}  className={classes.buttonStyleAdd}>Add</Button>
    }</CardActions>
</Card>
</Grid>
</Grid>

<Divider/>

<MyAlert isAdd={alertState[0]} sport={alertState[1]} />
<Button onClick={handleApply}>Apply</Button>

</main>
</div>


)
}

export default InterestedSports;