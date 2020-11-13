import React from 'react';
import ProfileMenu from './ProfileMenu';
import {Link} from 'react-router-dom';
import {AppBar,CssBaseline,Divider,Drawer,Hidden,IconButton,List,ListItem,ListItemText,Typography,Toolbar,ListItemIcon} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import { makeStyles, useTheme } from '@material-ui/core/styles';


const drawerWidth = 240;

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
  }
}));


  

function NavbarProfile(props)
{

    const { window } = props;
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
            <Link to='/my-team'>
            <ListItem button key='My Teams'>
              <ListItemText primary='My Teams' />
            </ListItem>
            </Link>
           
            <ListItem button key='Grounds Near Me'>
              <ListItemText primary='Grounds Near Me'/>
            </ListItem>
         
        </List>
        <Divider />
       </div>
    );
    const container = window !== undefined ? () => window().document.body : undefined;

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
           Fname Lname
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