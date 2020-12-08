import React,{useState,useEffect} from 'react';
import NavbarProfile from './NavbarProfile';
import bgImg from '../images/img6.jpg';
import axios from 'axios';
import  MuiAlert from '@material-ui/lab/Alert';
import 
{Button,
    Grid,
  Card,CardActionArea,CardContent, 
  List,
  ListItem,
    Divider, 
    TextField, 
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContentText,
    DialogContent,
    Snackbar,
    Slide,
    AppBar,
    Toolbar,
    IconButton,
  CircularProgress,
  Paper} from '@material-ui/core';

  import  {makeStyles} from '@material-ui/core';


const useStyles = makeStyles((theme)=>({
    root: {
        display: 'flex',
      },
      
      formPaper:{
        margin:"0 auto",padding:"3%", width:"90%"
    },
     // necessary for content to be below app bar
      toolbar:theme.mixins.toolbar,
      
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
  
      formControl: {
         minWidth:"100%"
        }
}));



function JoinTeam()
{
    const classes=useStyles();
    const[dialogOpen,setDialogOpen]=useState(false);
    const[createAlert,setCreateAlert]= useState(false);
    const [joinAlert,setJoinAlert] = useState(false);
    const [searchFailAlert,setSearchFailAlert]=useState(false);
    const [joinFailAlert,setJoinFailAlert] = useState(false);
    const [joinSuccessAlert,setJoinSuccessAlert]= useState(false);
    const [DialogData,setDialogData] = useState({teamName:"",sport:"",captain:""});
    
    const [searchForm,setSearchForm] = useState({
        teamName:"",
        sport:""

    });

    const[createForm,setCreateForm]=  useState({
        
            teamName:"",
            sport:"",
            latitude:localStorage.getItem("userLat"),
            longitude:localStorage.getItem("userLong"),
            captain:localStorage.getItem("userId"),
    
        }
     );

    //TEAM CREATE

    function handleChangeCreateTeam(event)
    {

      var name =event.target.name;
     var value = event.target.value;
      
     setCreateForm((prevState)=>{
         return ({...prevState,
         [name]:value
         });
     });

    }

    function handleSubmitCreateTeam()
    {

      console.log(createForm);  
      axios.post("http://localhost:5000/create-team",createForm).then((res)=>{
        console.log(res);
        setCreateAlert(true);
        });
        
        

    }


    // TEAM Search

    function join()
    {

      
      axios.post("http://localhost:5000/join-team",{
        ...searchForm,
        userId:localStorage.getItem("userId")
      }).then((res)=>{
        setDialogOpen(false);
          
          if(res.data.msg=="success")
          {
              setJoinSuccessAlert(true);
          }
          else{

            setJoinFailAlert(false);

          }
      })
    }

    function handleSubmitTeamSearch()
    {

    
        console.log(searchForm);
       axios.post('http://localhost:5000/team-search',searchForm).then(
           (res)=>{

               console.log(res.data.team);
               if(res.data.msg=="Found")
               {
                setDialogData(
                  {
                    teamName:res.data.team.name,
                    sport:res.data.team.sport,
                    captain:res.data.team.captain
                  }
                );
                setDialogOpen(true);
               }
               else{
                 setSearchFailAlert(true);
               }
             
           }
           
       );
       

    }

    function handleChangeSearchTeam(event)
    { 
     var name =event.target.name;
     var value = event.target.value;
      
     setSearchForm((prevState)=>{
         return ({...prevState,
         [name]:value
         });
     });
    }


    //ALERT CLOSE handles

    function handleAlertCloseCreate(event,reason)
    {
        if (reason === "clickaway") {
            return;
          }
      
          setCreateAlert(false);
    }
    function handleAlertCloseJoin(event,reason)
    {
        if (reason === "clickaway") {
            return;
          }
      
          setJoinAlert(false);
    }
    function handleAlertCloseSearchFail(event,reason)
    {

      if (reason === "clickaway") {
        return;
      }
  
      setSearchFailAlert(false);

    }

    function handleAlertCloseJoinFail(event,reason)
    {

      if (reason === "clickaway") {
        return;
      }
  
      setJoinFailAlert(false);

    }

    function handleAlertCloseJoinSuccess(event,reason)
    {

      if (reason === "clickaway") {
        return;
      }
  
      setJoinSuccessAlert(false);

    }



function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }   

function MyAlert({open,handleClose,severity,msg})
{
  return (<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity={severity}>
    
     
        { msg}
    </Alert>
  </Snackbar>);
}




  return (
    <div className={classes.root}>
      <NavbarProfile/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
    

    <Paper className={classes.formPaper}>
    {/* <div style={{ height:"150px",width:"1000px"}}>
    <img src={bgImg}/>
</div> */}
        <Grid container spacing={2} >
        {/* Left Side */}
        <Grid item xs={12} md={6}>
        <div>
        <Typography variant="h5" style={{marginBottom:"3%"}}>
           Join Team
       </Typography>
   <form >

   <Grid container style={{padding:"3%"}} spacing={2} alignItems="center">
   <Grid md={12} item>
   <TextField label="Team Name" variant="outlined" name="teamName" onChange={handleChangeSearchTeam} fullWidth autoComplete="off"/>
   </Grid>
   <Grid item md={12}>
   <FormControl variant="outlined" className={classes.formControl}>
   <InputLabel>Sport</InputLabel>
   <Select
     onChange={handleChangeSearchTeam}
     name="sport"
     label="Sport"
    
   >
    
     <MenuItem value="Football">Football</MenuItem>
     <MenuItem value="Cricket">Cricket</MenuItem>
     <MenuItem value="VolleyBall">Volleyball</MenuItem>
   </Select>
 </FormControl>
   </Grid>
<Grid item md={12}>
<Button onClick={handleSubmitTeamSearch} fullWidth style={{color:"white",backgroundColor:"black"}}> Search Team</Button>
</Grid>
   </Grid>
    
 
 <div>
      
       <Dialog
   open={dialogOpen}
   onClose={()=>{setDialogOpen(false)}}
   aria-labelledby="alert-dialog-title"
   aria-describedby="alert-dialog-description"
 >
   <DialogTitle id="alert-dialog-title">{"Is this the Team?"}</DialogTitle>
   
   <DialogContent>
   
     <DialogContentText id="alert-dialog-description">
   Team Name: {DialogData.teamName} Sport: {DialogData.sport} Captain: {DialogData.captain}  
     </DialogContentText>
   </DialogContent>
   <DialogActions>
    
     <Button onClick={()=>{setDialogOpen(false)}} color="primary" autoFocus>
      Cancel
     </Button>
     <Button onClick={join} color="primary">
      Join
     </Button>
   </DialogActions>
 </Dialog>
</div>
               
       </form>
        </div>
            
        </Grid>

        {/* Right Side */}
        <Grid item xs={12} md={6}>
        <div>
     <Typography variant="h5" style={{marginBottom:"3%"}}>
          Create Team
       </Typography>
       <form >
       <Grid container spacing={2} alignItems="center" style={{padding:"3%"}}>

       <Grid item md={12}>
       <TextField label="Team Name"
       name="teamName" 
       variant="outlined"
        fullWidth
        autoComplete="off"
        onChange={handleChangeCreateTeam}

       />
       </Grid>
       <Grid item md={12}>
    <FormControl variant="outlined" className={classes.formControl}>
   <InputLabel>Sport</InputLabel>
   <Select
     onChange={handleChangeCreateTeam}
     name="sport"
     label="Sport"
     fullWidth
    
   >
    
     <MenuItem value="Football">Football</MenuItem>
     <MenuItem value="Cricket">Cricket</MenuItem>
     <MenuItem value="VolleyBall">Volleyball</MenuItem>
   </Select>
 </FormControl>
       </Grid>


        <Grid item md={12}>
          <Button onClick={handleSubmitCreateTeam} fullWidth style={{backgroundColor:"black",color:"white"}}>Create Team</Button>
        </Grid>

      
       </Grid>

           

           
       </form>
     </div>
        </Grid>
        </Grid>
        
    </Paper>
    <MyAlert open={createAlert} severity="success"  msg="Team Successfully Created" handleClose={handleAlertCloseCreate}/>
    <MyAlert open={joinAlert} severity="success"  msg="Team Successfully Joined" handleClose={handleAlertCloseJoin} />
    <MyAlert open={searchFailAlert} severity="error"  msg="Team Search Failed" handleClose={handleAlertCloseSearchFail}/>
    <MyAlert open={joinFailAlert} severity="error"  msg="Failed to join Team. Try Again" handleClose={handleAlertCloseJoinFail}/>
    <MyAlert open={joinSuccessAlert} severity="success"  msg="Joined Team Successfully" handleClose={handleAlertCloseJoinSuccess}/>      
</main>
    </div>

 
  );
}

export default JoinTeam;