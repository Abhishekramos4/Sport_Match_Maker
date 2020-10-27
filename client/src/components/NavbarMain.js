import React,{useState} from 'react';
import { makeStyles, AppBar, Toolbar, Typography, Button, Grid,Menu,MenuItem,IconButton } from '@material-ui/core';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
const useStyles = makeStyles((theme)=>({
  root:{

  },
  brandName: {
    // font-family: 'Ubuntu', sans-serif;
    // fontFamily: "'Racing Sans One', cursive",
    // color:"white",

    fontFamily: "'Grenze Gotisch', cursive",

   
  
  [theme.breakpoints.down('sm')]:
  {
      fontSize:"25px"

  },
  [theme.breakpoints.down('md')]:
  {
      fontSize:"30px"

  },
  
  [theme.breakpoints.up('md')]:
  {
      fontSize:"37px"

  },
  [theme.breakpoints.up('lg')]:
  {
      fontSize:"45px"

  },
},

brandLogo:{
  

  [theme.breakpoints.down('sm')]:
  {
      fontSize:"25px"

  },

  [theme.breakpoints.down('md')]:
  {
      fontSize:"30px"

  },
  
  [theme.breakpoints.up('md')]:
  {
      fontSize:"37px"

  },
  [theme.breakpoints.up('lg')]:
  {
      fontSize:"45px"

  },

},

appItemsLg:{

position:"absolute",
right:"15px",
  [theme.breakpoints.down('sm')]:
  {
      display:"none"

  },
 
},
appItemsSm:{
  position:"absolute",
  right:"8px",

  [theme.breakpoints.up('md')]:
  {
      display:"none"

  },

}



  
}));


function NavbarMain(props) {

const val = props.isLogin;

const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <AppBar position="static" style={{ backgroundColor: '#242424', padding: "2px 0" }}>
      <Toolbar >
        
         <Typography  className={classes.brandName} >  <SportsSoccerIcon className={classes.brandLogo} />&nbsp;Sport Match Maker</Typography>
         
          {/* <Grid item xs={12} lg={2}>
          {  (!val)?
            <div>
            <Grid container> 
            <Grid item xs={12} lg={6}>
            <Link to="/login">
            <Button variant="text" color="secondary" >Login</Button>
            </Link>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Link to="/register">
            <Button variant="text" style={{backgroundColor:'green'}}>Register</Button>
            </Link>
           </Grid>
            </Grid>
            
            </div>
             :
          <div></div>
         
         }
         </Grid> */}
        
         <div className={classes.appItemsLg} >
            <Link to="/login" style={{textDecoration:'none'}}>
            <Button style={{color:"white"}}>Login</Button>
            </Link>
         
            <Link to="/register" style={{textDecoration:'none'}}>
            <Button style={{color:"white"}}>Register</Button>
            </Link>
         </div>
        <div className={classes.appItemsSm}>
        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{color:"white"}} ><MenuIcon/> </IconButton>
       
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
       
          >
          <MenuItem onClick={handleClose}><Link to="/login" style={{textDecoration:'none',color:"black"}}>Login</Link></MenuItem>
          <MenuItem onClick={handleClose}><Link to="/register" style={{textDecoration:'none',color:"black"}}>Register</Link></MenuItem>
          
        </Menu>
        </div>   
        
    </Toolbar>
</AppBar>
);
}

export default NavbarMain;