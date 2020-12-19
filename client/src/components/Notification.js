import React,{useState,useEffect} from 'react';
import {Menu,
    MenuItem,
    IconButton,
    Button,
    Snackbar,
    Divider,Typography, Card,CardContent,CardActions,Grid
   } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import  MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

function Notification()
{
  const [anchorEl, setAnchorEl] = useState(null);
  const [ requestData,setrequestData] = useState([]);
  const[acceptAlert,setAcceptAlert] = useState(false);
  const[declineAlert,setDeclineAlert] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };  
  

function handleAcceptAlertClose(event,reason) {
  if (reason === "clickaway") {
    return;
  }

  setAcceptAlert(false);
}

function handleDeclineAlertClose(event,reason) {
  if (reason === "clickaway") {
    return;
  }
  setDeclineAlert(false);

}

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

function handleAccept(request)
{

  var newRequests=requestData.filter((item)=>{

    return(item.id!=request.id);
  
  });
  
  setrequestData(newRequests);
  setAcceptAlert(true);

axios.post("http://localhost:5000/request-accept",{
...request,
time:request.time.hour.low+":"+request.time.minute.low,
date:  request.date.year.low+"-"+request.date.month.low+"-"+request.date.day.low

})
.then((res)=>{
console.log(res);
  
}).
catch(err=>{
  console.log(err);
});
console.log(request);
}


function handleDecline(request)
{

  var newRequests=requestData.filter((item)=>{

    return(item.id!=request.id);
  
  });
  
  setrequestData(newRequests);
  setDeclineAlert(true);
axios.post("http://localhost:5000/request-decline",request)
.then((res)=>{

console.log(res);

})
.catch(err=>{
  console.log(err);
});

console.log(request);


}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}  

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
              <Typography>You have no requests</Typography>
            </MenuItem>
          :
            requestData.map((item,index)=>{
              return(
                <MenuItem key={item.id}>
                    <Card >
                      <CardContent style={{maxWidth:"450px"}}>
                      <Grid container>
                      <Grid item md={6}><Typography><b>From:</b>&nbsp;{item.sender}</Typography></Grid>
                      <Grid item md={6}><Typography><b>To:</b>&nbsp; {item.receiver}</Typography></Grid>
                      <Grid item md={6}><Typography><b>Type:</b>&nbsp; {item.type}</Typography></Grid>
                      <Grid item md={6}><Typography><b>Sport:</b>&nbsp; {item.sports}</Typography></Grid>
                      <Grid item md={6}><Typography><b>Date:</b>&nbsp; {item.date.day.low+"-"+item.date.month.low+"-"+item.date.year.low}</Typography></Grid>
                      <Grid item md={6}><Typography><b>Time:</b>&nbsp; {item.time.hour.low+":"+item.time.minute.low}</Typography></Grid>
                      <Grid  item md={6}></Grid>
                      <Grid  item md={6} align="right">
                      <CardActions>
                      <Button variant="contained" style={{backgroundColor:"#f44336"}}  onClick={()=>{
                          handleDecline(item)
                        }}>Decline</Button>
                        <Button variant="contained" style={{ backgroundColor:"#4caf50"}} onClick={()=>{
                          handleAccept(item)
                        }} >Accept</Button>
                      </CardActions>

                      </Grid>
                        

                    </Grid>
                      </CardContent>
                    </Card>
                    
                     
    

                </MenuItem>
              );
             
            })
            

        }
        
       
       
      </Menu>
      <Snackbar open={acceptAlert} autoHideDuration={6000} onClose={handleAcceptAlertClose}>
        <Alert onClose={handleAcceptAlertClose} severity="success">
        Match Request Accepted  
        </Alert>
</Snackbar>
  <Snackbar open={declineAlert} autoHideDuration={6000} onClose={handleDeclineAlertClose}>
        <Alert onClose={handleDeclineAlertClose} severity="error">
        Match Request Declined    
        </Alert>
</Snackbar>
    </div>);

}

export default Notification;