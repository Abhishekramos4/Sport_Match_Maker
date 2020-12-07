import React,{useState} from 'react';
import {useHistory}   from 'react-router-dom';
import {Menu,
  MenuItem,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText} from '@material-ui/core';
import Notification from './Notification';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function ProfileMenu()
{
  const history=useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout=()=>{

      setlogOutOpen(true);

    }
    
const [logoutOpen, setlogOutOpen] = useState(false);
const handleLogoutClose=()=>{
  
  setlogOutOpen(false);
}
const handleLogoutfunction=()=>{
  localStorage.removeItem("userToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("userFname");
  localStorage.removeItem("userLname");
  history.push('/');
  setlogOutOpen(false);
}
return (
<div>

<Notification/>

      <IconButton   aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{color:"white",position:"absolute",right:"2%",top:"4%"}}>
        <AccountCircleIcon/>   
      </IconButton>

     
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
      
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        
        
        
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <div>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <Dialog
        open={logoutOpen}
        onClose={handleLogoutClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Logout"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleLogoutClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutfunction} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
        </div>
       
      </Menu>
    </div>


);


}
export default ProfileMenu;