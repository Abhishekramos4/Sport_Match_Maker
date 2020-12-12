import React,{useState,useEffect} from 'react';
import {Menu,
    MenuItem,
    IconButton,
    Divider,Typography, Card,CardContent,CardActions,Grid
   } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import axios from 'axios';

function Notification()
{
  const [anchorEl, setAnchorEl] = useState(null);
  const [ requestData,setrequestData] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };  
  
  useEffect(
        ()=>{

          axios.get("http://localhost:5000/captain-teams-search",{
            params:{
             userId:localStorage.getItem("userId") 
            }
          }).then((res)=>{

            axios.get("http://localhost:5000/get-request",{params:{
            userId:localStorage.getItem("userId")
            ,teamArr:[...res.data.Football,...res.data.Cricket,...res.data.Volleyball]
          }}).then((res)=>{
              console.log(res.data);
              setrequestData([...res.data.requests]);
          })
          .catch(err=>{
            console.log(err);
          })


            // console.log(res);


          }).catch((err)=>{

            console.log(err);

          });
          
        }
        ,[]
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
          requestData.length===0?
          <MenuItem>
              <Typography>You have no team requests</Typography>
            </MenuItem>
          :
            requestData.map((item)=>{
              return(
                <MenuItem style={{minWidth:"550px"}}>
                    <Grid container>
                      <Grid item md={6}>From:<Typography>{item.sender}</Typography></Grid>
                      <Grid item md={6}>For:<Typography>{item.receiver}</Typography></Grid>

                    </Grid>
                     
    

                </MenuItem>
              );
             
            })
            

        }
        
       
       
      </Menu>
    </div>);

}

export default Notification;