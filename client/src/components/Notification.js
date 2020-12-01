import React,{useState,useEffect} from 'react';
import {Menu,
    MenuItem,
    IconButton,
   } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
function Notification()
{
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };  
  
  useEffect(
        ()=>{

           //axios.post 
           
        
        }
    )


    return (<div>
    <IconButton   aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{color:"white",position:"absolute",right:"6%",top:"4%"}}>
        <NotificationsIcon/>
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
      
        {
            <MenuItem>
                Match Request
            </MenuItem>

        }
        
       
       
      </Menu>
    </div>);

}

export default Notification;