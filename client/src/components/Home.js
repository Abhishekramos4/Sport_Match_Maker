import React from 'react';
import bgImage from '../images/img5_cr.jpg'
import NavbarMain from '../components/NavbarMain'; 
import {makeStyles,Typography,Grid,Card,CardContent} from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import SearchIcon from '@material-ui/icons/Search';
import SportsHandballIcon from '@material-ui/icons/SportsHandball';
import FooterMain from './FooterMain'

const useStyles=makeStyles((theme)=>({


    tagLine: {
       
      
      
      [theme.breakpoints.down('sm')]:
      {
          fontSize:"23px"
    
      },
      [theme.breakpoints.up('sm')]:
      {
          fontSize:"35px"
    
      },
      
      [theme.breakpoints.up('md')]:
      {
          fontSize:"45px"
    
      },
      [theme.breakpoints.up('lg')]:
      {
          fontSize:"56px"
    
      },
    },
    card:{
        padding:"2%"
      
    },
    icon:{
        fontSize:40
    }
}))

function Home()
{

const classes=useStyles();

    return (
<div>
    <NavbarMain  isLogin ={false}/>
    <div  style={{position:"relative",
     color:"white",
        textAlign:"center"}}>
    <img src={bgImage} width="100%"/>
    <div style={{position:"absolute",top:"40%" ,left:"3%"}}>
    <Typography className={classes.tagLine}>Find A Match ! Play A Match !</Typography>
    </div>
    </div>
    <Grid container>
    <Grid item  xs={12} sm={12} md={4}>
   
   <Card className={classes.card}>
       <CardContent>
       <div>
           <GroupIcon className={classes.icon}/>
       </div>
       <Typography>Join A team Or Create Your Team !</Typography>
       </CardContent>
   </Card>
  
    
    
    </Grid>
    <Grid item xs={12} sm={12} md={4}>
    <Card className={classes.card}>
    <CardContent>
    <div>
        <SearchIcon className={classes.icon}/>
    </div>
    <Typography >Find Interested Teams Near You !</Typography>
    </CardContent>
    
    </Card>
   
 </Grid>
 <Grid item xs={12} sm={12} md={4}>
 <Card className={classes.card}>
    <CardContent>
    <div >
       <SportsHandballIcon className={classes.icon}/>
    </div>
    <Typography>Play Your Favorite Sport </Typography>
    </CardContent>
    
    </Card>

 </Grid>
    </Grid>
  <FooterMain/>
      </div>

    );
    

    
   

}

export default Home;