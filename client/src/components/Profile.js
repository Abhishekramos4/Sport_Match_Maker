
import React from 'react';
import NavbarProfile from './NavbarProfile';
import {Typography} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  brandName:{
    fontFamily: "'Grenze Gotisch', cursive",
  },
  
 // necessary for content to be below app bar
  toolbar:theme.mixins.toolbar,
  
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Profile() {
  const classes = useStyles();
    const theme = useTheme();
  return (
    <div className={classes.root}>
      <NavbarProfile/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
         This is Main Profile
        </Typography>
      </main>
    </div>
  );
}



export default Profile;
