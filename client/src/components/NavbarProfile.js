import React, { useEffect ,useState} from 'react';
import ProfileMenu from './ProfileMenu';
import {Link} from 'react-router-dom';
import {AppBar,CssBaseline,Divider,Drawer,Hidden,IconButton,List,ListItem,ListItemText,Typography,Toolbar,ListItemIcon} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MenuIcon from '@material-ui/icons/Menu';
import GroupIcon from '@material-ui/icons/Group';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import RoomIcon from '@material-ui/icons/Room';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import SportsIcon from '@material-ui/icons/Sports';
import SearchIcon from '@material-ui/icons/Search';

import { makeStyles, useTheme } from '@material-ui/core/styles';


const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  brandName:{
    fontFamily: "'Grenze Gotisch', cursive",
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar:theme.mixins.toolbar,
  toolbarDiv: {...theme.mixins.toolbar,
backgroundColor:"black"},
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  links:{
    textDecoration:'none',
    color:"black"
  }
}));


  

function NavbarProfile()
{

    // const { window } = props.window;
  const[name,setName]=useState({
    fname:"",
    lname:""
  })

    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  
    const drawer = (
      <div>
        <div className={classes.toolbar} >
        {/* <Typography  className={classes.brandName} style={{color:"white"}}>  <SportsSoccerIcon className={classes.brandLogo} />&nbsp;Sport Match Maker</Typography> */}
           
        </div>
        
        <Divider />
        <List>
        <Link to='/find-match' className={classes.links}>
            
            <ListItem button key='Find A Match'>
            <ListItemIcon><SearchIcon/></ListItemIcon>
              <ListItemText primary='Find A Match' />
            </ListItem>
            </Link>
            <Link to='/scheduled-matches' className={classes.links}>
            
            <ListItem button key='Scheduled Match'>
            <ListItemIcon><AccessTimeIcon/></ListItemIcon>
              <ListItemText primary='Scheduled Match' />
            </ListItem>
            </Link> 
       
       <Divider/>

            <Link to='/my-team' className={classes.links}>
            <ListItem button key='My Teams'>
            <ListItemIcon><GroupIcon/></ListItemIcon>
              <ListItemText primary='My Teams' />
            </ListItem>
            </Link>

            <Link to='/join-team' className={classes.links} >
            
            <ListItem button key='Join Team'>
            <ListItemIcon><GroupAddIcon/></ListItemIcon>
              <ListItemText primary='Join Team'/>
            </ListItem>
            </Link>
            <Divider/>

            <Link to='/interested-sports' className={classes.links}>
            <ListItem button key='Interested Sports'>
            <ListItemIcon><SportsIcon/></ListItemIcon>
              <ListItemText primary='Interested Sports' />
            </ListItem>
            </Link>

            <Divider/>
            <Link to='/grounds-near-me' className={classes.links}>
            <ListItem button key='Grounds Near Me'>
            <ListItemIcon><RoomIcon/></ListItemIcon>
              <ListItemText primary='Grounds Near Me'/>
            </ListItem>
            </Link>
            
            
         
        </List>
        <Divider />
       </div>
    );
   
    const container = undefined;

return (
<div>
<CssBaseline />
      <AppBar position="fixed" style={{backgroundColor:"black"}} className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
         {localStorage.getItem("userFname") +" "+localStorage.getItem("userLname")}
          </Typography>

          <ProfileMenu />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
</div>

);


}

export default NavbarProfile;