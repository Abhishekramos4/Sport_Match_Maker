import React from 'react';
import { makeStyles, AppBar, Toolbar, Typography, Button, Grid } from '@material-ui/core';
import {Link} from 'react-router-dom';
const useStyles = makeStyles((theme)=>({
  root:{

  },
  brand: {
    fontFamily: "'Racing Sans One', cursive",
    color:"white",
    
  },
  // appbarItem:{
  //   [theme.breakpoints.down('sm')]:
  //   {

  //   }

  // }
}));


function NavbarMain(props) {

const val = props.isLogin;


  const classes = useStyles();
  return (
    <AppBar position="static" style={{ backgroundColor: '#242424', padding: "2px 0" }}>
      <Toolbar >
        <Grid container>
          <Grid item xs={12} lg={10}>
            <Typography variant="h3" className={classes.brand} >Sport Match Maker</Typography>
          </Grid>
          <Grid item xs={12} lg={2}>
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
         </Grid>
        
</Grid>
      </Toolbar>
</AppBar>
);
}

export default NavbarMain;