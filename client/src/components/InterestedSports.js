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
import Loading from './Loading';
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
const[applyAlert,setApplyAlert]=useState(false);
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
const[isLoading,setIsLoading]=useState(true);
const history =useHistory();

function handleAlertClose(event,reason)
{
    if (reason === "clickaway") {
        return;
      }
  
      setOpenAlert(false);
}

function handleApplyAlertClose(event,reason)
{

    if (reason === "clickaway") {
        return;
      }
  
      setApplyAlert(false);

}

useEffect(()=>{

axios.get("http://localhost:5000/get-interested-sports",{
    params:{
        userId:localStorage.getItem("userId")
    }
}).then((res)=>{

console.log(res);
setInterest([...res.data.interests]);
setIsLoading(false);
}).catch(err=>{
    console.log(err);
});

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
   var dataArr=[];
   for(let[key,value] of  Object.entries(boolInterest))
   {
        if(value==true)
        {
            dataArr.push(key);
        }
   }

   var data ={
       userId:localStorage.getItem("userId"),
       arr:dataArr
   }
   
    axios.post("http://localhost:5000/set-interested-sports",data).then((res)=>{

        
        console.log(res.data);
        setApplyAlert(true);
    
    })
    .catch(err=>{
        console.log(err);
    });
    console.log(dataArr);
    // history.push('/profile');
    


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


{/* <Typography variant='h4' style={{marginBottom:"2%"}}>Team Sports</Typography>

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

<Divider style={{marginBottom:"2%"}}/> */}


{isLoading?<Loading/>:
<div>
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
        :<Button variant='contained' onClick={()=>{handleAddRemove('Pool');}}  className={classes.buttonStyleAdd}>Add</Button>
    }</CardActions>
</Card>
</Grid>
</Grid>

<Divider style={{marginBottom:"2%"}}/>

<MyAlert isAdd={alertState[0]} sport={alertState[1]} />
<Grid container>
<Grid item md={10}>

</Grid>
<Grid item md={2}>
<Button onClick={handleApply} variant="outlined" style={{width:"100%",backgroundColor:"black",color:"white"}}>Apply</Button>
</Grid>
</Grid>
<Snackbar open={applyAlert} autoHideDuration={6000} onClose={handleApplyAlertClose}>
        <Alert onClose={handleApplyAlertClose} severity="success">
        
         Your changes are successfully made.
            
        </Alert>
</Snackbar>

</div>
}
</main>
</div>


)
}

export default InterestedSports;